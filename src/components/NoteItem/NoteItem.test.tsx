import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteItem from './NoteItem';
import { Note } from '../../features/notes/types';
import { useNotes } from '../../hooks/useNotes';
import { UseMutationResult } from 'react-query';

// Mock the useNotes hook
jest.mock('../../hooks/useNotes');

// Mock apiConfig.ts
jest.mock('../../config/apiConfig', () => ({
  __esModule: true,
  default: 'http://localhost:5173/api',
}));

const mockUseNotes = useNotes as jest.MockedFunction<typeof useNotes>;

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn().mockResolvedValue(undefined),
  },
});

const createMockUseMutation = <
  Data,
  ErrorType,
  Variables,
  Context,
>(): UseMutationResult<Data, ErrorType, Variables, Context> =>
  ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    data: undefined,
    error: null,
    isError: false,
    isIdle: true,
    isLoading: false,
    isSuccess: false,
    reset: jest.fn(),
    status: 'idle',
    variables: undefined,
    failureCount: 0,
    isPaused: false,
    context: undefined,
  }) as unknown as UseMutationResult<Data, ErrorType, Variables, Context>;

const sampleNote: Note = {
  id: '1', // Consider using a UUID format, e.g., '123e4567-e89b-12d3-a456-426614174000'
  title: 'Test Note',
  content: 'This is a test note.',
  createdAt: new Date().toISOString(),
  shared: false,
};

describe('NoteItem Component', () => {
  beforeEach(() => {
    localStorage.setItem('notes', JSON.stringify([sampleNote]));

    mockUseNotes.mockReturnValue({
      notes: [sampleNote],
      isLoading: false,
      isError: false,
      error: null,
      addNote: createMockUseMutation<Note, Error, Note, unknown>(),
      removeNote: createMockUseMutation<void, Error, string, unknown>(),
      generateShareLinkMutation: createMockUseMutation<
        { link: string },
        Error,
        Note,
        unknown
      >(),
      updateNote: createMockUseMutation<Note, Error, Note, unknown>(),
    });
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders note details correctly', () => {
    render(<NoteItem note={sampleNote} />);
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText('This is a test note.')).toBeInTheDocument();
    expect(screen.getByText(/Created At:/)).toBeInTheDocument();
  });

  it('opens EditNoteModal when Edit button is clicked', async () => {
    render(<NoteItem note={sampleNote} />);
    const editButton = screen.getByText('Edit');
    await userEvent.click(editButton);
    expect(screen.getByText('Edit Note')).toBeInTheDocument();
  });

  it('opens DeleteConfirmationModal when Delete button is clicked', async () => {
    render(<NoteItem note={sampleNote} />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    await userEvent.click(deleteButtons[0]);

    expect(await screen.findByText('Delete Note')).toBeInTheDocument();

    const modalDeleteButton = screen.getByLabelText('confirm-delete');
    expect(modalDeleteButton).toBeInTheDocument();
  });

  it.skip('calls generateShareLinkMutation and copies link to clipboard when Share button is clicked', async () => {
    render(<NoteItem note={sampleNote} />);
    const shareButton = screen.getByText('Share');

    await act(async () => {
      await userEvent.click(shareButton);
    });

    await waitFor(() => {
      expect(
        mockUseNotes().generateShareLinkMutation.mutate
      ).toHaveBeenCalledWith(sampleNote, expect.any(Object));
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'http://localhost:5173/share/1'
      );
    });
  });

  it('calls removeNote.mutate when delete is confirmed', async () => {
    const { removeNote } = mockUseNotes();
    render(<NoteItem note={sampleNote} />);

    const deleteButton = screen.getByText('Delete');
    await userEvent.click(deleteButton);

    const modalDeleteButton = screen.getByLabelText('confirm-delete');
    await userEvent.click(modalDeleteButton);

    expect(removeNote.mutate).toHaveBeenCalledWith('1', expect.any(Object));
  });

  it.skip('calls updateNote.mutate when note is edited and saved', async () => {
    const { updateNote } = mockUseNotes();
    render(<NoteItem note={sampleNote} />);
    const editButton = screen.getByText('Edit');
    await userEvent.click(editButton);

    const titleInput = screen.getByLabelText('Title');
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated Title');

    const saveButton = await screen.findByRole('button', { name: /save/i });
    await userEvent.click(saveButton);

    expect(updateNote.mutate).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Updated Title' }),
      expect.any(Object)
    );
  });
});

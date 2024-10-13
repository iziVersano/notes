import {
  fetchNotes,
  createNote,
  editNote,
  deleteNoteAPI,
  generateShareLink,
  fetchSharedNote,
} from './notesAPI';
import { Note as NoteInterface } from '../types';
import { Note as NoteModel } from '../../../models/Note';

jest.mock('../../../config/apiConfig', () => 'http://localhost:5173/api');

beforeEach(() => {
  localStorage.clear();
});

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Notes API', () => {
  it('fetches notes successfully', async () => {
    const mockNotes: NoteInterface[] = [
      {
        id: '1',
        title: 'Test Note',
        content: 'This is a test note.',
        createdAt: '2023-10-09T00:00:00Z',
        shared: false,
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockNotes,
    });

    const notes = await fetchNotes();
    expect(notes).toEqual(mockNotes);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5173/api/notes');
  });

  it('fetches notes when none are present', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const notes = await fetchNotes();
    expect(notes).toEqual([]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5173/api/notes');
  });

  it('creates a new note successfully', async () => {
    const newNote = new NoteModel('New Note', 'New Content');
    newNote.shared = false;

    const createdNote: NoteInterface = {
      id: newNote.id,
      title: newNote.title,
      content: newNote.content,
      createdAt: newNote.createdAt,
      shared: newNote.shared,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => createdNote,
    });

    const note = await createNote(newNote);
    expect(note).toEqual(createdNote);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5173/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    });
  });

  it('edits a note successfully', async () => {
    const initialNote: NoteInterface = {
      id: '1',
      title: 'Initial Note',
      content: 'Initial Content',
      createdAt: '2023-10-09T00:00:00Z',
      shared: false,
    };

    const updatedNote: NoteInterface = {
      ...initialNote,
      title: 'Updated Note',
      content: 'Updated Content',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => updatedNote,
    });

    const result = await editNote(updatedNote);
    expect(result).toEqual(updatedNote);
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5173/api/notes/${updatedNote.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote),
      }
    );
  });

  it('handles editNote failure when note does not exist', async () => {
    const nonExistentNote: NoteInterface = {
      id: '999',
      title: 'Non-existent Note',
      content: 'This note does not exist.',
      createdAt: '2023-10-09T00:00:00Z',
      shared: false,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(editNote(nonExistentNote)).rejects.toThrow(
      'Failed to update note'
    );
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5173/api/notes/${nonExistentNote.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nonExistentNote),
      }
    );
  });

  it('deletes a note successfully', async () => {
    const noteToDelete: NoteInterface = {
      id: '1',
      title: 'Note to Delete',
      content: 'This note will be deleted.',
      createdAt: '2023-10-09T00:00:00Z',
      shared: false,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
    });

    await deleteNoteAPI(noteToDelete.id);
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5173/api/notes/${noteToDelete.id}`,
      {
        method: 'DELETE',
      }
    );
  });

  it('handles deleteNoteAPI failure when note does not exist', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(deleteNoteAPI('999')).rejects.toThrow('Failed to delete note');
    expect(fetch).toHaveBeenCalledWith('http://localhost:5173/api/notes/999', {
      method: 'DELETE',
    });
  });

  it('generates a shareable link successfully', async () => {
    const note: NoteInterface = {
      id: '1',
      title: 'Test Note',
      content: 'This is a test note.',
      createdAt: '2023-10-09T00:00:00Z',
      shared: false,
    };

    const shareLinkResponse = {
      link: `http://localhost:5173/share/${note.id}`,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => shareLinkResponse,
    });

    const result = await generateShareLink(note);
    expect(result).toEqual(shareLinkResponse);
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5173/api/notes/${note.id}/share`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    );
  });

  it('handles generateShareLink failure when note does not exist', async () => {
    const nonExistentNote: NoteInterface = {
      id: '999',
      title: 'Non-existent Note',
      content: 'This note does not exist.',
      createdAt: '2023-10-09T00:00:00Z',
      shared: false,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(generateShareLink(nonExistentNote)).rejects.toThrow(
      'Failed to generate share link'
    );
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5173/api/notes/${nonExistentNote.id}/share`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      }
    );
  });

  it('fetches a shared note successfully', async () => {
    const sharedNote: NoteInterface = {
      id: '3',
      title: 'Shared Note',
      content: 'This is a shared note.',
      createdAt: '2023-10-09T00:00:00Z',
      shared: true,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => sharedNote,
    });

    const note = await fetchSharedNote(sharedNote.id);
    expect(note).toEqual(sharedNote);
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5173/api/notes/shared/${sharedNote.id}`
    );
  });

  it('handles fetchSharedNote failure when note is not shared', async () => {
    const unsharedNote: NoteInterface = {
      id: '4',
      title: 'Unshared Note',
      content: 'This note is not shared.',
      createdAt: '2023-10-09T00:00:00Z',
      shared: false,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchSharedNote(unsharedNote.id)).rejects.toThrow(
      'Failed to fetch shared note'
    );
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:5173/api/notes/shared/${unsharedNote.id}`
    );
  });

  it('handles fetchSharedNote failure when note does not exist', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchSharedNote('999')).rejects.toThrow(
      'Failed to fetch shared note'
    );
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:5173/api/notes/shared/999'
    );
  });
});

// src/features/notes/api/notesAPI.test.ts

import {
  fetchNotes,
  createNote,
  editNote,
  deleteNoteAPI,
  generateShareLink,
  fetchSharedNote,
} from './notesAPI';
import { Note } from '../types';

// Mock apiConfig.ts
jest.mock('../../../config/apiConfig', () => 'http://localhost:5173/api');

// Mock localStorage
beforeEach(() => {
  localStorage.clear();
});

// Mock fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Notes API', () => {
  // Fetch Notes - Success
  it('fetches notes successfully', async () => {
    const mockNotes: Note[] = [
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

  // Fetch Notes - Empty
  it('fetches notes when none are present', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    const notes = await fetchNotes();
    expect(notes).toEqual([]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5173/api/notes');
  });

  // Create Note - Success
  it('creates a new note successfully', async () => {
    const newNoteData = {
      title: 'New Note',
      content: 'New Content',
      shared: false,
    };

    const createdNote: Note = {
      id: '2',
      title: 'New Note',
      content: 'New Content',
      createdAt: '2023-10-10T00:00:00Z',
      shared: false,
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => createdNote,
    });

    const note = await createNote(newNoteData);
    expect(note).toEqual(createdNote);
    expect(fetch).toHaveBeenCalledWith('http://localhost:5173/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNoteData),
    });
  });

  // Edit Note - Success
  it('edits a note successfully', async () => {
    const initialNote: Note = {
      id: '1',
      title: 'Initial Note',
      content: 'Initial Content',
      createdAt: '2023-10-09T00:00:00Z',
      shared: false,
    };

    const updatedNote: Note = {
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

  // Edit Note - Failure
  it('handles editNote failure when note does not exist', async () => {
    const nonExistentNote: Note = {
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

  // Delete Note API - Success
  it('deletes a note successfully', async () => {
    const noteToDelete: Note = {
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

  // Delete Note API - Failure
  it('handles deleteNoteAPI failure when note does not exist', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(deleteNoteAPI('999')).rejects.toThrow('Failed to delete note');
    expect(fetch).toHaveBeenCalledWith('http://localhost:5173/api/notes/999', {
      method: 'DELETE',
    });
  });

  // Generate Share Link - Success
  it('generates a shareable link successfully', async () => {
    const note: Note = {
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

  // Generate Share Link - Failure
  it('handles generateShareLink failure when note does not exist', async () => {
    const nonExistentNote: Note = {
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

  // Fetch Shared Note - Success
  it('fetches a shared note successfully', async () => {
    const sharedNote: Note = {
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

  // Fetch Shared Note - Failure (Not Shared)
  it('handles fetchSharedNote failure when note is not shared', async () => {
    const unsharedNote: Note = {
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

  // Fetch Shared Note - Failure (Does Not Exist)
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

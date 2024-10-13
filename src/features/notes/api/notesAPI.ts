// src/features/notes/api/notesAPI.ts

import API_BASE_URL from '../../../config/apiConfig';
import { Note } from '../types';

// Fetch all notes
export const fetchNotes = async (): Promise<Note[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`);
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    const data: Note[] = await response.json();
    console.log('fetchNotes API', data);
    return data;
  } catch {
    throw new Error('Failed to fetch notes');
  }
};

// Create a new note
export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt'>
): Promise<Note> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }
    const data: Note = await response.json();
    console.log('Fetched notes:', data);
    return data;
  } catch {
    throw new Error('Failed to create note');
  }
};

// Edit an existing note
export const editNote = async (note: Note): Promise<Note> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${note.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error('Failed to update note');
    }
    const data: Note = await response.json();
    return data;
  } catch {
    throw new Error('Failed to update note');
  }
};

// Delete a note
export const deleteNoteAPI = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
};

// Fetch a shared note by ID
export const fetchSharedNote = async (id: string): Promise<Note> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/shared/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch shared note');
    }
    const data: Note = await response.json();
    return data;
  } catch {
    throw new Error('Failed to fetch shared note');
  }
};

// Generate a shareable link for a note
export const generateShareLink = async (
  note: Note
): Promise<{ link: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes/${note.id}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      throw new Error('Failed to generate share link');
    }
    const data: { link: string } = await response.json();
    return data;
  } catch {
    throw new Error('Failed to generate share link');
  }
};

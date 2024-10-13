import fetchMock from 'fetch-mock';
import API_BASE_URL from './config/apiConfig';
import { Note } from './features/notes/types';
import { loadNotes, saveNotes } from './utils/localStorageManager';

// Initialize notes from localStorage or set default
let notes: Note[] = loadNotes();

const generateId = (): string => Math.random().toString(36).substr(2, 9);

// Mock GET /api/notes
fetchMock.get(`${API_BASE_URL}/notes`, (url, opts) => {
  console.log('Mock API - Fetching notes:', notes);
  return {
    status: 200,
    body: notes,
  };
});

console.log('Mock API - Fetching notes:', notes);
// Mock POST /api/notes
fetchMock.post(`${API_BASE_URL}/notes`, (url, opts) => {
  const { title, content, shared } = JSON.parse(opts.body as string);
  const newNote: Note = {
    id: generateId(),
    title,
    content,
    createdAt: new Date().toISOString(),
    shared: shared ?? false,
  };

  notes = [...notes, newNote];
  saveNotes(notes);
  console.log('Created new note:', newNote);
  return {
    status: 201,
    body: newNote,
  };
});

// Mock PUT /api/notes/:id
fetchMock.put(new RegExp(`${API_BASE_URL}/notes/\\w+`), (url, opts) => {
  const match = url.match(new RegExp(`${API_BASE_URL}/notes/(\\w+)`));
  const id = match ? match[1] : null;
  if (!id) {
    console.log(`Update failed: Invalid URL ${url}`);
    return {
      status: 400,
      body: { message: 'Invalid note ID' },
    };
  }
  const { title, content, shared } = JSON.parse(opts.body as string);
  const noteExists = notes.some((note) => note.id === id);
  if (!noteExists) {
    console.log(`Update failed: Note with ID ${id} not found.`);
    return {
      status: 404,
      body: { message: 'Note not found' },
    };
  }

  notes = notes.map((note) =>
    note.id === id
      ? { ...note, title, content, shared: shared ?? note.shared }
      : note
  );
  saveNotes(notes);
  const updatedNote = notes.find((note) => note.id === id);
  console.log(`Updated note with ID ${id}:`, updatedNote);
  return {
    status: 200,
    body: updatedNote,
  };
});

// Mock DELETE /api/notes/:id
fetchMock.delete(new RegExp(`${API_BASE_URL}/notes/\\w+`), (url) => {
  const match = url.match(new RegExp(`${API_BASE_URL}/notes/(\\w+)`));
  const id = match ? match[1] : null;
  if (!id) {
    console.log(`Delete failed: Invalid URL ${url}`);
    return {
      status: 400,
      body: { message: 'Invalid note ID' },
    };
  }
  const noteExists = notes.some((note) => note.id === id);
  if (!noteExists) {
    console.log(`Delete failed: Note with ID ${id} not found.`);
    return {
      status: 404,
      body: { message: 'Note not found' },
    };
  }

  notes = notes.filter((note) => note.id !== id);
  saveNotes(notes);
  console.log(`Deleted note with ID: ${id}`);
  return {
    status: 204,
  };
});

// Mock POST /api/notes/:id/share
fetchMock.post(new RegExp(`${API_BASE_URL}/notes/\\w+/share`), (url) => {
  const match = url.match(new RegExp(`${API_BASE_URL}/notes/(\\w+)/share`));
  const id = match ? match[1] : null;
  if (!id) {
    console.log(`Share failed: Invalid URL ${url}`);
    return {
      status: 400,
      body: { message: 'Invalid note ID' },
    };
  }
  const noteExists = notes.some((note) => note.id === id);
  if (!noteExists) {
    console.log(`Share failed: Note with ID ${id} not found.`);
    return {
      status: 404,
      body: { message: 'Note not found' },
    };
  }

  notes = notes.map((note) =>
    note.id === id ? { ...note, shared: true } : note
  );
  saveNotes(notes);
  const link = `http://localhost:5173/share/${id}`;
  console.log(`Shared note with ID ${id}: ${link}`);
  return {
    status: 200,
    body: { link },
  };
});

// Mock GET /api/notes/shared/:id
fetchMock.get(new RegExp(`${API_BASE_URL}/notes/shared/\\w+`), (url) => {
  const match = url.match(new RegExp(`${API_BASE_URL}/notes/shared/(\\w+)`));
  const id = match ? match[1] : null;
  if (!id) {
    console.log(`Fetch shared note failed: Invalid URL ${url}`);
    return {
      status: 400,
      body: { message: 'Invalid note ID' },
    };
  }
  const sharedNote = notes.find((note) => note.id === id && note.shared);
  if (!sharedNote) {
    console.log(
      `Fetch shared note failed: Note with ID ${id} not found or not shared.`
    );
    return {
      status: 404,
      body: { message: 'Note not found' },
    };
  }
  console.log(`Fetched shared note with ID ${id}:`, sharedNote);
  return {
    status: 200,
    body: sharedNote,
  };
});

// Prevent actual network requests outside of mocked endpoints
fetchMock.catch((url) => {
  console.warn(`Unmocked API call to: ${url}`);
  return {
    status: 500,
    body: { message: `No mock implemented for ${url}` },
  };
});

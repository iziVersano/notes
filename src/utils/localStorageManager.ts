import { Note } from '../features/notes/types';

export const loadNotes = (): Note[] => {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

export const saveNotes = (notes: Note[]): void => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

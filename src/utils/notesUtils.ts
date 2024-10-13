import { Note } from '../features/notes/types';

export const loadNotesFromLocalStorage = (): Note[] => {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
};

export const saveNotesToLocalStorage = (notes: Note[]) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

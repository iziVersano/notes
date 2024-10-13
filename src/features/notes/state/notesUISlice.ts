// src/features/notes/state/notesUISlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotesUIState {
  editingNoteId: string | null;
  sharingNoteId: string | null;
}

const initialState: NotesUIState = {
  editingNoteId: null,
  sharingNoteId: null,
};

const notesUISlice = createSlice({
  name: 'notesUI',
  initialState,
  reducers: {
    setEditingNoteId(state, action: PayloadAction<string | null>) {
      state.editingNoteId = action.payload;
    },
    setSharingNoteId(state, action: PayloadAction<string | null>) {
      state.sharingNoteId = action.payload;
    },
  },
});

export const { setEditingNoteId, setSharingNoteId } = notesUISlice.actions;

export default notesUISlice.reducer;

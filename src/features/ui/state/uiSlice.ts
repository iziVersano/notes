// src/features/ui/state/uiSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  searchQuery: string;
  // Add other UI states as needed
}

const initialState: UIState = {
  isCreateModalOpen: false,
  isEditModalOpen: false,
  searchQuery: '',
  // Initialize other UI states
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCreateModal(state) {
      state.isCreateModalOpen = true;
    },
    closeCreateModal(state) {
      state.isCreateModalOpen = false;
    },
    openEditModal(state) {
      state.isEditModalOpen = true;
    },
    closeEditModal(state) {
      state.isEditModalOpen = false;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearSearchQuery(state) {
      state.searchQuery = '';
    },
    // Add other reducers as needed
  },
});

export const {
  openCreateModal,
  closeCreateModal,
  openEditModal,
  closeEditModal,
  setSearchQuery,
  clearSearchQuery,
} = uiSlice.actions;
export default uiSlice.reducer;

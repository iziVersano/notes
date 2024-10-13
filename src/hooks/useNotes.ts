import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Note } from '../features/notes/types';
import {
  fetchNotes,
  createNote,
  editNote,
  deleteNoteAPI,
  generateShareLink,
} from '../features/notes/api/notesAPI';
import { useAppDispatch } from './reduxHooks';
import { clearSearchQuery } from '../features/ui/state/uiSlice';

export const useNotes = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  // Fetch all notes
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery<Note[], Error>(['notes'], fetchNotes, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });

  // Add a new note
  const addNote = useMutation<Note, Error, Omit<Note, 'id' | 'createdAt'>>(
    createNote,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notes']);
      },
    }
  );

  // Update an existing note
  const updateNote = useMutation<Note, Error, Note>(editNote, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    },
  });

  // Delete a note and clear search query
  const removeNote = useMutation<void, Error, string>(deleteNoteAPI, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
      dispatch(clearSearchQuery());
    },
  });

  // Generate a shareable link
  const generateShareLinkMutation = useMutation<{ link: string }, Error, Note>(
    generateShareLink,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notes']);
      },
    }
  );

  return {
    notes,
    isLoading,
    isError,
    error,
    addNote,
    updateNote,
    removeNote,
    generateShareLinkMutation,
  };
};

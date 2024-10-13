import React, { useMemo, useState, useEffect } from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import { Note } from '../../features/notes/types';
import NoteItem from '../NoteItem/NoteItem';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import PaginationControls from '../PaginationControls/PaginationControls';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const searchQuery = useSearchQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;
  const filteredNotes = useMemo(() => {
    if (!notes) return [];
    const query = searchQuery.query.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
  }, [notes, searchQuery.query]);

  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const totalNotes = filteredNotes.length;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery.query]);

  const currentNotes = useMemo(() => {
    const startIndex = (currentPage - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    return filteredNotes.slice(startIndex, endIndex);
  }, [filteredNotes, currentPage, notesPerPage]);

  if (filteredNotes.length === 0) {
    if (notes.length === 0) {
      return (
        <div className="text-center text-muted mt-5">
          <p>No notes yet. Start by creating your first note!</p>
        </div>
      );
    }
    return (
      <Alert variant="info" className="mt-5">
        No notes found matching your search.
      </Alert>
    );
  }

  return (
    <>
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalNotes={totalNotes}
        notesPerPage={notesPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <ListGroup
        className="d-grid gap-3 mt-3"
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        {currentNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </ListGroup>
    </>
  );
};

export default React.memo(NoteList);

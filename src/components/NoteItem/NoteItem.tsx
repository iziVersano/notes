import React, { useCallback, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Note } from '../../features/notes/types';
import EditNoteModal from '../Modals/EditNoteModal';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
import { useNotes } from '../../hooks/useNotes';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown to render markdown content

interface NoteItemProps {
  note: Note;
}

const NoteItem: React.FC<NoteItemProps> = ({ note }) => {
  const { removeNote, generateShareLinkMutation, updateNote } = useNotes();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const confirmDelete = useCallback(() => {
    removeNote.mutate(note.id, {
      onError: () => {
        alert('Failed to delete note.');
      },
    });
  }, [removeNote, note.id]);

  const handleShare = useCallback(() => {
    generateShareLinkMutation.mutate(note, {
      onSuccess: (data) => {
        navigator.clipboard
          .writeText(data.link)
          .then(() => {
            alert('Shareable link copied to clipboard!');
          })
          .catch(() => {
            alert('Failed to copy link to clipboard.');
          });
      },
      onError: () => {
        alert('Failed to generate share link.');
      },
    });
  }, [generateShareLinkMutation, note]);

  const handleEdit = useCallback(() => {
    setShowEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setShowEditModal(false);
  }, []);

  const handleSaveEdit = useCallback(
    (updatedNote: Note) => {
      updateNote.mutate(updatedNote, {
        onSuccess: () => {
          setShowEditModal(false);
        },
        onError: () => {
          alert('Failed to update note.');
        },
      });
    },
    [updateNote]
  );

  const handleDelete = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  return (
    <>
      <Card
        className="mb-3 shadow-sm"
        style={{ backgroundColor: note.shared ? '#f8f9fa' : '#ffffff' }}
      >
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            {note.title}
            <div>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleShare}
                className="me-2"
              >
                Share
              </Button>
              <Button
                variant="outline-warning"
                size="sm"
                onClick={handleEdit}
                className="me-2"
              >
                Edit
              </Button>
              <Button variant="outline-danger" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </Card.Title>
          <Card.Text>
            <ReactMarkdown>{note.content}</ReactMarkdown>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            Created At: {new Date(note.createdAt).toLocaleString()}
          </small>
        </Card.Footer>
      </Card>

      {/* Edit Note Modal */}
      {showEditModal && (
        <EditNoteModal
          show={showEditModal}
          onHide={handleCloseEditModal}
          note={note}
          onSave={handleSaveEdit}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        noteTitle={note.title}
      />
    </>
  );
};

export default React.memo(NoteItem);

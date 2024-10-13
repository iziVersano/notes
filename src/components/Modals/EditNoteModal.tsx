import React from 'react';
import { Modal } from 'react-bootstrap';
import EditNoteForm from '../Forms/EditNoteForm';
import { Note } from '../../features/notes/types';

interface EditNoteModalProps {
  show: boolean;
  onHide: () => void;
  note: Note;
  onSave: (updatedNote: Note) => void;
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  show,
  onHide,
  note,
  onSave,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditNoteForm note={note} onClose={onHide} onSave={onSave} />
      </Modal.Body>
    </Modal>
  );
};

export default EditNoteModal;

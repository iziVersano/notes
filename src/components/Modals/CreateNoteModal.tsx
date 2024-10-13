import React from 'react';
import { Modal } from 'react-bootstrap';
import CreateNoteForm from '../Forms/CreateNoteForm';

interface CreateNoteModalProps {
  show: boolean;
  onHide: () => void;
}

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateNoteForm onClose={onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default CreateNoteModal;

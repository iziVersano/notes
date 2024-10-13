import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteConfirmationModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  noteTitle: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  onHide,
  onConfirm,
  noteTitle,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the note titled "{noteTitle}"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="danger"
          aria-label="confirm-delete"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;

import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNotes } from '../../hooks/useNotes';

interface CreateNoteFormInputs {
  title: string;
  content: string;
}

interface CreateNoteFormProps {
  onClose: () => void;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateNoteFormInputs>();

  const { addNote } = useNotes();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreateNoteFormInputs> = useCallback(
    (data) => {
      setError(null);
      addNote.mutate(
        { ...data, shared: true },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
          onError: () => {
            setError('Failed to create note. Please try again.');
          },
        }
      );
    },
    [addNote, reset, onClose]
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)} aria-labelledby="create-note-form">
      {error && (
        <Alert variant="danger" role="alert">
          {error}
        </Alert>
      )}
      <fieldset>
        <legend id="create-note-form" className="visually-hidden">
          Create Note Form
        </legend>
        <Form.Group controlId="noteTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            aria-required="true"
            aria-invalid={!!errors.title}
            placeholder="Enter title"
            {...register('title', { required: 'Title is required' })}
            isInvalid={!!errors.title}
            className="rounded"
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="noteContent" className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            aria-required="true"
            aria-invalid={!!errors.content}
            rows={3}
            placeholder="Enter content"
            {...register('content', { required: 'Content is required' })}
            isInvalid={!!errors.content}
            className="rounded"
          />
          <Form.Control.Feedback type="invalid">
            {errors.content?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </fieldset>

      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          aria-label="Cancel creating note"
          onClick={onClose}
          className="me-2 rounded-pill"
        >
          Cancel
        </Button>
        <Button
          variant="outline-primary"
          aria-label="Submit new note"
          type="submit"
          disabled={addNote.isLoading}
          className="btn-lg rounded-pill"
        >
          {addNote.isLoading ? 'Creating...' : 'Create Note'}
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(CreateNoteForm);

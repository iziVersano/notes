import React, { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Note } from '../../features/notes/types';
import { Button, Form, Alert } from 'react-bootstrap';

interface EditNoteFormProps {
  note: Note;
  onClose: () => void;
  onSave: (updatedNote: Note) => void;
}

interface EditNoteFormInputs {
  title: string;
  content: string;
}

const EditNoteForm: React.FC<EditNoteFormProps> = ({
  note,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditNoteFormInputs>({
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<EditNoteFormInputs> = useCallback(
    (data) => {
      setError(null);
      const updatedNote = { ...note, ...data };
      onSave(updatedNote);
    },
    [note, onSave]
  );

  return (
    <Form onSubmit={handleSubmit(onSubmit)} aria-labelledby="edit-note-form">
      {error && (
        <Alert variant="danger" role="alert">
          {error}
        </Alert>
      )}
      <fieldset>
        <legend id="edit-note-form" className="visually-hidden">
          Edit Note Form
        </legend>
        <Form.Group controlId="editNoteTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            aria-required="true"
            aria-invalid={!!errors.title}
            placeholder="Enter title"
            {...register('title', { required: 'Title is required' })}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="editNoteContent" className="mt-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            aria-required="true"
            aria-invalid={!!errors.content}
            rows={3}
            placeholder="Enter content"
            {...register('content', { required: 'Content is required' })}
            isInvalid={!!errors.content}
          />
          <Form.Control.Feedback type="invalid">
            {errors.content?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </fieldset>

      <div className="d-flex justify-content-end mt-3">
        <Button
          variant="secondary"
          aria-label="Cancel editing note"
          onClick={onClose}
          className="me-2"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          aria-label="Save changes to note"
          type="submit"
        >
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

export default React.memo(EditNoteForm);

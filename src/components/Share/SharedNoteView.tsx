import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchSharedNote } from '../../features/notes/api/notesAPI';
import { Spinner, Alert, Card, Container, Button } from 'react-bootstrap';
import { Note } from '../../features/notes/types';
import ReactMarkdown from 'react-markdown'; // Import react-markdown to render markdown content

const SharedNoteView: React.FC = () => {
  const { noteId } = useParams<{ noteId: string }>(); // Use 'noteId' as defined in the route

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note>(['sharedNote', noteId], () => fetchSharedNote(noteId!), {
    enabled: !!noteId,
  });

  if (isLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          {(error as Error).message || 'Failed to load the note.'}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      {note ? (
        <>
          <Card>
            <Card.Body>
              <Card.Title>{note.title}</Card.Title>
              <ReactMarkdown>{note.content}</ReactMarkdown>
              <Card.Footer>
                <small className="text-muted">
                  Created At: {new Date(note.createdAt).toLocaleString()}
                </small>
              </Card.Footer>
            </Card.Body>
          </Card>
          <div className="mt-3">
            <Link to="/">
              <Button variant="outline-primary">Back to Note List</Button>
            </Link>
          </div>
        </>
      ) : (
        <Alert variant="warning">Note not found.</Alert>
      )}
    </Container>
  );
};

export default SharedNoteView;

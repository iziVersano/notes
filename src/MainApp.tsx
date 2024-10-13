import React from 'react';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import SearchBar from './components/Search/SearchBar';
import NoteList from './components/NoteList/NoteList';
import CreateNoteModal from './components/Modals/CreateNoteModal';
import { useNotes } from './hooks/useNotes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Main.css';

const MainApp: React.FC = () => {
  const { notes, isLoading, isError, error, addNote } = useNotes();
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const handleOpenCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (isError) {
    return (
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={8}>
          <Alert variant="danger">{error?.message}</Alert>
        </Col>
      </Row>
    );
  }

  console.log('Rendering MainApp...', notes);

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8} className="d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={handleOpenCreateModal}
            className="btn-lg rounded-pill"
          >
            Create Note
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <SearchBar
            placeholder="Search notes..."
            className="fs-4 bg-light text-primary border-primary shadow-sm"
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <NoteList notes={notes || []} />
        </Col>
      </Row>

      {/* Create Note Modal */}
      <CreateNoteModal show={showCreateModal} onHide={handleCloseCreateModal} />
    </Container>
  );
};

export default MainApp;

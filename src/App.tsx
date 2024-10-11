// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './MainApp';
import SharedNoteView from './components/Share/SharedNoteView';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/share/:noteId" element={<SharedNoteView />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;

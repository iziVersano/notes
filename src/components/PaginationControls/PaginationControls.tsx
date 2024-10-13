import React from 'react';
import { Pagination } from 'react-bootstrap';
import './PaginationControls.css'; // Import the CSS file

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalNotes: number;
  notesPerPage: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  totalNotes,
  notesPerPage,
  onPageChange,
}) => {
  if (totalPages === 0) return null;

  const startRange = (currentPage - 1) * notesPerPage + 1;
  const endRange = Math.min(currentPage * notesPerPage, totalNotes);

  return (
    <div className="pagination-container mb-3">
      {/* Pagination Info */}
      <div>
        {startRange}–{endRange} of {totalNotes} notes {/* Added "notes" */}
      </div>

      {/* Pagination Navigation */}
      <div className="pagination-no-spacing">
        <Pagination>
          <Pagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Pagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default React.memo(PaginationControls);

import React from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../../features/ui/state/uiSlice';
import { RootState } from '../../store';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search notes...',
  className = '',
}) => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.ui.searchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <Form className={`flex-grow-1 me-3 ${className}`}>
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        className={`rounded ${className}`}
      />
    </Form>
  );
};

export default React.memo(SearchBar);

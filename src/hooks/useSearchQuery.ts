import { setSearchQuery, clearSearchQuery } from '../features/ui/state/uiSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export const useSearchQuery = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.ui.searchQuery);

  const updateSearchQuery = (newQuery: string) => {
    dispatch(setSearchQuery(newQuery));
  };

  const clearQuery = () => {
    dispatch(clearSearchQuery());
  };

  return { query, updateSearchQuery, clearQuery };
};

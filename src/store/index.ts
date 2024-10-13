import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../features/ui/state/uiSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Export AppDispatch
export default store;

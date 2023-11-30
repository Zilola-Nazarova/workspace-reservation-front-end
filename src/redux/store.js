import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import workspacesReducer from './workspaces/workspacesSlice';
import reservationsReducer from './reservations/reservationsSlice';

const store = configureStore({
  reducer: {
    workspaces: workspacesReducer,
    reservations: reservationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

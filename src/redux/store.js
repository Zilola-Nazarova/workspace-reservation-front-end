import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import workspacesReducer from './workspaces/workspacesSlice';
import reservationsReducer from './reservations/reservationsSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    workspaces: workspacesReducer,
    reservations: reservationsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

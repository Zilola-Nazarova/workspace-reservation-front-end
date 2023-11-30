import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import greetingsReducer from './greetings/greetingsSlice';
import workspacesReducer from './workspaces/workspacesSlice';
import reservationsReducer from './reservations/reservationsSlice';

const store = configureStore({
  reducer: {
    greetings: greetingsReducer,
    workspaces: workspacesReducer,
    reservations: reservationsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

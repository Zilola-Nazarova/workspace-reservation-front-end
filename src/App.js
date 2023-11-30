import { Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getReservations } from './redux/reservations/reservationsSlice';
import { getWorkspaces } from './redux/workspaces/workspacesSlice';

import Layout from './routes/Layout';
import HomePage from './routes/HomePage';
import WorkspaceDetailsPage from './routes/WorkspaceDetailsPage';

import SignInPage from './routes/SignInPage';
import SignOutPage from './routes/SignOutPage';
import SignUpPage from './routes/SignUpPage';

import ProtectedLayout from './routes/ProtectedLayout';
import NewReservationPage from './routes/NewReservationPage';
import ReservationsPage from './routes/ReservationsPage';
import AddWorkspacePage from './routes/AddWorkspacePage';
import RemoveWorkspacePage from './routes/RemoveWorkspacePage';

import ErrorPage from './routes/ErrorPage';

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaces());
    dispatch(getReservations());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="workspaces/:id" element={<WorkspaceDetailsPage />} />

        <Route path="/" element={<ProtectedLayout />}>
          <Route path="new_reservation" element={<NewReservationPage />} />
          <Route path="reservations" element={<ReservationsPage />} />
          <Route path="add_workspace" element={<AddWorkspacePage />} />
          <Route path="remove_workspace" element={<RemoveWorkspacePage />} />
        </Route>

        <Route path="sign_in" element={<SignInPage />} />
        <Route path="sign_out" element={<SignOutPage />} />
        <Route path="sign_up" element={<SignUpPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default Root;

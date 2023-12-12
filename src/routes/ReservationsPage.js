import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getReservations } from '../redux/reservations/reservationsSlice';
import { getWorkspaces } from '../redux/workspaces/workspacesSlice';

import WorkspaceItem from '../components/WorkspaceItem';

const ReservationsPage = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getReservations(token));
    dispatch(getWorkspaces(token));
  }, [dispatch, token]);

  const { reservations, isLoading, error } = useSelector(
    (store) => store.reservations,
  );

  if (isLoading) {
    return <div>Loading......</div>;
  }

  if (error) {
    return (
      <p>
        Something went wrong!
        <br />
        {error}
      </p>
    );
  }

  if (reservations.length > 0) {
    return (
      <div className="flex flex-col gap-12 p-8 mx-auto">
        <h1 className="text-2xl font-bold">Your reservations</h1>
        <ul className="flex flex-col gap-8">
          {reservations.map((reservation, index) => (
            <li key={reservation.id} className="flex flex-col md:flex-row gap-8 bg-green-50 rounded-lg shadow-lg  p-8">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">
                  Reservation #
                  {index + 1}
                </h2>
                <p className="">
                  Reserved from:&nbsp;
                  {reservation.start_date}
                </p>
                <p className="">
                  To:&nbsp;
                  {reservation.end_date}
                </p>
                <p className="">
                  City:&nbsp;
                  {reservation.city}
                </p>
              </div>
              <WorkspaceItem spaceId={reservation.workspace_id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <p>No reservations found.</p>;
};

export default ReservationsPage;

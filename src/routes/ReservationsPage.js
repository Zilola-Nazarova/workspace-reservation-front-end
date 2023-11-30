import React from 'react';
import { useSelector } from 'react-redux';
import WorkspaceItem from '../components/WorkspaceItem';
import styles from '../styles/ReservationsPage.module.css';

const ReservationsPage = () => {
  const { reservations, isLoading, error } = useSelector((store) => store.reservations);

  if (isLoading) {
    return (
      <div>Loading......</div>
    );
  }

  if (error) {
    return (
      <p>
        Something went wrong!
        <br />
        { error }
      </p>
    );
  }

  if (reservations) {
    return (
      <div className={styles.page}>
        <h1>This is ReservationsPage</h1>
        <ul className={styles.list}>
          {reservations.map((reservation, index) => (
            <li
              key={reservation.ID}
              className={styles.reservation_card}
            >
              <h2>
                Reservation #
                { index + 1 }
              </h2>

              <div className={styles.reservation_info}>
                <p className={styles.start_date}>
                  Reserved from:
                  {' '}
                  {reservation.start_date}
                </p>
                <p className={styles.end_date}>
                  To:
                  {' '}
                  {reservation.end_date}
                </p>
                <p className={styles.city}>
                  City:
                  {' '}
                  {reservation.city}
                </p>
                <WorkspaceItem
                  spaceId={reservation.workspace_id}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <p>No reservations found.</p>;
};

export default ReservationsPage;

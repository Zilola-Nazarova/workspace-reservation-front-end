import {
  React, useEffect, useRef, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getWorkspaces } from '../redux/workspaces/workspacesSlice';
import { postReservation } from '../redux/reservations/reservationsSlice';
import styles from '../styles/NewReservationPage.module.css';

const NewReservationPage = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const resetform = () => {
    formRef.current.reset();
  };

  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getWorkspaces(token));
  }, [dispatch, token]);

  const workspaces = useSelector((state) => state.workspaces.workspaces);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(null);
      setFail(null);
    }, 5000);

    if (success) {
      resetform();
    }
    return () => clearTimeout(timer);
  }, [success, fail, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      start_date: e.target.start_date.value,
      end_date: e.target.end_date.value,
      workspace: e.target.workspace.value,
      city: e.target.city.value,
    };
    const sendData = {
      data,
      token,
    };

    dispatch(postReservation(sendData)).then((res) => {
      if (res.payload.success) {
        setSuccess(res.payload.success);
      } else if (res.payload.errors) {
        setFail(res.payload.errors);
      }
    }).catch((err) => {
      setFail(err);
    });
  };

  return (
    <div className={styles.page}>
      <p>This is NewReservationPage</p>
      {success && <p>{success}</p>}
      {fail && fail.map((error) => <p key={uuidv4()}>{error}</p>)}
      <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="start_date">
          Start Date:
          <input type="date" name="start_date" id="start_date" />
        </label>
        <label htmlFor="end_date">
          End Date:
          <input type="date" name="end_date" id="end_date" />
        </label>
        <label htmlFor="city">
          City:
          <input type="text" name="city" id="city" />
        </label>
        <label htmlFor="workspace">
          Select workspace:
          <select name="workspace" id="workspace">
            {workspaces.map((workspace) => (
              <option key={uuidv4()} value={workspace.id}>{workspace.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Create New Reservation</button>
      </form>
    </div>
  );
};

export default NewReservationPage;

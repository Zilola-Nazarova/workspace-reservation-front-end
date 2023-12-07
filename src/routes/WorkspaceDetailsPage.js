import { useParams } from 'react-router-dom';

import {
  React, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getWorkspace } from '../redux/workspaces/workspacesSlice';
import { postReservation } from '../redux/reservations/reservationsSlice';
import styles from '../styles/WorkspaceDetails.module.css';
import noImage from '../assets/no-image.png';

const WorkspaceDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { workspace, isLoading, error } = useSelector((store) => store.workspaces);
  const formRef = useRef(null);
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const resetform = () => {
    formRef.current.reset();
  };

  useEffect(() => {
    dispatch(getWorkspace({ token, id }));
  }, [dispatch, token, id]);

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

  const handleReserve = async (e) => {
    e.preventDefault();
    const data = {
      start_date: e.target.start_date.value,
      end_date: e.target.end_date.value,
      workspace: id,
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
  if (workspace.name) {
    return (
      <>
        <div className={styles.page}>
          <p>This is WorkspaceDetailsPage</p>
          {success && <p>{success}</p>}
          {fail && fail.map((error) => <p key={uuidv4()}>{error}</p>)}
          {(workspace.image_url)
            ? <img alt={`${workspace.name}`} src={workspace.image_url} />
            : <img alt="not provided" src={noImage} />}
          <div className={workspace.workspace_info}>
            <h2 className={workspace.name}>{workspace.name}</h2>
            <p className={workspace.description}>{workspace.description}</p>
          </div>
          <form ref={formRef} onSubmit={(e) => handleReserve(e)}>
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
            <button type="submit">
              Reserve
              {workspace.name}
            </button>
          </form>
        </div>
      </>
    );
  }

  return <p>We couldn&apos;t find details about this room.</p>;
};

export default WorkspaceDetailsPage;

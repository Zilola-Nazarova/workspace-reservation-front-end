import {
  React, useEffect, useRef, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getWorkspaces } from '../redux/workspaces/workspacesSlice';
import { postReservation } from '../redux/reservations/reservationsSlice';

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

    dispatch(postReservation(sendData))
      .then((res) => {
        if (res.payload.success) {
          setSuccess(res.payload.success);
        } else if (res.payload.errors) {
          setFail(res.payload.errors);
        }
      })
      .catch((err) => {
        setFail(err);
      });
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      {success && <p>{success}</p>}
      {fail && fail.map((error) => <p key={uuidv4()}>{error}</p>)}
      <h2 className="font-bold text-2xl">Create reservation</h2>
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className="flex flex-col gap-2" htmlFor="start_date">
          Start Date:
          <input
            className="p-4 rounded-lg"
            type="date"
            name="start_date"
            id="start_date"
          />
        </label>
        <label className="flex flex-col gap-2" htmlFor="end_date">
          End Date:
          <input
            className="p-4 rounded-lg"
            type="date"
            name="end_date"
            id="end_date"
          />
        </label>
        <label className="flex flex-col gap-2" htmlFor="city">
          City:
          <input
            className="p-4 rounded-lg"
            type="text"
            name="city"
            id="city"
            placeholder="Tokyo"
          />
        </label>
        <label className="flex flex-col gap-2" htmlFor="workspace">
          Select workspace:
          <select className="p-4 rounded-lg" name="workspace" id="workspace">
            {workspaces.map((workspace) => (
              <option key={uuidv4()} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
        </label>
        <button className="p-4 bg-green-500 rounded-full" type="submit">
          Create New Reservation
        </button>
      </form>
    </div>
  );
};

export default NewReservationPage;

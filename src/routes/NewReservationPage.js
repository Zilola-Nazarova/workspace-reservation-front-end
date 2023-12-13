import {
  React, useEffect, useRef, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getWorkspaces } from '../redux/workspaces/workspacesSlice';
import { postReservation } from '../redux/reservations/reservationsSlice';

const NewReservationPage = () => {
  const workspaces = useSelector((state) => state.workspaces.workspaces);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cost, setCost] = useState(null);
  const [workspaceId, setWorkspaceId] = useState(null)

  const resetform = () => {
    formRef.current.reset();
  };

  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getWorkspaces(token));
  }, [dispatch, token]);

  const setStart = (e) => {
    setStartDate(e.target.value);
  };

  const setEnd = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    if (startDate && endDate && workspaceId) {
      const workspace = workspaces.find(space => space.id == workspaceId)
      const start = new Date(startDate);
      const end = new Date(endDate);
      const oneDay = 1000 * 60 * 60 * 24;
      const timeDifference = end.getTime() - start.getTime();
      const differenceInDays = Math.round(timeDifference / oneDay);
      const days = differenceInDays + 1;
      setCost(workspace.price_per_day * days);
    }
  }, [startDate, endDate, workspaceId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(null);
      setFail(null);
    }, 5000);

    if (success) {
      setCost(0)
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
          throw res.payload.errors;
        }
      })
      .catch((err) => {
        setFail(err);
      });
  };

  return (
    <div className='flex flex-col gap-8 justify-center items-center w-full'>
      {success && <p>{success}</p>}
      {fail && <p key={uuidv4()}>{fail}</p>}
      <h2 className='font-bold text-2xl'>Create reservation</h2>
      <form
        className='flex flex-col gap-4'
        ref={formRef}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label className='flex flex-col gap-2' htmlFor='start_date'>
          Start Date:
          <input
            className='p-4 rounded-lg'
            type='date'
            name='start_date'
            id='start_date'
            onChange={(e) => setStart(e)}
          />
        </label>
        <label className='flex flex-col gap-2' htmlFor='end_date'>
          End Date:
          <input
            className='p-4 rounded-lg'
            type='date'
            name='end_date'
            id='end_date'
            onChange={(e) => setEnd(e)}
          />
        </label>
        <label className='flex flex-col gap-2' htmlFor='city'>
          City:
          <input
            className='p-4 rounded-lg'
            type='text'
            name='city'
            id='city'
            placeholder='Tokyo'
          />
        </label>
        <label className='flex flex-col gap-2' htmlFor='workspace'>
          Select workspace:
          <select
            className='p-4 rounded-lg'
            name='workspace'
            id='workspace'
            defaultValue = {'placeholder'}
            onChange={(e) => setWorkspaceId(e.target.value)}
            required
          >
            <option value='placeholder' disabled>Chose from the list.</option>
            {workspaces.map((workspace) => (
              <option key={uuidv4()} value={workspace.id}>
                {workspace.name}
              </option>
            ))}
          </select>
        </label>
        <label className='flex flex-col gap-2' htmlFor='cost'>
          Cost of Reservation:
          <input
            className='p-1 rounded-lg'
            type='text'
            name='cost'
            id='cost'
            value={`$${cost ? cost : 0}`}
            readOnly
          />
        </label>
        <button className='p-4 bg-green-500 rounded-full' type='submit'>
          Create New Reservation
        </button>
      </form>
    </div>
  );
};

export default NewReservationPage;

import { useParams } from 'react-router-dom';
import {
  React, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getWorkspace } from '../redux/workspaces/workspacesSlice';
import { postReservation } from '../redux/reservations/reservationsSlice';

import noImage from '../assets/no-image.png';

const WorkspaceDetailsPage = () => {
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const formRef = useRef(null);
  const [success, setSuccess] = useState(null);
  const [fail, setFail] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [cost, setCost] = useState(null);

  const { workspace, isLoading, error } = useSelector(
    (store) => store.workspaces,
  );

  const resetform = () => {
    formRef.current.reset();
  };

  const setStart = (e) => {
    setStartDate(e.target.value);
  };
  
  const setEnd = (e) => {
    setEndDate(e.target.value);
  };
  
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const oneDay = 1000 * 60 * 60 * 24;
      const timeDifference = end.getTime() - start.getTime();
      const differenceInDays = Math.round(timeDifference / oneDay);
      const days = differenceInDays + 1;
      console.log(days)
      setCost(workspace.price_per_day * days);
    }
  }, [startDate, endDate]);

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
  if (workspace.name) {
    return (
      <div className='flex flex-col md:flex-row gap-8 mt-4 justify-around items-center w-full'>
        {workspace.image_url ? (
          <div
            className='h-52 w-52 md:h-96 md:w-96 bg-cover bg-center rounded-lg'
            style={{ backgroundImage: `url(${workspace.image_url})` }}
          />
        ) : (
          <img className='h-52 md:h-96' alt='not provided' src={noImage} />
        )}
        <div className='flex flex-col justify-center items-center gap-8'>
          <div className='flex flex-col gap-4 w-full'>
            {success && <p>{success}</p>}
            {fail && <p key={uuidv4()}>{fail}</p>}
            <h2 className='text-2xl font-bold'>Workspace</h2>
            <p>{workspace?.name} is available</p>
            <p>{workspace?.description}</p>
            <p>Price: ${workspace?.price_per_day}/day</p>
          </div>
          <form
            className='flex flex-col gap-4 w-full'
            ref={formRef}
            onSubmit={(e) => handleReserve(e)}
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
            <p>Cost of Reservation: ${cost ? cost : 0}</p>
            {isAuthenticated ? (
              <button className='p-4 rounded-full bg-green-500' type='submit'>
                <i className='fa-solid fa-gear' /> Reserve {workspace.name}{' '}
                <i className='fa-solid fa-chevron-right' />
              </button>
            ) : (
              <p>Please sign in to reserve this room.</p>
            )}
          </form>
        </div>
      </div>
    );
  }

  return <p>We couldn&apos;t find details about this room.</p>;
};

export default WorkspaceDetailsPage;

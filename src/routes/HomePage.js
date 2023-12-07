import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWorkspaces } from '../redux/workspaces/workspacesSlice';
import Workspaces from '../components/Workspaces';

const HomePage = () => {
  const { username, token, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkspaces(token));
  }, [dispatch, token]);

  return (
    <div className='flex flex-col gap-8 w-full'>
      {isAuthenticated && (
        <div>
          <p>
            Welcome,
            {' '}
            { username }
            !
          </p>
        </div>
      )}
      <Workspaces />
    </div>
  );
};

export default HomePage;

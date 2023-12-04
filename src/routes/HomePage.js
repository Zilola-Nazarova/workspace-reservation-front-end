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
    <>
      <h1>This is the homepage and it is Workspaces</h1>

      {/* Check if user is authenticated and display user info */}
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
    </>
  );
};

export default HomePage;

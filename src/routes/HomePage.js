import React from 'react';
import { useSelector } from 'react-redux';
import Workspaces from '../components/Workspaces';

const HomePage = () => {
  // Use token and isAuthenticated from the Redux store
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  // Use user info from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <h1>This is the homepage and it is Workspaces</h1>

      {/* Check if user is authenticated and display user info */}
      {isAuthenticated && (
        <div>
          <p>
            Welcome,
            {user && user.username}
            !
          </p>
          <p>
            Your token:
            {token}
          </p>
        </div>
      )}

      <Workspaces />
    </>
  );
};

export default HomePage;

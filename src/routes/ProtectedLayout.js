import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// import SignInPage from './SignInPage';

const ProtectedLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign_in" />;

  // We can also render a custom message alongside with the SignInPage.
  // Replace <Navigate to="/sign_in" /> with this:
  // : (
  //   <>
  //     <p>You need to sign in to access this page</p>
  //     <SignInPage />
  //   </>
  // );
};

export default ProtectedLayout;

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { clearToken } from '../redux/auth/authSlice';

import styles from '../styles/SignOutPage.module.css';

const SignOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [goodbyeMessage, setGoodbyeMessage] = useState('');

  useEffect(() => {
    // Set token to null in the Redux store
    dispatch(clearToken());
    // Remove token from Cookies
    Cookies.remove('token', { path: '' });
    Cookies.remove('username', { path: '' });

    // Show a goodbye message
    setGoodbyeMessage('Goodbye! Redirecting to the home page in some seconds...');

    // Redirect to the home page after 1 minute
    const redirectTimeout = setTimeout(() => {
      navigate('/');
    }, 30000);

    // Clear the timeout to avoid redirection if the component unmounts
    return () => clearTimeout(redirectTimeout);
  }, [dispatch, navigate]);

  return (
    <div className={styles.page}>
      <h1>Logout is Complete...</h1>
      <p>{goodbyeMessage}</p>
    </div>
  );
};

export default SignOutPage;

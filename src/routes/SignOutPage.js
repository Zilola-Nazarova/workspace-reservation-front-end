import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { clearToken } from '../redux/auth/authSlice';

const SignOutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [goodbyeMessage, setGoodbyeMessage] = useState('');

  useEffect(() => {
    dispatch(clearToken());
    Cookies.remove('token', { path: '' });
    Cookies.remove('username', { path: '' });

    setGoodbyeMessage(
      'Goodbye! Redirecting to the home page in some seconds...',
    );

    const redirectTimeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(redirectTimeout);
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <h1 className="text-3xl font-bold">Logout is Complete...</h1>
      <p className="text-lg">{goodbyeMessage}</p>
    </div>
  );
};

export default SignOutPage;

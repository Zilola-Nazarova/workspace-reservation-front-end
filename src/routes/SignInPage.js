import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styles from '../styles/SignInPage.module.css';
import { setToken } from '../redux/auth/authSlice';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/sessions', {
        username,
      });
      if (response.status === 200) {
        // Save the token in redux store
        dispatch(setToken(response.data.user.authentication_token));

        // Guys you can use useSelector to get the
        // token from the store and isAuthenicated
        // from the store to use it for conditional rendering.

        // Save the user in local storage
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // you can use this to get the user from
        // local storage like his id or username. I hope Everything is clear now.

        setSuccessMessage(`User with username "${username}" successfully signed in. Redirecting to home page...`);
        setUsername('');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 5000);
      } else {
        // Handle other status codes if needed
        setErrorMessage(`Sign-in failed with status: ${response.status}`);
      }
    } catch (error) {
      setErrorMessage(`Sign-in failed: ${error.message}`);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Sign In</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <label htmlFor="username">
        Username:
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleSignIn}>Sign In</button>
    </div>
  );
};

export default SignInPage;

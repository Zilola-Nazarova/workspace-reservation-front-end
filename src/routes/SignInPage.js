import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/SignInPage.module.css';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // Perform your authentication logic here
      // For simplicity, let's assume a successful sign-in
      // You may want to include actual authentication logic and error handling
      // This example assumes a success and navigates to the home page
      // Adjust this based on your authentication mechanism
      const response = await axios.post('http://localhost:3000/api/v1/sessions', {
        username,
      });
      if (response.status === 200) {
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

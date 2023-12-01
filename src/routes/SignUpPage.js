import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/SignUpPage.module.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/registrations', {
        username,
      });

      if (response.status === 201) {
        setSuccessMessage(`User with username "${username}" successfully registered. Redirecting to sign in page...`);
        setUsername('');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/sign_in');
        }, 5000);
      } else {
        // Handle other status codes if needed
        setErrorMessage(`Registration failed with status: ${response.status}`);
      }
    } catch (error) {
      setErrorMessage(`Registration failed: ${error.message}`);
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Sign Up</h1>
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
      <button type="button" onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpPage;

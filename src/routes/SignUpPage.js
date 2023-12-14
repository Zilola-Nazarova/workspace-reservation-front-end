import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:3000/api/v1/registrations',
        {
          username,
        },
      );

      if (response.status === 201) {
        setSuccessMessage(
          `User with username "${username}" successfully registered. Redirecting to sign in page...`,
        );
        setUsername('');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/sign_in');
        }, 5000);
      } else {
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
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <label htmlFor="username" className="flex flex-col gap-4">
        Username:
        <input
          className="p-2 rounded-md border border-gray-300"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <button
        className="bg-green-500 py-2 px-4 rounded-md hover:bg-green-600"
        type="button"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUpPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import styles from "../styles/SignInPage.module.css";
import { setToken } from "../redux/auth/authSlice";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/sessions",
        {
          username,
        }
      );
      if (response.status === 200) {
        // Save the token in redux store
        dispatch(setToken(response.data));

        // Save the token in Cookies
        Cookies.set("token", response.data.token, { expires: 7, secure: true });
        Cookies.set("username", response.data.username, {
          expires: 7,
          secure: true,
        });

        setSuccessMessage(
          `User with username "${username}" successfully signed in. Redirecting to home page...`
        );
        setUsername("");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 5000);
      } else {
        // Handle other status codes if needed
        setErrorMessage(`Sign-in failed with status: ${response.status}`);
      }
    } catch (error) {
      setErrorMessage(`Sign-in failed: ${error.message}`);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full">
      <h1 className="text-3xl font-bold">Sign In</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <label htmlFor="username" className="text-lg font-semibold">
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
        onClick={handleSignIn}
      >
        Sign In
      </button>
    </div>
  );
};

export default SignInPage;

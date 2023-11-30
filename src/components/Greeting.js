import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Greeting.module.css';

const Greeting = () => {
  const { message, isLoading, error } = useSelector((store) => store.greetings);

  if (isLoading) {
    return (
      <div>Loading......</div>
    );
  }
  if (error) {
    return (
      <p>
        Something went wrong!
        <br />
        { error }
      </p>
    );
  }
  if (message) {
    return (
      <div className={styles.page}>
        <p>{ message }</p>
      </div>
    );
  }
  return <p>No messages found.</p>;
};

export default Greeting;

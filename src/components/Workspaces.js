// import { useSelector } from 'react-redux';
// import { useState } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from '../styles/Workspaces.module.css';
import noImage from '../assets/no-image.png';

const Workspaces = () => {
  const { workspaces, isLoading, error } = useSelector((store) => store.workspaces);

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
  if (workspaces) {
    return (
      <div className={styles.page}>
        <h1>Workspaces go here</h1>

        <ul className={styles.list}>
          {workspaces.map((space) => (
            <li
              key={space.ID}
              className={styles.space_card}
            >
              <Link to={`workspaces/${space.ID}`}>
                <div className={styles.image_url}>
                  {(space.image_url)
                    ? <img alt={`${space.name}`} src={space.image_url} />
                    : <img alt="not provided" src={noImage} />}
                </div>
                <div className={styles.space_info}>
                  <h2 className={space.name}>{space.name}</h2>
                  <p className={space.description}>{space.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return <p>No workspaces found.</p>;
};

export default Workspaces;

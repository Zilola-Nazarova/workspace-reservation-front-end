import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from '../styles/Header.module.css';

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className={styles.header}>
      <p>This is header</p>
      <nav className={styles.navigation}>
        <ul>
          <li className={styles.link}>
            <NavLink to="/">
              workspaces
            </NavLink>
          </li>

          { isAuthenticated && (
            <>
              <li className={styles.link}>
                <NavLink to="/reservations">
                  my reservations
                </NavLink>
              </li>
              <li className={styles.link}>
                <NavLink to="/new_reservation">
                  reserve
                </NavLink>
              </li>
              <li className={styles.link}>
                <NavLink to="/add_workspace">
                  add workspace
                </NavLink>
              </li>
              <li className={styles.link}>
                <NavLink to="/remove_workspace">
                  delete workspace
                </NavLink>
              </li>
            </>
          )}
          {
            isAuthenticated
              ? (
                <li className={styles.link}>
                  <NavLink to="/sign_out">
                    log out
                  </NavLink>
                </li>
              )
              : (
                <>
                  <li className={styles.link}>
                    <NavLink to="/sign_in">
                      log in
                    </NavLink>
                  </li>
                  <li className={styles.link}>
                    <NavLink to="/sign_up">
                      sing up
                    </NavLink>
                  </li>
                </>
              )
            }
        </ul>
      </nav>
    </header>
  );
};

export default Header;

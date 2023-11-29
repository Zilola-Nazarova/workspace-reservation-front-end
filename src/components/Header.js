import { NavLink } from 'react-router-dom';
import styles from '../styles/Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <p>This is header</p>
    <nav className={styles.navigation}>
      <ul>
        <li className={styles.link}>
          <NavLink to="/greeting">
            Greeting
          </NavLink>
        </li>
        <li className={styles.link}>
          <NavLink to="/page1">
            Page 1
          </NavLink>
        </li>
        <li className={styles.link}>
          <NavLink to="/page2">
            Page 2
          </NavLink>
        </li>
        <li className={styles.link}>
          <NavLink to="/page3">
            Page 3
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;

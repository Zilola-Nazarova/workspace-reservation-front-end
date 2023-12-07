import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// import styles from '../styles/Header.module.css';

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className=" h-full flex flex-col justify-between bg-slate-500">
      <div className="">
        <NavLink to="/">
          <h1>APP NAME</h1>
        </NavLink>
      </div>
      <ul className="flex flex-col gap-8">
        <li className="navbar-item">
          <NavLink to="/">workspaces</NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li className="navbar-item">
              <NavLink to="/reservations">my reservations</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/new_reservation">reserve</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/add_workspace">add workspace</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/remove_workspace">delete workspace</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/sign_out">log out</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <NavLink to="/sign_in">log in</NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/sign_up">sing up</NavLink>
            </li>
          </>
        )}
      </ul>
      <span></span>
    </header>
  );
};

export default Header;

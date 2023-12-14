import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import logo from '../assets/logo.png';

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="h-full flex flex-col justify-between">
      <div className="">
        <NavLink className="text-2xl font-bold" to="/">
          <img src={logo} alt="logo" className="md:block md:w-3/4 md:m-auto hidden" />
          <h1>Workspaced</h1>
        </NavLink>
      </div>
      <ul className="flex flex-col gap-2 md:gap-8">
        <li className="hover:bg-green-500 p-4 rounded-lg">
          <NavLink className="text-lg" to="/">workspaces</NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li className="hover:bg-green-500 p-4 rounded-lg">
              <NavLink className="text-lg" to="/reservations">my reservations</NavLink>
            </li>
            <li className="hover:bg-green-500 p-4 rounded-lg">
              <NavLink className="text-lg" to="/new_reservation">reserve</NavLink>
            </li>
            <li className="hover:bg-green-500 p-4 rounded-lg">
              <NavLink className="text-lg" to="/add_workspace">add workspace</NavLink>
            </li>
            <li className="hover:bg-green-500 p-4 rounded-lg">
              <NavLink className="text-lg" to="/remove_workspace">delete workspace</NavLink>
            </li>
            <li className="hover:bg-green-500 p-4 rounded-lg">
              <NavLink className="text-lg" to="/sign_out">sign out</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="hover:bg-green-500 p-4 rounded-lg">
              <NavLink className="text-lg" to="/sign_in">sign in</NavLink>
            </li>
            <li className="hover:bg-green-500 p-4 rounded-lg">
              <NavLink className="text-lg" to="/sign_up">sign up</NavLink>
            </li>
          </>
        )}
      </ul>
      <span />
    </header>
  );
};

export default Header;

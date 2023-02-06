import React from "react";
import { NavLink } from "react-router-dom";
import useLoginStore from "../store/login.store";

const Navbar = () => {
  const token = useLoginStore((state) => state.token);
  const user = useLoginStore((state) => state.user);
  const logout = useLoginStore((state) => state.logout);
  return (
    <nav className="bg-slate-100 px-2 py-1 w-full">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <ul className="flex py-1 w-full">
          {!token ? (
            <li>
              <NavLink
                to="login"
                className="block py-1 pl-3 pr-4 text-blue-600 bg-blue-100 rounded"
              >
                Login
              </NavLink>
            </li>
          ) : (
            <li className="flex w-full justify-between">
              <div className="flex">
                <NavLink
                  to="dashboard"
                  className="block py-1 pl-3 pr-4 text-white bg-blue-700 rounded"
                >
                  Dashboard
                </NavLink>
                <span className="ml-2">
                  {user ? `${user.firstname} ${user.lastname}` : null}
                </span>
              </div>
              <button
                onClick={logout}
                className="px-2 border-2 border-blue-500 text-blue-500 rounded-md hover:text-white hover:bg-blue-500"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

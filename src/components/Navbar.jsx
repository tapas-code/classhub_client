import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { isLoggedIn, userRole, userImg } = useAuth();
  const profilePic = userImg !== "" ? userImg : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  return (
    <div className="flex items-center py-4 px-8 bg-purple-800 text-gray-300">
      <Sidebar />
      <NavLink to="/" className="ps-4 font-bold text-xl">
        Classhub
      </NavLink>

      <div className="flex gap-6 flex-1 justify-end pe-6 items-center font-semibold">
        <NavLink to="/home" className="hover:text-white">
          Home
        </NavLink>
        <NavLink to="/about" className="hover:text-white">
          About
        </NavLink>
        <NavLink to="/contact" className="hover:text-white">
          Contact
        </NavLink>
        <NavLink
          to={`/${userRole}`}
          className={`hover:text-white ${!isLoggedIn ? "hidden" : ""}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/logout"
          className={`hover:text-white ${!isLoggedIn ? "hidden" : ""}`}
        >
          Logout
        </NavLink>
        <NavLink
          to="/login"
          className={`hover:text-white ${isLoggedIn ? "hidden" : ""}`}
        >
          Login
        </NavLink>
      </div>

      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} /> 
        </div>
      </div>
    </div>
  );
};

export default Navbar;

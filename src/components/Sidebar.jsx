import React from "react";
import { AlignJustify } from "lucide-react";
import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { userRole } = useAuth();

  const defaultLinks = (
    <>
      <li>
        <NavLink to='/profile'>Profile</NavLink>
      </li>
      <li>
        <NavLink to='/about'>About</NavLink>
      </li>
    </>
  );

  const principalLinks = (
    <>
      <li>
        <NavLink to='/principal/teacher'>Teacher</NavLink>
      </li>
      <li>
        <NavLink to='/principal/student'>Student</NavLink>
      </li>
      <li>
        <NavLink to='/principal/classroom'>Classroom</NavLink>
      </li>
    </>
  );

  const teacherLinks = (
    <>
      <li>
        <NavLink to='/teacher/student'>Student</NavLink>
      </li>
      <li>
        <NavLink to='/teacher/timetable'>Timetable</NavLink>
      </li>
    </>
  );

  const studentLinks = (
    <>
      <li>
        <NavLink to='/student/classmates'>Classmates</NavLink>
      </li>
      <li>
        <NavLink to='/student/timetable'>Timetable</NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer drawer-auto-gutter w-auto">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="hover:cursor-pointer hover:text-white drawer-button"
        >
          <AlignJustify />
        </label>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {userRole === "Principal" && principalLinks}
          {userRole === "Teacher" && teacherLinks}
          {userRole === "Student" && studentLinks}
          {defaultLinks}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

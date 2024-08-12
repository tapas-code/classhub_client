import React from "react";
import HeroImg from "../assets/hero.jpeg";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, userRole } = useAuth();
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (isLoggedIn) {
      navigate(`/${userRole}`);
    } else navigate("/login");
  };
  
  return (
    <div className="hero bg-base-200 flex-1">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={HeroImg} className="max-w-sm rounded-lg shadow-2xl " />
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-bold">
            Classhub - Classroom Management!
          </h1>
          <p className="py-6">
            A classroom management system, offering role-specific dashboards for
            Principals, Teachers, and Students. Key features include user
            management, classroom assignments, and timetable viewing.
          </p>
          <button className="btn btn-primary" onClick={handleRedirect}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { BASE_URL } from "../services/helper";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {saveTokenLS} = useAuth();
  const base_url = BASE_URL;

  const handleChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${base_url}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      if (response.ok) {
        const res = await response.json();
        setUserLogin({ email: "", password: "" });
        navigate("/");
        console.log("User successfully logged in.");
        saveTokenLS(res.token, res.user.role, res.user.userImg);

        switch (res.user.role) {
          case "Principal":
            navigate("/principal");
            break;
          case "Teacher":
            navigate("/teacher");
            break;
          case "Student":
            navigate("/student");
            break;
          default:
            navigate("/");
        }
        
      } else {
        console.log("Invalid Login Credentials.");
      }
    } catch (err) {
      console.error("Error occured while user login: ", err);
    }
  };

  return (
    <div className="hero bg-base-200 flex-1">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                value={userLogin.email}
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={userLogin.password}
                name="password"
                onChange={handleChange}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

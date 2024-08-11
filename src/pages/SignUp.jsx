import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { BASE_URL } from "../services/helper";

const SignUp = ({role}) => {
  const [userSignUp, setUserSignUp] = useState({
    username: "",
    email: "",
    userImg: "",
    password: "",
    role: role,
  });
  const navigate = useNavigate();
  const { token, userRole } = useAuth();
  const base_url = BASE_URL;

  const handleChange = (e) => {
    setUserSignUp({ ...userSignUp, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${base_url}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userSignUp),
      });

      if (response.ok) {
        setUserSignUp({
          username: "",
          email: "",
          userImg: "",
          password: "",
          role: role,
        });
        console.log("User Successfully registered.");
        navigate(`/${userRole}/${role}`);
      }
    } catch (err) {
      console.error("Error occurred while user Sign Up: ", err);
    }
  };

  return (
    <div className="hero bg-base-200 flex-1">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="flex gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  required
                  name="username"
                  value={userSignUp.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Image</span>
                </label>
                <input
                  type="text"
                  placeholder="User Img Url"
                  className="input input-bordered"
                  required
                  name="userImg"
                  value={userSignUp.userImg}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  name="email"
                  value={userSignUp.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <input
                  type="role"
                  placeholder="role"
                  className="input input-bordered"
                  required
                  name="role"
                  value={userSignUp.role}
                  onChange={handleChange}
                  disabled
                />
              </div>
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
                name="password"
                value={userSignUp.password}
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

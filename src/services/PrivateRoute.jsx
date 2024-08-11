import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, userRole } = useAuth();

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, userRole } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/home" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default PrivateRoute;

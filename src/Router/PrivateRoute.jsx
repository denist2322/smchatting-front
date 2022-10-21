import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const access = localStorage.getItem("Token");
  return access ? Component : <Navigate to="/" />;
};

export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import Home from "./principal";

const PrivateRoute = ({ children }) => {
  const rol = localStorage.getItem("role");
  if (rol === "ADMIN") {
    return children;
  } else {
    return <Navigate to="/" element={<Home />} />;
  }
};

export default PrivateRoute;

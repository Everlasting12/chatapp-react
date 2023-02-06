import React from "react";
import { Navigate } from "react-router-dom";
import useLoginStore from "./store/login.store";

const ProtectedRoute = ({ children }) => {
  const token = useLoginStore((state) => state.token);
  if (token) {
    return children;
  }

  // return <Navigate to={"/"} />;
  return <Navigate to={"/login"} />;
};

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../Helper";

const PrivateRoute = ({ children }: any) => {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

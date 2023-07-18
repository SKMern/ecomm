import React from "react";
import { Navigate } from "react-router";
import { getLocalAccessToken } from "../../Api";

const PrivateRoute = ({ children }: any) => {
  const auth = getLocalAccessToken();
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

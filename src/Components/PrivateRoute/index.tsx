import React from "react";
import { Route, Navigate, useLocation, Routes } from "react-router-dom";
import { Pages } from "../../Types";

const PrivateRoute = ({
  component: Component,
  path,
  isAuthenticated,
  ...rest
}: Pages) => {
  const location = useLocation();
  const forwardPath = location.pathname === "/" ? "" : `?${location.pathname}`;

  if (!isAuthenticated) return <Navigate to={`/login${forwardPath}`} />;
  console.log("private", isAuthenticated);
  return (
    <Routes>
      <Route path={path} element={Component} {...rest} />
    </Routes>
  );
};

export default PrivateRoute;

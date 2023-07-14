import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { Routes as Pages } from "../src/Routes";
import PrivateRoute from "./Components/PrivateRoute";
import { useAppSelector } from "./Components/Hooks";

function App() {
  const isLoggedIn = useAppSelector((state) => state.Authentication.isLoggedIn);
  console.log("app", isLoggedIn, localStorage.getItem("accessToken"));
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {Pages.map((it, i) => {
          return (
            <Route
              path={it.path}
              key={i}
              element={
                it.isAuthenticated ? (
                  <PrivateRoute
                    path={it.path}
                    component={it.component}
                    isAuthenticated={isLoggedIn}
                  />
                ) : (
                  it.component
                )
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import { Routes as Pages } from "../src/Routes";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
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
                  <PrivateRoute>{it.component}</PrivateRoute>
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

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Routes as Pages } from "../src/Routes";
import PrivateRoute from "./Components/PrivateRoute";
import Layout from "./Components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
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
      </Layout>
    </BrowserRouter>
  );
}

export default App;

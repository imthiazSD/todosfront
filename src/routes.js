import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Notes from "./components/Notes/Notes";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register/Register";

const Root = () => {
  return (
    <Routes>
      <Route path="/notes" element={<Notes />} />
    </Routes>
  );
};

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<PrivateRoute element={<Root />} />} />
    </Routes>
  </Router>
);

export default AppRoutes;

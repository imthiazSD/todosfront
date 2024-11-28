import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { auth } = useContext(AuthContext);

  const isAuthenticated = auth.token || localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("token", auth.token);
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [auth.token, navigate]);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

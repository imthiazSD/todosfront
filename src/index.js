import React from "react";
import ReactDOM from "react-dom/client";
import AuthProvider from "./context/AuthContext";
import "./index.css";
import Routes from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>
);

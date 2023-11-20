import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_KEY}>

    <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    </HashRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

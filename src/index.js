import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {createTheme,ThemeProvider} from '@mui/material/styles'

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  palette: {
    primary: {
      main: "#FA6849",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2E2E38",
    },
  },
});
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_KEY}>

    <HashRouter>
    <AuthProvider>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </AuthProvider>
    </HashRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

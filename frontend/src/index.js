import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MessageContextProvider } from "./context/MessageContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MessageContextProvider>
        <App />
      </MessageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

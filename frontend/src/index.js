import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MessageContextProvider } from "./context/MessageContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ReadMessageContextProvider } from "./context/ReadMessageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MessageContextProvider>
        <ReadMessageContextProvider>
          <App />
        </ReadMessageContextProvider>
      </MessageContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

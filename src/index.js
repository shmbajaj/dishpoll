import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider, DishesProvider } from "context";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <DishesProvider>
        <App />
      </DishesProvider>
    </UserProvider>
  </React.StrictMode>
);

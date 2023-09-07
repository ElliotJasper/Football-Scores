import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/Login";
import App from "./App";
import Success2 from "./components/Success2";
import Failure from "./components/Failure";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/confirm",
    element: <Success2 />,
  },
  {
    path: "/failure",
    element: <Failure />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/dashboard", element: <Dashboard /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

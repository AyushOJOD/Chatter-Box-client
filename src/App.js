import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chat />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/setAvatar",
    element: <SetAvatar />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

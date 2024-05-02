import "./App.css";
import HomePage from "./router/Main/page.jsx";
import Login from "./router/Login/page.jsx";
import Register from "./router/Register/page.jsx";
import Dashboard from "./router/Dashboard/page.jsx";
import ProfilePage from "./router/profilepage/page.jsx";

import { Layout, RequireAuth } from "./router/layouts/layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { postLoader } from "./lib/loaders.js";
import ProfileUpdatePage from "./router/profileUpdate/page.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <RequireAuth />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
          loader: postLoader,
        },

        {
          path: "/dashboard/profilePage",
          element: <ProfilePage />,
          loader: postLoader,
        },
        {
          path: "/dashboard/profilePage/profileUpdate",
          element: <ProfileUpdatePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

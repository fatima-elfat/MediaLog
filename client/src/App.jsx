import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import HomePage from "./routes/homePage/homePage";
import Login from "./routes/login/login";
import Register from "./routes/register/register";
import DashBoard from "./routes/dashBoard/dashBoard";
import { Layout } from "./routes/layout/layout";

/**
 * Main App component that sets up routing for the MediaLog application.
 * 
 * Routes:
 * - /: Homepage with media consumption tracker introduction
 * - /login: User authentication page
 * - /register: User registration page
 * - /dashboard: Main dashboard for tracking media consumption
 * 
 * All routes are wrapped in a Layout component that provides consistent
 * navigation and structure across the application.
 * 
 * @returns {JSX.Element} The main App component with routing configuration
 */
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "dashboard",
          element: <DashBoard />
        },
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;


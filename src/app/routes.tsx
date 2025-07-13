import { lazy } from "react";
import { createBrowserRouter } from "react-router";
import AuthLayout from "@shared/layouts/auth";
import MainLayout from "@shared/layouts/main";
import { APP_ROUTES } from "./constant";

// global
const NotFound = lazy(() => import("./error-404"));

// auth
const Login = lazy(() => import("../modules/auth/view/login"));
const Register = lazy(() => import("../modules/auth/view/register"));
const ForgotPassword = lazy(() => import("../modules/auth/view/forgot-password"));

// main
const Dashboard = lazy(() => import("../modules/dashboard/view"));

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: APP_ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: APP_ROUTES.REGISTER,
        element: <Register />,
      },
      {
        path: APP_ROUTES.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: APP_ROUTES.ROOT,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: APP_ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
]);

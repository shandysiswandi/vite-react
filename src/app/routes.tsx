import loadable from "@loadable/component";
import { createBrowserRouter } from "react-router";
import { Loading } from "@/shared/components/loading";
import AuthLayout from "@/shared/layouts/auth";
import MainLayout from "@/shared/layouts/main";
import { APP_ROUTES } from "./constant";

// global
const NotFound = loadable(() => import("@/shared/pages/error-404"), { fallback: <Loading /> });

// auth
const Login = loadable(() => import("@/modules/auth/view/login"), { fallback: <Loading /> });
const Register = loadable(() => import("@/modules/auth/view/register"), { fallback: <Loading /> });
const ForgotPassword = loadable(() => import("@/modules/auth/view/forgot-password"), {
  fallback: <Loading />,
});

// main
const Dashboard = loadable(() => import("@/modules/dashboard/view"), { fallback: <Loading /> });

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

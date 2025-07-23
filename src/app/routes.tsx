import { type ComponentType, type ReactNode, lazy } from "react";
import { KeyRound, LayoutDashboard, LogIn, type LucideIcon, UserPlus } from "lucide-react";
import AuthLayout from "@shared/layouts/auth";
import MainLayout from "@shared/layouts/main";
import { APP_ROUTES } from "./constant";

// --- Lazy-loaded Page Components ---
const NotFound = lazy(() => import("./error-404"));
const Login = lazy(() => import("../modules/auth/view/login"));
const Register = lazy(() => import("../modules/auth/view/register"));
const ForgotPassword = lazy(() => import("../modules/auth/view/forgot-password"));
const Dashboard = lazy(() => import("../modules/dashboard/view"));

// --- Type Definitions ---
export interface RouteType {
  title: string;
  path: string;
  element: ComponentType;
  icon?: LucideIcon;
  isHidden?: boolean; // To hide from navigation menus
  children?: RouteType[];
}

export interface RouteLayoutType {
  layout: ComponentType<{ children: ReactNode }>;
  routes: RouteType[];
}

// --- Route Definitions ---

/**
 * Routes accessible to unauthenticated users.
 * These are typically wrapped in the AuthLayout.
 */
export const authRoutes: RouteType[] = [
  {
    title: "Login",
    path: APP_ROUTES.LOGIN,
    element: Login,
    icon: LogIn,
  },
  {
    title: "Register",
    path: APP_ROUTES.REGISTER,
    element: Register,
    icon: UserPlus,
  },
  {
    title: "Forgot Password",
    path: APP_ROUTES.FORGOT_PASSWORD,
    element: ForgotPassword,
    icon: KeyRound,
  },
];

/**
 * Routes accessible only to authenticated users.
 * These are typically wrapped in the MainLayout.
 */
export const protectedRoutes: RouteType[] = [
  {
    title: "Dashboard",
    path: APP_ROUTES.ROOT,
    element: Dashboard,
    icon: LayoutDashboard,
  },
  // Add other protected routes for your application here
  // e.g., { title: "Settings", path: "/settings", element: Settings, icon: SettingsIcon }
];

/**
 * Publicly accessible routes that don't require a specific layout.
 */
export const publicRoutes: RouteType[] = [
  {
    title: "Not Found",
    path: APP_ROUTES.NOT_FOUND,
    element: NotFound,
    isHidden: true,
  },
];

/**
 * The final routing structure that combines all route types with their layouts.
 * This is consumed by the main App component to generate React Router routes.
 */
export const routes: RouteLayoutType[] = [
  {
    layout: AuthLayout,
    routes: authRoutes,
  },
  {
    layout: MainLayout,
    routes: protectedRoutes,
  },
];

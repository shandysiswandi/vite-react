import { APP_ROUTES } from "@app/constant";
import { Navigate, Outlet } from "react-router";
import { Loading } from "@shared/components/loading";
import { useAuthStore } from "@shared/stores/auth";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to={APP_ROUTES.LOGIN} replace />;
}

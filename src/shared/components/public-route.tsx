import { Navigate, Outlet } from "react-router";
import { APP_ROUTES } from "@/app/constant";
import { Loading } from "@/shared/components/loading";
import { useAuthStore } from "@/shared/stores/auth";

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.root} replace />;
  }

  return <Outlet />;
}

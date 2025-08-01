import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Loading } from "@/shared/components/loading";
import { ProtectedRoute } from "@/shared/components/protected-route";
import { PublicRoute } from "@/shared/components/public-route";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { Toaster } from "@/shared/components/ui/sonner";
import AuthLayout from "@/shared/layouts/auth";
import MainLayout from "@/shared/layouts/main";
import { useAuthStore } from "@/shared/stores/auth";
import { ErrorBoundary } from "./error-500";
import { authRoutes, protectedRoutes, publicRoutes } from "./routes";

export default function App() {
  const { setLoading } = useAuthStore();

  useEffect(() => {
    // When the app mounts, the persist middleware has already rehydrated the auth state from cookies.
    // We can now safely set isLoading to false to allow the ProtectedRoute to render.
    setLoading(false);
  }, [setLoading]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="app-ui-theme">
      <Toaster position="top-center" richColors />

      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              {/* Routes with AuthLayout */}
              <Route element={<PublicRoute />}>
                <Route element={<AuthLayout />}>
                  {authRoutes.map(({ path, element: Element, title }) => (
                    <Route key={title} path={path} element={<Element />} />
                  ))}
                </Route>
              </Route>

              {/* Routes with MainLayout (Protected) */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  {protectedRoutes.map(({ path, element: Element, title }) => (
                    <Route key={title} path={path} element={<Element />} />
                  ))}
                </Route>
              </Route>

              {/* Public routes that don't need a layout */}
              {publicRoutes.map(({ path, element: Element, title }) => (
                <Route key={title} path={path} element={<Element />} />
              ))}
            </Routes>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

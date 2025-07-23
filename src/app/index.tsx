import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Loading } from "@shared/components/loading";
import { ProtectedRoute } from "@shared/components/protected-route";
import { ThemeProvider } from "@shared/components/theme-provider";
import { Toaster } from "@shared/components/ui/sonner";
import AuthLayout from "@shared/layouts/auth";
import MainLayout from "@shared/layouts/main";
import { ErrorBoundary } from "./error-500";
import { authRoutes, protectedRoutes, publicRoutes } from "./routes";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-ui-theme">
      <Toaster position="top-center" richColors />

      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              {/* Routes with AuthLayout */}
              <Route element={<AuthLayout />}>
                {authRoutes.map(({ path, element: Element, title }) => (
                  <Route key={title} path={path} element={<Element />} />
                ))}
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

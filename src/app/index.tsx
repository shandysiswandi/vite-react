import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { Loading } from "@shared/components/loading";
import { ThemeProvider } from "@shared/components/theme-provider";
import { Toaster } from "@shared/components/ui/sonner";
import { router } from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

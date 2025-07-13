import { RouterProvider } from "react-router";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { Toaster } from "@/shared/components/ui/sonner";
import { router } from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <Toaster position="top-center" richColors />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

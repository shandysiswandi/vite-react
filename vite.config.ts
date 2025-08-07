import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { configDefaults, defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5171,
  },
  preview: {
    port: 5171,
  },

  // https://vitest.dev/config/
  test: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    globals: false,
    environment: "node",
    exclude: [...configDefaults.exclude, "e2e/*"],
    reporters: "verbose",
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ["html"], // ["text", "html"]
      exclude: [
        "src/shared/components/ui/**", // 👈 Ignore shadcn components
        ...(configDefaults.coverage?.exclude || []),
      ],
      include: ["src/shared", "src/modules"],
    },
  },
});

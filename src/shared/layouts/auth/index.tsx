import { APP_NAME } from "@app/constant";
import { GalleryVerticalEnd } from "lucide-react";
import { Link, Outlet } from "react-router";
import { ModeToggle } from "@shared/components/mode-toggle";
import { useTheme } from "@shared/components/theme-provider";
import { isDarkMode } from "@shared/lib/utils";

export default function AuthLayout() {
  const isDark = isDarkMode(useTheme().theme);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex gap-2 justify-between">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            {APP_NAME}
          </Link>

          <ModeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <img
          src={isDark ? "auth-dark.svg" : "auth.svg"}
          alt="Image"
          className="absolute h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

import { GalleryVerticalEnd } from "lucide-react";
import { Link, Outlet } from "react-router";
import { APP_NAME } from "@/app/constant";
import { ModeToggle } from "@/shared/components/mode-toggle";
import { useTheme } from "@/shared/components/theme-provider";
import { isDarkMode } from "@/shared/lib/utils";

export default function AuthLayout() {
  const isDark = isDarkMode(useTheme().theme);

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
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

      <div className="bg-muted relative hidden lg:block">
        <img
          src={isDark ? "auth-dark.svg" : "auth.svg"}
          alt="Image"
          className="absolute h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

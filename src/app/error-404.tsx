import { Link } from "react-router";
import { Button } from "@shared/components/ui/button";
import { APP_ROUTES } from "./constant";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center space-y-6 text-center"
      data-testid="not-found-page"
    >
      <h1 className="text-9xl font-extrabold text-gray-900 dark:text-gray-100">404</h1>
      <h2 className="text-3xl font-bold">Page Not Found</h2>

      <p className="text-lg text-muted-foreground max-w-md">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      <Button asChild>
        <Link to={APP_ROUTES.ROOT}>Go Back Home</Link>
      </Button>
    </div>
  );
}

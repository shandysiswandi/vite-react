import { Link } from "react-router";
import { Button } from "@shared/components/ui/button";
import { APP_ROUTES } from "./constant";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 text-center">
      <h1 className="text-9xl font-extrabold">404</h1>

      <p className="text-lg text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>

      <Button asChild>
        <Link to={APP_ROUTES.ROOT}>Go back home</Link>
      </Button>
    </div>
  );
}

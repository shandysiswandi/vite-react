import { type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { APP_ROUTES } from "@/app/constant";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useAuthStore } from "@/shared/stores/auth";

export default function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onClickGoogle = () => {
    toast.warning("Login with Google is not implement yet.");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Login success");

    login();

    navigate(APP_ROUTES.ROOT, { replace: true });
  };

  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              autoComplete="off"
              defaultValue="admin@admin.com"
              required
            />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href={APP_ROUTES.FORGOT_PASSWORD}
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <Input id="password" type="password" name="password" defaultValue="admin@password" required />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </div>
      </form>

      <div className="flex flex-col gap-6 mt-6">
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">or</span>
        </div>

        <Button variant="outline" className="w-full" onClick={onClickGoogle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 533.5 544.3" className="h-5 w-5 mr-2">
            <path
              fill="#4285F4"
              d="M533.5 278.4c0-17.4-1.4-34.2-4.1-50.4H272v95.4h146.9c-6.3 34-25 62.8-53.6 82.1l86.6 67c50.7-46.7 81.6-115.5 81.6-194.1z"
            />
            <path
              fill="#34A853"
              d="M272 544.3c72.9 0 134-24.1 178.6-65.3l-86.6-67c-24 16.1-54.8 25.5-92 25.5-70.7 0-130.6-47.7-152-111.7l-89.3 68.9c43.8 86.4 133.2 149.6 241.3 149.6z"
            />
            <path
              fill="#FBBC05"
              d="M120 325.8c-10.4-30.6-10.4-63.5 0-94.1l-89.3-68.9c-39.1 77.9-39.1 168.9 0 246.8l89.3-68.8z"
            />
            <path
              fill="#EA4335"
              d="M272 107.7c39.7-.6 77.7 13.7 106.8 39.4l80-80C414.2 23.5 345.2-1.1 272 0 163.9 0 74.5 63.2 30.7 149.6l89.3 68.9C141.4 155.4 201.3 107.7 272 107.7z"
            />
          </svg>
          Login with Google
        </Button>

        <div className="text-center text-sm">
          <span>Don&apos;t have an account? </span>
          <a href={APP_ROUTES.REGISTER} className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

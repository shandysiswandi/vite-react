import { type FormEvent } from "react";
import { APP_ROUTES } from "@app/constant";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";

export default function Page() {
  const onClickGoogle = () => {
    toast.warning("Login with Google is not implement yet.");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Login success");
  };

  return (
    <>
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
          <img src="google.svg" alt="Google icon" className="size-4" />
          Continue with Google
        </Button>

        <div className="text-center text-sm">
          <span>Don&apos;t have an account? </span>
          <Link to={APP_ROUTES.REGISTER} className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}

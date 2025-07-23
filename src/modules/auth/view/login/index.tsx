import { APP_ROUTES } from "@app/constant";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";
import { useLoginViewModel } from "./viewmodel";

/**
 * The Page component now encapsulates its own logic by using the ViewModel hook directly.
 * This makes it a self-contained feature component.
 */
const Page = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
    onClickGoogle,
  } = useLoginViewModel();

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={handleLogin}>
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
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                to={APP_ROUTES.FORGOT_PASSWORD}
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 h-full px-3"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>

      <div className="flex flex-col gap-6 mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" onClick={onClickGoogle} disabled={isLoading}>
          <img src="google.svg" alt="Google icon" className="mr-2 size-4" />
          Continue with Google
        </Button>

        <div className="text-center text-sm">
          <span>Don&apos;t have an account? </span>
          <Link to={APP_ROUTES.REGISTER} className="underline underline-offset-4 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

/**
 * The container component now acts as a simple entry point or layout wrapper
 * for the Login feature, without being concerned with its internal logic.
 */
export default function LoginContainer() {
  return <Page />;
}

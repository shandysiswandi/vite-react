import { type FormEvent } from "react";
import { APP_ROUTES } from "@app/constant";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";
import { Label } from "@shared/components/ui/label";

export default function Page() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Reset instructions success sended");
  };

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Forgot account password</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email below to receive reset instructions
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

          <Button type="submit" className="w-full">
            Send reset instructions
          </Button>
        </div>
      </form>

      <div className="text-center text-sm mt-6">
        <span>Already have an account? </span>
        <Link to={APP_ROUTES.LOGIN} className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </>
  );
}

import { type FormEvent, useState } from "react";
import { APP_ROUTES } from "@app/constant";
import { loginService } from "@modules/auth/service/login";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@shared/stores/auth";

export const useLoginViewModel = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("Secret123!");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginService.login(email, password);
      setToken(response.token);
      toast.success("Login successful! Redirecting...");
      navigate(APP_ROUTES.ROOT);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickGoogle = () => {
    toast.warning("Login with Google is not implemented yet.");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
    onClickGoogle,
  };
};

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { APP_ROUTES } from "@/app/constant";
import { authService } from "@/modules/auth/service/auth";
import { useAuthStore } from "@/shared/stores/auth";
import { type SchemaType, schema } from "./schema";

export const useViewModel = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "admin@admin.com",
      password: "Secret123!",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (fields: SchemaType) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ ...fields });
      setToken(response.accessToken);
      toast.success("Login successful! Redirecting...");
      navigate(APP_ROUTES.root, { replace: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickGoogle = () => {
    toast.warning("Continue with Google is not implemented yet.");
  };

  return {
    form,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
    onClickGoogle,
  };
};

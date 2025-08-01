import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { APP_ROUTES, OTP_EXPIRY } from "@/app/constant";
import { authService } from "@/modules/auth/service/auth";
import { type SchemaType, schema } from "./schema";

export const useViewModel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(OTP_EXPIRY);

  const email = useMemo(() => {
    return location.state?.email || searchParams.get("email");
  }, [location.state, searchParams]);

  const from = location.state?.from;

  useEffect(() => {
    if (!email) {
      toast.error("Unauthorized access. Please start the process again.");
      navigate(APP_ROUTES.login, { replace: true });
    }
  }, [email, navigate]);

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerifyOtp = async (data: SchemaType) => {
    setIsLoading(true);
    try {
      await authService.verifyOTP({ ...data });
      toast.success("Verification successful!");

      if (from === APP_ROUTES.forgotPassword) {
        navigate(APP_ROUTES.resetPassword, { state: { isfromOtp: true } });
      } else {
        navigate(APP_ROUTES.login);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (countdown > 0) return;

    toast.info("A new OTP has been sent to your email.");
    setCountdown(OTP_EXPIRY);
  };

  return {
    form,
    isLoading,
    email: email || "",
    countdown,
    handleVerifyOtp,
    handleResendOtp,
  };
};

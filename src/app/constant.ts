export const APP_NAME: string = "Application";

export const APP_ROUTES = {
  ROOT: "/",
  //
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  OTP: "/otp-verification",
  RESET_PASSWORD: "/reset-password",
  //
  NOT_FOUND: "*",
} as const;

export const OTP_EXPIRY: number = 60;

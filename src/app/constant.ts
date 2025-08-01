export const APP_NAME: string = "Application";

export const APP_ROUTES = {
  root: "/",
  //
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  otp: "/otp-verification",
  resetPassword: "/reset-password",
  //
  me: {
    profile: "/me/profile",
    setting: "/me/settings",
  },
  //
  notFound: "*",
} as const;

export const OTP_EXPIRY: number = 60;

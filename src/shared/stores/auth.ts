import Cookies from "js-cookie";
import { create } from "zustand";

type AuthState = {
  isAuthorized: boolean;
  hydrated: boolean;
  login: () => void;
  logout: () => void;
  loadAuthFromCookie: () => void;
};

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthorized: false,
  hydrated: false,

  login: () => {
    // 15 minutes = 1/96 of a day
    Cookies.set(ACCESS_TOKEN_KEY, "true", { expires: 1 / 96, secure: true, sameSite: "strict" });
    // expires in 7 days
    Cookies.set(REFRESH_TOKEN_KEY, "true", { expires: 7, secure: true, sameSite: "strict" });

    set({ isAuthorized: true });
  },

  logout: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);

    set({ isAuthorized: false });
  },

  loadAuthFromCookie: () => {
    const isAuth = Cookies.get(ACCESS_TOKEN_KEY) === "true";
    set({ isAuthorized: isAuth, hydrated: true });
  },
}));

export const loginService = {
  /**
   * Simulates a login API call.
   * @param email - The user's email.
   * @param password - The user's password.
   * @returns A promise that resolves with a mock user token.
   */
  login: async (email?: string, password?: string): Promise<{ token: string }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === "admin@admin.com" && password === "Secret123!") {
          resolve({ token: "fake-jwt-token-for-admin-user" });
        } else {
          reject(new Error("Invalid email or password. Please try again."));
        }
      }, 1000);
    });
  },
};

const AUTH_KEY = "jotish_auth";

export const isAuthenticated = (): boolean =>
  sessionStorage.getItem(AUTH_KEY) === "true";

export const signIn = (): void => sessionStorage.setItem(AUTH_KEY, "true");

export const signOut = (): void => sessionStorage.removeItem(AUTH_KEY);

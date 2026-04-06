import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AUTH_STORAGE_KEY = "un1_auth";

const readAuthStorage = () => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return { token: null, user: null };
    }

    const parsed = JSON.parse(raw);
    return {
      token: parsed?.token || null,
      user: parsed?.user || null,
    };
  } catch {
    return { token: null, user: null };
  }
};

const persistAuthStorage = (token, user) => {
  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({
      token,
      user,
    }),
  );
};

const clearAuthStorage = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [{ token, user }, setAuthState] = useState(readAuthStorage);
  const [loading, setLoading] = useState(false);

  const applyAuth = useCallback((nextToken, nextUser) => {
    setAuthState({ token: nextToken, user: nextUser });

    if (nextToken && nextUser) {
      persistAuthStorage(nextToken, nextUser);
      return;
    }

    clearAuthStorage();
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      applyAuth(response.token, response.user);
      return response;
    } finally {
      setLoading(false);
    }
  }, [applyAuth]);

  const register = useCallback(async (registerData) => {
    setLoading(true);
    try {
      const response = await authService.register(registerData);
      const userWithName = response.user
        ? {
            ...response.user,
            name: response.user.name || registerData.name || null,
          }
        : null;

      if (response.token && userWithName) {
        applyAuth(response.token, userWithName);
        return {
          ...response,
          user: userWithName,
        };
      }

      return response;
    } finally {
      setLoading(false);
    }
  }, [applyAuth]);

  const logout = useCallback(() => {
    applyAuth(null, null);
  }, [applyAuth]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
    }),
    [loading, token, user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

import React, { useMemo, useCallback } from "react";
import { useAuthMe } from "./auth/me";
import customAxios from "@/services/axios";
import { AuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { User } from "@/types";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: me, isLoading: isMeLoading, refetch } = useAuthMe();

  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        await customAxios.post("/auth/login", {
          email,
          password,
        });

        await refetch();

        toast.success("Login successfully");
        navigate("/");
        return true;
      } catch (err: any) {
        console.error("Login error:", err);
        const errorMessage = err?.response?.data?.message || "Login failed";
        toast.error(errorMessage);
        return false;
      }
    },
    [refetch, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await customAxios.get("/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      toast.success("Successfully logged out");
      window.location.href = "/auth/login";
    }
  }, []);

  const value = useMemo(
    () => ({
      user: me as User,
      login,
      logout,
      isLoading: isMeLoading,
      refetch,
    }),
    [me, isMeLoading, login, logout, refetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

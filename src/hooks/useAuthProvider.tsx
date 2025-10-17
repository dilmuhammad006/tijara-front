import React, { useMemo, useCallback } from "react";
import Cookies from "js-cookie";
import { useAuthMe } from "./auth/me";
import customAxios from "@/services/axios";
import { AuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

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

        // const accessToken = res.data?.data?.token?.accesToken;
        // const refreshToken = res.data?.data?.token?.refreshToken;

        // if (accessToken && refreshToken) {
        //   Cookies.set("accessToken", accessToken, { expires: 1 });
        //   Cookies.set("refreshToken", refreshToken, { expires: 7 });
        //   await refetch();
        //   toast.success("Login successfully");

        //   return true;
        // }
        navigate("/");
        toast.success("Login successfully");
        return false;
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Login error");
        return false;
      }
    },
    [refetch]
  );

  const logout = useCallback(() => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    window.location.href = "/auth/login";
  }, []);

  const value = useMemo(
    () => ({
      user: me || null,
      login,
      logout,
      isLoading: isMeLoading,
      refetch,
    }),
    [me, isMeLoading, login, logout, refetch]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import customAxios from "@/services/axios";
import type { AuthMeInterface } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useAuthMe = () => {
  return useQuery({
    queryKey: ["auth-me"],
    queryFn: async () => {
      const { data } = await customAxios.get<AuthMeInterface>("auth/me");
      return data.data;
    },
  });
};

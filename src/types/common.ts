import type { ReactNode } from "react";
import type { User } from "./api";

export interface ChildrenProps {
  children: ReactNode;
}

export interface AuthContextType {
  user: User
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  refetch: () => void;
}

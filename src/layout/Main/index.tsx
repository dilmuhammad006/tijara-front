import type { ChildrenProps } from "@/types";
import NavbarLayout from "../Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const MainLayout = ({ children }: ChildrenProps) => {
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="flex flex-col">
      <NavbarLayout />
      <div className="container">
        {isLoading ? (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              <p className="text-slate-600">Loading...</p>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default MainLayout;

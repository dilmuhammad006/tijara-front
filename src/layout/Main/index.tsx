import type { ChildrenProps } from "@/types";
import NavbarLayout from "../Navbar";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router";

const MainLayout = ({ children }: ChildrenProps) => {
  const { user } = useAuth();

  if (!user) {
   return  <Navigate to={"/auth/login"} />;
  }
  return (
    <div className="flex flex-col">
      <NavbarLayout />
      <div className="container">{children}</div>
    </div>
  );
};

export default MainLayout;

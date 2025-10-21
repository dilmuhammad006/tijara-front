import type { ChildrenProps } from "@/types";
import NavbarLayout from "../Navbar";
// import { useAuth } from "@/hooks/useAuth";
// import { useNavigate } from "react-router";
// import { useEffect } from "react";

const MainLayout = ({ children }: ChildrenProps) => {
  // const navigate = useNavigate();
  // const { user } = useAuth();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth/login");
  //   }
  // }, [user]);

  return (
    <div className="flex flex-col">
      <NavbarLayout />
      <div className="container">{children}</div>
    </div>
  );
};

export default MainLayout;

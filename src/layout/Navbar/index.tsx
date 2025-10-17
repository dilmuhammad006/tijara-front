import { useAuth } from "@/hooks";
import { NavLink } from "react-router-dom";

const NavbarLayout = () => {
  const { user } = useAuth();

  const activeClass = "text-slate-400"; 

  return (
    <div className="w-full h-[80px] flex items-center bg-slate-600 text-white text-sm">
      <div className="container flex items-center justify-between">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? activeClass : "")}
        >
          Tijara
        </NavLink>

        <div className="flex gap-8">
          <NavLink
            to={"/my/announcements"}
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            My announcements
          </NavLink>
          <NavLink
            to={"/last-seen/announcements"}
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Last seen
          </NavLink>
          <NavLink
            to={"/liked/announcements"}
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Liked announcements
          </NavLink>
          <NavLink
            to={"/new"}
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            New announcement
          </NavLink>
        </div>

        {user ? (
          <NavLink
            to={"/profile"}
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            to={"/auth/login"}
            className={({ isActive }) => (isActive ? activeClass : "")}
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavbarLayout;

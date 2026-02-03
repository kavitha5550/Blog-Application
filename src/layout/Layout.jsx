import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  UserRoundPen,
  CirclePlus,
  Menu,
  X,
} from "lucide-react";
import logo from "../assets/images.png";


const Layout = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex gap-2 items-center px-3 py-2 rounded transition
     ${
       isActive
         ? "text-white bg-gradient-to-r from-amber-700 to-amber-900"
         : "hover:text-white hover:bg-gradient-to-r hover:from-amber-700 hover:to-amber-900"
     }`;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="h-14 bg-white shadow flex items-center justify-between px-6">
      <div className="flex justify-center items-center gap-2">
  <img className="w-10" src={logo} alt="MiniBlog logo" />
  <h1
    className="text-lg font-semibold bg-gradient-to-r
               from-amber-700 to-amber-900
               bg-clip-text text-transparent"
  >
    Mini Blog
  </h1>
</div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar Desktop */}
        <aside className="hidden md:block w-60 bg-gray-100 p-5">
          <ul className="space-y-2">
            <NavLink to="view" className={linkClass}>
              <LayoutDashboard size={18} />
              View
            </NavLink>

            <NavLink to="create" className={linkClass}>
              <CirclePlus size={18} />
              Create Blog
            </NavLink>

            <NavLink to="user" className={linkClass}>
              <UserRoundPen size={18} />
              Profile
            </NavLink>
          </ul>
        </aside>

        {/* Mobile Sidebar */}
        {open && (
          <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
            <aside className="w-64 bg-white h-full p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Menu</h2>
                <button onClick={() => setOpen(false)}>
                  <X />
                </button>
              </div>

              <ul className="space-y-2">
                <NavLink
                  to="view"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  <LayoutDashboard size={18} />
                  View
                </NavLink>

                <NavLink
                  to="create"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  <CirclePlus size={18} />
                  Create Blog
                </NavLink>

                <NavLink
                  to="user"
                  className={linkClass}
                  onClick={() => setOpen(false)}
                >
                  <UserRoundPen size={18} />
                  Profile
                </NavLink>
              </ul>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

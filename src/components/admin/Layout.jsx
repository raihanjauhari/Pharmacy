import Sidebar from "./Sidebar";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="w-full ml-18 md:ml-56">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

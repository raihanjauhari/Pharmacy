import Logo from "../../assets/logo.svg";
import { Link, useLocation } from "react-router-dom";

// ICON
import {
  LucideBox,
  LucideBriefcaseMedical,
  LucidePill,
  HeartHandshake,
} from "lucide-react";
// ICON

import React from "react";

const Sidebar = () => {
  const location = useLocation(); // Ambil path URL saat ini

  const SIDEBAR_LINKS = [
    { id: 1, path: "/dashboard-admin", name: "Dashboard", icon: LucideBox },
    {
      id: 2,
      path: "/dashboard-admin/e-resep",
      name: "EResep",
      icon: LucideBriefcaseMedical,
    },
    { id: 3, path: "/dashboard-admin/obat", name: "Obat", icon: LucidePill },
  ];

  return (
    <div className="w-18 md:w-56 fixed left-0 top-0 z-10 h-screen border-0 bg-[#2A4D69]">
      {/* Logo */}
      <Link to="/dashboard-admin">
        <div className="p-0 m-0 bg-black">
          <button className="flex items-center bg-black w-full h-26 px-4 py-0 rounded-none border-none">
            <img
              src={Logo}
              alt="logo"
              className="w-11 md:w-28"
              style={{ display: "block" }}
            />
            <h3 className="ml-3 hidden md:block text-2xl font-semibold text-white">
              PHARMACY
            </h3>
          </button>
        </div>
      </Link>

      {/* Link Menu */}
      <ul className="mt-6 px-4 space-y-6">
        {SIDEBAR_LINKS.map((link, index) => (
          <li
            key={index}
            className={`font-medium rounded-md py-2 px-5 hover:bg-[#557187] hover:text-white ${
              location.pathname === link.path ? "bg-[#156E80]" : ""
            }`}
          >
            <Link
              to={link.path}
              className="text-white flex justify-center md:justify-start items-center md:space-x-5"
            >
              <span>{React.createElement(link.icon, { size: 20 })}</span>
              <span className="text-sm text-white hidden md:flex">
                {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Help Section */}
      <div className="w-full absolute bottom-5 left-0 px-4 py-2 text-center">
        <a
          href="https://web.whatsapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center md:gap-x-2 text-xs text-[#2A4D69] py-2 px-5 bg-[#E3EBF3] hover:bg-[#E3E3E3] rounded-full font-bold w-fit mx-auto cursor-pointer"
        >
          <HeartHandshake size={24} />
          <span className="hidden md:flex">Butuh Bantuan?</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;

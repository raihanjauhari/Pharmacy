import React from "react";
import Logo from "../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-[#E3EBF3] dark:bg-gray-900 shadow-sm mt-15">
      <div className="max-w-screen-xl mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Logo dan Brand */}
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <a
              href="/dashboard-petugas"
              className="flex items-center space-x-2"
            >
              <img src={Logo} className="h-8" alt="Pharmacy Logo" />
              <span className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                PHARMACY
              </span>
            </a>
          </div>

          {/* Navigasi Footer */}
          <nav aria-label="Footer Navigation">
            <ul className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 font-medium space-x-4 md:space-x-6 hover:text-[#2A4D69]">
              <li>
                <a href="/dashboard-petugas" className="hover:underline">
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/dashboard-petugas/e-resep"
                  className="hover:underline"
                >
                  EResep
                </a>
              </li>
              <li>
                <a href="/dashboard-petugas/obat" className="hover:underline">
                  Obat
                </a>
              </li>
              <li>
                <a
                  href="https://web.whatsapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Bantuan
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <hr className="my-6 border-1 border-[#2A4D69] dark:border-gray-700" />

        {/* Copyright */}
        <p className="text-sm text-[#2A4D69] dark:text-gray-400 text-center">
          © 2025{" "}
          <a
            href="https://github.com/raihanjauhari/Pharmacy"
            target="_blank"
            className="hover:underline hover:text-zinc-500"
          >
            PBL Kelompok 5 | Poliban
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect, useRef } from "react";
import { LucideBell, LucideSearch, LucideX } from "lucide-react";
import Jumbo from "../../assets/jumbo.jpeg";
import NotificationDropdown from "./NotificationDropDown";
import ProfileDropdown from "./ProfileDropDown";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1280);
  const inputRef = useRef(null);
  const notifRef = useRef(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1280);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        event.target.closest("button") === null
      ) {
        setShowSearch(false);
      }
    };

    if (showSearch && !isDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearch, isDesktop]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white flex justify-between items-center p-4 border-b-2 border-t-2 border-[#2A4D69]">
      {/* Search */}
      <div className="flex items-center space-x-5 flex-grow-0 relative">
        {(isDesktop || showSearch) && (
          <div className="relative flex-grow w-full max-w-[calc(100%-3rem)]">
            <LucideSearch
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 ${
                showSearch ? "hidden" : ""
              }`}
              size={20}
            />
            <input
              type="text"
              ref={inputRef}
              placeholder="Pencarian..."
              className="bg-[#E3EBF3] pl-10 pr-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bacc5] w-auto sm:w-[500px] md:w-[500px] lg:w-[500px]"
            />
            <button
              onClick={() => setShowSearch(false)}
              className={`absolute -right-11 top-1/2 transform -translate-y-1/2 ${
                !showSearch ? "hidden" : ""
              }`}
            >
              <LucideX size={20} className="text-gray-500" />
            </button>
          </div>
        )}

        {!isDesktop && !showSearch && (
          <button onClick={() => setShowSearch(true)}>
            <LucideSearch size={28} className="text-gray-600" />
          </button>
        )}
      </div>

      {/* Teks + Notifikasi */}
      <div className="flex items-center space-x-5">
        {!showSearch && (
          <>
            <div className="sm:pl-9">
              <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl text-[#2A4D69] font-semibold">
                Selamat Datang
              </h2>
              <p className="text-base sm:text-lg font-semibold">DON Jumbo</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative" ref={notifRef}>
                <button
                  className="relative text-2xl text-gray-600 notif-bell"
                  onClick={() => setShowNotif((prev) => !prev)}
                >
                  <LucideBell size={26} className="hover:text-indigo-600" />
                  <span className="absolute top-0 right-0 mt-1 mr-4 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-5 rounded-full border-2 border-white">
                    4
                  </span>
                </button>
                {showNotif && (
                  <NotificationDropdown onClose={() => setShowNotif(false)} />
                )}
              </div>

              <div className="relative" ref={profileRef}>
                <button onClick={() => setShowProfileMenu((prev) => !prev)}>
                  <img
                    src={Jumbo}
                    alt="DON Jumbo"
                    className="w-12 h-12 rounded-full border-4 border-indigo-400 contrast-150 hover:contrast-70"
                  />
                </button>
                {showProfileMenu && <ProfileDropdown />}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

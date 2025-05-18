import React, { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    setScrollProgress(progress);
    setIsVisible(scrollTop > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    isVisible && (
      <a
        href=""
        onClick={(e) => {
          e.preventDefault(); // biar gak reload
          scrollToTop(); // smooth scroll
        }}
        className="fixed bottom-6 right-6 z-50 w-[48px] h-[48px] bg-white rounded-full shadow-lg flex items-center justify-center"
        title="Scroll to Top"
      >
        {/* Progress Circle */}
        <svg
          width="64"
          height="64"
          className="absolute rotate-[-90deg] rounded-full"
        >
          {/* Background Circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="4"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#0f172a"
            strokeWidth="4"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        {/* Arrow Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2A4D69"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </a>
    )
  );
};

export default ScrollToTopButton;

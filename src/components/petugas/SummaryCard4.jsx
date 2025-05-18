import React from "react";

const SummaryCard2 = ({ title, linkText, linkAction, items }) => {
  return (
    <div className="w-full max-w-[800px] mx-auto rounded-lg border-2 border-slate-300 shadow-md">
      {/* Header dengan 2 kolom */}
      <div className="bg-slate-600 px-4 py-3 grid grid-cols-2 rounded-t-lg text-center">
        <div
          className="
            text-white 
            font-bold 
            flex items-center justify-center
            text-[0.65rem] sm:text-[0.75rem] md:text-[0.85rem] lg:text-[0.95rem]
          "
        >
          {title}
        </div>
        <button
          onClick={linkAction}
          className="
            text-white 
            hover:underline 
            flex items-center justify-center gap-1 
            hover:text-[#E3EBF3]
            text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem] lg:text-[0.7rem]
          "
        >
          <span className="truncate max-w-[140px]">{linkText}</span>
          <span
            className="inline-block
              text-[0.55rem] sm:text-[0.6rem] md:text-[0.65rem] lg:text-[0.7rem]
            "
          ></span>
        </button>
      </div>

      {/* Konten angka dengan 2 kolom */}
      <div className="flex flex-wrap justify-between px-4 py-8 bg-white gap-y-6 text-center">
        {/* Item pertama */}
        <div className="w-1/2 pr-4">
          <div
            className="
              text-black 
              font-extrabold 
              truncate
              text-[1.2rem] sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem]
            "
          >
            {items[0]?.value || "-"}
          </div>
          <div
            className="
              text-slate-700 
              mt-2 
              truncate
              text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[0.9rem]
            "
          >
            {items[0]?.label || ""}
          </div>
        </div>

        {/* Item kedua */}
        <div className="w-1/2 pr-4">
          <div
            className="
              text-black 
              font-extrabold 
              truncate
              text-[1.2rem] sm:text-[1.3rem] md:text-[1.4rem] lg:text-[1.5rem]
            "
          >
            {items[1]?.value || "-"}
          </div>
          <div
            className="
              text-slate-700 
              mt-2 
              truncate
              text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[0.9rem]
            "
          >
            {items[1]?.label || ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard2;

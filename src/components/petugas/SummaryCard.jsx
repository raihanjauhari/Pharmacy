import React from "react";

const SummaryCard = ({ title, linkText, linkAction, items }) => {
  return (
    <div className="w-[380px] sm:w-[400px] md:w-[800px] rounded-lg border-2 border-slate-300 shadow-md">
      {/* Header */}
      <div className="bg-slate-600 px-23 py-3 flex items-center justify-between rounded-t-lg ">
        <span className="text-white text-lg font-bold ">{title}</span>
        <button
          onClick={linkAction}
          className="text-white text-sm hover:underline flex items-center gap-2 hover:text-[#E3EBF3]"
        >
          <span className="truncate max-w-[140px]">{linkText}</span>
          <span>&raquo;</span>
        </button>
      </div>

      {/* Konten Angka */}
      <div className="flex flex-wrap justify-between px-0 py-8 bg-white gap-y-6 text-center">
        {items.map((item, index) => (
          <div key={index} className="w-1/2 pr-4">
            <div className="text-3xl font-extrabold text-black truncate">
              {item.value}
            </div>
            <div className="text-base text-slate-700 mt-2 truncate">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;

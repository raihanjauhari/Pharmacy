import React from "react";

const SummaryCard = ({ title, linkText, linkAction, items }) => {
  return (
    <div className="w-170 rounded border border-slate-300 shadow-sm mb-6">
      {/* Header */}
      <div className="bg-slate-600 px-4 py-2 text-center relative">
        <span className="text-white font-semibold">{title}</span>
        <button
          onClick={linkAction}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-sm hover:underline flex items-center space-x-1"
        >
          <span>{linkText}</span>
          <span>&raquo;</span>
        </button>
      </div>

      {/* Konten Angka */}
      <div className="flex justify-around px-6 py-4 bg-white">
        {items.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-extrabold text-black">
              {item.value}
            </div>
            <div className="text-sm text-slate-700 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;

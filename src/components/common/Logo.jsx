import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ light = false, className = "" }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Crown / Architectural Column Luxury Icon */}
      <div className="relative flex items-end justify-center w-8 h-8 gap-0.5">
        <span className="w-1.5 h-4 bg-gradient-to-t from-[#9f794a] to-[#d6b27e] rounded-t-sm group-hover:scale-y-110 transition-transform duration-300"></span>
        <span className="w-1.5 h-6 bg-gradient-to-t from-[#c59b6d] to-[#f0d4a9] rounded-t-sm group-hover:scale-y-105 transition-transform duration-300"></span>
        <span className="w-1.5 h-7 bg-gradient-to-t from-[#d4af37] to-[#fae6b8] rounded-t-sm group-hover:scale-y-110 transition-transform duration-300"></span>
        <span className="w-1.5 h-5 bg-gradient-to-t from-[#c59b6d] to-[#f0d4a9] rounded-t-sm group-hover:scale-y-105 transition-transform duration-300"></span>
        <span className="w-1.5 h-3.5 bg-gradient-to-t from-[#9f794a] to-[#d6b27e] rounded-t-sm group-hover:scale-y-110 transition-transform duration-300"></span>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-serif tracking-[0.2em] text-lg font-bold leading-none ${
            light ? "text-[#1c1917]" : "text-white"
          }`}
        >
          NOBELLA
        </span>
        <span
          className={`text-[8.5px] tracking-[0.28em] font-medium uppercase mt-0.5 ${
            light ? "text-[#8a7a6c]" : "text-[#d1b089]"
          }`}
        >
          Luxury Real Estates
        </span>
      </div>
    </Link>
  );
}

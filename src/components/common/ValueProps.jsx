import React from "react";
import { Gem, ShieldCheck, Headphones, Handshake } from "lucide-react";

export default function ValueProps() {
  const props = [
    {
      icon: Gem,
      title: "Premium Properties"
    },
    {
      icon: ShieldCheck,
      title: "Trusted & Secure"
    },
    {
      icon: Headphones,
      title: "Dedicated Support"
    },
    {
      icon: Handshake,
      title: "Transparent Deals"
    }
  ];

  return (
    <section className="bg-[#121110] py-6 sm:py-7 border-y border-[#2a241e] text-stone-300 w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {props.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 group justify-center sm:justify-start"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1c1916] border border-[#c59b6d]/30 flex items-center justify-center text-[#c59b6d] group-hover:scale-105 group-hover:bg-[#c59b6d] group-hover:text-stone-950 transition-all duration-300 shadow-xs shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#c59b6d] transition-colors whitespace-nowrap">
                  {item.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

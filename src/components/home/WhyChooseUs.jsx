import React from "react";
import { Gem, UserCheck, ShieldCheck, HeartHandshake } from "lucide-react";
import Reveal from "../common/Reveal";

export default function WhyChooseUs() {
  const points = [
    {
      icon: Gem,
      title: "Premium Properties"
    },
    {
      icon: UserCheck,
      title: "Expert Guidance"
    },
    {
      icon: ShieldCheck,
      title: "Trusted & Secure"
    },
    {
      icon: HeartHandshake,
      title: "End-to-End Support"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#fbf9f5] w-full border-t border-[#ebe4d8]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1c1917] mb-8 sm:mb-10">
          Why Choose Us?
        </h2>

        {/* 4 Connected or Evenly Spaced Capsule Pills matching exact mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto w-full">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <Reveal
                key={idx}
                className="group bg-[#f7f3eb] hover:bg-white rounded-full py-4 px-6 border border-[#e4dcd0] hover:border-[#c59b6d]/60 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3.5 cursor-default"
                delay={idx * 70}
              >
                <div className="w-10 h-10 rounded-full bg-white border border-[#ded5c6] flex items-center justify-center text-[#93673f] group-hover:scale-105 group-hover:bg-[#c59b6d] group-hover:text-stone-950 transition-all duration-300 shadow-xs shrink-0">
                  <Icon className="w-4 h-4" />
                </div>

                <h3 className="font-semibold text-xs sm:text-sm text-[#1c1917] group-hover:text-[#9e6c38] transition-colors whitespace-nowrap">
                  {pt.title}
                </h3>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

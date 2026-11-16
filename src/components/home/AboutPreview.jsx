import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "../common/Reveal";

export default function AboutPreview() {
  const highlights = [
    "Exclusive portfolio of off-market private trophy assets",
    "Uncompromising legal vetting with 100% clean titles",
    "Discreet high-touch concierge advisory for buyers & investors",
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#fbf9f5] w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Text Content */}
          <Reveal className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#93673f] uppercase block mb-3">
                About Nobella
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#1a1714] leading-[1.15]">
                More Than a Home,{" "}
                <span className="block">A Better Lifestyle.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              At Nobella, we believe in creating spaces that inspire, elevate and endure. From luxury homes to premium commercial spaces, we bring you the best in real estate.
            </p>

            {/* Highlight list */}
            <ul className="space-y-2.5 max-w-lg mx-auto lg:mx-0">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-stone-700">
                  <div className="w-5 h-5 rounded-full bg-[#c59b6d]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#9e6c38]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-1">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 bg-[#c59b6d] hover:bg-[#b58552] text-stone-950 font-bold px-7 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          {/* Right Showcase Image */}
          <Reveal className="w-full order-1 lg:order-2" delay={120}>
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#ded5c6]/70 w-full" style={{ aspectRatio: "4/3" }}>
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
                alt="Luxury interior living space"
                className="w-full h-full object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5">
                <div className="inline-flex items-center gap-3 bg-[#0e0d0c]/80 backdrop-blur-sm border border-[#c59b6d]/30 rounded-xl px-4 py-3 shadow-xl">
                  <div>
                    <p className="text-[#d6b07e] font-serif text-lg sm:text-xl font-bold leading-none">
                      ₹4,500+ Cr
                    </p>
                    <p className="text-stone-400 text-[10px] sm:text-xs mt-0.5">Transaction volume delivered</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

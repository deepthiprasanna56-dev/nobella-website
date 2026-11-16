import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "../../data/testimonialsData";
import Reveal from "../common/Reveal";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  const item = testimonials[currentIndex];

  return (
    <section className="relative bg-[#0d0c0a] text-white py-20 sm:py-24 overflow-hidden border-t border-[#241f19] w-full">
      {/* Subtle gold decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c59b6d]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Section Title matching mockup */}
        <Reveal className="mb-10 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
            What Our Clients Say
          </h2>
          <p className="text-xs sm:text-sm text-[#d6b07e] font-serif italic mt-1.5">
            Real stories. Real satisfaction.
          </p>
        </Reveal>

        {/* Carousel Content */}
        <div className="relative min-h-[260px] flex flex-col items-center justify-center">
          {/* Quote mark icon */}
          <div className="w-10 h-10 rounded-full bg-[#1b1814] border border-[#c59b6d]/40 flex items-center justify-center text-[#c59b6d] mb-5 sm:mb-6 shrink-0">
            <Quote className="w-4 h-4" />
          </div>

          <p className="font-serif italic text-base sm:text-2xl text-stone-100 leading-relaxed max-w-2xl mx-auto font-medium px-2 sm:px-6">
            "{item.quote}"
          </p>

          <p className="text-xs text-stone-400 max-w-xl mx-auto mt-3 sm:mt-4 font-normal px-4">
            {item.subtext}
          </p>

          {/* Star rating */}
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#d4af37] text-[#d4af37]" />
            ))}
          </div>

          {/* Client Info */}
          <div className="flex flex-col items-center mt-6">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#c59b6d] shadow-lg mb-2"
            />
            <h4 className="font-serif text-base font-bold text-white">{item.name}</h4>
            <p className="text-xs text-stone-400">
              {item.role} • {item.city}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            aria-label="Previous Testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#181613] border border-[#302a22] text-stone-300 hover:text-white hover:border-[#c59b6d] transition-all hidden sm:flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            aria-label="Next Testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#181613] border border-[#302a22] text-stone-300 hover:text-white hover:border-[#c59b6d] transition-all hidden sm:flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicator dots matching mockup */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === i ? "w-6 bg-[#c59b6d]" : "bg-stone-700 hover:bg-stone-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

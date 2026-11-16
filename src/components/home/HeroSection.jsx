import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SearchBar from "../common/SearchBar";

const heroSlides = [
  {
    title: (
      <>
        Where <span className="italic font-normal text-[#d6b07e]">Luxury</span>
        <br />
        Finds Its Address.
      </>
    ),
    subtitle: "Discover premium properties in the finest locations.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=80",
    propertyTitle: "Skyline Residency",
    city: "Bengaluru, Karnataka",
    price: "₹3.5 Cr"
  },
  {
    title: (
      <>
        Crafted for the
        <br />
        <span className="italic font-normal text-[#d6b07e]">Discerning</span> Connoisseur.
      </>
    ),
    subtitle: "Signature penthouses & beachfront architectural marvels.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
    propertyTitle: "Palm Heights",
    city: "Carter Road, Mumbai",
    price: "₹5.2 Cr"
  },
  {
    title: (
      <>
        Sanctuary of
        <br />
        <span className="italic font-normal text-[#d6b07e]">Elegance</span> & Grandeur.
      </>
    ),
    subtitle: "Gated estate living in prestigious Jubilee Hills.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
    propertyTitle: "The Royal Crest",
    city: "Jubilee Hills, Hyderabad",
    price: "₹2.8 Cr"
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showHeroVideo, setShowHeroVideo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const desktopMotion = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    const connection = navigator.connection;
    const lowPowerDevice =
      connection?.saveData ||
      ["slow-2g", "2g"].includes(connection?.effectiveType) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4);
    const updateVideoPreference = () =>
      setShowHeroVideo(desktopMotion.matches && !lowPowerDevice);

    updateVideoPreference();
    desktopMotion.addEventListener("change", updateVideoPreference);
    return () => desktopMotion.removeEventListener("change", updateVideoPreference);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section className="cinematic-hero relative bg-[#0d0c0a] text-white w-full overflow-hidden lg:min-h-[100svh] lg:flex lg:items-center">
      {showHeroVideo && (
        <video
          className="cinematic-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={heroSlides[0].image}
          aria-hidden="true"
        >
          <source
            src="https://videos.pexels.com/video-files/8435623/8435623-uhd_3840_2160_30fps.mp4"
            type="video/mp4"
          />
        </video>
      )}
      <div className="cinematic-hero-shade" aria-hidden="true" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c59b6d]/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Main hero content — full viewport height layout */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pt-24 sm:pt-28 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            <div className="hero-kicker inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1a16]/90 border border-[#c59b6d]/40 text-[#d8b58a] text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c59b6d] animate-ping" />
              <span>Ultra-Luxury Residences &amp; Estates</span>
            </div>

            <h1 key={currentSlide} className="hero-title font-serif text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3rem] font-bold tracking-tight text-white leading-[1.1]">
              {slide.title}
            </h1>

            <p className="hero-copy text-sm text-stone-300 font-normal max-w-md mx-auto lg:mx-0 leading-relaxed">
              {slide.subtitle}
            </p>

            <div className="hero-actions flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                to="/buy"
              className="gold-cta w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#c59b6d] to-[#d6b07e] text-stone-950 font-bold px-7 py-3.5 rounded-full text-sm hover:shadow-xl hover:shadow-[#c59b6d]/25 hover:brightness-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-stone-700 hover:border-[#c59b6d]/70 text-stone-300 hover:text-white px-6 py-3.5 rounded-full text-sm font-medium transition-all"
              >
                <span>Why Nobella</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Image Carousel */}
          <div className="lg:col-span-6 relative w-full">
            <div className="hero-showcase relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#c59b6d]/25 shadow-2xl w-full" style={{ aspectRatio: "16/10" }}>
              <img
                key={currentSlide}
                src={slide.image}
                alt={slide.propertyTitle}
                className="hero-showcase-image w-full h-full object-cover transition-opacity duration-700"
                fetchPriority={currentSlide === 0 ? "high" : "auto"}
                decoding="async"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

              {/* Property Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex items-end justify-between">
                <div className="bg-[#0e0d0c]/80 backdrop-blur-sm border border-[#383025]/80 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl">
                  <p className="text-[9px] sm:text-[11px] font-bold tracking-widest text-[#d6b07e] uppercase mb-0.5">
                    Showcase
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white leading-tight">
                    {slide.propertyTitle}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-stone-400 mt-0.5">{slide.city}</p>
                </div>
                <div className="hidden sm:flex items-center bg-[#c59b6d] text-stone-950 font-bold text-sm px-4 py-2.5 rounded-xl shadow-lg">
                  {slide.price}
                </div>
              </div>

              {/* Vertical Dots */}
              <div className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 flex flex-col gap-2 z-20">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`block rounded-full cursor-pointer transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-2 h-6 bg-[#c59b6d]"
                        : "w-2 h-2 bg-white/35 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar — sits below the grid with generous breathing room */}
        <div className="mt-10 lg:mt-14 pb-12 lg:pb-16 relative z-20">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}

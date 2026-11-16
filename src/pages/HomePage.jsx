import React from "react";
import HeroSection from "../components/home/HeroSection";
import FeaturedSection from "../components/home/FeaturedSection";
import ValueProps from "../components/common/ValueProps";
import AboutPreview from "../components/home/AboutPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonials from "../components/home/Testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedSection />
      <ValueProps />
      <AboutPreview />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}

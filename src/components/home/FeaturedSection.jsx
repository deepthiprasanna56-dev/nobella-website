import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PropertyCard from "../common/PropertyCard";
import Reveal from "../common/Reveal";
import { properties } from "../../data/propertiesData";

export default function FeaturedSection() {
  const featuredProperties = properties.slice(0, 4);

  return (
    <section className="pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 bg-[#fbf9f5] w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header matching mockup */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-3">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1a1714]">
              Featured Properties
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5 font-normal">
              Handpicked luxury properties just for you
            </p>
          </div>

          <Link
            to="/buy"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1c1917] hover:text-[#9e6c38] transition-colors group cursor-pointer self-start sm:self-auto"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Grid matching mockup: 4 items in a row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
          {featuredProperties.map((property, index) => (
            <Reveal key={property.id} className="h-full" delay={index * 90}>
              <PropertyCard property={property} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

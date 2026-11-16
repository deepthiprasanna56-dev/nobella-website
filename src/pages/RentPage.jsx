import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, LayoutGrid, List } from "lucide-react";
import { properties, citiesList } from "../data/propertiesData";
import { Heart, MapPin, BedDouble, Bath, Maximize2 } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function RentPage() {
  const [selectedCity, setSelectedCity] = useState("All Locations");
  const [maxRent, setMaxRent] = useState(500000); // 5 L/mo
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [viewMode, setViewMode] = useState("grid");
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Filter rentals
  const rentalProperties = useMemo(() => {
    return properties.filter((prop) => {
      if (prop.purpose !== "both" && prop.purpose !== "rent") return false;
      if (selectedCity !== "All Locations" && prop.city !== selectedCity) return false;
      if (prop.rentPrice && prop.rentPrice > maxRent) return false;
      if (selectedBeds !== "Any" && prop.bedrooms < parseInt(selectedBeds, 10)) return false;
      return true;
    });
  }, [selectedCity, maxRent, selectedBeds]);

  return (
    <div className="bg-[#fbf9f5] min-h-screen pt-20 pb-20 w-full overflow-x-hidden">
      {/* Banner */}
      <div className="relative bg-[#0d0c0a] text-white py-12 sm:py-16 md:py-20 border-b border-[#2d2720] overflow-hidden w-full">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80"
            alt="Rent Properties Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0a] via-[#0d0c0a]/90 to-transparent z-0"></div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            Luxury Rentals
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-stone-300 font-light">
            Fully furnished signature estates & long-term penthouses
          </p>

          <nav className="flex items-center gap-2 text-xs text-stone-400 mt-3 sm:mt-4">
            <Link to="/" className="hover:text-[#c59b6d] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-[#c59b6d] font-medium">Rent</span>
          </nav>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mt-6 sm:mt-10">
        {/* Quick Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e6ded2] shadow-sm mb-6 sm:mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full md:w-auto">
            {/* City */}
            <div className="flex-1 sm:flex-initial">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                Location
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full sm:w-auto bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
              >
                {citiesList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Beds */}
            <div className="flex-1 sm:flex-initial">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                Bedrooms
              </label>
              <select
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="w-full sm:w-auto bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="Any">Any BHK</option>
                <option value="3">3+ BHK</option>
                <option value="4">4+ BHK</option>
                <option value="5">5+ BHK</option>
              </select>
            </div>

            {/* Max Monthly Rent Slider */}
            <div className="w-full sm:w-auto min-w-[160px]">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Max Rent
                </label>
                <span className="text-xs font-bold text-stone-800">
                  ₹{(maxRent / 100000).toFixed(1)} L/mo
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="500000"
                step="25000"
                value={maxRent}
                onChange={(e) => setMaxRent(parseInt(e.target.value, 10))}
                className="w-full accent-[#c59b6d] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <span className="text-xs text-stone-500 font-medium">
              {rentalProperties.length} Rentals Available
            </span>
            <div className="flex items-center gap-1 bg-[#f7f3ea] p-1 rounded-lg border border-[#e6ded2]">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md cursor-pointer ${
                  viewMode === "grid" ? "bg-[#1c1917] text-white" : "text-stone-500"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md cursor-pointer ${
                  viewMode === "list" ? "bg-[#1c1917] text-white" : "text-stone-500"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Rentals Grid */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full"
              : "space-y-4 sm:space-y-6 w-full"
          }
        >
          {rentalProperties.map((prop) => {
            const isFav = isInWishlist(prop.id);
            return (
              <div
                key={prop.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#ebe5da] hover:border-[#c59b6d]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                  <Link to={`/property/${prop.id}`}>
                    <img
                      src={prop.mainImage}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                  </Link>

                  <span className="absolute top-3 left-3 bg-[#181614]/85 backdrop-blur-md text-[#d8b58a] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#c59b6d]/30">
                    For Lease
                  </span>

                  <button
                    onClick={() => toggleWishlist(prop.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-[#c59b6d] hover:bg-black/60 transition-all cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? "fill-[#c59b6d] text-[#c59b6d]" : "text-white"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/property/${prop.id}`}>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#1f1b16] group-hover:text-[#9e6c38] transition-colors">
                        {prop.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c59b6d]" />
                      <span className="truncate">{prop.location}</span>
                    </p>
                    <div className="mt-2.5 sm:mt-3">
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#1f1b16]">
                        {prop.rentPriceFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#f2ede4] flex items-center justify-between text-xs text-stone-600">
                    {prop.bedrooms > 0 && (
                      <span className="flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5 text-[#9a7e64]" />
                        <span>{prop.bedrooms} Beds</span>
                      </span>
                    )}
                    {prop.bathrooms > 0 && (
                      <span className="flex items-center gap-1.5">
                        <Bath className="w-3.5 h-3.5 text-[#9a7e64]" />
                        <span>{prop.bathrooms} Baths</span>
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#9a7e64]" />
                      <span>{prop.areaFormatted}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

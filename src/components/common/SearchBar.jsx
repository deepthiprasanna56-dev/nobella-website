import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Home, IndianRupee, BedDouble } from "lucide-react";
import { citiesList } from "../../data/propertiesData";

export default function SearchBar({ onSearch, initialValues = {} }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState(initialValues.location || "");
  const [propertyType, setPropertyType] = useState(initialValues.type || "All Types");
  const [priceRange, setPriceRange] = useState(initialValues.price || "Any Price");
  const [bedrooms, setBedrooms] = useState(initialValues.bedrooms || "Any");

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location && location !== "All Locations") params.set("location", location);
    if (propertyType && propertyType !== "All Types") params.set("type", propertyType);
    if (priceRange && priceRange !== "Any Price") params.set("price", priceRange);
    if (bedrooms && bedrooms !== "Any") params.set("bedrooms", bedrooms);

    if (onSearch) {
      onSearch({ location, propertyType, priceRange, bedrooms });
    } else {
      navigate(`/buy?${params.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-search-panel bg-white/90 rounded-2xl md:rounded-full p-3 md:p-2.5 shadow-2xl border border-white/70 flex flex-col md:flex-row items-center gap-2 w-full max-w-5xl mx-auto"
    >
      {/* Location */}
      <div className="w-full md:flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-[#e8dfd3] flex items-center gap-3">
        <MapPin className="w-4 h-4 text-[#c59b6d] shrink-0" />
        <div className="w-full text-left">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#1c1917] focus:outline-none cursor-pointer truncate"
          >
            {citiesList.map((city) => (
              <option key={city} value={city === "All Locations" ? "" : city}>
                {city === "All Locations" ? "Search location..." : city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Property Type */}
      <div className="w-full md:flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-[#e8dfd3] flex items-center gap-3">
        <Home className="w-4 h-4 text-[#c59b6d] shrink-0" />
        <div className="w-full text-left">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#1c1917] focus:outline-none cursor-pointer truncate"
          >
            <option value="All Types">Any Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Villa">Villa</option>
            <option value="Penthouse">Penthouse</option>
          </select>
        </div>
      </div>

      {/* Price Range */}
      <div className="w-full md:flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-[#e8dfd3] flex items-center gap-3">
        <IndianRupee className="w-4 h-4 text-[#c59b6d] shrink-0" />
        <div className="w-full text-left">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Price Range
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#1c1917] focus:outline-none cursor-pointer truncate"
          >
            <option value="Any Price">Any Price</option>
            <option value="under-3">Under ₹3.0 Cr</option>
            <option value="3-5">₹3.0 Cr - ₹5.0 Cr</option>
            <option value="5-8">₹5.0 Cr - ₹8.0 Cr</option>
            <option value="above-8">₹8.0 Cr+</option>
          </select>
        </div>
      </div>

      {/* Bedrooms */}
      <div className="w-full md:w-36 px-4 py-2 flex items-center gap-3">
        <BedDouble className="w-4 h-4 text-[#c59b6d] shrink-0" />
        <div className="w-full text-left">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-400">
            Bedrooms
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#1c1917] focus:outline-none cursor-pointer truncate"
          >
            <option value="Any">Any</option>
            <option value="3">3 BHK</option>
            <option value="4">4 BHK</option>
            <option value="5">5+ BHK</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full md:w-auto p-1">
        <button
          type="submit"
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#1f1b16] hover:bg-[#c59b6d] text-white hover:text-stone-950 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl md:rounded-full transition-all duration-300 shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <Search className="w-4 h-4" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}

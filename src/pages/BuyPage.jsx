import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { LayoutGrid, List, SlidersHorizontal, RotateCcw, ChevronRight, X, Filter } from "lucide-react";
import PropertyCard from "../components/common/PropertyCard";
import { properties, citiesList } from "../data/propertiesData";

export default function BuyPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter state initialized from URL query params
  const [selectedLocation, setSelectedLocation] = useState(
    searchParams.get("location") || "All Locations"
  );
  const [maxPrice, setMaxPrice] = useState(12); // in Crores
  const [propertyTypes, setPropertyTypes] = useState(() => {
    const typeParam = searchParams.get("type");
    if (typeParam === "Residential") return ["Residential"];
    if (typeParam === "Commercial") return ["Commercial"];
    return ["Residential", "Commercial"];
  });
  const [selectedBedrooms, setSelectedBedrooms] = useState(
    searchParams.get("bedrooms") || "Any"
  );
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync state if URL query params change
  useEffect(() => {
    const loc = searchParams.get("location");
    if (loc) setSelectedLocation(loc);

    const type = searchParams.get("type");
    if (type) setPropertyTypes([type]);

    const bed = searchParams.get("bedrooms");
    if (bed) setSelectedBedrooms(bed);
  }, [searchParams]);

  const handleTypeChange = (type) => {
    setPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleResetFilters = () => {
    setSelectedLocation("All Locations");
    setMaxPrice(12);
    setPropertyTypes(["Residential", "Commercial"]);
    setSelectedBedrooms("Any");
    setSortBy("newest");
    setSearchParams({});
    setCurrentPage(1);
    setIsMobileFilterOpen(false);
  };

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Must be buyable
      if (prop.purpose !== "both" && prop.purpose !== "buy") return false;

      // Location match
      if (selectedLocation !== "All Locations" && prop.city !== selectedLocation) {
        return false;
      }

      // Max price filter (price in Crores)
      if (prop.price > maxPrice) {
        return false;
      }

      // Property type filter
      if (propertyTypes.length > 0 && !propertyTypes.includes(prop.type)) {
        return false;
      }

      // Bedrooms filter
      if (selectedBedrooms !== "Any") {
        const bedNum = parseInt(selectedBedrooms, 10);
        if (prop.bedrooms < bedNum) return false;
      }

      return true;
    });
  }, [selectedLocation, maxPrice, propertyTypes, selectedBedrooms]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    const list = [...filteredProperties];
    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => b.yearBuilt - a.yearBuilt);
    }
    return list;
  }, [filteredProperties, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage) || 1;
  const paginatedProperties = sortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#fbf9f5] min-h-screen pt-20 pb-20 w-full overflow-x-hidden">
      {/* Hero Banner with Cityscape Background matching mockup */}
      <div className="relative bg-[#0d0c0a] text-white py-12 sm:py-16 md:py-20 border-b border-[#2d2720] overflow-hidden w-full">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80"
            alt="Buy Properties Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0a] via-[#0d0c0a]/90 to-transparent z-0"></div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            Buy Properties
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-stone-300 font-light">
            Find your perfect home to buy
          </p>

          {/* Breadcrumb matching mockup: Home > Buy */}
          <nav className="flex items-center gap-2 text-xs text-stone-400 mt-3 sm:mt-4">
            <Link to="/" className="hover:text-[#c59b6d] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-[#c59b6d] font-medium">Buy</span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mt-6 sm:mt-10">
        {/* Mobile Toolbar & Filter Trigger */}
        <div className="lg:hidden mb-4 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#e6ded2] rounded-xl text-xs font-semibold text-[#1c1917] shadow-sm active:bg-stone-50 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#c59b6d]" />
            <span>Filters ({filteredProperties.length})</span>
          </button>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#e6ded2]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg cursor-pointer ${
                viewMode === "grid" ? "bg-[#1c1917] text-white" : "text-stone-400"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg cursor-pointer ${
                viewMode === "list" ? "bg-[#1c1917] text-white" : "text-stone-400"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl p-6 border border-[#e6ded2] shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#f0ebe1] mb-5">
              <h3 className="font-serif text-lg font-bold text-[#1c1917]">Filters</h3>
              <button
                onClick={handleResetFilters}
                className="text-xs text-stone-500 hover:text-[#c59b6d] flex items-center gap-1 transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Filter 1: Location */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Location
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#fbf9f5] border border-[#e2d8cb] rounded-xl px-3 py-2.5 text-xs font-medium text-[#1c1917] focus:outline-none focus:border-[#c59b6d] cursor-pointer"
              >
                {citiesList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter 2: Price Range Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Price Range
                </label>
                <span className="text-xs font-bold text-[#1c1917]">
                  Up to ₹{maxPrice} Cr
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="0.5"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(parseFloat(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#c59b6d] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-stone-400 mt-1">
                <span>₹0</span>
                <span>₹10 Cr+</span>
              </div>
            </div>

            {/* Filter 3: Property Type Checkboxes */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Property Type
              </label>
              <div className="space-y-2 text-xs">
                {["Residential", "Commercial"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2.5 cursor-pointer text-stone-700 hover:text-black"
                  >
                    <input
                      type="checkbox"
                      checked={propertyTypes.includes(type)}
                      onChange={() => {
                        handleTypeChange(type);
                        setCurrentPage(1);
                      }}
                      className="rounded accent-[#c59b6d] w-4 h-4 cursor-pointer"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter 4: Bedrooms */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Bedrooms
              </label>
              <select
                value={selectedBedrooms}
                onChange={(e) => {
                  setSelectedBedrooms(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#fbf9f5] border border-[#e2d8cb] rounded-xl px-3 py-2.5 text-xs font-medium text-[#1c1917] focus:outline-none focus:border-[#c59b6d] cursor-pointer"
              >
                <option value="Any">Any</option>
                <option value="1">1+ BHK</option>
                <option value="2">2+ BHK</option>
                <option value="3">3+ BHK</option>
                <option value="4">4+ BHK</option>
                <option value="5">5+ BHK</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 bg-[#1c1917] hover:bg-[#c59b6d] text-white hover:text-stone-950 font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
            >
              Reset Filters
            </button>
          </aside>

          {/* Right Listings Section */}
          <main className="lg:col-span-9 w-full">
            {/* Top Toolbar matching mockup */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-[#e6ded2] shadow-sm mb-5 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-stone-600 font-medium">
                Showing <span className="font-bold text-stone-900">{sortedProperties.length}</span>{" "}
                luxury properties
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500 font-medium whitespace-nowrap">
                    Sort By:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#fbf9f5] border border-[#ded5c6] rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                {/* Grid / List view toggle (desktop) */}
                <div className="hidden sm:flex items-center gap-1 bg-[#f7f3ea] p-1 rounded-lg border border-[#e6ded2]">
                  <button
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid View"
                    className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                      viewMode === "grid"
                        ? "bg-[#1c1917] text-white shadow-sm"
                        : "text-stone-500 hover:text-black"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    aria-label="List View"
                    className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                      viewMode === "list"
                        ? "bg-[#1c1917] text-white shadow-sm"
                        : "text-stone-500 hover:text-black"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Grid / List */}
            {paginatedProperties.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-[#e6ded2]">
                <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">
                  No properties matched your criteria
                </h3>
                <p className="text-xs text-stone-500 mb-6">
                  Try adjusting your price threshold, location, or bedrooms selection.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#c59b6d] text-stone-950 text-xs font-bold rounded-full hover:brightness-105 transition-all cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 w-full"
                    : "space-y-4 sm:space-y-6 w-full"
                }
              >
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination matching mockup: 1, 2, 3, -> */}
            {totalPages > 1 && (
              <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-[#c59b6d] text-stone-950 shadow-md"
                          : "bg-white border border-[#e6ded2] text-stone-700 hover:bg-[#f7f3ea]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {currentPage < totalPages && (
                  <button
                    onClick={() => {
                      setCurrentPage((p) => p + 1);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    aria-label="Next Page"
                    className="w-9 h-9 rounded-lg text-xs font-bold bg-white border border-[#e6ded2] text-stone-700 hover:bg-[#f7f3ea] flex items-center justify-center cursor-pointer"
                  >
                    →
                  </button>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-in Modal Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#f0ebe1] mb-5">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-[#c59b6d]" />
                    <h3 className="font-serif text-lg font-bold text-[#1c1917]">Filters</h3>
                  </div>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1.5 text-stone-400 hover:text-stone-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Location */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-[#fbf9f5] border border-[#e2d8cb] rounded-xl px-3 py-2.5 text-xs font-medium text-[#1c1917] focus:outline-none"
                  >
                    {citiesList.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Price Range
                    </label>
                    <span className="text-xs font-bold text-[#1c1917]">
                      Up to ₹{maxPrice} Cr
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="12"
                    step="0.5"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(parseFloat(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full accent-[#c59b6d]"
                  />
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mt-1">
                    <span>₹0</span>
                    <span>₹10 Cr+</span>
                  </div>
                </div>

                {/* Property Type */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Property Type
                  </label>
                  <div className="space-y-2 text-xs">
                    {["Residential", "Commercial"].map((type) => (
                      <label key={type} className="flex items-center gap-2.5 text-stone-700">
                        <input
                          type="checkbox"
                          checked={propertyTypes.includes(type)}
                          onChange={() => {
                            handleTypeChange(type);
                            setCurrentPage(1);
                          }}
                          className="rounded accent-[#c59b6d] w-4 h-4"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Bedrooms
                  </label>
                  <select
                    value={selectedBedrooms}
                    onChange={(e) => {
                      setSelectedBedrooms(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-[#fbf9f5] border border-[#e2d8cb] rounded-xl px-3 py-2.5 text-xs font-medium text-[#1c1917]"
                  >
                    <option value="Any">Any</option>
                    <option value="1">1+ BHK</option>
                    <option value="2">2+ BHK</option>
                    <option value="3">3+ BHK</option>
                    <option value="4">4+ BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#f0ebe1] flex gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 py-3 border border-[#ded5c6] text-stone-700 font-bold text-xs rounded-xl"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 bg-[#1c1917] text-white font-bold text-xs rounded-xl"
                >
                  Apply ({filteredProperties.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

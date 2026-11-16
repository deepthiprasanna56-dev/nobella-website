import React from "react";
import { Link } from "react-router-dom";
import { Heart, BedDouble, Bath, Maximize2, MapPin } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

export default function PropertyCard({ property, viewMode = "grid" }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isFavorite = isInWishlist(property.id);

  const handleTilt = (event) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      navigator.connection?.saveData
    ) return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty("--card-tilt-x", `${x * 5}deg`);
    card.style.setProperty("--card-tilt-y", `${y * -5}deg`);
    card.style.setProperty("--card-glow-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--card-glow-y", `${(y + 0.5) * 100}%`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty("--card-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--card-tilt-y", "0deg");
  };

  if (viewMode === "list") {
    return (
      <div onPointerMove={handleTilt} onPointerLeave={resetTilt} className="property-card-tilt group bg-white rounded-2xl overflow-hidden border border-[#e8e2d5] hover:border-[#c59b6d]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row w-full">
        {/* List Image */}
        <div className="relative sm:w-2/5 aspect-[16/10] sm:aspect-auto overflow-hidden">
          <img
            src={property.mainImage}
            alt={property.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <span className="absolute top-3 left-3 bg-[#181614]/80 backdrop-blur-md text-[#d1b089] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#c59b6d]/30">
            {property.category}
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(property.id);
            }}
            aria-label="Toggle Wishlist"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-[#c59b6d] hover:bg-black/60 transition-all cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? "fill-[#c59b6d] text-[#c59b6d]" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* List Body */}
        <div className="p-5 sm:p-6 sm:w-3/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-[#8e683e] uppercase tracking-wider">
                {property.type}
              </span>
              <span className="text-[11px] text-stone-500">{property.status}</span>
            </div>
            <Link to={`/property/${property.id}`}>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1f1b16] group-hover:text-[#9e6c38] transition-colors leading-snug">
                {property.title}
              </h3>
            </Link>
            <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#c59b6d] shrink-0" />
              <span>{property.location}</span>
            </p>
            <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="pt-3.5 mt-3.5 border-t border-[#f0ebe1] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">
                Price
              </span>
              <div className="font-serif text-lg sm:text-xl font-bold text-[#1f1b16] flex items-baseline">
                <span className="font-sans font-medium text-base mr-1 text-[#8e6538]">₹</span>
                <span>{property.price} Cr</span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 text-xs text-stone-600">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1.5" title="Bedrooms">
                  <BedDouble className="w-3.5 h-3.5 text-[#8a725b]" />
                  <span>{property.bedrooms} Beds</span>
                </span>
              )}
              {property.bathrooms > 0 && (
                <span className="flex items-center gap-1.5" title="Bathrooms">
                  <Bath className="w-3.5 h-3.5 text-[#8a725b]" />
                  <span>{property.bathrooms} Baths</span>
                </span>
              )}
              <span className="flex items-center gap-1.5" title="Area">
                <Maximize2 className="w-3.5 h-3.5 text-[#8a725b]" />
                <span>{property.areaFormatted}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Card matching mockup exactly
  return (
    <div onPointerMove={handleTilt} onPointerLeave={resetTilt} className="property-card-tilt group bg-white rounded-2xl overflow-hidden border border-[#ebe5da] hover:border-[#c59b6d]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full w-full">
      {/* Top Part: Image + Title + Location + Price */}
      <div>
        <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
          <Link to={`/property/${property.id}`} className="block w-full h-full">
            <img
              src={property.mainImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600 ease-out"
              loading="lazy"
              decoding="async"
            />
          </Link>

          {/* Category Pill */}
          <span className="absolute top-3 left-3 bg-[#181614]/85 backdrop-blur-md text-[#d8b58a] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#c59b6d]/30 shadow-xs pointer-events-none">
            {property.category}
          </span>

          {/* Favorite Heart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(property.id);
            }}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:text-[#c59b6d] hover:bg-black/60 transition-all cursor-pointer shadow-xs"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? "fill-[#c59b6d] text-[#c59b6d]" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5 pb-3">
          <Link to={`/property/${property.id}`}>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#1f1b16] group-hover:text-[#9e6c38] transition-colors leading-snug line-clamp-1">
              {property.title}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#c59b6d] shrink-0" />
            <span className="truncate">{property.location}</span>
          </p>

          <div className="mt-3">
            <div className="font-serif text-xl sm:text-2xl font-bold text-[#1f1b16] flex items-baseline">
              <span className="font-sans font-medium text-base sm:text-lg mr-1 text-[#8e6538]">₹</span>
              <span>{property.price} Cr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Specs Footer matching mockup */}
      <div className="px-4 sm:px-5 pb-4">
        <div className="pt-3 border-t border-[#f2ede4] flex items-center justify-between text-[11px] sm:text-xs text-stone-600 font-medium">
          {property.bedrooms > 0 ? (
            <span className="flex items-center gap-1.5" title="Bedrooms">
              <BedDouble className="w-3.5 h-3.5 text-[#9a7e64]" />
              <span>{property.bedrooms} Beds</span>
            </span>
          ) : (
            <span className="text-stone-400">Office</span>
          )}

          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5" title="Bathrooms">
              <Bath className="w-3.5 h-3.5 text-[#9a7e64]" />
              <span>{property.bathrooms} Baths</span>
            </span>
          )}

          <span className="flex items-center gap-1.5" title="Total Area">
            <Maximize2 className="w-3.5 h-3.5 text-[#9a7e64]" />
            <span>{property.areaFormatted}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

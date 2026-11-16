import React from "react";
import { Link } from "react-router-dom";
import { X, Heart, Trash2, ArrowRight, BedDouble, Bath } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlistProperties,
    removeFromWishlist,
    wishlistCount
  } = useWishlist();

  if (!isWishlistOpen) return null;

  const totalValue = wishlistProperties.reduce((acc, curr) => acc + (curr.price || 0), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#141210] border-l border-[#2e2820] shadow-2xl flex flex-col animate-slide-left text-stone-200">
          {/* Header */}
          <div className="p-6 border-b border-[#28231c] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#c59b6d]/10 border border-[#c59b6d]/30 flex items-center justify-center text-[#c59b6d]">
                <Heart className="w-4 h-4 fill-[#c59b6d]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Your Saved Wishlist</h3>
                <p className="text-xs text-stone-400">
                  {wishlistCount} {wishlistCount === 1 ? "Property" : "Properties"} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close Wishlist"
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Property List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProperties.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-stone-800 flex items-center justify-center text-stone-500 mb-4">
                  <Heart className="w-8 h-8 stroke-1" />
                </div>
                <h4 className="font-serif text-lg font-medium text-stone-300">
                  Your wishlist is empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mt-1 mb-6">
                  Click the heart icon on any villa or penthouse to curate your private portfolio.
                </p>
                <Link
                  to="/buy"
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2.5 bg-[#c59b6d] text-stone-950 text-xs font-bold rounded-full hover:brightness-110 transition-all"
                >
                  Explore Properties
                </Link>
              </div>
            ) : (
              wishlistProperties.map((property) => (
                <div
                  key={property.id}
                  className="group bg-[#1c1916] border border-[#2e2820] hover:border-[#c59b6d]/50 rounded-2xl p-3 flex gap-3 transition-all duration-300"
                >
                  <img
                    src={property.mainImage}
                    alt={property.title}
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link
                          to={`/property/${property.id}`}
                          onClick={() => setIsWishlistOpen(false)}
                          className="font-serif text-sm font-bold text-white group-hover:text-[#c59b6d] transition-colors line-clamp-1"
                        >
                          {property.title}
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(property.id)}
                          aria-label="Remove"
                          className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-400 mt-0.5">{property.location}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#2a241e]">
                      <span className="font-serif text-sm font-bold text-[#c59b6d]">
                        {property.priceFormatted}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-stone-400">
                        {property.bedrooms > 0 && <span>{property.bedrooms} Beds</span>}
                        <span>•</span>
                        <span>{property.areaFormatted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {wishlistProperties.length > 0 && (
            <div className="p-6 border-t border-[#28231c] bg-[#100f0d] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-400">Combined Portfolio Value</span>
                <span className="font-serif text-base font-bold text-white">
                  ₹{totalValue.toFixed(1)} Cr
                </span>
              </div>

              <Link
                to="/contact"
                onClick={() => setIsWishlistOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-[#c59b6d] to-[#d6b07e] text-stone-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#c59b6d]/20 transition-all"
              >
                <span>Request Private Viewing for Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

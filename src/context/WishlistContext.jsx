import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext";
import { properties } from "../data/propertiesData";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("nobella_wishlist");
      return saved ? JSON.parse(saved) : ["skyline-residency", "palm-heights"];
    } catch {
      return ["skyline-residency", "palm-heights"];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem("nobella_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const toggleWishlist = (propertyId) => {
    const prop = properties.find((p) => p.id === propertyId);
    const title = prop ? prop.title : "Property";

    setWishlist((prev) => {
      if (prev.includes(propertyId)) {
        addToast(`Removed "${title}" from your wishlist`, "info");
        return prev.filter((id) => id !== propertyId);
      } else {
        addToast(`Added "${title}" to your wishlist!`, "success");
        return [...prev, propertyId];
      }
    });
  };

  const removeFromWishlist = (propertyId) => {
    const prop = properties.find((p) => p.id === propertyId);
    const title = prop ? prop.title : "Property";
    setWishlist((prev) => prev.filter((id) => id !== propertyId));
    addToast(`Removed "${title}" from wishlist`, "info");
  };

  const isInWishlist = (propertyId) => wishlist.includes(propertyId);

  const wishlistProperties = properties.filter((p) => wishlist.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistProperties,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

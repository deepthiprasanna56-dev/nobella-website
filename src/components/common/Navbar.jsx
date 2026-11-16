import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, User, Menu, X, LogOut, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { wishlistCount, setIsWishlistOpen } = useWishlist();
  const { currentUser, openAuth, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Sell", path: "/sell" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? "bg-[#0e0d0c]/95 backdrop-blur-md py-3 shadow-xl border-b border-[#2e2820]/60"
          : "bg-[#0e0d0c]/90 backdrop-blur-sm py-4 border-b border-[#2e2820]/40"
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links with generous gap and individual link padding */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `site-nav-link text-sm font-medium tracking-wide transition-all py-1 relative ${
                    isActive
                      ? "text-[#c59b6d] font-semibold"
                      : "text-stone-300 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c59b6d] rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="View Wishlist"
              className="relative p-2 text-stone-300 hover:text-[#c59b6d] transition-colors rounded-full hover:bg-white/5 cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#c59b6d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Profile / Login Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 bg-[#1c1916] border border-[#c59b6d]/40 rounded-full py-1.5 px-3.5 hover:border-[#c59b6d] transition-all cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-[#c59b6d]"
                  />
                  <span className="text-xs font-semibold text-stone-200 hidden sm:inline-block max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#181614] border border-[#2e2820] rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-800">
                      <p className="text-xs text-stone-400">Signed in as</p>
                      <p className="text-xs font-semibold text-stone-200 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsWishlistOpen(true);
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-stone-300 hover:bg-white/5 flex items-center gap-2"
                    >
                      <Heart className="w-3.5 h-3.5 text-[#c59b6d]" />
                      Saved Properties ({wishlistCount})
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-white/5 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuth("login")}
                aria-label="Login or sign up"
                className="flex items-center gap-2 bg-gradient-to-r from-[#c59b6d] to-[#d6b07e] text-stone-950 font-bold text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-2.5 rounded-full hover:shadow-lg hover:shadow-[#c59b6d]/20 hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <User className="w-4 h-4 text-stone-900 shrink-0" />
                <span className="hidden sm:inline">Login / Sign Up</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#c59b6d]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#121110] border-t border-[#2e2820] px-4 pt-4 pb-6 space-y-3 animate-fade-in shadow-2xl">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-[#c59b6d]/15 text-[#c59b6d] font-semibold"
                      : "text-stone-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <span>{link.name}</span>
                <span className="text-stone-500 text-xs">›</span>
              </NavLink>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#25211d] flex flex-col gap-2">
            <button
              onClick={() => {
                setIsWishlistOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 text-sm text-stone-300 hover:text-white bg-white/5 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#c59b6d]" />
                Saved Wishlist
              </span>
              <span className="bg-[#c59b6d] text-stone-950 font-bold text-xs px-2 py-0.5 rounded-full">
                {wishlistCount}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

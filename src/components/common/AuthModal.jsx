import React, { useState } from "react";
import { X, Mail, Lock, User, Phone, CheckCircle, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Logo from "./Logo";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuth, authMode, setAuthMode, login, signup } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    agreeTerms: true
  });

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === "login") {
      login(formData.email || "client@nobella.com", formData.password, formData.name);
    } else {
      signup(formData.name || "Nobella Client", formData.email, formData.phone);
    }
  };

  const handleQuickDemo = () => {
    login("rajesh.mehta@wealthadvisors.com", "password", "Rajesh Mehta");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-md bg-[#161412] text-stone-200 rounded-3xl border border-[#383127] shadow-2xl overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gold glow bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#9f794a] via-[#c59b6d] to-[#fae6b8]"></div>

        {/* Close Button */}
        <button
          onClick={closeAuth}
          aria-label="Close"
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-7 sm:p-8">
          <div className="flex flex-col items-center text-center mb-6">
            <Logo />
            <h3 className="font-serif text-2xl font-bold text-white mt-4">
              {authMode === "login" ? "Welcome to Nobella" : "Create Private Account"}
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              {authMode === "login"
                ? "Sign in to access your curated portfolio and private viewings"
                : "Join an exclusive circle of luxury estate connoisseurs"}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex p-1 bg-[#201d19] rounded-xl mb-6 border border-[#312b23]">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                authMode === "login"
                  ? "bg-[#c59b6d] text-stone-950 shadow-md"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("signup")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                authMode === "signup"
                  ? "bg-[#c59b6d] text-stone-950 shadow-md"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "signup" && (
              <div>
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Singhania"
                    className="w-full bg-[#201d19] border border-[#332c24] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#c59b6d] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full bg-[#201d19] border border-[#332c24] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#c59b6d] transition-colors"
                />
              </div>
            </div>

            {authMode === "signup" && (
              <div>
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#201d19] border border-[#332c24] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#c59b6d] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-stone-300 uppercase tracking-wider">
                  Password
                </label>
                {authMode === "login" && (
                  <button
                    type="button"
                    className="text-[11px] text-[#c59b6d] hover:underline"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-[#201d19] border border-[#332c24] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#c59b6d] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#c59b6d] to-[#d6b07e] text-stone-950 font-bold rounded-xl text-xs sm:text-sm tracking-wide hover:shadow-lg hover:shadow-[#c59b6d]/20 transition-all duration-200 mt-2"
            >
              {authMode === "login" ? "Sign In to Nobella" : "Create Private Account"}
            </button>
          </form>

          {/* Quick Demo Login Shortcut */}
          <div className="mt-5 pt-4 border-t border-[#2d2720] text-center">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="text-xs text-[#c59b6d] hover:text-white font-medium flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Fill with 1-Click Demo Client</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

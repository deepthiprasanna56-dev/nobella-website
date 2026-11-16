import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function SellPage() {
  const { addToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Residential Villa",
    city: "Bengaluru",
    address: "",
    expectedPrice: "",
    bedrooms: "4",
    bathrooms: "4",
    area: "",
    ownerName: "",
    email: "",
    phone: "",
    notes: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Property submission received! Our Senior Partner will connect with you within 24 hours.", "success", 5000);
  };

  return (
    <div className="bg-[#fbf9f5] min-h-screen pt-20 pb-20 w-full overflow-x-hidden">
      {/* Banner */}
      <div className="relative bg-[#0d0c0a] text-white py-12 sm:py-16 md:py-20 border-b border-[#2d2720] overflow-hidden w-full">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
            alt="Sell with Nobella Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0a] via-[#0d0c0a]/90 to-transparent z-0"></div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            Sell with Nobella
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-stone-300 font-light max-w-xl">
            Discreet representation for premier estates, penthouses, and high-yield commercial assets
          </p>

          <nav className="flex items-center gap-2 text-xs text-stone-400 mt-3 sm:mt-4">
            <Link to="/" className="hover:text-[#c59b6d] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-[#c59b6d] font-medium">Sell</span>
          </nav>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Advisory Column */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9e6c38] block">
              Bespoke Asset Representation
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1a1714] leading-tight">
              Unlock the True Worth of Your Masterpiece.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Nobella has facilitated over ₹4,500 Cr in transactions with an average turnaround 40% faster than general brokers, maintaining utmost confidentiality.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#e6dfd2] flex items-start gap-3.5 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#c59b6d]/15 text-[#8e6538] flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                    Confidential Off-Market Desk
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Your estate can be introduced exclusively to pre-vetted institutional and ultra-HNI buyers without public advertising.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e6dfd2] flex items-start gap-3.5 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#c59b6d]/15 text-[#8e6538] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                    High-End Architectural Production
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Twilight cinematography, 3D spatial scans, and bespoke print lookbooks prepared by top architectural photographers.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#e6dfd2] flex items-start gap-3.5 shadow-xs">
                <div className="w-9 h-9 rounded-xl bg-[#c59b6d]/15 text-[#8e6538] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                    Global Family Office Network
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Direct access to NRI investors across London, Dubai, Singapore, and Silicon Valley looking for trophy assets in India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e6dfd2] shadow-sm">
              {submitted ? (
                <div className="py-8 sm:py-12 text-center space-y-4 animate-scale-up">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    Listing Request Registered!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-stone-900">{formData.ownerName}</span>. Reference No: <span className="font-mono font-bold text-[#9e6c38]">NOB-LST-8924</span>. Our Private Client Director will contact you at {formData.phone} for the initial appraisal.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-[#1c1917] text-white text-xs font-semibold rounded-full hover:bg-[#c59b6d] hover:text-stone-950 transition-colors cursor-pointer"
                  >
                    Submit Another Property
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                    List Your Luxury Property
                  </h3>
                  <p className="text-xs text-stone-500">
                    Fill out the primary specifications below to start a confidential valuation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Property Title / Community Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Whispering Palms Villa"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Property Type *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                      >
                        <option value="Residential Villa">Residential Villa</option>
                        <option value="Signature Penthouse">Signature Penthouse</option>
                        <option value="Luxury Apartment">Luxury Apartment</option>
                        <option value="Commercial Office Space">Commercial Office Space</option>
                        <option value="Waterfront Estate">Waterfront Estate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        City *
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                      >
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Goa">Goa</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Expected Price (₹ Cr) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 4.5 Cr"
                        value={formData.expectedPrice}
                        onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                        className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Bedrooms
                      </label>
                      <select
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                      >
                        <option value="2">2 BHK</option>
                        <option value="3">3 BHK</option>
                        <option value="4">4 BHK</option>
                        <option value="5">5+ BHK</option>
                        <option value="0">Not Applicable (Commercial)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Super Built-Up Area (sq.ft) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 3500"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Exact Address & Locality
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Plot 18, Road No 10, Jubilee Hills"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Owner's Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Special Features / Notes
                    </label>
                    <textarea
                      rows="3"
                      placeholder="e.g. Private plunge pool, custom Italian kitchen, sea view..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-[#c59b6d] to-[#d6b07e] text-stone-950 font-bold rounded-xl text-xs sm:text-sm tracking-wide hover:shadow-lg hover:shadow-[#c59b6d]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Submit for Confidential Valuation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

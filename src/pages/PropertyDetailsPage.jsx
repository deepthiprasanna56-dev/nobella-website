import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Home,
  Check,
  ChevronRight,
  Share2,
  ShieldCheck,
  Phone,
  ArrowRight,
  X
} from "lucide-react";
import { properties } from "../data/propertiesData";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import PropertyCard from "../components/common/PropertyCard";

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const property = properties.find((p) => p.id === id) || properties[0];
  const [activeImage, setActiveImage] = useState(property.mainImage);
  const [activeTab, setActiveTab] = useState("overview");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Enquiry Form State
  const [enquiryData, setEnquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I am interested in scheduling a private tour of ${property.title}. Please provide more details.`
  });
  const [enquirySent, setEnquirySent] = useState(false);

  // Reset active image when property changes
  useEffect(() => {
    if (property) {
      setActiveImage(property.mainImage);
      setEnquiryData((prev) => ({
        ...prev,
        message: `I am interested in scheduling a private tour of ${property.title}. Please provide more details.`
      }));
      setEnquirySent(false);
    }
  }, [property]);

  const isFavorite = isInWishlist(property.id);

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySent(true);
    addToast(`Enquiry sent for ${property.title}! A private consultant will contact you shortly.`, "success", 5000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast("Property link copied to clipboard!", "info");
  };

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  return (
    <div className="bg-[#fbf9f5] min-h-screen pt-20 sm:pt-24 pb-20 w-full overflow-x-hidden">
      {/* Breadcrumb matching mockup: Home > Buy > Skyline Residency */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mb-4 sm:mb-6">
        <nav className="flex items-center gap-1.5 sm:gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-[#c59b6d] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <Link to="/buy" className="hover:text-[#c59b6d] transition-colors">
            Buy
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-[#9e6c38] font-semibold truncate">{property.title}</span>
        </nav>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header Block: Title, Location, Price, Add to Wishlist */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-5 sm:pb-6 gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1a1714] leading-tight">
              {property.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 flex items-center gap-1.5 mt-1.5 sm:mt-2">
              <MapPin className="w-4 h-4 text-[#c59b6d] shrink-0" />
              <span>{property.location}</span>
            </p>
            <div className="mt-2.5 sm:mt-3 flex items-baseline gap-2 flex-wrap">
              <div className="font-serif text-2xl sm:text-4xl font-bold text-[#1a1714] flex items-baseline">
                <span className="font-sans font-medium text-xl sm:text-3xl mr-1 text-[#8e6538]">₹</span>
                <span>{property.price} Cr</span>
              </div>
              {property.rentPriceFormatted && (
                <span className="text-xs text-stone-500">
                  (Or lease at {property.rentPriceFormatted})
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-auto">
            <button
              onClick={handleShare}
              className="p-2.5 sm:p-3 bg-white border border-[#e6dfd2] rounded-full text-stone-600 hover:text-stone-900 hover:border-[#c59b6d] transition-colors shadow-xs cursor-pointer"
              title="Share Property"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleWishlist(property.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs font-semibold border transition-all shadow-xs cursor-pointer ${
                isFavorite
                  ? "bg-[#181614] border-[#181614] text-white"
                  : "bg-white border-[#e6ded2] text-stone-800 hover:border-[#c59b6d]"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-[#c59b6d] text-[#c59b6d]" : "text-stone-500"
                }`}
              />
              <span>{isFavorite ? "Saved" : "Add to Wishlist"}</span>
            </button>
          </div>
        </div>

        {/* Specs Pills: 4 Beds, 4 Baths, 3,500 sqft, Villa */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-6 sm:pb-8 text-xs font-medium text-stone-700">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#e8e2d5] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-xs">
              <BedDouble className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8e683e]" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#e8e2d5] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-xs">
              <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8e683e]" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#e8e2d5] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-xs">
            <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8e683e]" />
            <span>{property.areaFormatted}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#e8e2d5] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-xs">
            <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8e683e]" />
            <span>{property.category}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white border border-[#e8e2d5] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
            <span>RERA Approved</span>
          </div>
        </div>

        {/* Image Gallery matching mockup: Large Main Image + 4 Right Thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 rounded-3xl overflow-hidden mb-8 sm:mb-12">
          {/* Main Large Image */}
          <div
            className="lg:col-span-9 aspect-[16/10] bg-stone-100 rounded-2xl sm:rounded-3xl overflow-hidden cursor-zoom-in relative group"
            onClick={() => setLightboxOpen(true)}
          >
            <img
              src={activeImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            />
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full pointer-events-none">
              Click to Fullscreen
            </div>
          </div>

          {/* Thumbnails Row on mobile / Column on desktop */}
          <div className="lg:col-span-3 grid grid-cols-4 lg:grid-cols-1 gap-2 sm:gap-3">
            {property.images.slice(0, 4).map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                  activeImage === imgUrl
                    ? "border-[#c59b6d] ring-2 ring-[#c59b6d]/40 shadow-md"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Content Tabs & Enquire Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left Main Content */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-10">
            {/* Tabs Navigation */}
            <div className="border-b border-[#e6ded2] flex items-center space-x-6 sm:space-x-8 text-xs sm:text-sm font-semibold overflow-x-auto whitespace-nowrap pb-1">
              {[
                { id: "overview", label: "Overview" },
                { id: "amenities", label: "Amenities" },
                { id: "location", label: "Location" },
                { id: "contact", label: "Contact" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 sm:pb-4 relative transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? "text-[#1c1917] font-bold"
                      : "text-stone-400 hover:text-stone-700 font-medium"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c59b6d]"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] mb-2 sm:mb-3">
                  About this Property
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {property.description}
                </p>
              </div>

              {/* Specifications Table */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#e6ded2] shadow-xs">
                <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 mb-3 sm:mb-4">
                  Property Highlights & Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-xs">
                  {property.highlights?.map((h, i) => (
                    <div key={i} className="border-b border-[#f2ece2] pb-2.5">
                      <span className="text-stone-400 block text-[10px] uppercase tracking-wider font-semibold">
                        {h.label}
                      </span>
                      <span className="font-semibold text-stone-800 mt-0.5 block truncate">
                        {h.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div className="pt-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] mb-4">
                Amenities & Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {property.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white p-3 sm:p-3.5 rounded-xl border border-[#ebe4d8] shadow-xs"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#c59b6d]/15 text-[#8e6538] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-stone-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Location & Landmarks */}
            <div className="pt-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917] mb-4">
                Neighborhood & Connectivity
              </h3>
              
              {/* Map Preview Card matching mockup */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#e6ded2] shadow-md aspect-[16/9] sm:aspect-[16/8] bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                  alt="Location Map Preview"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-[1px]"></div>

                {/* Map Pin Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#181614] border-2 border-[#c59b6d] flex items-center justify-center text-white shadow-2xl animate-bounce">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#c59b6d]" />
                  </div>
                  <span className="bg-[#181614]/90 backdrop-blur-md text-white font-serif text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full shadow-lg mt-1 whitespace-nowrap">
                    {property.title}
                  </span>
                </div>

                {/* View on Map Button matching mockup */}
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(property.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-[#1c1917] hover:bg-[#c59b6d] text-white hover:text-stone-950 text-xs font-bold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-lg transition-all"
                >
                  View on Map
                </a>
              </div>

              {/* Landmarks List */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-5 sm:mt-6">
                {property.landmarks?.map((lm, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border border-[#ebe4d8] text-center"
                  >
                    <span className="text-[10px] uppercase font-bold text-stone-400 block truncate">
                      {lm.name}
                    </span>
                    <span className="font-serif text-sm sm:text-base font-bold text-[#1c1917] mt-0.5 sm:mt-1 block">
                      {lm.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar: "Enquire Now" matching mockup */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 bg-[#f5efe5] rounded-3xl p-5 sm:p-8 border border-[#ded5c6] shadow-xl space-y-5 sm:space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1917]">
                  Enquire Now
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Get more details about this property
                </p>
              </div>

              {enquirySent ? (
                <div className="bg-white rounded-2xl p-6 text-center space-y-3 border border-[#ded5c6] animate-scale-up">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    Enquiry Registered
                  </h4>
                  <p className="text-xs text-stone-600">
                    Thank you! Our relationship manager will reach out within 2 business hours.
                  </p>
                  <button
                    onClick={() => setEnquirySent(false)}
                    className="text-xs text-[#9e6c38] font-semibold hover:underline cursor-pointer"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3.5 sm:space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={enquiryData.name}
                      onChange={(e) => setEnquiryData({ ...enquiryData, name: e.target.value })}
                      className="w-full bg-white border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={enquiryData.email}
                      onChange={(e) => setEnquiryData({ ...enquiryData, email: e.target.value })}
                      className="w-full bg-white border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={enquiryData.phone}
                      onChange={(e) => setEnquiryData({ ...enquiryData, phone: e.target.value })}
                      className="w-full bg-white border border-[#ded5c6] rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                      Message
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Your message..."
                      value={enquiryData.message}
                      onChange={(e) => setEnquiryData({ ...enquiryData, message: e.target.value })}
                      className="w-full bg-white border border-[#ded5c6] rounded-xl p-3 text-xs text-stone-900 focus:outline-none focus:border-[#c59b6d]"
                    ></textarea>
                  </div>

                  {/* Send Enquiry button matching mockup */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1c1917] hover:bg-[#c59b6d] text-white hover:text-stone-950 font-bold rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Send Enquiry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Concierge Direct Dial */}
              <div className="pt-3 sm:pt-4 border-t border-[#ded5c6] flex items-center justify-between text-xs text-stone-600">
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#c59b6d]" />
                  <span>Advisory Desk</span>
                </span>
                <a
                  href="tel:+919876543210"
                  className="font-bold text-stone-900 hover:text-[#c59b6d] transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-[#ebe4d8]">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-[#1c1917]">
                  Similar Luxury Properties
                </h3>
                <p className="text-xs text-stone-500 mt-0.5 sm:mt-1">
                  More curated residences in {property.city}
                </p>
              </div>

              <Link
                to="/buy"
                className="text-xs font-bold text-[#8e6538] hover:underline flex items-center gap-1"
              >
                <span>Browse All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close Lightbox"
            className="absolute top-6 right-6 text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage}
            alt={property.title}
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

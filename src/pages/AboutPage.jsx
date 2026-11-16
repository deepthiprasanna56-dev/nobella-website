import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { stats, services, teamMembers } from "../data/companyData";
import ValueProps from "../components/common/ValueProps";

export default function AboutPage() {
  return (
    <div className="bg-[#fbf9f5] min-h-screen pt-20 pb-20 w-full overflow-x-hidden">
      {/* Banner */}
      <div className="relative bg-[#0d0c0a] text-white py-12 sm:py-16 md:py-20 border-b border-[#2d2720] overflow-hidden w-full">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
            alt="About Nobella Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0a] via-[#0d0c0a]/90 to-transparent z-0"></div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            About Nobella
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-stone-300 font-light max-w-xl">
            Redefining luxury real estate advisory with architectural discernment and unwavering integrity.
          </p>

          <nav className="flex items-center gap-2 text-xs text-stone-400 mt-3 sm:mt-4">
            <Link to="/" className="hover:text-[#c59b6d] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-[#c59b6d] font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-12 sm:py-20 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#9e6c38] block">
                Our Genesis & Story
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1a1714] leading-[1.18]">
                Crafting Exceptional Living Since 2012.
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Founded with a vision to transcend transactional brokerage, Nobella was born out of an appreciation for architectural excellence and private client confidentiality. We believe that a luxury home is not just real estate; it is a multi-generational legacy.
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Over the past decade, our boutique team has curated India's finest private estates, sea-facing penthouses, and landmark commercial hubs. Our deep-rooted relationships with premier architects, family offices, and developers allow us to unlock residences that never reach public listings.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="p-4 bg-white rounded-2xl border border-[#ebe4d8]">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1c1917]">100% Title Checked</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">30-year deep legal encumbrance diligence</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-[#ebe4d8]">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1c1917]">Private Off-Market</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">Discreet acquisitions for business leaders</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#ded5c6] aspect-[4/3] w-full">
                <img
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
                  alt="Nobella Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                  <p className="font-serif italic text-base sm:text-lg text-[#fae6b8]">
                    "Space, light, and proportion are the true luxuries of life."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="bg-[#121110] py-10 sm:py-14 border-y border-[#28231c] text-white w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#d8b58a]">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm text-stone-400 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 sm:py-20 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9e6c38] block mb-1.5">
              Our Capabilities
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1a1714]">
              Comprehensive Real Estate Services
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
              Bespoke solutions designed around the lifestyle and wealth objectives of our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-[#ebe4d8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-[#9e6c38] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-14 sm:py-20 bg-[#f6f1e8] border-t border-[#ebe4d8] w-full">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9e6c38] block mb-1.5">
              Executive Leadership
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1a1714]">
              Guided by Industry Veterans
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1.5">
              Our leadership brings decades of collective experience in ultra-luxury real estate and capital markets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-[#ebe4d8] shadow-sm hover:shadow-md transition-all p-5 text-center flex flex-col items-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-2 ring-[#c59b6d] shadow-md mb-4"
                />
                <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">{member.name}</h3>
                <p className="text-xs font-semibold text-[#9e6c38] mt-0.5">{member.role}</p>
                <p className="text-[11px] text-stone-400 mt-1">{member.experience}</p>
                <p className="text-xs text-stone-600 mt-3 leading-relaxed border-t border-[#f2ede4] pt-3">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Nobella Bar */}
      <ValueProps />
    </div>
  );
}

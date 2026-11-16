import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  CheckCircle2,
  Clock,
  ChevronDown
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { faqs } from "../data/companyData";
import { FacebookIcon, InstagramIcon, XTwitterIcon, LinkedinIcon, YoutubeIcon } from "../components/common/SocialIcons";

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Private Viewing Request",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Message sent successfully! Our concierge team will reach out shortly.", "success");
  };

  return (
    <div className="bg-[#fbf9f5] min-h-screen pt-20 pb-20 w-full overflow-x-hidden">
      {/* Banner matching mockup */}
      <div className="relative bg-[#0d0c0a] text-white py-12 sm:py-16 md:py-20 border-b border-[#2d2720] overflow-hidden w-full">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80"
            alt="Contact Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0a] via-[#0d0c0a]/90 to-transparent z-0"></div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-2">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-stone-300 font-light">
            We'd love to hear from you
          </p>

          <nav className="flex items-center gap-2 text-xs text-stone-400 mt-3 sm:mt-4">
            <Link to="/" className="hover:text-[#c59b6d] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-[#c59b6d] font-medium">Contact</span>
          </nav>
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 mt-8 sm:mt-12">
        {/* 2-Column Card Grid matching mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Card: Get in Touch */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-10 border border-[#e6ded2] shadow-sm space-y-6 sm:space-y-8">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917]">
                Get in Touch
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
                Have questions? We're here to help. Reach out to us and we'll get back to you shortly.
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6 text-xs sm:text-sm">
              {/* Phone */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c59b6d]/15 text-[#9e6c38] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <a
                    href="tel:+919876543210"
                    className="font-bold text-stone-900 hover:text-[#9e6c38] text-sm sm:text-base block transition-colors"
                  >
                    +91 98765 43210
                  </a>
                  <p className="text-[11px] text-stone-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#c59b6d]" />
                    <span>Mon – Sat, 9AM – 7PM IST</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c59b6d]/15 text-[#9e6c38] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <a
                    href="mailto:hello@nobella.com"
                    className="font-bold text-stone-900 hover:text-[#9e6c38] text-sm sm:text-base block transition-colors"
                  >
                    hello@nobella.com
                  </a>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    For general and partnership inquiries
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c59b6d]/15 text-[#9e6c38] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-stone-900 text-sm">
                    123 Luxury Avenue,
                  </p>
                  <p className="text-stone-500 text-xs mt-0.5">
                    Indiranagar, Bengaluru, Karnataka – 560001
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons row matching mockup */}
            <div className="pt-5 sm:pt-6 border-t border-[#f2ede4]">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-3">
                Connect on Social Channels
              </p>
              <div className="flex items-center gap-2.5 sm:gap-3">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#fbf9f5] border border-[#e0d7cb] flex items-center justify-center text-stone-700 hover:text-white hover:bg-[#181614] hover:border-[#181614] transition-all"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#fbf9f5] border border-[#e0d7cb] flex items-center justify-center text-stone-700 hover:text-white hover:bg-[#181614] hover:border-[#181614] transition-all"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="#twitter"
                  aria-label="Twitter"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#fbf9f5] border border-[#e0d7cb] flex items-center justify-center text-stone-700 hover:text-white hover:bg-[#181614] hover:border-[#181614] transition-all"
                >
                  <XTwitterIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#fbf9f5] border border-[#e0d7cb] flex items-center justify-center text-stone-700 hover:text-white hover:bg-[#181614] hover:border-[#181614] transition-all"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#youtube"
                  aria-label="YouTube"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#fbf9f5] border border-[#e0d7cb] flex items-center justify-center text-stone-700 hover:text-white hover:bg-[#181614] hover:border-[#181614] transition-all"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Card: Send a Message Form matching mockup */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#e6ded2] shadow-sm">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] mb-5 sm:mb-6">
              Send a Message
            </h2>

            {submitted ? (
              <div className="py-8 sm:py-12 text-center space-y-4 animate-scale-up">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  Message Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                  Thank you for connecting with Nobella. A dedicated relationship consultant will reach out via phone/email shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#1c1917] text-white text-xs font-semibold rounded-full hover:bg-[#c59b6d] hover:text-stone-950 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c59b6d] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c59b6d] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c59b6d] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Type your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#fbf9f5] border border-[#ded5c6] rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#c59b6d] transition-colors"
                  ></textarea>
                </div>

                {/* Send Message Button matching mockup (gold button with arrow) */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-[#c59b6d] to-[#d6b07e] text-stone-950 font-bold rounded-xl text-xs sm:text-sm tracking-wide hover:shadow-lg hover:shadow-[#c59b6d]/20 hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Send Message</span>
                  <span className="text-base leading-none">→</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-[#ebe4d8]">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9e6c38] block mb-1">
              Common Inquiries
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1a1714]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#ebe4d8] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-stone-900 text-xs sm:text-sm cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform duration-300 shrink-0 ${
                      openFaq === index ? "rotate-180 text-[#c59b6d]" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

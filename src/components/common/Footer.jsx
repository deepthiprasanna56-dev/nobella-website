import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon, XTwitterIcon, LinkedinIcon, YoutubeIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-[#0b0a09] text-stone-300 border-t border-[#231f1a] pt-14 sm:pt-16 pb-10 w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 pb-12 border-b border-[#231f1a]">
          {/* Brand info matching mockup */}
          <div className="space-y-4">
            <Logo />
            <p className="font-serif italic text-[#d1b089] text-base pt-1">
              "Where Luxury Finds Its Address."
            </p>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Nobella curates India's most prestigious estates, sea-facing penthouses, and architectural masterworks with absolute discretion and bespoke advisory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/" className="hover:text-[#c59b6d] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/buy" className="hover:text-[#c59b6d] transition-colors">
                  Buy Properties
                </Link>
              </li>
              <li>
                <Link to="/rent" className="hover:text-[#c59b6d] transition-colors">
                  Rent Properties
                </Link>
              </li>
              <li>
                <Link to="/sell" className="hover:text-[#c59b6d] transition-colors">
                  Sell with Nobella
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#c59b6d] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#c59b6d] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#c59b6d] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#c59b6d] transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#c59b6d] shrink-0" />
                <a href="mailto:hello@nobella.com" className="hover:text-[#c59b6d] transition-colors">
                  hello@nobella.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c59b6d] shrink-0 mt-0.5" />
                <span>123 Luxury Avenue, Indiranagar, Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>

          {/* Follow Us & Social Icons */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-white uppercase mb-4">
              Follow Us
            </h4>
            <p className="text-xs text-stone-400 mb-4">
              Follow our private releases and architectural showcases.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#181614] border border-[#2e2820] flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b6d] transition-all"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#181614] border border-[#2e2820] flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b6d] transition-all"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-[#181614] border border-[#2e2820] flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b6d] transition-all"
              >
                <XTwitterIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#181614] border border-[#2e2820] flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b6d] transition-all"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-[#181614] border border-[#2e2820] flex items-center justify-center text-stone-300 hover:text-white hover:border-[#c59b6d] transition-all"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 NOBELLA Luxury Real Estates. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-stone-300 transition-colors">
              Privacy Policy
            </a>
            <span className="text-stone-700">|</span>
            <a href="#terms" className="hover:text-stone-300 transition-colors">
              Terms & Conditions
            </a>
            <span className="text-stone-700">|</span>
            <a href="#rera" className="hover:text-stone-300 transition-colors">
              RERA Disclosures
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

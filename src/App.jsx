import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AuthModal from "./components/common/AuthModal";
import WishlistDrawer from "./components/common/WishlistDrawer";
import ScrollToTop from "./components/common/ScrollToTop";

// Pages
import HomePage from "./pages/HomePage";
import BuyPage from "./pages/BuyPage";
import RentPage from "./pages/RentPage";
import SellPage from "./pages/SellPage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-[#fbf9f5] text-[#221f1c]">
              <Navbar />

              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/buy" element={<BuyPage />} />
                  <Route path="/rent" element={<RentPage />} />
                  <Route path="/sell" element={<SellPage />} />
                  <Route path="/property/:id" element={<PropertyDetailsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>

              <Footer />

              {/* Global Modals & Drawers */}
              <AuthModal />
              <WishlistDrawer />
            </div>
          </Router>
        </AuthProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}

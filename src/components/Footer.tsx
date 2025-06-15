"use client"

import { Instagram, MessageCircle, Send } from "lucide-react"

export default function Footer() {
  return (
    <>
      {/* Import Poppins font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      `}</style>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <a
                  href="/"
                  className="text-3xl font-bold transition-all duration-300 hover:scale-105 inline-block"
                  style={{
                    color: "#0175c3",
                    fontFamily: "'Poppins', sans-serif",
                    textShadow: "0 2px 4px rgba(1, 117, 195, 0.1)",
                  }}
                >
                  EduStarr
                </a>
              </div>
              <p className="text-lg font-medium mb-4 animate-fade-in" style={{ color: "#0B1D3A" }}>
                Empowering Futures Through Education.
              </p>
              <p
                className="text-sm leading-relaxed max-w-md animate-fade-in"
                style={{
                  color: "#111111",
                  animationDelay: "0.2s",
                  animationFillMode: "both",
                }}
              >
                Join India's aspiring young minds in the EduStarr Scholastic Aptitude Test (ESAT) 2025. A national
                platform for academic excellence and scholarships.
              </p>
            </div>

            {/* Quick Links */}
            <div className="animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#0B1D3A" }}>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/register"
                    className="text-sm transition-all duration-300 hover:translate-x-2 hover:text-blue-600 inline-block"
                    style={{ color: "#111111" }}
                  >
                    Sign Up
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="text-sm transition-all duration-300 hover:translate-x-2 hover:text-blue-600 inline-block"
                    style={{ color: "#111111" }}
                  >
                    Sign In
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-sm transition-all duration-300 hover:translate-x-2 hover:text-blue-600 inline-block"
                    style={{ color: "#111111" }}
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media & Contact */}
            <div className="animate-slide-up" style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "#0B1D3A" }}>
                Connect With Us
              </h3>
              <div className="space-y-4">
                {/* Instagram */}
                <div className="flex items-center space-x-3 group">
                  <div
                    className="p-2 rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ backgroundColor: "#F8F9FB" }}
                  >
                    <Instagram
                      className="w-5 h-5 transition-colors duration-300 group-hover:text-pink-500"
                      style={{ color: "#0175c3" }}
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Instagram</p>
                    <a
                      href="https://instagram.com/esat.edustarr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium transition-colors duration-300 hover:text-pink-500"
                      style={{ color: "#111111" }}
                    >
                      @esat.edustarr
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center space-x-3 group opacity-60">
                  <div className="p-2 rounded-lg transition-all duration-300" style={{ backgroundColor: "#F8F9FB" }}>
                    <MessageCircle className="w-5 h-5" style={{ color: "#9CA3AF" }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">WhatsApp</p>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </div>

                {/* Telegram */}
                <div className="flex items-center space-x-3 group opacity-60">
                  <div className="p-2 rounded-lg transition-all duration-300" style={{ backgroundColor: "#F8F9FB" }}>
                    <Send className="w-5 h-5" style={{ color: "#9CA3AF" }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Telegram</p>
                    <p className="text-sm text-gray-400">Coming Soon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6" style={{ backgroundColor: "#F8F9FB" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-sm font-medium animate-fade-in" style={{ color: "#0B1D3A" }}>
                  © 2025 EduStarr. All rights reserved.
                </p>
              </div>

              {/* Quick Links for Mobile */}
              <div className="flex flex-wrap justify-center md:justify-end items-center space-x-1 text-sm">
                <a
                  href="/privacy-policy"
                  className="px-3 py-1 transition-all duration-300 hover:bg-white hover:shadow-sm rounded-md"
                  style={{ color: "#111111" }}
                >
                  Privacy Policy
                </a>
                <span style={{ color: "#9CA3AF" }}>|</span>
                <a
                  href="/terms-conditions"
                  className="px-3 py-1 transition-all duration-300 hover:bg-white hover:shadow-sm rounded-md"
                  style={{ color: "#111111" }}
                >
                  Terms & Conditions
                </a>
                <span style={{ color: "#9CA3AF" }}>|</span>
                <a
                  href="/contact"
                  className="px-3 py-1 transition-all duration-300 hover:bg-white hover:shadow-sm rounded-md"
                  style={{ color: "#111111" }}
                >
                  Contact Us
                </a>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#0175c3", animationDelay: "0s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#D4AF37", animationDelay: "0.5s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: "#0175c3", animationDelay: "1s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95 z-50"
          style={{
            backgroundColor: "#D4AF37",
            color: "#0B1D3A",
          }}
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </footer>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useAuth } from "../context/useAuth"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"
            : "bg-white/90 backdrop-blur-md border-b border-white/10"
        }`}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <a
                href="/"
                className="text-3xl font-bold text-[#0175c3] hover:text-[#0175c3] transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 tracking-tight"
                style={{
                  textShadow: '0 2px 10px rgba(1, 117, 195, 0.2)',
                  filter: 'drop-shadow(0 1px 2px rgba(1, 117, 195, 0.1))'
                }}
              >
                EduStarr
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="/"
                className="relative px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-300 ease-out hover:bg-white/60 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 group overflow-hidden"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
              </a>
              <a
                href="/about"
                className="relative px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-300 ease-out hover:bg-white/60 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 group overflow-hidden"
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
              </a>
              <a
                href="/contact"
                className="relative px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-300 ease-out hover:bg-white/60 hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 group overflow-hidden"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
              </a>

              {/* Auth-based buttons */}
              <div className="flex items-center space-x-3 ml-6 pl-6">
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
                {isAuthenticated ? (
                  <>
                    <a
                      href="/dashboard"
                      className="relative px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:scale-95 overflow-hidden group"
                    >
                      <span className="relative z-10">Dashboard</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </a>
                    <button
                      onClick={handleLogout}
                      className="relative px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-300 ease-out hover:shadow-md hover:shadow-red-100 hover:-translate-y-0.5 active:scale-95 group"
                    >
                      <span className="relative z-10">Logout</span>
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="relative px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 active:scale-95 overflow-hidden group"
                  >
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </a>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="p-3 text-gray-600 hover:text-gray-900 hover:bg-white/60 rounded-xl transition-all duration-300 ease-out hover:shadow-md hover:shadow-black/5 hover:scale-105 active:scale-95"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 relative">
                  <Menu
                    className={`absolute inset-0 transition-all duration-300 ease-out ${
                      isMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 transition-all duration-300 ease-out ${
                      isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-6 space-y-2 border-t border-white/20">
              <a
                href="/"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white/60 rounded-xl transition-all duration-300 ease-out hover:shadow-md hover:shadow-black/5 transform hover:translate-x-1"
                onClick={closeMenu}
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white/60 rounded-xl transition-all duration-300 ease-out hover:shadow-md hover:shadow-black/5 transform hover:translate-x-1"
                onClick={closeMenu}
              >
                About
              </a>
              <a
                href="/contact"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-white/60 rounded-xl transition-all duration-300 ease-out hover:shadow-md hover:shadow-black/5 transform hover:translate-x-1"
                onClick={closeMenu}
              >
                Contact
              </a>

              {/* Mobile auth buttons */}
              <div className="pt-4 mt-4 border-t border-white/20 space-y-3">
                {isAuthenticated ? (
                  <>
                    <a
                      href="/dashboard"
                      className="block px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 ease-out text-center hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-95"
                      onClick={closeMenu}
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-3 text-base font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-300 ease-out text-center hover:shadow-md hover:shadow-red-100 active:scale-95"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <a
                    href="/login"
                    className="block px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 ease-out text-center hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-95"
                    onClick={closeMenu}
                  >
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-out"
          onClick={closeMenu}
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        />
      )}

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20" />
    </>
  )
}
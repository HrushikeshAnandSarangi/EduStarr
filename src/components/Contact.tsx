"use client"
import { useState } from "react"
import type React from "react"
import { Mail, Send, CheckCircle, AlertCircle, User } from "lucide-react"
import { supabase } from '@/lib/supabaseClient'

export default function Contact() {
  // Form state - includes name, email, and message to match schema
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission - save to Supabase database
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    // Basic validation
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setSubmitError("Please fill in all required fields.")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setSubmitError("Please enter a valid email address.")
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError("")

    try {
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            name: formState.name.trim(),
            email: formState.email.trim(),
            message: formState.message.trim(),
          }
        ])
        .select()

      if (error) {
        throw error
      }

      // Success - reset form and show success message
      setSubmitSuccess(true)
      setFormState({
        name: "",
        email: "",
        message: "",
      })

    } catch (error: any) {
      console.error('Error submitting form:', error)
      setSubmitError(
        error.message || "Failed to submit your message. Please try again or contact us directly."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // FAQ data
  const faqs = [
    {
      question: "How can I register for ESAT 2025?",
      answer:
        "You can register for ESAT 2025 through our online registration portal. Simply click on the 'Register Now' button on our homepage and follow the instructions.",
    },
    {
      question: "What is the last date for registration?",
      answer:
        "The last date for registration is October 10, 2025. We recommend registering early to avoid any last-minute issues.",
    },
    {
      question: "How will I appear for the test?",
      answer:
        "The test link will be sent to your registered email by 11th October. Please note that the link will only be active during the designated test window.",
    },
    {
      question: "Is there any negative marking in ESAT?",
      answer: "Yes, there is a negative marking of -1 for each wrong answer. Correct answers are awarded +4 marks.",
    },
  ]

  return (
    <>
      {/* Import Poppins font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="min-h-screen" style={{ backgroundColor: "#F8F9FB" }}>
        {/* Section 1: Hero */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full mb-6 animate-slide-up"
                style={{ backgroundColor: "#0175c3", color: "white" }}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-sm sm:text-base">Get in Touch</span>
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 animate-slide-up leading-tight px-4"
                style={{
                  color: "#0B1D3A",
                  fontFamily: "'Poppins', sans-serif",
                  animationDelay: "0.2s",
                  animationFillMode: "both",
                }}
              >
                Contact Our Support Team
              </h1>

              <p
                className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 leading-relaxed animate-slide-up max-w-4xl mx-auto px-4"
                style={{
                  color: "#4A5568",
                  animationDelay: "0.4s",
                  animationFillMode: "both",
                }}
              >
                Have questions about ESAT 2025? Our dedicated support team is here to help. 
                Send us your inquiry and expect a response within 24-48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Contact Form and Information */}
        <section className="py-12 sm:py-16 lg:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Information - Left Side */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 sm:p-8 rounded-2xl shadow-lg h-full">
                  <h2
                    className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 animate-slide-up"
                    style={{
                      color: "#0B1D3A",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Contact Information
                  </h2>

                  <div className="space-y-6 sm:space-y-8">
                    {/* Email */}
                    <div className="flex items-start animate-slide-up" style={{ animationDelay: "0.1s" }}>
                      <div className="p-3 rounded-lg mr-4 flex-shrink-0" style={{ backgroundColor: "rgba(1, 117, 195, 0.1)" }}>
                        <Mail className="w-6 h-6" style={{ color: "#0175c3" }} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-600 mb-1 font-medium">Email Address</p>
                        <a
                          href="mailto:edustarr.dev@gmail.com"
                          className="font-semibold hover:underline transition-all duration-300 text-lg break-all"
                          style={{ color: "#0175c3" }}
                        >
                          support@edustarr.in
                        </a>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          Our primary support channel. We respond to all inquiries within 24-48 hours during business days.
                        </p>
                      </div>
                    </div>

                    {/* Support Hours */}
                    <div className="bg-white p-4 sm:p-6 rounded-xl animate-slide-up border border-blue-100" style={{ animationDelay: "0.2s" }}>
                      <h3 className="font-semibold mb-3 text-lg" style={{ color: "#0B1D3A" }}>
                        Support Hours
                      </h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <div className="flex justify-between items-center">
                          <span>Monday - Friday</span>
                          <span className="font-medium">9:00 AM - 6:00 PM IST</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Saturday</span>
                          <span className="font-medium">10:00 AM - 4:00 PM IST</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Sunday</span>
                          <span className="font-medium text-red-600">Closed</span>
                        </div>
                      </div>
                    </div>

                    {/* What to Expect */}
                    <div className="bg-white p-4 sm:p-6 rounded-xl animate-slide-up border border-blue-100" style={{ animationDelay: "0.3s" }}>
                      <h3 className="font-semibold mb-3 text-lg" style={{ color: "#0B1D3A" }}>
                        What to Expect
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Personalized response to your specific inquiry</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Quick turnaround within 24-48 hours</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Follow-up support until your issue is resolved</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Direct access to our technical support team</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form - Right Side */}
              <div className="lg:col-span-3">
                <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-lg border border-gray-100">
                  <h2
                    className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 animate-slide-up"
                    style={{
                      color: "#0B1D3A",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Send Us a Message
                  </h2>

                  {submitSuccess ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 sm:p-8 text-center animate-fade-in">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-green-800">Message Sent Successfully!</h3>
                      <p className="text-green-700 mb-6 leading-relaxed">
                        Thank you for contacting us! We've received your message and will respond to your inquiry 
                        within 24-48 hours. Please check your email regularly, including your spam folder.
                      </p>
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:bg-green-100 border border-green-300"
                        style={{ color: "#0B1D3A" }}
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base"
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-base"
                            placeholder="your.email@example.com"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          We'll use this email to respond to your inquiry
                        </p>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-semibold mb-2"
                          style={{ color: "#0B1D3A" }}
                        >
                          Your Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className="w-full px-4 py-3 sm:py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-base"
                          placeholder="Please describe your inquiry about ESAT 2025. Include details about registration, exam logistics, technical issues, or any other questions you may have..."
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-2">
                          Minimum 10 characters. The more details you provide, the better we can assist you.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full px-8 py-4 sm:py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl transform active:scale-[0.98] relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                          style={{
                            backgroundColor: "#0175c3",
                            color: "white",
                            boxShadow: "0 10px 25px rgba(1, 117, 195, 0.3)",
                          }}
                        >
                          <span className="relative z-10 flex items-center justify-center">
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Sending Message...
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5 mr-2" /> Send Message
                              </>
                            )}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                      </div>

                      {/* Error Message */}
                      {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start animate-fade-in">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-red-700 text-sm font-medium mb-1">Error sending message</p>
                            <p className="text-red-600 text-sm">{submitError}</p>
                          </div>
                        </div>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Enhanced FAQs */}
        <section className="py-12 sm:py-16 lg:py-20 px-4" style={{ backgroundColor: "#F8F9FB" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 animate-slide-up"
                style={{
                  color: "#0B1D3A",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-lg sm:text-xl max-w-3xl mx-auto animate-slide-up leading-relaxed"
                style={{
                  color: "#4A5568",
                  animationDelay: "0.2s",
                  animationFillMode: "both",
                }}
              >
                Quick answers to the most common questions about ESAT 2025. 
                Can't find what you're looking for? Contact us directly.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up border border-gray-100 h-full"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-4 leading-tight" style={{ color: "#0B1D3A" }}>
                    {faq.question}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "#111111" }}>{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 sm:mt-16 text-center animate-slide-up" style={{ animationDelay: "0.8s" }}>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto">
                <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "#0B1D3A" }}>
                  Still Have Questions?
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: "#4A5568" }}>
                  Our support team is ready to help with any specific questions about ESAT 2025.
                </p>
                <a
                  href="mailto:support@edustarr.in"
                  className="inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 group"
                  style={{
                    backgroundColor: "#Ffe400",
                    color: "#0B1D3A",
                    boxShadow: "0 10px 25px rgba(212, 175, 55, 0.3)",
                    textDecoration: "none",
                  }}
                >
                  <Mail className="w-5 h-5 mr-2" /> Contact Support Team
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        /* Custom scrollbar for better UX */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #0175c3;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #014a8a;
        }
      `}</style>
    </>
  )
}
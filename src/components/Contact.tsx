"use client"
import { useState } from "react"
import type React from "react"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function Contact() {
  // Form state - simplified to just email and message
  const [formState, setFormState] = useState({
    email: "",
    message: "",
  })

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission - opens Gmail with pre-filled content
  const handleSubmit = () => {
    // Basic validation
    if (!formState.email || !formState.message) {
      setSubmitError(true)
      return
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)

    try {
      // Developer's email
      const developerEmail = "edustarr.dev@gmail.com"
      
      // Create email subject and body
      const subject = encodeURIComponent("ESAT 2025 Inquiry from Contact Form")
      const body = encodeURIComponent(
        `From: ${formState.email}\n\nMessage:\n${formState.message}\n\n---\nThis email was sent from the ESAT 2025 contact form.`
      )
      
      // Create mailto URL
      const mailtoUrl = `mailto:${developerEmail}?subject=${subject}&body=${body}`
      
      // Open email client
      window.open(mailtoUrl, '_blank')
      
      // Simulate processing time
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitSuccess(true)
        // Reset form after successful submission
        setFormState({
          email: "",
          message: "",
        })
      }, 1000)
      
    } catch (error) {
      console.error('Error opening email client:', error)
      setIsSubmitting(false)
      setSubmitError(true)
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
      question: "How will I receive my admit card?",
      answer:
        "Your admit card will be available for download from your registered account 7 days before the examination date. You will also receive an email notification.",
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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      `}</style>

      <div style={{ backgroundColor: "#F8F9FB" }}>
        {/* Section 1: Hero */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div
                className="inline-block px-6 py-3 rounded-full mb-6 animate-slide-up"
                style={{ backgroundColor: "#0175c3", color: "white" }}
              >
                <span className="font-medium">📧 Email Us</span>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 animate-slide-up leading-tight"
                style={{
                  color: "#0B1D3A",
                  fontFamily: "'Poppins', sans-serif",
                  animationDelay: "0.2s",
                  animationFillMode: "both",
                }}
              >
                Contact Us
              </h1>

              <p
                className="text-xl md:text-2xl mb-12 leading-relaxed animate-slide-up max-w-3xl mx-auto"
                style={{
                  color: "#111111",
                  animationDelay: "0.4s",
                  animationFillMode: "both",
                }}
              >
                Have questions about ESAT 2025? Send us an email and we'll get back to you within 24-48 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Email Contact Form */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Email Information */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg h-full">
                  <h2
                    className="text-2xl font-bold mb-8 animate-slide-up"
                    style={{
                      color: "#0B1D3A",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Email Contact
                  </h2>

                  <div className="space-y-8">
                    {/* Email */}
                    <div className="flex items-start animate-slide-up" style={{ animationDelay: "0.1s" }}>
                      <div className="p-3 rounded-lg mr-4" style={{ backgroundColor: "rgba(1, 117, 195, 0.1)" }}>
                        <Mail className="w-6 h-6" style={{ color: "#0175c3" }} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email Address</p>
                        <a
                          href="mailto:edustarr.dev@gmail.com"
                          className="font-medium hover:underline transition-all duration-300 text-lg"
                          style={{ color: "#0175c3" }}
                        >
                          edustarr.dev@gmail.com
                        </a>
                        <p className="text-sm text-gray-500 mt-2">
                          We typically respond within 24-48 hours during business days.
                        </p>
                      </div>
                    </div>

                    {/* Response Time */}
                    <div className="bg-white p-4 rounded-lg animate-slide-up" style={{ animationDelay: "0.2s" }}>
                      <h3 className="font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        What to expect:
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Quick response within 24-48 hours</li>
                        <li>• Detailed answers to your questions</li>
                        <li>• Follow-up support if needed</li>
                        <li>• Direct connection to our support team</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <h2
                    className="text-2xl font-bold mb-6 animate-slide-up"
                    style={{
                      color: "#0B1D3A",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Send Us an Email
                  </h2>

                  {submitSuccess ? (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-fade-in">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100">
                          <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-green-800">Email Client Opened!</h3>
                      <p className="text-green-700 mb-4">
                        Your default email client should have opened with your message pre-filled. 
                        Please send the email from your email client to complete the process.
                      </p>
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-green-100"
                        style={{ color: "#0B1D3A" }}
                      >
                        Send Another Email
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6 animate-slide-up">
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: "#0B1D3A" }}>
                          Your Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          We'll use this email address to respond to your inquiry
                        </p>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-2"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Please describe your inquiry about ESAT 2025 in detail. Include any specific questions about registration, exam details, results, or technical support..."
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">
                          The more details you provide, the better we can assist you
                        </p>
                      </div>

                      {/* Submit Button */}
                      <div>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="w-full px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
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
                                Opening Email Client...
                              </>
                            ) : (
                              <>
                                <Send className="w-5 h-5 mr-2" /> Open Gmail to Send
                              </>
                            )}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                      </div>

                      {/* Info Box */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <Mail className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-800 mb-1">How it works:</h4>
                            <p className="text-blue-700 text-sm">
                              When you click "Open Gmail to Send", your default email client will open with your message pre-filled. 
                              Simply review and send the email to complete your inquiry.
                            </p>
                          </div>
                        </div>
                      </div>

                      {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                          <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                          <p className="text-red-700 text-sm">
                            There was an error opening your email client. Please try again later or contact us directly at
                            edustarr.dev@gmail.com
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: FAQs */}
        <section className="py-16 px-4" style={{ backgroundColor: "#F8F9FB" }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2
                className="text-3xl font-bold mb-4 animate-slide-up"
                style={{
                  color: "#0B1D3A",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Frequently Asked Questions
              </h2>
              <p
                className="text-lg max-w-2xl mx-auto animate-slide-up"
                style={{
                  color: "#111111",
                  animationDelay: "0.2s",
                  animationFillMode: "both",
                }}
              >
                Find quick answers to common questions about ESAT 2025
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 animate-slide-up border border-gray-100"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <h3 className="text-xl font-semibold mb-3" style={{ color: "#0B1D3A" }}>
                    {faq.question}
                  </h3>
                  <p style={{ color: "#111111" }}>{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
              <p className="text-lg mb-4" style={{ color: "#111111" }}>
                Still have questions?
              </p>
              <a
                href="mailto:edustarr.dev@gmail.com"
                className="inline-block px-8 py-3 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 relative overflow-hidden group"
                style={{
                  backgroundColor: "#D4AF37",
                  color: "#0B1D3A",
                  boxShadow: "0 10px 25px rgba(212, 175, 55, 0.3)",
                  textDecoration: "none",
                }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Mail className="w-5 h-5 mr-2" /> Email Us Directly
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </section>
      </div>

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
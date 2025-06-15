"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/useAuth"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import {
  User,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Gift,
  Calendar,
  Mail,
  FileText,
  ExternalLink,
  Loader2,
  Lock,
  Unlock,
  Star,
  Trophy,
  BookOpen,
  Clock,
  Shield,
  Download,
} from "lucide-react"

// Types for Razorpay
interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  image?: string
  order_id: string
  handler: (response: RazorpayResponse) => Promise<void>
  prefill: {
    name: string
    email: string
    contact: string
  }
  notes?: {
    address?: string
  }
  theme: {
    color: string
  }
}

declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions,
    ) => {
      open(): void
      on(event: string, callback: (response: any) => void): void
    }
  }
}

interface Registration {
  id: string
  user_id: string
  full_name: string
  email: string
  registration_status: string
  payment_id?: string
  order_id?: string
  payment_date?: string
  referral_code?: string
  referral_used: boolean
  dob?: string
  gender?: string
  mobile?: string
  whatsapp?: string
  photo_url?: string
  class?: string
  board?: string
  school_name?: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [paymentLoading, setPaymentLoading] = useState(false)
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [referralCode, setReferralCode] = useState("")
  const [referralError, setReferralError] = useState("")
  const [referralLoading, setReferralLoading] = useState(false)
  const [profileComplete, setProfileComplete] = useState(false)

  // Redirect to login if no user
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login")
    }
  }, [user, loading, router])

  // Fetch registration data
  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("registrations").select("*").eq("user_id", user.id).single()

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "not found" error
          console.error("Error fetching registration:", error)
        } else if (data) {
          setRegistration(data)
        }
      } catch (error) {
        console.error("Unexpected error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  useEffect(() => {
    if (registration) {
      setProfileComplete(checkProfileCompletion(registration))
    }
  }, [registration])

  const handleReferralSubmit = async () => {
    if (!user || !registration) {
      setReferralError("Please complete your registration first.")
      return
    }

    if (!referralCode.trim()) {
      setReferralError("Please enter a valid referral code.")
      return
    }

    // Check if referral already used
    if (registration.referral_used) {
      setReferralError("You have already used a referral code.")
      return
    }

    setReferralLoading(true)
    setReferralError("")

    try {
      // Check if referral code exists in referrals table
      const { data: referralData, error: referralError } = await supabase
        .from("referrals")
        .select("*")
        .eq("referral_code", referralCode.trim())
        .single()

      if (referralError) {
        if (referralError.code === "PGRST116") {
          setReferralError("Referral code not found.")
        } else {
          setReferralError("Error checking referral code. Please try again.")
          console.error("Referral lookup error:", referralError)
        }
        return
      }

      if (!referralData) {
        setReferralError("Referral code not found.")
        return
      }

      // Use Supabase transaction-like approach with RPC or multiple operations
      // First, update the registrations table
      const { error: updateError } = await supabase
        .from("registrations")
        .update({
          referral_code: referralCode.trim(),
          referral_used: true,
        })
        .eq("user_id", user.id)

      if (updateError) {
        setReferralError("Could not apply referral code. Please try again.")
        console.error("Registration update error:", updateError)
        return
      }

      // Then update the referral count
      const { error: countUpdateError } = await supabase
        .from("referrals")
        .update({ count: (referralData.count || 0) + 1 })
        .eq("referral_code", referralCode.trim())

      if (countUpdateError) {
        console.error("Referral count update error:", countUpdateError)
        // Don't show error to user as the main operation succeeded
      }

      // Refresh registration data
      const { data: updatedData } = await supabase.from("registrations").select("*").eq("user_id", user.id).single()

      if (updatedData) {
        setRegistration(updatedData)
        setReferralCode("")
        setReferralError("Referral code applied successfully! You can now access exclusive resources.")
      }
    } catch (error) {
      console.error("Unexpected referral error:", error)
      setReferralError("An unexpected error occurred. Please try again.")
    } finally {
      setReferralLoading(false)
    }
  }

  const checkProfileCompletion = (reg: Registration) => {
    const requiredFields = ["dob", "gender", "mobile", "class", "board", "school_name"]
    return requiredFields.every(
      (field) => reg[field as keyof Registration] && String(reg[field as keyof Registration]).trim() !== "",
    )
  }

  const handlePayment = async () => {
    if (!user) {
      alert("Please login to continue with payment.")
      return
    }

    if (!registration) {
      alert("Please complete your registration first.")
      return
    }

    setPaymentLoading(true)

    try {
      // Payment configuration
      const amount = 20000 // Amount in paise (₹200)
      const currency = "INR"
      const receiptId = `receipt_${Date.now()}`

      // Step 1: Create order
      const response = await fetch("/api/payments/order", {
        method: "POST",
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Failed to create order: ${errorText}`)
      }

      const order = await response.json()
      console.log("Order created:", order)

      // Step 2: Configure Razorpay options
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency,
        name: "EduStarr",
        description: "Registration Payment - EduStarr",
        order_id: order.id,
        handler: async (response: RazorpayResponse) => {
          try {
            // Step 3: Validate payment
            const validateRes = await fetch("/api/payments/order/validate", {
              method: "POST",
              body: JSON.stringify(response),
              headers: {
                "Content-Type": "application/json",
              },
            })

            const jsonRes = await validateRes.json()
            console.log("Validation response:", jsonRes)

            if (validateRes.ok && jsonRes.msg === "success") {
              // Step 4: Update registration status in Supabase
              const { error } = await supabase
                .from("registrations")
                .update({
                  registration_status: "submitted",
                  payment_id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id,
                  payment_date: new Date().toISOString(),
                })
                .eq("user_id", user.id)

              if (error) {
                console.error("Database update error:", error)
                alert("Payment successful but failed to update registration. Please contact support.")
              } else {
                alert("Payment successful! Registration submitted.")
                // Refresh the registration data
                const { data } = await supabase.from("registrations").select("*").eq("user_id", user.id).single()
                if (data) setRegistration(data)
              }
            } else {
              alert("Payment validation failed. Please contact support.")
            }
          } catch (error) {
            console.error("Payment validation error:", error)
            alert("Payment validation failed. Please contact support.")
          }
        },
        prefill: {
          name: registration?.full_name || user?.email || "User",
          email: user?.email || "",
          contact: registration?.mobile || "9000000000",
        },
        notes: {
          address: "EduStarr Registration Payment",
        },
        theme: {
          color: "#0175c3",
        },
      }

      // Step 3: Initialize and open Razorpay
      const rzp = new window.Razorpay(options)

      // Handle payment failure
      rzp.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error)
        alert(`Payment failed: ${response.error.description}`)
        setPaymentLoading(false)
      })

      // Open the payment modal
      rzp.open()
    } catch (error) {
      console.error("Payment initialization error:", error)
      alert("Payment initialization failed. Please try again.")
      setPaymentLoading(false)
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      alert("Please login to update your profile.")
      return
    }

    const form = e.currentTarget
    const formData = new FormData(form)

    const updates = {
      dob: (formData.get("dob") as string) || null,
      gender: (formData.get("gender") as string) || null,
      mobile: (formData.get("mobile") as string) || null,
      whatsapp: (formData.get("whatsapp") as string) || null,
      class: (formData.get("class") as string) || null,
      board: (formData.get("board") as string) || null,
      school_name: (formData.get("school_name") as string) || null,
    }

    try {
      const { error } = await supabase.from("registrations").update(updates).eq("user_id", user.id)

      if (error) {
        alert("Update failed: " + error.message)
        console.error("Profile update error:", error)
      } else {
        alert("Profile updated successfully!")
        // Refresh the registration data
        const { data } = await supabase.from("registrations").select("*").eq("user_id", user.id).single()
        if (data) setRegistration(data)
      }
    } catch (error) {
      console.error("Unexpected profile update error:", error)
      alert("An unexpected error occurred. Please try again.")
    }
  }

  // Show loading state
  if (loading) {
    return (
      <>
        {/* Import Poppins font */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}</style>

        <div style={{ backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center animate-fade-in">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-full border-4 border-blue-200 animate-spin"
                    style={{ borderTopColor: "#0175c3" }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-6 h-6" style={{ color: "#0175c3" }} />
                  </div>
                </div>
              </div>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: "#0B1D3A", fontFamily: "'Poppins', sans-serif" }}
              >
                Loading Your Dashboard
              </h2>
              <p style={{ color: "#111111" }}>Please wait while we fetch your information...</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Show message if no registration found
  if (!registration) {
    return (
      <>
        {/* Import Poppins font */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        `}</style>

        <div style={{ backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
          <div className="max-w-4xl mx-auto p-6">
            <div className="text-center py-20 animate-fade-in">
              <div className="flex justify-center mb-8">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(1, 117, 195, 0.1)" }}
                >
                  <User className="w-12 h-12" style={{ color: "#0175c3" }} />
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-4" style={{ color: "#0B1D3A", fontFamily: "'Poppins', sans-serif" }}>
                Welcome to EduStarr!
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: "#111111" }}>
                You haven't started your registration for ESAT 2025 yet. Begin your journey towards academic excellence
                today!
              </p>
              <button
                onClick={() => router.push("/registrations")}
                className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 relative overflow-hidden group"
                style={{
                  backgroundColor: "#0175c3",
                  color: "white",
                  boxShadow: "0 10px 25px rgba(1, 117, 195, 0.3)",
                }}
              >
                <span className="relative z-10 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Start Registration
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  const isSubmitted = registration.registration_status === "submitted"
  const hasPaymentInfo = registration.payment_id && registration.order_id

  return (
    <>
      {/* Import Poppins font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      `}</style>

      <div style={{ backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-2xl shadow-xl animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Welcome back, {registration.full_name || user?.email}!
                  </h1>
                  <p className="text-blue-100 text-lg">Your personalized dashboard for ESAT 2025 journey</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Status Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 animate-slide-up">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: "rgba(1, 117, 195, 0.1)" }}
                >
                  <FileText className="w-6 h-6" style={{ color: "#0175c3" }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: "#0B1D3A", fontFamily: "'Poppins', sans-serif" }}>
                  Registration Status
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* Status */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    {isSubmitted ? (
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-2 text-amber-600" />
                    )}
                    <p className="text-sm font-medium text-gray-600">Status</p>
                  </div>
                  <p className="font-bold text-lg">
                    {isSubmitted ? (
                      <span className="text-green-600">Submitted</span>
                    ) : (
                      <span className="text-amber-600">Pending Payment</span>
                    )}
                  </p>
                </div>

                {/* Email */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Mail className="w-5 h-5 mr-2" style={{ color: "#0175c3" }} />
                    <p className="text-sm font-medium text-gray-600">Email</p>
                  </div>
                  <p className="font-medium text-sm" style={{ color: "#0B1D3A" }}>
                    {registration.email || user?.email}
                  </p>
                </div>

                {/* Exam Date */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-5 h-5 mr-2" style={{ color: "#D4AF37" }} />
                    <p className="text-sm font-medium text-gray-600">Exam Date</p>
                  </div>
                  <p className="font-medium text-sm" style={{ color: "#0B1D3A" }}>
                    Will be notified via email
                  </p>
                </div>

                {/* Payment ID */}
                {hasPaymentInfo && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 mr-2 text-green-600" />
                      <p className="text-sm font-medium text-gray-600">Payment ID</p>
                    </div>
                    <p className="font-mono text-xs" style={{ color: "#0B1D3A" }}>
                      {registration.payment_id}
                    </p>
                  </div>
                )}

                {/* Payment Date */}
                {registration.payment_date && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 mr-2" style={{ color: "#0175c3" }} />
                      <p className="text-sm font-medium text-gray-600">Payment Date</p>
                    </div>
                    <p className="font-medium text-sm" style={{ color: "#0B1D3A" }}>
                      {new Date(registration.payment_date).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {!isSubmitted && (
                  <>
                    {!profileComplete ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-4">
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4 flex-shrink-0">
                            <AlertCircle className="w-6 h-6 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-amber-800 mb-2">Complete Your Profile First</h3>
                            <p className="text-amber-700 text-sm mb-3">
                              Please fill in all required profile information below before proceeding with payment.
                            </p>
                            <p className="text-amber-600 text-xs">
                              Required: Date of Birth, Gender, Mobile Number, Class, Board, and School Name
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <button
                      onClick={handlePayment}
                      disabled={paymentLoading || !profileComplete}
                      className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform active:scale-95 relative overflow-hidden group ${
                        !profileComplete
                          ? "opacity-50 cursor-not-allowed bg-gray-400"
                          : "hover:scale-105 hover:shadow-xl"
                      }`}
                      style={{
                        backgroundColor: !profileComplete ? "#9CA3AF" : "#D4AF37",
                        color: !profileComplete ? "#6B7280" : "#0B1D3A",
                        boxShadow: !profileComplete ? "none" : "0 10px 25px rgba(212, 175, 55, 0.3)",
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        {paymentLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing Payment...
                          </>
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            {!profileComplete ? "Complete Profile to Pay" : "Pay ₹200 Now"}
                          </>
                        )}
                      </span>
                      {profileComplete && (
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </button>
                  </>
                )}

                {isSubmitted && (
                  <button
                    onClick={() => router.push("/dashboard/confirmation")}
                    className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 relative overflow-hidden group"
                    style={{
                      backgroundColor: "#0175c3",
                      color: "white",
                      boxShadow: "0 10px 25px rgba(1, 117, 195, 0.3)",
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      View Confirmation
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Referral Code Section */}
          <div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                >
                  <Gift className="w-6 h-6" style={{ color: "#D4AF37" }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: "#0B1D3A", fontFamily: "'Poppins', sans-serif" }}>
                  Resources & Referral
                </h2>
              </div>

              {registration.referral_used ? (
                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Trophy className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">Referral Code Applied Successfully!</h3>
                      <p className="text-green-700 mb-1">
                        <strong>Code:</strong> {registration.referral_code}
                      </p>
                      <p className="text-green-700 text-sm mb-4">
                        You now have access to exclusive resources and are entered in our lucky draw for amazing prizes!
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://drive.google.com/drive/folders/1-12qU0aVFsxy_iOS2bxtlW7AoVMUO37X"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95 relative overflow-hidden group"
                    style={{
                      backgroundColor: "#0175c3",
                      color: "white",
                      boxShadow: "0 8px 20px rgba(1, 117, 195, 0.3)",
                    }}
                  >
                    <span className="relative z-10 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Access Sample Papers
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
              ) : (
                <div>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-6 mb-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0">
                        <Lock className="w-6 h-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: "#0B1D3A" }}>
                          Exclusive Resources Locked
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Enter a referral code to unlock exclusive sample papers and get entered into our lucky draw
                          for amazing prizes including scholarships and gadgets!
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center px-3 py-1 bg-blue-100 rounded-full">
                            <Star className="w-4 h-4 mr-1" style={{ color: "#0175c3" }} />
                            <span className="text-sm font-medium" style={{ color: "#0175c3" }}>
                              Sample Papers
                            </span>
                          </div>
                          <div className="flex items-center px-3 py-1 bg-yellow-100 rounded-full">
                            <Trophy className="w-4 h-4 mr-1" style={{ color: "#D4AF37" }} />
                            <span className="text-sm font-medium" style={{ color: "#D4AF37" }}>
                              Lucky Draw Entry
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={referralCode}
                          onChange={(e) => {
                            setReferralCode(e.target.value.toUpperCase())
                            if (referralError) setReferralError("")
                          }}
                          placeholder="Enter referral code (e.g., ABC123)"
                          className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-center font-mono text-lg"
                          maxLength={20}
                        />
                      </div>
                      <button
                        onClick={handleReferralSubmit}
                        disabled={referralLoading || !referralCode.trim()}
                        className="px-8 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          backgroundColor: "#0175c3",
                          color: "white",
                          boxShadow: "0 8px 20px rgba(1, 117, 195, 0.3)",
                        }}
                      >
                        <span className="relative z-10 flex items-center">
                          {referralLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                              Applying...
                            </>
                          ) : (
                            <>
                              <Unlock className="w-5 h-5 mr-2" />
                              Apply Code
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>

                    {referralError && (
                      <div
                        className={`p-4 rounded-xl border ${referralError.includes("successfully") ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                      >
                        <div className="flex items-center">
                          {referralError.includes("successfully") ? (
                            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                          )}
                          <p
                            className={`text-sm font-medium ${referralError.includes("successfully") ? "text-green-700" : "text-red-700"}`}
                          >
                            {referralError}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Profile Completion Section */}
          {!isSubmitted && (
            <div
              className="bg-white rounded-2xl shadow-lg border border-gray-100 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                    style={{ backgroundColor: "rgba(1, 117, 195, 0.1)" }}
                  >
                    <User className="w-6 h-6" style={{ color: "#0175c3" }} />
                  </div>
                  <h2 className="text-2xl font-bold" style={{ color: "#0B1D3A", fontFamily: "'Poppins', sans-serif" }}>
                    Complete Your Profile
                  </h2>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="dob"
                        type="date"
                        required
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        defaultValue={registration.dob || ""}
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        Gender <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="gender"
                        required
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        defaultValue={registration.gender || ""}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="mobile"
                        type="tel"
                        required
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter mobile number"
                        defaultValue={registration.mobile || ""}
                      />
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        WhatsApp Number
                      </label>
                      <input
                        name="whatsapp"
                        type="tel"
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter WhatsApp number"
                        defaultValue={registration.whatsapp || ""}
                      />
                    </div>

                    {/* Class */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        Class <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="class"
                        required
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., 10th, 12th"
                        defaultValue={registration.class || ""}
                      />
                    </div>

                    {/* Board */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        Board <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="board"
                        required
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="e.g., CBSE, ICSE, State Board"
                        defaultValue={registration.board || ""}
                      />
                    </div>

                    {/* School Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        School Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        name="school_name"
                        required
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your school name"
                        defaultValue={registration.school_name || ""}
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 relative overflow-hidden group"
                      style={{
                        backgroundColor: "#0175c3",
                        color: "white",
                        boxShadow: "0 10px 25px rgba(1, 117, 195, 0.3)",
                      }}
                    >
                      <span className="relative z-10 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Save Profile Information
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
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

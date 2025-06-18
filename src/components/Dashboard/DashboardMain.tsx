"use client"

import React, { useEffect, useState } from "react"
import { useAuth } from "@/context/useAuth"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import DashboardLoading from "@/components/Dashboard/DashboardLoading"
import DashboardNoRegistration from "@/components/Dashboard/DashboardNoRegistration"
import DashboardHeader from "@/components/Dashboard/DashboardHeader"
import RegistrationStatusCard from "@/components/Dashboard/RegistrationStatusCard"
import ReferralSection from "@/components/Dashboard/ReferralSection"
import ProfileCompletionForm from "@/components/Dashboard/ProfileCompletionForm"

// Types for Registration
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
        const { data, error } = await supabase
          .from("registrations")
          .select("*")
          .eq("user_id", user.id)
          .single()

        if (error && error.code !== "PGRST116") {
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

      const { error: countUpdateError } = await supabase
        .from("referrals")
        .update({ count: (referralData.count || 0) + 1 })
        .eq("referral_code", referralCode.trim())

      if (countUpdateError) {
        console.error("Referral count update error:", countUpdateError)
      }

      const { data: updatedData } = await supabase
        .from("registrations")
        .select("*")
        .eq("user_id", user.id)
        .single()

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
    const requiredFields = ["full_name","dob", "gender", "mobile", "class", "board", "school_name","father_name","father_occupation","father_phone_number","mother_name","mother_occupation","mother_phone_number",
      "address","district","state","pincode","school_address","school_pincode","school_medium","internet_access","hobbies","about_edustarr"
    ]
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
      const amount = 20000 
      const currency = "INR"
      const receiptId = `receipt_${Date.now()}`

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

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency,
        name: "EduStarr",
        description: "Registration Payment - EduStarr",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const validateRes = await fetch("/api/payments/order/validate", {
              method: "POST",
              body: JSON.stringify(response),
              headers: {
                "Content-Type": "application/json",
              },
            })

            const jsonRes = await validateRes.json()

            if (validateRes.ok && jsonRes.msg === "success") {
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
                alert("Payment successful but failed to update registration. Please contact support.")
              } else {
                alert("Payment successful! Registration submitted.")
                const { data } = await supabase
                  .from("registrations")
                  .select("*")
                  .eq("user_id", user.id)
                  .single()
                if (data) setRegistration(data)
              }
            } else {
              alert("Payment validation failed. Please contact support.")
            }
          } catch (error) {
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

      const rzp = new window.Razorpay(options)

      rzp.on("payment.failed", (response: any) => {
        alert(`Payment failed: ${response.error.description}`)
        setPaymentLoading(false)
      })

      rzp.open()
    } catch (error) {
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
      father_name: (formData.get("father_name")as string|| null),
      father_occupation:(formData.get("father_occupation")as string||null),
      father_phone_number:(formData.get("father_phone_number")as string||null),
      mother_name:(formData.get("mother_name")as string || null),
      mother_occupation:(formData.get("mother_occupation")as string||null),
      mother_phone_number:(formData.get("mother_phone_number")as string||null),
      full_name:(formData.get("full_name")as string||null),
      guardian_name:(formData.get("guardian_name")as string || null),
      guardian_relationship:(formData.get("guardian_relationship")as string ||null),
      guardian_phone_number:(formData.get("guardian_phone_number")as string || null),
      address:(formData.get("address")as string || null),
      district:(formData.get("district")as string|| null),
      state:(formData.get("state")as string ||null),
      pincode:(formData.get("pincode")as string ||null),
      school_address:(formData.get("school_address")as string || null),
      school_pincode:(formData.get("school_pincode")as string|| null),
      school_medium:(formData.get("school_medium")as string|| null),
      internet_access:(formData.get("internet_access")as string||null),
      hobbies:(formData.get("hobbies")as string||null),
      about_edustarr:(formData.get("about_edustarr")as string||null)


      
    }

    try {
      const { error } = await supabase.from("registrations").update(updates).eq("user_id", user.id)

      if (error) {
        alert("Update failed: " + error.message)
      } else {
        alert("Profile updated successfully!")
        const { data } = await supabase
          .from("registrations")
          .select("*")
          .eq("user_id", user.id)
          .single()
        if (data) setRegistration(data)
      }
    } catch (error) {
      alert("An unexpected error occurred. Please try again.")
    }
  }

  // Show loading state
  if (loading) return <DashboardLoading />
  // Show message if no registration found
  if (!registration) return <DashboardNoRegistration />

  const isSubmitted = registration.registration_status === "submitted"
  const hasPaymentInfo = Boolean(registration.payment_id && registration.order_id)

  return (
    <>
      <style jsx global>{` /* ...font and animation styles... */ `}</style>
      <div style={{ backgroundColor: "#F8F9FB", minHeight: "100vh" }}>
        <div className="max-w-6xl mx-auto p-6 space-y-8">
          <DashboardHeader name={registration.full_name || user?.email || 'Guest'} />
          <RegistrationStatusCard
            registration={registration}
            user={user}
            profileComplete={profileComplete}
            isSubmitted={isSubmitted}
            hasPaymentInfo={hasPaymentInfo}
            handlePayment={handlePayment}
            paymentLoading={paymentLoading}
            router={router}
          />

          {!isSubmitted && (
            <ProfileCompletionForm
              registration={registration}
              handleProfileSubmit={handleProfileSubmit}
            />
          )}
          <ReferralSection
            registration={registration}
            referralCode={referralCode}
            setReferralCode={setReferralCode}
            referralError={referralError}
            referralLoading={referralLoading}
            handleReferralSubmit={handleReferralSubmit}
          />
        </div>
      </div>
      <style jsx global>{` /* ...animation styles... */ `}</style>
    </>
  )
}
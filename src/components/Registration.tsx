"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface ValidationState {
  isValid: boolean
  message: string
}

export default function SignupPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [fieldValidation, setFieldValidation] = useState<Record<string, ValidationState>>({})
  const [isFormValid, setIsFormValid] = useState(false)

  // Enhanced regex patterns
  const validationRules = {
    full_name: /^[a-zA-Z\s]{2,50}$/,
    email:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  }

  const validateField = (name: string, value: string): ValidationState => {
    switch (name) {
      case "full_name":
        if (!value.trim()) return { isValid: false, message: "Full name is required" }
        if (!validationRules.full_name.test(value)) {
          return { isValid: false, message: "Name must be 2-50 characters, letters and spaces only" }
        }
        return { isValid: true, message: "" }

      case "email":
        if (!value.trim()) return { isValid: false, message: "Email is required" }
        if (!validationRules.email.test(value)) {
          return { isValid: false, message: "Please enter a valid email address" }
        }
        return { isValid: true, message: "" }

      case "password":
        if (!value) return { isValid: false, message: "Password is required" }
        if (!validationRules.password.test(value)) {
          return {
            isValid: false,
            message: "Password must be 8+ chars with uppercase, lowercase, number, and special character",
          }
        }
        return { isValid: true, message: "" }

      case "confirmPassword":
        if (!value) return { isValid: false, message: "Please confirm your password" }
        if (value !== formData.password) {
          return { isValid: false, message: "Passwords do not match" }
        }
        return { isValid: true, message: "" }

      default:
        return { isValid: true, message: "" }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Real-time validation
    const validation = validateField(name, value)
    setFieldValidation((prev) => ({ ...prev, [name]: validation }))

    if (error) setError(null)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const validation = validateField(name, value)
    setFieldValidation((prev) => ({ ...prev, [name]: validation }))
    setFocusedField(null)
  }

  // Check form validity
  useEffect(() => {
    const allFieldsValid = Object.keys(formData).every((key) => {
      const validation = fieldValidation[key]
      return validation?.isValid === true
    })
    const allFieldsFilled = Object.values(formData).every((value) => value.trim() !== "")
    setIsFormValid(allFieldsValid && allFieldsFilled)
  }, [formData, fieldValidation])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Final validation
    const validations: Record<string, ValidationState> = {}
    Object.keys(formData).forEach((key) => {
      validations[key] = validateField(key, formData[key as keyof typeof formData])
    })
    setFieldValidation(validations)

    const hasErrors = Object.values(validations).some((v) => !v.isValid)
    if (hasErrors) {
      setError("Please fix the errors above")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.full_name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || "Signup failed. Please try again.")
      } else {
        setSuccess(true)
        // Add a small delay for better UX
        setTimeout(() => {
          router.push("/register/confirmation")
        }, 1500)
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const getFieldBorderColor = (fieldName: string) => {
    if (focusedField === fieldName) return "border-blue-500 ring-2 ring-blue-100"
    if (fieldValidation[fieldName]?.isValid === false) return "border-red-400"
    if (fieldValidation[fieldName]?.isValid === true) return "border-green-400"
    return "border-gray-200 hover:border-gray-300"
  }

  const getIconColor = (fieldName: string) => {
    if (focusedField === fieldName) return "text-blue-500"
    if (fieldValidation[fieldName]?.isValid === false) return "text-red-400"
    if (fieldValidation[fieldName]?.isValid === true) return "text-green-500"
    return "text-gray-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Header with enhanced animation */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-200">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-slide-up">Sign Up for ESAT 2025</h1>
          <p className="text-gray-600 animate-slide-up animation-delay-100">Create your account to get started</p>
        </div>

        {/* Form Container with enhanced styling */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 animate-slide-up animation-delay-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${getIconColor("full_name")}`}
              >
                <User className="w-5 h-5" />
              </div>
              <input
                name="full_name"
                required
                placeholder="Full Name"
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white ${getFieldBorderColor("full_name")} group-hover:shadow-md`}
                value={formData.full_name}
                onChange={handleChange}
                onFocus={() => setFocusedField("full_name")}
                onBlur={handleBlur}
              />
              {fieldValidation.full_name?.isValid === true && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <CheckCircle className="w-5 h-5 text-green-500 animate-scale-in" />
                </div>
              )}
              {fieldValidation.full_name && !fieldValidation.full_name.isValid && (
                <p className="text-red-500 text-sm mt-1 animate-slide-down">{fieldValidation.full_name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${getIconColor("email")}`}
              >
                <Mail className="w-5 h-5" />
              </div>
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white ${getFieldBorderColor("email")} group-hover:shadow-md`}
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={handleBlur}
              />
              {fieldValidation.email?.isValid === true && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <CheckCircle className="w-5 h-5 text-green-500 animate-scale-in" />
                </div>
              )}
              {fieldValidation.email && !fieldValidation.email.isValid && (
                <p className="text-red-500 text-sm mt-1 animate-slide-down">{fieldValidation.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${getIconColor("password")}`}
              >
                <Lock className="w-5 h-5" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white ${getFieldBorderColor("password")} group-hover:shadow-md`}
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {fieldValidation.password && !fieldValidation.password.isValid && (
                <p className="text-red-500 text-sm mt-1 animate-slide-down">{fieldValidation.password.message}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="relative group">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${getIconColor("confirmPassword")}`}
              >
                <Lock className="w-5 h-5" />
              </div>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Confirm Password"
                className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white ${getFieldBorderColor("confirmPassword")} group-hover:shadow-md`}
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:scale-110"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {fieldValidation.confirmPassword && !fieldValidation.confirmPassword.isValid && (
                <p className="text-red-500 text-sm mt-1 animate-slide-down">
                  {fieldValidation.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl animate-bounce-in">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-green-700 text-sm">Account created successfully! Redirecting...</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : success
                    ? "bg-green-600 hover:bg-green-700"
                    : isFormValid
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                      : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : success ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Account Created!
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-all duration-200 hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0; 
            transform: scale(0.5); 
          }
          to { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes bounce-in {
          0% { 
            opacity: 0; 
            transform: scale(0.3); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: scale(1); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  )
}

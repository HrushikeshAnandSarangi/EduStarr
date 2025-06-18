"use client"

import type React from "react"
import {
  Gift,
  Trophy,
  BookOpen,
  ExternalLink,
  Lock,
  Star,
  Unlock,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Award,
} from "lucide-react"

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

interface ReferralSectionProps {
  registration: Registration
  referralCode: string
  setReferralCode: (code: string) => void
  referralError: string
  referralLoading: boolean
  handleReferralSubmit: () => void
}

const ReferralSection: React.FC<ReferralSectionProps> = ({
  registration,
  referralCode,
  setReferralCode,
  referralError,
  referralLoading,
  handleReferralSubmit,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 animate-slide-up max-w-6xl mx-auto my-4 sm:my-8">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 bg-gradient-to-br from-yellow-100 to-orange-100">
            <Gift className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1">Resources & Referral</h2>
            <p className="text-sm sm:text-base text-gray-600">Unlock exclusive content and enter our lucky draw</p>
          </div>
        </div>

        {registration.referral_used ? (
          /* Success State - Referral Applied */
          <div className="space-y-6">
            {/* Success Banner */}
            <div className="bg-gradient-to-r from-green-50 via-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2 flex items-center justify-center sm:justify-start gap-2">
                    <Sparkles className="w-5 h-5" />
                    Referral Code Applied Successfully!
                  </h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-green-700">
                      <strong>Code:</strong>{" "}
                      <span className="font-mono bg-green-100 px-2 py-1 rounded text-sm">
                        {registration.referral_code}
                      </span>
                    </p>
                    <p className="text-green-700 text-sm">
                      You now have access to exclusive resources and are entered in our lucky draw for amazing prizes!
                    </p>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 bg-white bg-opacity-60 rounded-lg p-3">
                      <BookOpen className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Sample Papers Access</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white bg-opacity-60 rounded-lg p-3">
                      <Award className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Lucky Draw Entry</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Access Button */}
            <div className="text-center">
              <a
                href="https://drive.google.com/drive/folders/1-12qU0aVFsxy_iOS2bxtlW7AoVMUO37X"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 group"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Access Sample Papers
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ) : (
          /* Locked State - No Referral Applied */
          <div className="space-y-6">
            {/* Locked Content Banner */}
            <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3">Exclusive Resources Locked</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
                    Enter a referral code to unlock exclusive sample papers and get entered into our lucky draw for
                    amazing prizes including scholarships and gadgets!
                  </p>

                  {/* Benefits Tags */}
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                    <div className="flex items-center px-3 py-2 bg-blue-100 rounded-full">
                      <Star className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-xs sm:text-sm font-medium text-blue-700">Sample Papers</span>
                    </div>
                    <div className="flex items-center px-3 py-2 bg-yellow-100 rounded-full">
                      <Trophy className="w-4 h-4 mr-2 text-yellow-600" />
                      <span className="text-xs sm:text-sm font-medium text-yellow-700">Lucky Draw Entry</span>
                    </div>
                    <div className="flex items-center px-3 py-2 bg-purple-100 rounded-full">
                      <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-xs sm:text-sm font-medium text-purple-700">Exclusive Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Code Input Section */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-4 text-center sm:text-left">Enter Referral Code</h4>

              <div className="space-y-4">
                {/* Input and Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => {
                        setReferralCode(e.target.value.toUpperCase())
                      }}
                      placeholder="Enter referral code"
                      className="w-full border-2 border-gray-300 px-4 py-3 sm:py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-center font-mono text-base sm:text-lg bg-white"
                      maxLength={20}
                    />
                  </div>
                  <button
                    onClick={handleReferralSubmit}
                    disabled={referralLoading || !referralCode.trim()}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-xl transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  >
                    <span className="flex items-center justify-center">
                      {referralLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          <span className="hidden sm:inline">Applying...</span>
                          <span className="sm:hidden">Wait...</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                          <span className="hidden sm:inline">Apply Code</span>
                          <span className="sm:hidden">Apply</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>

                {/* Error/Success Message */}
                {referralError && (
                  <div
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      referralError.includes("successfully")
                        ? "bg-green-50 border-green-200 animate-pulse"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {referralError.includes("successfully") ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <p
                        className={`text-sm font-medium leading-relaxed ${
                          referralError.includes("successfully") ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {referralError}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Help Text */}
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500">
                Don't have a referral code? Ask your friends or teachers who are already using EduStarr!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReferralSection

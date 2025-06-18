import React from "react"
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Mail,
  Calendar,
  Shield,
  Clock,
  CreditCard,
  Loader2,
  Download,
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

interface RegistrationStatusCardProps {
  registration: Registration
  user: any
  profileComplete: boolean
  isSubmitted: boolean
  hasPaymentInfo: boolean
  handlePayment: () => void
  paymentLoading: boolean
  router: any
}

const RegistrationStatusCard: React.FC<RegistrationStatusCardProps> = ({
  registration,
  user,
  profileComplete,
  isSubmitted,
  hasPaymentInfo,
  handlePayment,
  paymentLoading,
  router,
}) => {
  return (
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
              12th October, 2025 (Anytime between 8:00 AM and 11:59 PM)
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
                  backgroundColor: !profileComplete ? "#9CA3AF" : "#Ffe400",
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
                  <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
  )
}

export default RegistrationStatusCard
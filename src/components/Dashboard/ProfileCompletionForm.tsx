"use client"

import React from "react"
import { useState } from "react"
import { User, ChevronLeft, ChevronRight, Check, MapPin, GraduationCap, Smartphone, FileText } from "lucide-react"

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
  father_name?: string
  father_occupation?: string
  father_phone_number?: string
  mother_name?: string
  mother_occupation?: string
  mother_phone_number?: string
  guardian_name?: string
  guardian_relationship?: string
  guardian_phone_number?: string
  address?: string
  district?: string
  state?: string
  pincode?: string
  school_address?: string
  school_pincode?: string
  school_medium?: string
  internet_access?: string
  hobbies?: string
  about_edustarr?: string
}

interface ProfileCompletionFormProps {
  registration: Registration
  handleProfileSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const ProfileCompletionForm: React.FC<ProfileCompletionFormProps> = ({ registration, handleProfileSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Registration>(registration)
  const [agreements, setAgreements] = useState({
    declaration: false,
    terms: false,
  })

  const totalSteps = 5

  const steps = [
    { number: 1, title: "Personal Details", icon: User },
    { number: 2, title: "Address Details", icon: MapPin },
    { number: 3, title: "Academic Details", icon: GraduationCap },
    { number: 4, title: "Other Details", icon: Smartphone },
    { number: 5, title: "Review & Submit", icon: FileText },
  ]

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ]

  const classOptions = ["5th", "6th", "7th", "8th", "9th", "10th", "11th PCM", "11th PCB", "12th PCM", "12th PCB"]

  const boardOptions = ["CBSE", "ICSE", "State Board", "Other"]
  const mediumOptions = ["English", "Hindi", "Others"]
  const hearAboutOptions = ["School", "Friend", "WhatsApp", "Instagram", "Teacher", "Others"]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentStep === totalSteps && agreements.declaration && agreements.terms) {
      // Create a new form element with all the data
      const formElement = document.createElement("form")

      // Add all form data as hidden inputs
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          const input = document.createElement("input")
          input.type = "hidden"
          input.name = key
          input.value = value
          formElement.appendChild(input)
        }
      })

      // Create a new event object
      const formEvent = new Event("submit", { bubbles: true, cancelable: true }) as any
      Object.defineProperty(formEvent, "currentTarget", {
        value: formElement,
        writable: false,
      })
      Object.defineProperty(formEvent, "target", {
        value: formElement,
        writable: false,
      })

      handleProfileSubmit(formEvent)
    }
  }

  const renderStepIndicator = () => (
    <div className="mb-8 px-2">
      {/* Desktop Step Indicator */}
      <div className="hidden md:flex items-center justify-center">
        {steps.map((step, index) => {
          const StepIcon = step.icon
          const isActive = currentStep === step.number
          const isCompleted = currentStep > step.number

          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex flex-col items-center ${index < steps.length - 1 ? "mr-4" : ""}`}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                </div>
                <span
                  className={`text-xs mt-2 font-medium text-center ${isActive ? "text-blue-600" : "text-gray-500"}`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mb-6 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile Step Indicator */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep <= totalSteps ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {steps[currentStep - 1]?.icon &&
                React.createElement(steps[currentStep - 1].icon, { className: "w-5 h-5" })}
            </div>
            <div className="ml-3">
              <div className="text-sm font-semibold text-blue-900">{steps[currentStep - 1]?.title}</div>
              <div className="text-xs text-gray-500">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )

  const renderPersonalDetails = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-blue-900 mb-6">Personal Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="full_name"
            type="text"
            required
            value={formData.full_name || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter your full name (First Middle Last)"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            name="dob"
            type="date"
            required
            value={formData.dob || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            required
            value={formData.gender || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            name="mobile"
            type="tel"
            required
            maxLength={10}
            value={formData.mobile || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="10-digit mobile number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">WhatsApp Number (if different)</label>
          <input
            name="whatsapp"
            type="tel"
            maxLength={10}
            value={formData.whatsapp || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="WhatsApp number"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            value={formData.email || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Personal/Parental email address"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Father's Name <span className="text-red-500">*</span>
          </label>
          <input
            name="father_name"
            type="text"
            required
            value={formData.father_name || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Father's full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Father's Occupation <span className="text-red-500">*</span>
          </label>
          <input
            name="father_occupation"
            type="text"
            required
            value={formData.father_occupation || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Father's occupation"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Father's Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            name="father_phone_number"
            type="tel"
            required
            maxLength={10}
            value={formData.father_phone_number || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Father's phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Mother's Name <span className="text-red-500">*</span>
          </label>
          <input
            name="mother_name"
            type="text"
            required
            value={formData.mother_name || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Mother's full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Mother's Occupation <span className="text-red-500">*</span>
          </label>
          <input
            name="mother_occupation"
            type="text"
            required
            value={formData.mother_occupation || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Mother's occupation"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Mother's Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            name="mother_phone_number"
            type="tel"
            required
            maxLength={10}
            value={formData.mother_phone_number || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Mother's phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">Guardian's Name (if applicable)</label>
          <input
            name="guardian_name"
            type="text"
            value={formData.guardian_name || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Guardian's name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">Guardian Relationship</label>
          <input
            name="guardian_relationship"
            type="text"
            value={formData.guardian_relationship || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Relationship with guardian"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">Guardian's Phone Number</label>
          <input
            name="guardian_phone_number"
            type="tel"
            maxLength={10}
            value={formData.guardian_phone_number || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Guardian's phone number"
          />
        </div>
      </div>
    </div>
  )

  const renderAddressDetails = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-blue-900 mb-6">Permanent Address Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            required
            rows={3}
            value={formData.address || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="House Number / Street / Locality / City / Town / Village"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            District <span className="text-red-500">*</span>
          </label>
          <input
            name="district"
            type="text"
            required
            value={formData.district || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter district"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            State <span className="text-red-500">*</span>
          </label>
          <select
            name="state"
            required
            value={formData.state || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Pincode <span className="text-red-500">*</span>
          </label>
          <input
            name="pincode"
            type="text"
            required
            maxLength={6}
            value={formData.pincode || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="6-digit pincode"
          />
        </div>
      </div>
    </div>
  )

  const renderAcademicDetails = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-blue-900 mb-6">Academic Details</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Current Class <span className="text-red-500">*</span>
          </label>
          <select
            name="class"
            required
            value={formData.class || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Class</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Board of Education <span className="text-red-500">*</span>
          </label>
          <select
            name="board"
            required
            value={formData.board || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Board</option>
            {boardOptions.map((board) => (
              <option key={board} value={board}>
                {board}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            School Name <span className="text-red-500">*</span>
          </label>
          <input
            name="school_name"
            type="text"
            required
            value={formData.school_name || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter your school name"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            School Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="school_address"
            required
            rows={3}
            value={formData.school_address || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter school address"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            School Pincode <span className="text-red-500">*</span>
          </label>
          <input
            name="school_pincode"
            type="text"
            required
            maxLength={6}
            value={formData.school_pincode || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="School pincode"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Medium of Instruction <span className="text-red-500">*</span>
          </label>
          <select
            name="school_medium"
            required
            value={formData.school_medium || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Medium</option>
            {mediumOptions.map((medium) => (
              <option key={medium} value={medium}>
                {medium}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )

  const renderOtherDetails = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-blue-900 mb-6">Other Details</h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Do you have access to a smartphone or computer with internet? <span className="text-red-500">*</span>
          </label>
          <select
            name="internet_access"
            required
            value={formData.internet_access || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            Tell us about your hobbies <span className="text-red-500">*</span>
          </label>
          <textarea
            name="hobbies"
            required
            rows={4}
            value={formData.hobbies || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            placeholder="Tell us about your interests and hobbies..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-blue-900">
            How did you hear about EduStarr? <span className="text-red-500">*</span>
          </label>
          <select
            name="about_edustarr"
            required
            value={formData.about_edustarr || ""}
            onChange={handleInputChange}
            className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Option</option>
            {hearAboutOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )

  const renderReviewAndPayment = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-blue-900 mb-6">Review & Submit</h3>

      <div className="bg-blue-50 rounded-xl p-6 space-y-4">
        <h4 className="font-semibold text-blue-900 mb-4">Please review your information:</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Name:</strong> {formData.full_name}
          </div>
          <div>
            <strong>Email:</strong> {formData.email}
          </div>
          <div>
            <strong>Mobile:</strong> {formData.mobile}
          </div>
          <div>
            <strong>Class:</strong> {formData.class}
          </div>
          <div>
            <strong>Board:</strong> {formData.board}
          </div>
          <div>
            <strong>School:</strong> {formData.school_name}
          </div>
          <div>
            <strong>State:</strong> {formData.state}
          </div>
          <div>
            <strong>District:</strong> {formData.district}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="declaration"
            checked={agreements.declaration}
            onChange={(e) => setAgreements((prev) => ({ ...prev, declaration: e.target.checked }))}
            className="mt-1 w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="declaration" className="text-sm text-gray-700">
            ✅ I hereby declare that all the information provided is true to the best of my knowledge.
          </label>
        </div>

        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreements.terms}
            onChange={(e) => setAgreements((prev) => ({ ...prev, terms: e.target.checked }))}
            className="mt-1 w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            ✅ I agree to the terms and conditions of EduStarr.
          </label>
        </div>
      </div>

      {(!agreements.declaration || !agreements.terms) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">Please check both agreements to proceed with submission.</p>
        </div>
      )}
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderPersonalDetails()
      case 2:
        return renderAddressDetails()
      case 3:
        return renderAcademicDetails()
      case 4:
        return renderOtherDetails()
      case 5:
        return renderReviewAndPayment()
      default:
        return renderPersonalDetails()
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 animate-slide-up max-w-6xl mx-auto my-4 sm:my-8">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 bg-blue-100">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-900">Complete Your Registration</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit} className="space-y-8">
          {renderCurrentStep()}

          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 pt-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center justify-center px-4 sm:px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center justify-center px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 hover:scale-105"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!agreements.declaration || !agreements.terms}
                className={`flex items-center justify-center px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  agreements.declaration && agreements.terms
                    ? "bg-green-600 text-white hover:bg-green-700 hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Check className="w-5 h-5 mr-2" />
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileCompletionForm

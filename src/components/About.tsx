"use client"
import {
  Clock,
  Monitor,
  FileText,
  Users,
  BookOpen,
  Trophy,
  Award,
  Star,
  CheckCircle,
  Target,
  Calendar,
  Zap,
} from "lucide-react"
import LottiePlayer from "./LottiePlayer"

export default function About() {
  const prizeData = [
    {
      class: "Class 12th",
      air1: "50,000",
      air2: "30,000",
      air3: "20,000",
      air4_5: "15,000",
      air6_10: "10,000",
      air11_25: "5,000",
    },
    {
      class: "Class 11th",
      air1: "50,000",
      air2: "30,000",
      air3: "20,000",
      air4_5: "15,000",
      air6_10: "10,000",
      air11_25: "5,000",
    },
    {
      class: "Class 10th",
      air1: "30,000",
      air2: "20,000",
      air3: "15,000",
      air4_5: "10,000",
      air6_10: "7,500",
      air11_25: "5,000",
    },
    {
      class: "Class 9th",
      air1: "30,000",
      air2: "20,000",
      air3: "15,000",
      air4_5: "10,000",
      air6_10: "7,500",
      air11_25: "5,000",
    },
    {
      class: "Class 8th",
      air1: "25,000",
      air2: "15,000",
      air3: "10,000",
      air4_5: "7,500",
      air6_10: "5,000",
      air11_25: "-",
    },
    {
      class: "Class 7th",
      air1: "25,000",
      air2: "15,000",
      air3: "10,000",
      air4_5: "7,500",
      air6_10: "5,000",
      air11_25: "-",
    },
    {
      class: "Class 6th",
      air1: "20,000",
      air2: "12,500",
      air3: "7,500",
      air4_5: "5,000",
      air6_10: "2,500",
      air11_25: "-",
    },
    {
      class: "Class 5th",
      air1: "20,000",
      air2: "12,500",
      air3: "7,500",
      air4_5: "5,000",
      air6_10: "2,500",
      air11_25: "-",
    },
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block px-6 py-3 rounded-full mb-6 bg-blue-600 text-white">
                <span className="font-medium">🕮 Complete Guide</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-gray-900">
                ESAT 2025
                <br />
                <span className="text-blue-600">EduStarr Scholastic</span>
                <br />
                <span className="text-blue-600">Aptitude Test</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 leading-relaxed text-gray-700">
                Your comprehensive guide to ESAT 2025. Find all the information you need to prepare, register, and
                succeed in your journey towards academic excellence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-bold text-lg text-gray-900">1 Hour</div>
                  <div className="text-sm text-gray-600">Test Duration</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <div className="font-bold text-lg text-gray-900">40 MCQs</div>
                  <div className="text-sm text-gray-600">Total Questions</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                  <Monitor className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-bold text-lg text-gray-900">Online</div>
                  <div className="text-sm text-gray-600">Computer Based</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <LottiePlayer src="https://lottie.host/59d53c8b-345a-4d94-8950-6b64f7c1351c/IA126yTT8h.lottie" className=" h-full w-full"></LottiePlayer>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Test Structure & Syllabus</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-700">
              Everything you need to know about the ESAT 2025 examination format and curriculum.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">General Test Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto bg-blue-600">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-center text-gray-900">Mode of Examination</h4>
                <p className="text-center text-gray-700">Online (Computer Based Test)</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto bg-yellow-600">
                  <FileText className="w-6 h-6 text-gray-900" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-center text-gray-900">Question Type</h4>
                <p className="text-center text-sm text-gray-700">
                  Primarily MCQs. Some NAT questions for senior classes
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto bg-blue-600">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-center text-gray-900">Medium</h4>
                <p className="text-center text-gray-700">English</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto bg-yellow-600">
                  <Users className="w-6 h-6 text-gray-900" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-center text-gray-900">Eligibility</h4>
                <p className="text-center text-sm text-gray-700">Classes 5th-12th (Science streams for 11th & 12th)</p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-r from-blue-50 to-yellow-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 mr-4 text-blue-600" />
                <h4 className="text-2xl font-bold text-gray-900">Test Day Notice</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Flexible Timing</p>
                    <p className="text-gray-700">
                      Take the test anytime between 8:00 AM and 11:59 PM on 12th October 2025
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Target className="w-6 h-6 mr-3 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Single Attempt</p>
                    <p className="text-gray-700">Complete the test in one sitting within the 1-hour time limit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center text-gray-900">Class-wise Syllabus & Structure</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h4 className="text-2xl font-bold mb-6 text-center text-gray-900">Test Format</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Total Questions:</span>
                    <span className="font-bold text-lg text-blue-600">40 MCQs</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <span className="font-semibold text-gray-900">Duration:</span>
                    <span className="font-bold text-lg text-yellow-600">1 Hour</span>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold mb-2 text-gray-900">Marking Scheme:</div>
                    <div className="flex justify-between">
                      <span className="text-green-600">+4 for correct</span>
                      <span className="text-red-600">-1 for wrong</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h4 className="text-2xl font-bold mb-6 text-center text-gray-900">Class-wise Structure</h4>
                <div className="mb-6 p-6 bg-blue-50 rounded-xl">
                  <h5 className="text-lg font-bold mb-4 text-blue-600">🔹 For Classes 5 to 10</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Aptitude:</span>
                      <span className="font-semibold text-gray-900">10 Questions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Mathematics:</span>
                      <span className="font-semibold text-gray-900">10 Questions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Science:</span>
                      <span className="font-semibold text-gray-900">20 Questions</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-yellow-50 rounded-xl">
                  <h5 className="text-lg font-bold mb-4 text-yellow-600">🔹 For Classes 11 & 12</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Physics:</span>
                      <span className="font-semibold text-gray-900">13 Questions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Chemistry:</span>
                      <span className="font-semibold text-gray-900">13 Questions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Math/Biology:</span>
                      <span className="font-semibold text-gray-900">14 Questions</span>
                    </div>
                  </div>
                  <p className="text-sm mt-3 italic text-gray-600">
                    Mathematics for PCM students, Biology for PCB students
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-bold mb-4 text-gray-900">Syllabus Coverage</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                      <div>
                        <span className="font-semibold text-gray-900">Based on: </span>
                        <span className="text-gray-700">NCERT curriculum</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                      <div>
                        <span className="font-semibold text-gray-900">Portion Covered: </span>
                        <span className="text-gray-700">Topics taught till September of current academic year</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto rounded-lg  flex items-center justify-center">
                    <LottiePlayer src="https://lottie.host/0d692851-bba5-4e1b-af9d-80ee83cab597/zvkJVl6ZRK.lottie" className=" h-full w-full"></LottiePlayer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Prizes & Scholarships</h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-700">
              Rewards for outstanding performance in ESAT 2025. All amounts are in INR.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-bold">Class</th>
                    <th className="px-6 py-4 text-center text-white font-bold">AIR 1</th>
                    <th className="px-6 py-4 text-center text-white font-bold">AIR 2</th>
                    <th className="px-6 py-4 text-center text-white font-bold">AIR 3</th>
                    <th className="px-6 py-4 text-center text-white font-bold">AIR 4-5</th>
                    <th className="px-6 py-4 text-center text-white font-bold">AIR 6-10</th>
                    <th className="px-6 py-4 text-center text-white font-bold">AIR 11-25</th>
                  </tr>
                </thead>
                <tbody>
                  {prizeData.map((row, index) => (
                    <tr
                      key={row.class}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-200`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.class}</td>
                      <td className="px-6 py-4 text-center font-bold text-lg text-yellow-600">₹{row.air1}</td>
                      <td className="px-6 py-4 text-center font-semibold text-blue-600">₹{row.air2}</td>
                      <td className="px-6 py-4 text-center font-semibold text-blue-600">₹{row.air3}</td>
                      <td className="px-6 py-4 text-center text-gray-700">₹{row.air4_5}</td>
                      <td className="px-6 py-4 text-center text-gray-700">₹{row.air6_10}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{row.air11_25}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
              <h4 className="font-bold text-lg mb-2 text-gray-900">Certificates</h4>
              <p className="text-sm text-gray-700">Digital certificates for all top performers</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <BookOpen className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h4 className="font-bold text-lg mb-2 text-gray-900">Study Materials</h4>
              <p className="text-sm text-gray-700">Premium learning resources for winners</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <Award className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
              <h4 className="font-bold text-lg mb-2 text-gray-900">Free Mentorship</h4>
              <p className="text-sm text-gray-700">1-month guidance for top performers</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <Star className="w-8 h-8 mx-auto mb-3 text-blue-600" />
              <h4 className="font-bold text-lg mb-2 text-gray-900">Other Rewards</h4>
              <p className="text-sm text-gray-700">Custom performance report and special recognition</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-6 py-3 rounded-full mb-6 bg-blue-600 text-white">
                <span className="font-medium">Ready to Excel?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                Ready to Begin Your ESAT 2025 Journey?
              </h2>
              <p className="text-xl mb-8 text-gray-700">
                ESAT 2025 is more than just a test; it's your opportunity to shine, secure your future, and join a
                league of extraordinary students. Don't miss out!
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-yellow-50 p-6 rounded-2xl mb-8">
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-yellow-500">Registration Fee: ₹200 only</span>
                </div>
                <h4 className="text-lg font-semibold mb-4 text-center text-gray-900">What you get:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    <span className="text-sm text-gray-700">Eligibility for scholarships worth 15 lakhs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    <span className="text-sm text-gray-700">Digital certificate of achievement</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    <span className="text-sm text-gray-700">Free learning resources for top performers</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    <span className="text-sm text-gray-700">Free mentorship for 1 month for top performers</span>
                  </div>
                </div>
              </div>

              <div>
                <button className="px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform active:scale-95 bg-yellow-400 text-gray-900 shadow-lg mb-4">
                  <a href="/register">
                  Register for ESAT 2025 Now
                  </a>
                </button>
                <p className="text-lg text-gray-700">
                  Have questions?{" "}
                  <a
                    href="/contact"
                    className="font-semibold hover:underline transition-all duration-300 text-blue-600"
                  >
                    Contact Us 💬
                  </a>
                </p>
              </div>
            </div>

            <div className="relative">
              <LottiePlayer src="https://lottie.host/23cbf3a1-951b-4397-9436-8fa9292a9255/7texk934Rw.lottie" className=" h-full w-full"></LottiePlayer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

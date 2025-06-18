"use client"
import LottiePlayer from "./LottiePlayer"
import Image from "next/image"

export default function Homepage() {

  return (
    <>
      {/* Import Poppins font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      `}</style>

      <div style={{ backgroundColor: "#F8F9FB" }}>
        {/* Section 1: Hero with Illustrations */}
        <section className="py-20 px-4 relative overflow-hidden">
          {/* Floating Illustrations */}
   

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div
                  className="inline-block px-6 py-3 rounded-full mb-6 animate-slide-up"
                  style={{ backgroundColor: "#0175c3", color: "white" }}
                >
                  <span className="font-medium">🏆 India's Premier Academic Competition</span>
                </div>

                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 animate-slide-up leading-tight"
                  style={{
                    color: "#0B1D3A",
                    fontFamily: "'Poppins', sans-serif",
                    animationDelay: "0.2s",
                    animationFillMode: "both",
                  }}
                >
                  Unlock Your Child's
                  <br />
                  <span style={{ color: "#0175c3" }}>Academic Brilliance</span>
                </h1>

                <p
                  className="text-xl md:text-2xl mb-12 leading-relaxed animate-slide-up"
                  style={{
                    color: "#111111",
                    animationDelay: "0.4s",
                    animationFillMode: "both",
                  }}
                >
                  Join thousands of bright minds in ESAT 2025 - where talent meets opportunity, and dreams become
                  scholarships worth up to <span style={{ color: "#D4AF37", fontWeight: "bold" }}>₹50,000!</span>
                </p>

                <div
                  className="flex flex-wrap gap-6 justify-center lg:justify-start animate-slide-up mb-16"
                  style={{
                    animationDelay: "0.6s",
                    animationFillMode: "both",
                  }}
                >
                  <button
                    className="px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform active:scale-95 relative overflow-hidden group"
                    style={{
                      backgroundColor: "#Ffe400",
                      color: "#0B1D3A",
                      boxShadow: "0 10px 30px rgba(212, 175, 55, 0.4)",
                    }}
                  >
                    <span className="relative z-10"><a href="/register">Register Now - ₹200 Only</a></span>
                    <div className="absolute inset-0 bg-yellow-400 hover:bg-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <button
                    className="px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform active:scale-95 border-3 hover:bg-white"
                    style={{
                      backgroundColor: "transparent",
                      color: "#0B1D3A",
                      borderColor: "#0B1D3A",
                      borderWidth: "3px",
                    }}
                  ><a href="/about">
                    View Prize Structure</a>
                  </button>
                </div>

                {/* Quick Stats */}
                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up"
                  style={{
                    animationDelay: "0.8s",
                    animationFillMode: "both",
                  }}
                >
                  <div className="text-center lg:text-left">
                    <div className="text-4xl font-bold mb-2" style={{ color: "#0175c3" }}>
                      ₹15L+
                    </div>
                    <div className="text-lg" style={{ color: "#111111" }}>
                      Total Scholarships
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl font-bold mb-2" style={{ color: "#D4AF37" }}>
                      8 Classes
                    </div>
                    <div className="text-lg" style={{ color: "#111111" }}>
                      5th to 12th Grade
                    </div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl font-bold mb-2" style={{ color: "#0175c3" }}>
                      1 Hour
                    </div>
                    <div className="text-lg" style={{ color: "#111111" }}>
                      Online Test Duration
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Illustration */}
              <div className="relative animate-fade-in" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
                <div className="relative z-10 transform scale-105 transition-transform duration-500">
                  <LottiePlayer src="https://lottie.host/8587caa5-24b3-41d3-83ae-4dc7ca0f847f/vYsxD8Yee1.lottie" className="rounded-2xl  w-full h-auto "></LottiePlayer>
                  
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-yellow-200 opacity-70 transform rotate-12 z-0"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-blue-200 opacity-70 transform -rotate-12 z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why Choose ESAT with Illustrations */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 animate-slide-up"
                style={{
                  color: "#0B1D3A",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Why Students Love ESAT 2025
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto animate-slide-up"
                style={{
                  color: "#111111",
                  animationDelay: "0.2s",
                  animationFillMode: "both",
                }}
              >
                The smartest way to showcase talent, win scholarships, and accelerate your academic journey.
              </p>
            </div>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 - Discover Strengths */}
              <div 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 animate-slide-up relative overflow-hidden h-full flex flex-col"
                style={{ animationDelay: "0.1s", animationFillMode: "both" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-center flex-shrink-0">
                    <div className="h-48 w-full">
                      <Image 
                        src='https://res.cloudinary.com/dk6m1qejk/image/upload/v1749507100/Fitz_-_Strength_Training_nxokvz.png' 
                        width={400}
                        height={300}
                        className="rounded-2xl w-full h-full object-contain" 
                        alt="Discover your strengths"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-center min-h-[4rem] flex items-center justify-center" style={{ color: "#0B1D3A" }}>
                      Discover Your Strengths
                    </h3>
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-lg leading-relaxed text-center" style={{ color: "#111111" }}>
                        Get detailed insights into your academic abilities and discover subjects where you naturally excel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 2 - Win Scholarships */}
              <div
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 animate-slide-up relative overflow-hidden h-full flex flex-col"
                style={{ animationDelay: "0.2s", animationFillMode: "both" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-center flex-shrink-0">
                    <div className="h-48 w-full">
                      <Image 
                        src='https://res.cloudinary.com/dk6m1qejk/image/upload/v1749507998/Hands_-_Graduate_gsulux.png' 
                        width={400}
                        height={300}
                        className="rounded-2xl w-full h-full object-contain" 
                        alt="Win big scholarships"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-center min-h-[4rem] flex items-center justify-center" style={{ color: "#0B1D3A" }}>
                      Win Big Scholarships
                    </h3>
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-lg leading-relaxed text-center" style={{ color: "#111111" }}>
                        Top performers earn scholarships up to ₹50,000 plus certificates, mentorship, and recognition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 3 - National Recognition */}
              <div
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 animate-slide-up relative overflow-hidden h-full flex flex-col"
                style={{ animationDelay: "0.3s", animationFillMode: "both" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-center flex-shrink-0">
                    <div className="h-48 w-full">
                      <Image 
                        src='https://res.cloudinary.com/dk6m1qejk/image/upload/v1749507939/Brazuca_-_Medal_gq2yij.png' 
                        width={400}
                        height={300}
                        className="rounded-2xl w-full h-full object-contain" 
                        alt="National recognition"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-center min-h-[4rem] flex items-center justify-center" style={{ color: "#0B1D3A" }}>
                      National Recognition
                    </h3>
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-lg leading-relaxed text-center" style={{ color: "#111111" }}>
                        Join an elite community of high achievers and gain recognition on a national platform.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 4 - NCERT Aligned */}
              <div
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 animate-slide-up relative overflow-hidden h-full flex flex-col"
                style={{ animationDelay: "0.4s", animationFillMode: "both" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-center flex-shrink-0">
                    <div className="h-48 w-full">
                      <Image 
                        src='https://res.cloudinary.com/dk6m1qejk/image/upload/v1749508103/Hands_-_Book_ooqxnu.png' 
                        width={400}
                        height={300}
                        className="rounded-2xl w-full h-full object-contain" 
                        alt="NCERT aligned syllabus"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-center min-h-[4rem] flex items-center justify-center" style={{ color: "#0B1D3A" }}>
                      NCERT-Aligned Syllabus
                    </h3>
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-lg leading-relaxed text-center" style={{ color: "#111111" }}>
                        No extra preparation needed! Our syllabus perfectly aligns with your school curriculum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 5 - Expert Mentorship */}
              <div
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 animate-slide-up relative overflow-hidden h-full flex flex-col"
                style={{ animationDelay: "0.5s", animationFillMode: "both" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-center flex-shrink-0">
                    <div className="h-48 w-full">
                      <Image 
                        src='https://res.cloudinary.com/dk6m1qejk/image/upload/v1749508214/Croods_-_Keeping_in_Touch_fj6hxx.png' 
                        width={400}
                        height={300}
                        className="rounded-2xl w-full h-full object-contain" 
                        alt="Expert mentorship"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-center min-h-[4rem] flex items-center justify-center" style={{ color: "#0B1D3A" }}>
                      Expert Mentorship
                    </h3>
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-lg leading-relaxed text-center" style={{ color: "#111111" }}>
                        Top performers receive free mentorship and premium learning resources for continued growth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Card 6 - Fair & Transparent */}
              <div
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 animate-slide-up relative overflow-hidden h-full flex flex-col"
                style={{ animationDelay: "0.6s", animationFillMode: "both" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-6 text-center flex-shrink-0">
                    <div className="h-48 w-full">
                      <Image 
                        src='https://res.cloudinary.com/dk6m1qejk/image/upload/v1749508421/The_Little_Things_-_Business_Planning_dd98au.png' 
                        width={400}
                        height={300}
                        className="rounded-2xl w-full h-full object-contain" 
                        alt="Fair and transparent"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-4 text-center min-h-[4rem] flex items-center justify-center" style={{ color: "#0B1D3A" }}>
                      Fair & Transparent
                    </h3>
                    <div className="flex-grow flex items-center justify-center">
                      <p className="text-lg leading-relaxed text-center" style={{ color: "#111111" }}>
                        Every student gets an equal opportunity to shine, regardless of background or location.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Key Dates with Journey Illustration */}
        <section className="py-20 px-4" style={{ backgroundColor: "#F8F9FB" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Journey Illustration */}
              <div className="order-2 lg:order-1 animate-slide-up">
                <div className="relative">
                  <LottiePlayer src="https://lottie.host/6f9ea48e-c5fe-4a8e-93c2-669e1fc0ba81/1H4hPvuuMs.lottie" className="rounded-2xl  w-full h-auto "></LottiePlayer>
                  {/* Decorative timeline dots */}
                  <div className="absolute top-1/4 left-4 w-4 h-4 rounded-full bg-blue-500 animate-pulse"></div>
                  <div className="absolute top-2/4 left-4 w-4 h-4 rounded-full bg-yellow-500 animate-pulse delay-1000"></div>
                  <div className="absolute top-3/4 left-4 w-4 h-4 rounded-full bg-blue-500 animate-pulse delay-2000"></div>
                </div>
              </div>

              {/* Timeline Content */}
              <div className="order-1 lg:order-2">
                <h2
                  className="text-4xl md:text-5xl font-bold mb-8 animate-slide-up"
                  style={{
                    color: "#0B1D3A",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Your ESAT 2025 Journey
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#F8F9FB" }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#0175c3", color: "white" }}
                        >
                          1
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        Registration Opens
                      </h3>
                      <p className="mb-1" style={{ color: "#111111" }}>
                        Begin your child's ESAT journey with a simple registration process.
                      </p>
                      <p className="font-bold" style={{ color: "#D4AF37" }}>
                        August 01, 2025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start animate-slide-up" style={{ animationDelay: "0.3s" }}>
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#F8F9FB" }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#0175c3", color: "white" }}
                        >
                          2
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        Registration Closes
                      </h3>
                      <p className="mb-1" style={{ color: "#111111" }}>
                        Last chance to register your child for this life-changing opportunity.
                      </p>
                      <p className="font-bold" style={{ color: "#D4AF37" }}>
                        October 10, 2025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start animate-slide-up" style={{ animationDelay: "0.4s" }}>
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#F8F9FB" }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#0175c3", color: "white" }}
                        >
                          3
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        Examination Day
                      </h3>
                      <p className="mb-1" style={{ color: "#111111" }}>
                        Your child showcases their knowledge in our user-friendly online test.
                      </p>
                      <p className="font-bold" style={{ color: "#D4AF37" }}>
                        October 12, 2025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start animate-slide-up" style={{ animationDelay: "0.5s" }}>
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#F8F9FB" }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#0175c3", color: "white" }}
                        >
                          4
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: "#0B1D3A" }}>
                        Results & Rewards
                      </h3>
                      <p className="mb-1" style={{ color: "#111111" }}>
                        Discover your child's achievements and the rewards they've earned.
                      </p>
                      <p className="font-bold" style={{ color: "#D4AF37" }}>
                        November 02, 2025
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

   
        {/* Section 5: CTA with Parent-Child Illustration */}
        <section className="py-20 px-4" style={{ backgroundColor: "#F8F9FB" }}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="inline-block px-6 py-3 rounded-full mb-6 animate-slide-up"
                  style={{ backgroundColor: "#0175c3", color: "white" }}
                >
                  <span className="font-medium">Limited Time Registration</span>
                </div>

                <h2
                  className="text-4xl md:text-5xl font-bold mb-8 animate-slide-up"
                  style={{
                    color: "#0B1D3A",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Ready to Unlock Your Potential?
                </h2>

                <p
                  className="text-xl mb-12 animate-slide-up"
                  style={{
                    color: "#111111",
                    animationDelay: "0.2s",
                    animationFillMode: "both",
                  }}
                >
                  Join thousands of ambitious students in ESAT 2025. Your journey to academic excellence starts with
                  just one click!
                </p>

                {/* Benefits Grid */}
                <div
                  className="grid grid-cols-2 gap-6 mb-12 animate-slide-up"
                  style={{
                    animationDelay: "0.4s",
                    animationFillMode: "both",
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">💰</div>
                    <div className="font-semibold" style={{ color: "#0B1D3A" }}>
                      ₹200 Only
                    </div>
                    <div className="text-sm" style={{ color: "#111111" }}>
                      Registration Fee
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🏆</div>
                    <div className="font-semibold" style={{ color: "#0B1D3A" }}>
                      ₹15L+ Prizes
                    </div>
                    <div className="text-sm" style={{ color: "#111111" }}>
                      Total Scholarships
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">📜</div>
                    <div className="font-semibold" style={{ color: "#0B1D3A" }}>
                      Certificate
                    </div>
                    <div className="text-sm" style={{ color: "#111111" }}>
                      For All Participants
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎓</div>
                    <div className="font-semibold" style={{ color: "#0B1D3A" }}>
                      Free Mentorship
                    </div>
                    <div className="text-sm" style={{ color: "#111111" }}>
                      For Top Performers
                    </div>
                  </div>
                </div>

                <div
                  className="animate-slide-up"
                  style={{
                    animationDelay: "0.6s",
                    animationFillMode: "both",
                  }}
                >
                  <button
                    className="px-16 py-6 rounded-2xl font-bold text-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl transform active:scale-95 relative overflow-hidden group mb-6"
                    style={{
                      backgroundColor: "#Ffe400",
                      color: "#0B1D3A",
                      boxShadow: "0 15px 35px rgba(212, 175, 55, 0.4)",
                    }}
                  ><a href="/register">
                    <span className="relative z-10"> Register for ESAT 2025 Now</span></a>
                    <div className="absolute inset-0 bg-yellow-400  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <p className="text-lg" style={{ color: "#111111" }}>
                    Questions?{" "}
                    <a
                      href="/contact"
                      className="font-semibold hover:underline transition-all duration-300"
                      style={{ color: "#0175c3" }}
                    >
                      We're here to help! 💬
                    </a>
                  </p>
                </div>
              </div>

              {/* Parent-Child Success Illustration */}
              <div className="relative animate-fade-in" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <LottiePlayer src="https://lottie.host/9cf2fc2b-2ae2-40d4-89ab-b449843c23da/d4epAT9agu.lottie" className="rounded-2xl  w-full h-auto "></LottiePlayer>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-yellow-200 opacity-70 transform rotate-12 z-0"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-blue-200 opacity-70 transform -rotate-12 z-0"></div>

                {/* Success metrics floating around */}
                <div className="absolute -top-8 -left-8 bg-white p-3 rounded-lg shadow-lg transform -rotate-6 animate-float justify-center text-center">
                  <div className="text-2xl font-bold justify-center" style={{ color: "#D4AF37" }}>
                    ₹50K
                  </div>
                  <div className="text-xs justify-center " style={{ color: "#111111" }}>
                    Max Prize
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 bg-white p-3 rounded-lg shadow-lg transform rotate-6 animate-float-delay">
                  <div className="text-2xl font-bold" style={{ color: "#0175c3" }}>
                    #1
                  </div>
                  <div className="text-xs" style={{ color: "#111111" }}>
                    All India Rank
                  </div>
                </div>
              </div>
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float-delay 7s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  )
}

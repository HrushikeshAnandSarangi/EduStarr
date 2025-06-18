import { User, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DashboardNoRegistration() {
  const router = useRouter()
  return (
    <>
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
              You haven't started your registration for ESAT 2025 yet. Begin your journey towards academic excellence today!
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
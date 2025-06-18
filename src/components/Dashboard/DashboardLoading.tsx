import { BookOpen } from "lucide-react"

export default function DashboardLoading() {
  return (
    <>
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
              Loading your personalised dashboard
            </h2>
            <p style={{ color: "#111111" }}>Please wait while we fetch your information...</p>
          </div>
        </div>
      </div>
    </>
  )
}
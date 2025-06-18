import { User } from "lucide-react"

export default function DashboardHeader({ name }: { name: string }) {
  return (
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
              Welcome back, {name}!
            </h1>
            <p className="text-blue-100 text-lg">Your personalized dashboard for ESAT 2025 journey</p>
          </div>
        </div>
      </div>
    </div>
  )
}
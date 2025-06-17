'use client'

import { useAuth } from '@/context/useAuth'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ConfirmationPage() {
  const { user } = useAuth()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (!error) setData(data)
    }

    if (user) fetchData()
  }, [user])

  if (!data) return <div className="p-6">Loading confirmation...</div>

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white border shadow print:border-none print:shadow-none">
      <h1 className="text-2xl font-bold mb-4">You're Successfully Registered for ESAT 2025!</h1>
      <p className="mb-6 text-gray-600">Thank you, <strong>{data.full_name}</strong>! Your registration is confirmed.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <p><strong>Registration ID:</strong> EduStarr-{data.id.slice(-4).toUpperCase()}</p>
        <p><strong>Class:</strong> {data.class}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Mobile:</strong> {data.mobile}</p>
        <p><strong>Exam Date:</strong>12th October, 2025(Anytime between 8:00 AM and 11:59 PM)</p>
        <p><strong>Exam Mode:</strong> Online</p>
        <p><strong>Referral Code:</strong> {data.referral_code || 'N/A'}</p>
      </div>

      <div className="mt-8">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Print Confirmation
        </button>
      </div>
    </div>
  )
}

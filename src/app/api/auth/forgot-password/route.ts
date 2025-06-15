import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Step 1: Request password reset
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email)

    if (resetError) {
      console.error('Password reset error:', resetError)
      return NextResponse.json({ error: resetError.message || 'Password reset failed' }, { status: 400 })
    }

    return NextResponse.json({
      message: 'Password reset request successful. Please check your email for instructions.',
    })
  } catch (err: any) {
    console.error('Unexpected password reset error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

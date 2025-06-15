import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Step 1: Re-send verification email by triggering a signUp again
    const { error: resendError } = await supabase.auth.signUp({
      email,
      password: 'placeholder-password'
    })

    if (resendError) {
      console.error('Resend verification error:', resendError)
      return NextResponse.json(
        { error: resendError.message || 'Failed to resend verification email' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Verification email resent. Please check your inbox.',
    })
  } catch (err: any) {
    console.error('Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

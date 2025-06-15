import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, full_name } = body

    if (!email || !password || !full_name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Step 1: Create Supabase Auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })

    if (authError || !authData?.user) {
      console.error('Auth error:', authError)
      return NextResponse.json({ error: authError?.message || 'Signup failed' }, { status: 400 })
    }

    const user_id = authData.user.id

    // Step 2: Insert minimal registration entry
    const { error: regError } = await supabase.from('registrations').insert({
      user_id,
      full_name,
      email,
      exam_mode: 'Online',
      registration_status: 'draft',
    })

    if (regError) {
      console.error('Insert error:', regError)
      return NextResponse.json({ error: 'User created but registration failed: ' + regError.message }, { status: 500 })
    }

    return NextResponse.json({
      user: authData.user,
      message: 'Signup and registration successful',
    })
  } catch (err: any) {
    console.error('Unexpected signup error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

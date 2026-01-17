import { createClient } from "@/lib/supabase/client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json()

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Email, password, and username are required" }, { status: 400 })
    }

    const supabase = createClient()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || "http://localhost:3000"}/auth/callback`,
        data: {
          username,
          display_name: username,
        },
      },
    })

    if (error) throw error

    return NextResponse.json({ user: data.user, message: "Check your email to confirm signup" }, { status: 201 })
  } catch (error) {
    console.error("[v0] Sign up error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to sign up" }, { status: 500 })
  }
}

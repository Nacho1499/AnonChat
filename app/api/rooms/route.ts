import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // If user signed in, include unread counts from view
    if (user) {
      const { data, error } = await supabase
        .from("rooms")
        .select(`*, user_room_unreads(unread_count)`)
        .eq("is_private", false)
        .order("created_at", { ascending: false })

      if (error) throw error

      // map unread_count from nested user_room_unreads if present
      const mapped = (data || []).map((r: any) => ({
        ...r,
        unread_count: r.user_room_unreads?.[0]?.unread_count ?? 0,
      }))

      return NextResponse.json({ rooms: mapped })
    }

    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("is_private", false)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ rooms: data })
  } catch (error) {
    console.error("[v0] GET /api/rooms error:", error)
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, is_private } = body

    if (!name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 })
    }

    const roomId = `room_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const { data, error } = await supabase
      .from("rooms")
      .insert({
        id: roomId,
        name,
        description,
        is_private: is_private || false,
        created_by: user.id,
      })
      .select()

    if (error) throw error

    return NextResponse.json({ room: data[0], success: true }, { status: 201 })
  } catch (error) {
    console.error("[v0] POST /api/rooms error:", error)
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 })
  }
}

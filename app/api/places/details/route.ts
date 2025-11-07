import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { placeId, sessionToken } = await req.json()

    if (!placeId || typeof placeId !== "string") {
      return NextResponse.json({ error: "Missing placeId" }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Missing GOOGLE_MAPS_API_KEY" }, { status: 500 })
    }

    const params = new URLSearchParams({
      place_id: placeId,
      key: apiKey,
      fields: "name,formatted_address,place_id,rating,user_ratings_total",
    })

    if (sessionToken) {
      params.set("sessiontoken", String(sessionToken))
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`

    const resp = await fetch(url)

    if (!resp.ok) {
      return NextResponse.json({ error: `Upstream error ${resp.status}` }, { status: 502 })
    }

    const data = await resp.json()

    return NextResponse.json({ result: data.result ?? null, status: data.status })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


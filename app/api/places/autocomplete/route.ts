import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { input, sessionToken } = await req.json()

    if (!input || typeof input !== "string") {
      return NextResponse.json({ error: "Missing input" }, { status: 400 })
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "Missing GOOGLE_MAPS_API_KEY" }, { status: 500 })
    }

    const params = new URLSearchParams({
      input,
      key: apiKey,
      types: "establishment",
    })

    if (sessionToken) {
      params.set("sessiontoken", String(sessionToken))
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`

    const resp = await fetch(url)

    if (!resp.ok) {
      return NextResponse.json({ error: `Upstream error ${resp.status}` }, { status: 502 })
    }

    const data = await resp.json()

    return NextResponse.json({ predictions: data.predictions ?? [], status: data.status })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { placeId, sessionToken } = body

    if (!placeId || typeof placeId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid placeId parameter' },
        { status: 400 }
      )
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      console.error('Google Maps API key is not configured')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Build the request URL for Google Places Details API
    const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    url.searchParams.append('place_id', placeId)
    url.searchParams.append('key', apiKey)
    url.searchParams.append('fields', 'place_id,name,rating,user_ratings_total,formatted_address')
    url.searchParams.append('language', 'es')
    
    if (sessionToken) {
      url.searchParams.append('sessiontoken', sessionToken)
    }

    const response = await fetch(url.toString())
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in details API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


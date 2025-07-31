"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react"

export function WaitlistFormEN() {
  const businessNameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load reCAPTCHA script
    const recaptchaScript = document.createElement("script")
    recaptchaScript.src = "https://www.google.com/recaptcha/api.js?hl=en"
    recaptchaScript.async = true
    document.head.appendChild(recaptchaScript)

    // Load Brevo form script
    const brevoScript = document.createElement("script")
    brevoScript.src = "https://sibforms.com/forms/end-form/build/main.js"
    brevoScript.defer = true
    document.head.appendChild(brevoScript)

    // Load Google Maps script
    const googleMapsScript = document.createElement("script")
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (apiKey) {
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      googleMapsScript.async = true
      googleMapsScript.onload = () => {
        if (businessNameInputRef.current && window.google) {
          const autocomplete = new window.google.maps.places.Autocomplete(businessNameInputRef.current, {
            types: ["establishment"],
            fields: ["place_id", "name", "formatted_address"],
          })
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace()
            if (place && place.name && place.formatted_address && place.place_id) {
              ;(document.getElementById("BUSINESS_NAME_EN") as HTMLInputElement).value = place.name
              ;(document.getElementById("BUSINESS_ADDRESS_EN") as HTMLInputElement).value = place.formatted_address
              ;(document.getElementById("PLACE_ID_EN") as HTMLInputElement).value = place.place_id
            }
          })
        }
      }
      document.head.appendChild(googleMapsScript)
    }

    return () => {
      // Cleanup scripts on unmount
      if (document.head.contains(recaptchaScript)) document.head.removeChild(recaptchaScript)
      if (document.head.contains(brevoScript)) document.head.removeChild(brevoScript)
      if (document.head.contains(googleMapsScript)) document.head.removeChild(googleMapsScript)
    }
  }, [])

  return (
    <form
      id="sib-form"
      method="POST"
      action="https://c46696aa.sibforms.com/serve/MUIFAFA5kSKMBVKQDEaYgcm1W7S6DNhi0xGy4z0ot2rdegnuTtHnlq9HLEYoAWPqAunDTz5WKLgJ_SWV0jXzg2I5PMaKo9Es7ItbwvMoAp6FCmmCdUmaXmhn8XLoeHiWGIN4GaTzHVHu_o28aBEZ4GoaZMOsZuyCng0-zBLrMKRhgFtijOJga37d17XBuvVWQ3oN8EIhVPNkV8md"
      data-type="subscription"
      className="space-y-4"
    >
      <div className="space-y-3">
        <Input
          ref={businessNameInputRef}
          type="text"
          id="BUSINESS_NAME_SEARCH_EN"
          name="BUSINESS_NAME_SEARCH_EN"
          placeholder="Your place's name"
          required
          className="w-full"
        />
        <Input type="email" id="EMAIL" name="EMAIL" placeholder="Your email" required className="w-full" />
      </div>

      <Button type="submit" className="w-full bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2]">
        Join for Free
      </Button>

      {/* Hidden fields for Brevo */}
      <input type="hidden" id="BUSINESS_NAME_EN" name="BUSINESS_NAME" />
      <input type="hidden" id="BUSINESS_ADDRESS_EN" name="BUSINESS_ADDRESS" />
      <input type="hidden" id="PLACE_ID_EN" name="PLACE_ID" />

      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="email_address_check"
        defaultValue=""
        className="input--hidden"
        style={{ display: "none" }}
      />

      {/* Idioma */}
      <input type="hidden" name="locale" value="en" readOnly />

      {/* reCAPTCHA */}
      <div className="g-recaptcha" data-sitekey="6LcDCpUrAAAAAPeXlMvlTLg7BnVqccrPvAC0HrEN"></div>
    </form>
  )
}

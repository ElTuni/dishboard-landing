"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef } from "react"

// Declare global types
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
    google: {
      maps: {
        places: {
          Autocomplete: new (input: HTMLInputElement, options?: any) => {
            addListener: (event: string, callback: () => void) => void
            getPlace: () => { place_id?: string; name?: string; formatted_address?: string }
          }
        }
      }
    }
  }
}

export function WaitlistFormEN() {
  const businessNameInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('6LcDCpUrAAAAAPeXlMvlTLg7BnVqccrPvAC0HrEN', { action: 'submit' }).then((token: string) => {
          const form = e.target as HTMLFormElement
          const tokenInput = form.querySelector('#g-recaptcha-response') as HTMLInputElement
          if (tokenInput) {
            tokenInput.value = token
          }
          // Submit the form
          form.submit()
        })
      })
    } else {
      // If reCAPTCHA is not loaded, submit without token
      const form = e.target as HTMLFormElement
      form.submit()
    }
  }

  useEffect(() => {
    // Load reCAPTCHA v3 script
    const recaptchaScript = document.createElement("script")
    recaptchaScript.src = "https://www.google.com/recaptcha/api.js?render=6LcDCpUrAAAAAPeXlMvlTLg7BnVqccrPvAC0HrEN"
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
            fields: ["name"],
          })
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace()
            if (place && place.name) {
              // El campo ya tiene el nombre correcto, Google Places solo ayuda con el autocompletado
              businessNameInputRef.current!.value = place.name
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
      onSubmit={handleSubmit}
    >
      <div className="space-y-3">
        <Input
          ref={businessNameInputRef}
          type="text"
          id="NOMBRE"
          name="NOMBRE"
          placeholder="Your place's name"
          maxLength={200}
          required
          className="w-full"
        />
        <Input type="email" id="EMAIL" name="EMAIL" placeholder="Your email" required className="w-full" />
      </div>

      <Button type="submit" className="w-full bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2]">
        Join for Free
      </Button>

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

      {/* reCAPTCHA v3 - Hidden field for token */}
      <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
    </form>
  )
}

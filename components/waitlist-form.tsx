"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"

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

export function WaitlistForm() {
  const businessNameInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)

      if (window.grecaptcha) {
        await new Promise<void>((resolve) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute('6LcDCpUrAAAAAPeXlMvlTLg7BnVqccrPvAC0HrEN', { action: 'submit' }).then((token: string) => {
              formData.set('g-recaptcha-response', token)
              resolve()
            })
          })
        })
      }

      const response = await fetch('https://c46696aa.sibforms.com/serve/MUIFAPyHxzcRNVhtg8utFAJJk2a7JcXthSQwhP5P82Rh84DmreFXpmDSqO8ujHYLUN7CNOuxqCAmmbe7kH_ebzfBkUsGayGyX2qlSHsVu9K5WqOGVfnhEGh9gmkwLLUUKXWyHqUOw4S2HRqY25swTnUSh2FXpaZDLcf03ecW0jzQS810JxYx5_7iyqMUepkEEDlooTxkNH_2Z0G_', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const responseText = await response.text()
        
        // Check if email already exists
        if (responseText.includes('already') || responseText.includes('existe') || responseText.includes('registered')) {
          setSubmitStatus('duplicate')
          setSubmitMessage('¡Ya te anotaste! Te estaremos notificando sobre todas las novedades de Dishboard.')
        } else {
          setSubmitStatus('success')
          setSubmitMessage('¡Genial! Te anotaste exitosamente. Pronto tendrás noticias sobre Dishboard.')
          form.reset() // Clear the form
        }
      } else {
        setSubmitStatus('error')
        setSubmitMessage('Hubo un problema al enviar el formulario. Por favor, intentá de nuevo.')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Hubo un problema al enviar el formulario. Por favor, intentá de nuevo.')
    } finally {
      setIsSubmitting(false)
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
          placeholder="Nombre de tu local"
          maxLength={200}
          required
          className="w-full"
        />
        <Input type="email" id="EMAIL" name="EMAIL" placeholder="Tu email" required className="w-full" />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2]"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Apuntarme gratis'}
      </Button>

      {/* Status Messages */}
      {submitStatus !== 'idle' && (
        <div className={`p-4 rounded-md text-sm ${
          submitStatus === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : submitStatus === 'duplicate'
            ? 'bg-blue-50 text-blue-800 border border-blue-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {submitMessage}
        </div>
      )}

      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="email_address_check"
        defaultValue=""
        className="input--hidden"
        style={{ display: "none" }}
      />

      {/* Idioma */}
      <input type="hidden" name="locale" value="es" readOnly />

      {/* reCAPTCHA v3 - Hidden field for token */}
      <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
    </form>
  )
}

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
      
      // Validate email format and quality
      const email = formData.get('EMAIL') as string
      
      // Basic format validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!email || !emailRegex.test(email)) {
        setSubmitStatus('error')
        setSubmitMessage('Por favor ingresá un email válido.')
        setIsSubmitting(false)
        // Reset visual state
        const emailInput = document.getElementById('EMAIL') as HTMLInputElement
        if (emailInput) {
          emailInput.blur()
        }
        return
      }

      // Additional quality checks
      const [localPart, domain] = email.split('@')
      
      // Check for obvious fake patterns
      const suspiciousDomains = ['test.com', 'ejemplo.com', 'fake.com', 'noreal.com', '123.com', 'prueba.com']
      const fakePatternsRegex = /^(test|fake|ejemplo|prueba|admin|noreply|no-reply)\d*@/i
      
      if (suspiciousDomains.includes(domain.toLowerCase()) || fakePatternsRegex.test(email)) {
        setSubmitStatus('error')
        setSubmitMessage('Por favor ingresá un email real. Usá tu email personal o de trabajo.')
        setIsSubmitting(false)
        // Reset visual state
        const emailInput = document.getElementById('EMAIL') as HTMLInputElement
        if (emailInput) {
          emailInput.blur()
        }
        return
      }
      
      // Check for consecutive dots or other invalid patterns
      if (email.includes('..') || email.startsWith('.') || email.endsWith('.') || domain.length < 4) {
        setSubmitStatus('error')
        setSubmitMessage('El formato del email no es válido. Verificá que esté bien escrito.')
        setIsSubmitting(false)
        // Reset visual state
        const emailInput = document.getElementById('EMAIL') as HTMLInputElement
        if (emailInput) {
          emailInput.blur()
        }
        return
      }

      // Get reCAPTCHA token
      if (window.grecaptcha) {
        await new Promise<void>((resolve) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute('6LcDCpUrAAAAAPeXlMvlTLg7BnVqccrPvAC0HrEN', { action: 'submit' }).then((token: string) => {
              const tokenInput = form.querySelector('#g-recaptcha-response') as HTMLInputElement
              if (tokenInput) {
                tokenInput.value = token
              }
              resolve()
            })
          })
        })
      }

      // Create hidden iframe for form submission
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.name = 'hidden_iframe'
      document.body.appendChild(iframe)

      // Set form target to iframe
      form.target = 'hidden_iframe'
      
      // Submit form
      form.submit()

      // Show success message after a delay
      setTimeout(() => {
        setSubmitStatus('success')
        setSubmitMessage('¡Genial! Te anotaste exitosamente. Pronto tendrás noticias sobre Dishboard.')
        setIsSubmitting(false)
        form.reset()
        
        // Clean up iframe
        setTimeout(() => {
          if (document.body.contains(iframe)) {
            document.body.removeChild(iframe)
          }
        }, 1000)
      }, 2000)

    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage('Hubo un problema al enviar el formulario. Por favor, intentá de nuevo.')
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    // Load reCAPTCHA v3 script
    const recaptchaScript = document.createElement("script")
    recaptchaScript.src = "https://www.google.com/recaptcha/api.js?render=6LcDCpUrAAAAAPeXlMvlTLg7BnVqccrPvAC0HrEN"
    recaptchaScript.async = true
    
    // Add error handler to prevent uncaught errors
    recaptchaScript.onerror = (error) => {
      console.warn('reCAPTCHA script failed to load:', error)
    }
    
    document.head.appendChild(recaptchaScript)

    // Note: Removed Brevo script as we now use iframe submission to avoid DOM conflicts

    // Load Google Maps script
    const googleMapsScript = document.createElement("script")
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    
    if (apiKey) {
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`
      googleMapsScript.async = true
      
      googleMapsScript.onload = () => {
        // Wait for Places API to load with retry mechanism
        const initializePlaces = (attempt = 1) => {
          if (businessNameInputRef.current && window.google && window.google.maps && window.google.maps.places) {
            try {
              const autocomplete = new window.google.maps.places.Autocomplete(businessNameInputRef.current, {
                types: ["establishment"],
                fields: ["name"],
              })
              
              autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace()
                if (place && place.name) {
                  businessNameInputRef.current!.value = place.name
                }
              })
            } catch (error) {
              console.warn('Google Places Autocomplete initialization failed:', error)
            }
          } else if (attempt < 10) {
            setTimeout(() => initializePlaces(attempt + 1), 500)
          }
        }
        
        // Start initialization
        initializePlaces()
      }
      
      googleMapsScript.onerror = (error) => {
        console.warn('Google Maps script failed to load:', error)
      }
      
      document.head.appendChild(googleMapsScript)
    }

    return () => {
      // Cleanup scripts on unmount - with safety checks
      try {
        if (recaptchaScript && document.head.contains(recaptchaScript)) {
          document.head.removeChild(recaptchaScript)
        }
        if (googleMapsScript && document.head.contains(googleMapsScript)) {
          document.head.removeChild(googleMapsScript)
        }
      } catch (error) {
        console.warn('Error during script cleanup:', error)
      }
    }
  }, [])

  return (
    <form
      id="sib-form"
      method="POST"
      action="https://c46696aa.sibforms.com/serve/MUIFAPyHxzcRNVhtg8utFAJJk2a7JcXthSQwhP5P82Rh84DmreFXpmDSqO8ujHYLUN7CNOuxqCAmmbe7kH_ebzfBkUsGayGyX2qlSHsVu9K5WqOGVfnhEGh9gmkwLLUUKXWyHqUOw4S2HRqY25swTnUSh2FXpaZDLcf03ecW0jzQS810JxYx5_7iyqMUepkEEDlooTxkNH_2Z0G_"
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
        <Input 
          type="text" 
          id="EMAIL" 
          name="EMAIL" 
          placeholder="Tu email" 
          required 
          className="w-full focus:ring-0 focus:border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0"
          autoComplete="email"
        />
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

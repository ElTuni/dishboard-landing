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

export function WaitlistFormEN() {
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
        setSubmitMessage('Please enter a valid email address (example: user@gmail.com)')
        setIsSubmitting(false)
        return
      }

      // Additional quality checks
      const [localPart, domain] = email.split('@')
      
      // Check for obvious fake patterns
      const suspiciousDomains = ['test.com', 'example.com', 'fake.com', 'noreal.com', '123.com', 'demo.com']
      const fakePatternsRegex = /^(test|fake|example|demo|admin|noreply|no-reply)\d*@/i
      
      if (suspiciousDomains.includes(domain.toLowerCase()) || fakePatternsRegex.test(email)) {
        setSubmitStatus('error')
        setSubmitMessage('Please enter a real email address. Use your personal or work email.')
        setIsSubmitting(false)
        return
      }
      
      // Check for consecutive dots or other invalid patterns
      if (email.includes('..') || email.startsWith('.') || email.endsWith('.') || domain.length < 4) {
        setSubmitStatus('error')
        setSubmitMessage('The email format is invalid. Please check that it\'s written correctly.')
        setIsSubmitting(false)
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
        setSubmitMessage('Great! You have successfully joined the waitlist. You will hear from us soon about Dishboard.')
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
      setSubmitMessage('There was a problem submitting the form. Please try again.')
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
        if (businessNameInputRef.current && window.google && window.google.maps && window.google.maps.places) {
          try {
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
          } catch (error) {
            console.warn('Google Places Autocomplete could not be initialized:', error)
          }
        }
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
          placeholder="Your place's name"
          maxLength={200}
          required
          className="w-full"
        />
        <Input 
          type="email" 
          id="EMAIL" 
          name="EMAIL" 
          placeholder="Your email" 
          required 
          className="w-full"
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2]"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Join for Free'}
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
      <input type="hidden" name="locale" value="en" readOnly />

      {/* reCAPTCHA v3 - Hidden field for token */}
      <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
    </form>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState, useCallback } from "react"

// Declare global types
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

interface AutocompletePrediction {
  place_id: string
  description: string
  structured_formatting?: {
    main_text: string
    secondary_text?: string
  }
}

export function WaitlistForm() {
  const businessNameInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [sessionToken, setSessionToken] = useState<string>(() => 
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  )
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  // Fetch autocomplete suggestions
  const fetchSuggestions = useCallback(async (input: string) => {
    if (!input || input.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    try {
      const response = await fetch('/api/places/autocomplete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input,
          sessionToken,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }

      const data = await response.json()
      
      if (data.status === 'OK' && data.predictions) {
        setSuggestions(data.predictions)
        setShowSuggestions(true)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [sessionToken])

  // Handle input change with debounce
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      fetchSuggestions(value)
    }, 300) // 300ms debounce
  }, [fetchSuggestions])

  // Handle suggestion selection
  const handleSelectSuggestion = useCallback(async (prediction: AutocompletePrediction) => {
    if (!businessNameInputRef.current) return

    // Immediately set the value using main_text (fastest and most reliable)
    const mainText = prediction.structured_formatting?.main_text || prediction.description.split(',')[0] || prediction.description
    
    // Set the value immediately so user sees it right away
    businessNameInputRef.current.value = mainText
    
    // Hide suggestions immediately
    setShowSuggestions(false)
    setSuggestions([])

    // Try to get the official name from Place Details API (optional enhancement)
    try {
      const response = await fetch('/api/places/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          placeId: prediction.place_id,
          sessionToken,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        // Update with the official name if available and different
        if (data.result?.name && businessNameInputRef.current) {
          businessNameInputRef.current.value = data.result.name
        }
      }
    } catch (error) {
      // Silently fail - we already have a value set
      console.warn('Could not fetch place details, using autocomplete result:', error)
    }

    // Generate new session token for next search
    setSessionToken(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  }, [sessionToken])

  // Load reCAPTCHA script
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    try {
      // Load reCAPTCHA v3 script (only if not already loaded)
      if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
        const recaptchaScript = document.createElement("script")
        recaptchaScript.src = "https://www.google.com/recaptcha/api.js?render=6LcDCpUrAAAAAPeXlMvlTLg7BnVqccrPvAC0HrEN"
        recaptchaScript.async = true
        
        recaptchaScript.onerror = () => {
          console.warn('reCAPTCHA script failed to load')
        }
        
        document.head.appendChild(recaptchaScript)
      }
    } catch (error) {
      console.error('Error loading reCAPTCHA:', error)
    }

    // Cleanup debounce timer
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (businessNameInputRef.current && !businessNameInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
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
        <div className="relative">
          <Input
            ref={businessNameInputRef}
            type="text"
            id="NOMBRE"
            name="NOMBRE"
            placeholder="Nombre de tu local"
            maxLength={200}
            required
            className="w-full"
            onChange={handleInputChange}
            onFocus={(e) => {
              if (e.target.value.length >= 2 && suggestions.length > 0) {
                setShowSuggestions(true)
              }
            }}
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map((prediction) => (
                <button
                  key={prediction.place_id}
                  type="button"
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSelectSuggestion(prediction)
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault() // Prevent input from losing focus
                  }}
                >
                  <div className="font-medium text-gray-900">
                    {prediction.structured_formatting?.main_text || prediction.description}
                  </div>
                  {prediction.structured_formatting?.secondary_text && (
                    <div className="text-sm text-gray-500">
                      {prediction.structured_formatting.secondary_text}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
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

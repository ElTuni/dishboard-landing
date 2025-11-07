"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { MapPin, Star, Loader2 } from "lucide-react"
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
  rating?: number
  user_ratings_total?: number
}

interface Translations {
  placeNamePlaceholder: string
  emailPlaceholder: string
  submitButton: string
  submittingButton: string
  successMessage: string
  errorMessage: string
  invalidEmail: string
  fakeEmail: string
  invalidEmailFormat: string
  reviews: string
  suggestionsLabel: string
}

const translations: Record<'es' | 'en', Translations> = {
  es: {
    placeNamePlaceholder: "Nombre de tu local",
    emailPlaceholder: "Tu email",
    submitButton: "Apuntarme gratis",
    submittingButton: "Enviando...",
    successMessage: "¡Genial! Te anotaste exitosamente.\nPronto tendrás noticias sobre Dishboard.",
    errorMessage: "Hubo un problema al enviar el formulario. Por favor, intentá de nuevo.",
    invalidEmail: "Por favor ingresá un email válido.",
    fakeEmail: "Por favor ingresá un email real. Usá tu email personal o de trabajo.",
    invalidEmailFormat: "El formato del email no es válido. Verificá que esté bien escrito.",
    reviews: "reseñas",
    suggestionsLabel: "Sugerencias de locales gastronómicos",
  },
  en: {
    placeNamePlaceholder: "Your place's name",
    emailPlaceholder: "Your email",
    submitButton: "Join for Free",
    submittingButton: "Submitting...",
    successMessage: "Great! You have successfully joined the waitlist.\nYou will hear from us soon about Dishboard.",
    errorMessage: "There was a problem submitting the form. Please try again.",
    invalidEmail: "Please enter a valid email address.",
    fakeEmail: "Please enter a real email address. Use your personal or work email.",
    invalidEmailFormat: "The email format is invalid. Please check that it's written correctly.",
    reviews: "reviews",
    suggestionsLabel: "Restaurant suggestions",
  },
}

interface WaitlistFormProps {
  locale?: 'es' | 'en'
}

export function WaitlistForm({ locale = 'es' }: WaitlistFormProps) {
  const t = translations[locale]
  const businessNameInputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [suggestions, setSuggestions] = useState<AutocompletePrediction[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [sessionToken, setSessionToken] = useState<string>(() => 
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  )
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

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
        setSubmitMessage(t.invalidEmail)
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
      const suspiciousDomains = locale === 'es' 
        ? ['test.com', 'ejemplo.com', 'fake.com', 'noreal.com', '123.com', 'prueba.com']
        : ['test.com', 'example.com', 'fake.com', 'noreal.com', '123.com', 'demo.com']
      const fakePatternsRegex = locale === 'es'
        ? /^(test|fake|ejemplo|prueba|admin|noreply|no-reply)\d*@/i
        : /^(test|fake|example|demo|admin|noreply|no-reply)\d*@/i
      
      if (suspiciousDomains.includes(domain.toLowerCase()) || fakePatternsRegex.test(email)) {
        setSubmitStatus('error')
        setSubmitMessage(t.fakeEmail)
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
        setSubmitMessage(t.invalidEmailFormat)
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
        setSubmitMessage(t.successMessage)
        setIsSubmitting(false)
        setBusinessName('')
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
      setSubmitMessage(t.errorMessage)
      setIsSubmitting(false)
    }
  }

  // Fetch autocomplete suggestions
  const fetchSuggestions = useCallback(async (input: string) => {
    if (!input || input.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      setLoadingSuggestions(false)
      return
    }

    setLoadingSuggestions(true)
    setShowSuggestions(false) // Hide dropdown while loading

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
      
      if (data.status === 'OK' && data.predictions && data.predictions.length > 0) {
        // Fetch details (rating and reviews) for suggestions in parallel
        // Only fetch for first 5 to limit API calls, but show all suggestions
        const detailsPromises = data.predictions.slice(0, 5).map(async (prediction: AutocompletePrediction) => {
          try {
            const detailsResponse = await fetch('/api/places/details', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                placeId: prediction.place_id,
                sessionToken,
              }),
            })
            
            if (detailsResponse.ok) {
              const detailsData = await detailsResponse.json()
              if (detailsData.result) {
                return {
                  ...prediction,
                  rating: detailsData.result.rating,
                  user_ratings_total: detailsData.result.user_ratings_total,
                }
              }
            }
          } catch (error) {
            console.warn('Error fetching place details:', error)
          }
          return prediction
        })
        
        // Wait for all details to load before showing dropdown
        const suggestionsWithDetails = await Promise.all(detailsPromises)
        // Keep other suggestions that weren't in the first 5 (they won't have ratings initially)
        const remainingSuggestions = data.predictions.slice(5)
        
        // Only show dropdown once we have the details loaded
        setSuggestions([...suggestionsWithDetails, ...remainingSuggestions])
        setShowSuggestions(true)
        setLoadingSuggestions(false)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
        setLoadingSuggestions(false)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
      setShowSuggestions(false)
      setLoadingSuggestions(false)
    }
  }, [sessionToken])

  // Handle input change with debounce
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBusinessName(value)
    
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
    // Immediately set the value using main_text (fastest and most reliable)
    const mainText = prediction.structured_formatting?.main_text || prediction.description.split(',')[0] || prediction.description
    
    // Set the value in state immediately so user sees it right away
    setBusinessName(mainText)
    
    // Also update the ref for form submission
    if (businessNameInputRef.current) {
      businessNameInputRef.current.value = mainText
      // Trigger input event to ensure form recognizes the change
      const event = new Event('input', { bubbles: true })
      businessNameInputRef.current.dispatchEvent(event)
    }
    
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
        if (data.result?.name) {
          setBusinessName(data.result.name)
          if (businessNameInputRef.current) {
            businessNameInputRef.current.value = data.result.name
            const event = new Event('input', { bubbles: true })
            businessNameInputRef.current.dispatchEvent(event)
          }
        }
      }
    } catch (error) {
      // Silently fail - we already have a value set
      console.warn('Could not fetch place details, using autocomplete result:', error)
    }

    // Generate new session token for next search
    setSessionToken(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
    
    // Move focus to email input
    setTimeout(() => {
      const emailInput = document.getElementById('EMAIL') as HTMLInputElement
      if (emailInput) {
        emailInput.focus()
      }
    }, 100)
  }, [sessionToken])

  // Handle keyboard navigation in suggestions
  const handleSuggestionKeyDown = useCallback((e: React.KeyboardEvent, prediction: AutocompletePrediction, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSelectSuggestion(prediction)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      businessNameInputRef.current?.focus()
    }
  }, [handleSelectSuggestion])

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
      const target = event.target as Node
      if (
        businessNameInputRef.current && 
        !businessNameInputRef.current.contains(target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(target)
      ) {
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
            placeholder={t.placeNamePlaceholder}
            maxLength={200}
            required
            className="w-full pr-10"
            value={businessName}
            onChange={handleInputChange}
            onFocus={(e) => {
              if (e.target.value.length >= 2 && suggestions.length > 0) {
                setShowSuggestions(true)
              }
            }}
            autoComplete="off"
          />
          {loadingSuggestions && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            </div>
          )}
          {showSuggestions && suggestions.length > 0 && (
            <Card 
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-2 z-50 max-h-60 overflow-y-auto border-2 border-emerald-200 shadow-lg"
              role="listbox"
              id="suggestions-list"
              aria-label={t.suggestionsLabel}
            >
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.place_id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSelectSuggestion(suggestion)
                  }}
                  className="w-full p-3 text-left hover:bg-emerald-50 border-b border-gray-100 last:border-b-0 transition-all duration-300 ease-in-out focus:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 group"
                  role="option"
                  aria-selected="false"
                  tabIndex={0}
                  onKeyDown={(e) => handleSuggestionKeyDown(e, suggestion, index)}
                  onMouseDown={(e) => {
                    e.preventDefault() // Prevent input from losing focus
                  }}
                  type="button"
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 group-hover:text-emerald-500 flex-shrink-0 transition-colors duration-200" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate">
                          {suggestion.structured_formatting?.main_text || suggestion.description.split(',')[0]}
                        </p>
                        {suggestion.rating && (
                          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium text-gray-900">
                              {suggestion.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500 truncate">
                          {suggestion.structured_formatting?.secondary_text || suggestion.description.split(',').slice(1).join(',').trim()}
                        </p>
                        {suggestion.user_ratings_total && (
                          <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                            ({suggestion.user_ratings_total} {t.reviews})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </Card>
          )}
        </div>
        <Input 
          type="text" 
          id="EMAIL" 
          name="EMAIL" 
          placeholder={t.emailPlaceholder}
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
        {isSubmitting ? t.submittingButton : t.submitButton}
      </Button>

      {/* Status Messages */}
      {submitStatus !== 'idle' && (
        <div className={`p-4 rounded-md text-sm whitespace-pre-line ${
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
      <input type="hidden" name="locale" value={locale} readOnly />

      {/* reCAPTCHA v3 - Hidden field for token */}
      <input type="hidden" id="g-recaptcha-response" name="g-recaptcha-response" />
    </form>
  )
}

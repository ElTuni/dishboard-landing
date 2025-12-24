"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Menu, QrCode, MapPin, Star, Nfc, ShieldCheck, Users, MessageSquare, ChevronDown } from "lucide-react"
import { WaitlistForm } from "@/components/waitlist-form"
import { StarRating } from "@/components/star-rating"
import { FeaturesCarousel } from "@/components/features-carousel"
import { AnimatedCounter } from "@/components/animated-counter"
import { useState, useEffect } from "react"
import { getTranslations, type Locale } from "@/lib/translations"
import { features } from "@/lib/features"

const heroImages = ["/hero-restaurant-owner.jpg", "/hero-1.png", "/hero-2.png", "/hero-3.png"]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 flex items-center justify-between text-left">
        <span className="font-medium text-[#2A3C3F] text-lg">{question}</span>
        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="pb-5 text-gray-600">{answer}</div>}
    </div>
  )
}

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'es'
  const browserLang = navigator.language || (navigator as any).userLanguage || 'es'
  return browserLang.startsWith('en') ? 'en' : 'es'
}

export default function DishboardLandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [locale, setLocale] = useState<Locale>('es')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setLocale(detectLocale())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const t = getTranslations(locale)
  const currentFeatures = features[locale]

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
          <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Image src="/logo.png" alt="dishboard Logo" width={150} height={40} className="object-contain" />
          <span className="sr-only">dishboard</span>
          </Link>
          <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
            <Link
            href="#como-funciona"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
            {t.nav.howItWorks}
          </Link>
          <Link href="#plataforma" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {t.nav.platform}
          </Link>
          <Link href="#beneficios" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            {t.nav.benefits}
            </Link>
          </nav>
        <div className="ml-auto flex items-center gap-2">
            <Link href="#waitlist">
            <Button className="bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2] hidden sm:flex">{t.nav.tryIt}</Button>
            </Link>
          </div>
          {/* Hamburger menu - disabled but kept for future use */}
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden ml-4 bg-transparent">
                <Menu className="h-6 w-6" />
              <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                <Image src="/logo.png" alt="dishboard Logo" width={150} height={40} className="object-contain" />
                <span className="sr-only">dishboard</span>
              </Link>
              <Link href="#como-funciona" className="hover:text-foreground" prefetch={false}>
                {t.nav.howItWorks}
                </Link>
              <Link href="#plataforma" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                {t.nav.platform}
                </Link>
              <Link href="#beneficios" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                {t.nav.benefits}
                </Link>
                <div className="flex flex-col gap-4 mt-4">
                  <Link href="#waitlist">
                  <Button className="bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2] w-full">{t.nav.tryIt}</Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet> */}
      </header>

      <main className="flex-1">
        <section className="w-full min-h-[calc(100vh-4rem)] flex flex-col bg-white">
          <div className="flex-1 flex items-center py-12 md:py-16 lg:py-20">
            <div className="container px-4 md:px-6 mx-auto w-full">
              <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto w-full">
                <div className="flex flex-col space-y-5 order-2 lg:order-1">
                  <div className="flex flex-col items-start gap-1">
                    <StarRating filled={1} total={5} size="lg" hoverable />
                    <p className="text-sm text-gray-500">{t.hero.ratingLabel}</p>
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-5xl xl:text-6xl text-[#2A3C3F]">
                      {t.hero.title}{" "}
                      {t.hero.titleHighlight && (
                        <span className="underline decoration-[#8EE0B2] decoration-4 underline-offset-4">
                          {t.hero.titleHighlight}
                        </span>
                      )}
                      {t.hero.titleSuffix && ` ${t.hero.titleSuffix}`}
                  </h1>
                    <p className="text-xl md:text-2xl text-gray-600">{t.hero.subtitle}</p>
                </div>

                  <div className="flex  gap-3 flex-row  pt-2">
                  <Link href="#waitlist">
                      <Button size="lg" className="bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2] text-base px-8">
                        {t.hero.cta}
                    </Button>
                  </Link>

                  </div>
                </div>

                <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
                  <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    {heroImages.map((src, index) => (
                      <Image
                        key={src}
                        src={src || "/placeholder.svg"}
                        alt="Restaurant scene"
                        fill
                        className={`object-cover transition-opacity duration-700 ${
                          index === currentImageIndex ? "opacity-100" : "opacity-0"
                        }`}
                        priority={index === 0}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="w-full py-8 md:py-10 flex items-center bg-[#2A3C3F] text-white mt-auto">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 text-center md:text-left">
              <div className="flex items-center gap-3">
                <MapPin className="h-7 w-7 text-[#8EE0B2]" />
                <p className="text-base md:text-lg">
                  <span className="font-bold">{t.valueBar.moreReviews}</span> = {t.valueBar.betterRanking}
                </p>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/20"></div>
              <div className="flex items-center gap-3">
                <Star className="h-7 w-7 text-[#8EE0B2] fill-[#8EE0B2]" />
                <p className="text-base md:text-lg">
                  <span className="font-bold">{t.valueBar.betterReputation}</span> = {t.valueBar.moreCustomers}
                </p>
              </div>
            </div>
          </div>
          </section>
        </section>

        <section className="w-full min-h-[600px] py-20 md:py-28 bg-white flex items-center">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
              <div className="order-2 lg:order-1 flex justify-center">
                <div className="relative">
                  <div className="w-72 h-72 md:w-80 md:h-80 bg-gradient-to-br from-[#8EE0B2]/20 to-[#2A3C3F]/10 rounded-3xl flex items-center justify-center">
                    <div className="w-52 h-52 md:w-60 md:h-60 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 p-6">
                      <QrCode className="h-24 w-24 md:h-28 md:w-28 text-[#2A3C3F]" />
                      <div className="flex items-center justify-center gap-2 text-base font-medium text-gray-600">
                        <Nfc className="h-5 w-5" />
                        <span>{t.qrSection.nfcLabel}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-[#8EE0B2] text-gray-900 font-bold text-sm px-4 py-1.5 rounded-full shadow-md">
                    {t.qrSection.badge}
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-[#2A3C3F]">
                  {t.qrSection.title} <AnimatedCounter end={10} className="text-[#8EE0B2]" /> {t.qrSection.titleSuffix}
                </h2>
                <p className="text-gray-600 md:text-lg lg:text-xl">
                  {t.qrSection.description1} <strong>{t.qrSection.description1Highlight}</strong> {t.qrSection.description1End}
                </p>
                <p className="text-gray-600 md:text-lg lg:text-xl">
                  {t.qrSection.description2}{" "}
                  <span className="font-semibold text-[#2A3C3F]">{t.qrSection.description2Highlight}</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          className="w-full bg-[#EDEEEF] py-16 md:py-20"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-2 text-center mb-8 md:mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#2A3C3F]">{t.howItWorks.title}</h2>
              <p className="max-w-[600px] text-gray-600 md:text-lg">{t.howItWorks.subtitle}</p>
            </div>

            <div className="w-full max-w-5xl lg:max-w-7xl mx-auto flex justify-center">
              {/* Mobile version - vertical layout */}
              <Image
                src="/dishboard-flow-vertical.png"
                alt={t.howItWorks.title}
                width={800}
                height={1200}
                className="w-max max-w-none h-auto block md:hidden"
                style={{ maxHeight: '90vh', objectFit: 'contain' }}
                priority
              />
              {/* Desktop version - horizontal layout */}
              <Image
                src="/dishboard-flow.png"
                alt={t.howItWorks.title}
                width={1200}
                height={800}
                className="max-w-full h-auto hidden md:block"
                style={{ maxHeight: '70vh', objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        </section>

        <section id="plataforma" className="w-full py-14 md:py-18 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-3 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#2A3C3F]">{t.platform.title}</h2>
              <p className="max-w-[700px] text-gray-600 md:text-lg">{t.platform.subtitle}</p>
            </div>

            <div className="max-w-5xl mx-auto">
              <FeaturesCarousel features={currentFeatures} />
            </div>
                  </div>
        </section>

        <section id="beneficios" className="w-full py-14 md:py-18 bg-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/benefits-food.jpg"
                    alt={t.benefits.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#2A3C3F] mb-3">
                    {t.benefits.title}{" "}
                    {t.benefits.titleHighlight && (
                      <span className="underline decoration-[#8EE0B2] decoration-4 underline-offset-4">
                        {t.benefits.titleHighlight}
                      </span>
                    )}{" "}
                    {t.benefits.titleSuffix}
                  </h2>
                  <p className="text-gray-600 md:text-lg">{t.benefits.subtitle}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-[#8EE0B2] rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-[#2A3C3F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#2A3C3F] mb-1">{t.benefits.moreReviews.title}</h3>
                      <p className="text-sm text-gray-600">{t.benefits.moreReviews.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-[#8EE0B2] rounded-full flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-5 w-5 text-[#2A3C3F]" />
                </div>
                    <div>
                      <h3 className="font-bold text-[#2A3C3F] mb-1">{t.benefits.fewerComplaints.title}</h3>
                      <p className="text-sm text-gray-600">{t.benefits.fewerComplaints.description}</p>
              </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-[#8EE0B2] rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-[#2A3C3F]" />
                </div>
                    <div>
                      <h3 className="font-bold text-[#2A3C3F] mb-1">{t.benefits.moreCustomers.title}</h3>
                      <p className="text-sm text-gray-600">{t.benefits.moreCustomers.description}</p>
              </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-[#2A3C3F] mb-8">{t.faq.title}</h2>
              <div className="divide-y divide-gray-200">
                {t.faq.items.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="w-full py-16 md:py-28 bg-[#2A3C3F] text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t.waitlist.title}</h2>
              <p className="text-gray-300 md:text-lg max-w-xl">{t.waitlist.subtitle}</p>
              <div className="w-full max-w-md pb-8 md:pb-0">
                <WaitlistForm locale={locale} />
            </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500">{t.footer.copyright}</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:underline underline-offset-4 text-gray-500"
            prefetch={false}
          >
            {t.footer.terms}
          </Link>
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs hover:underline underline-offset-4 text-gray-500"
            prefetch={false}
          >
            {t.footer.privacy}
          </Link>
        </nav>
      </footer>
    </div>
  )
}

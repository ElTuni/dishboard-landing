import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu, LayoutDashboard, Lightbulb, Users, TrendingUp, MapPin, Instagram } from "lucide-react"
import { EvolutionChartEN } from "@/components/line-chart-en"
import { ComparisonChartEN } from "@/components/bar-chart-en"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WaitlistFormEN } from "@/components/waitlist-form-en"

export default function DishboardLandingPageEN() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center">
          <Link href="/en" className="flex items-center justify-center" prefetch={false}>
            <Image src="/logo.png" alt="Dishboard Logo" width={150} height={40} className="object-contain" />
            <span className="sr-only">Dishboard</span>
          </Link>
          <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Features
            </Link>
            <Link
              href="#integrations"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Integrations
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost">ES</Button>
            </Link>
            <Button className="bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2] hidden sm:flex">Join the Waitlist</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden ml-4 bg-transparent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="/en" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                  <Image src="/logo.png" alt="Dishboard Logo" width={150} height={40} className="object-contain" />
                  <span className="sr-only">Dishboard</span>
                </Link>
                <Link href="#features" className="hover:text-foreground" prefetch={false}>
                  Features
                </Link>
                <Link href="#integrations" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  Integrations
                </Link>
                <div className="flex flex-col gap-4 mt-4">
                  <Button className="bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2]">Join the Waitlist</Button>
                  <Link href="/" className="text-muted-foreground hover:text-foreground">
                    ES - Versión en español
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#2A3C3F]">
                    Outshine Your Competition.
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    We turn scattered customer feedback into clear,{" "}
                    <span className="underline decoration-[#8EE0B2] decoration-2 underline-offset-4">actionable</span>{" "}
                    insights to improve your eatery.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row min-[400px]:px-2 min-[441px]:px-0">
                  <Link href="#waitlist">
                    <Button size="lg" className="bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2] w-full">
                      Join the Waitlist
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Discover How
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/hero-illustration.png"
                  width="600"
                  height="400"
                  alt="Illustration of a food business owner analyzing business data and charts on a laptop"
                  className="aspect-video overflow-hidden rounded-xl object-contain w-full max-w-lg lg:order-last"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="competitors" className="w-full py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#2A3C3F]">Don't Get Left Behind</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Feel like your competitors are doing better but you don't know why? Dishboard gives you the full picture
                so you can react quickly and take control.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Your Rating vs. Competitors</CardTitle>
                </CardHeader>
                <CardContent>
                  <EvolutionChartEN />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Where Competitors Outperform You</CardTitle>
                </CardHeader>
                <CardContent>
                  <ComparisonChartEN />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl md:gap-12 lg:max-w-5xl lg:grid-cols-2">
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8EE0B2] rounded-full">
                    <LayoutDashboard className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2A3C3F]">Everything in One Place</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Get the full picture at a glance: what customers are saying, how you stack up against the competition,
                  and where your opportunities for improvement lie.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8EE0B2] rounded-full">
                    <Lightbulb className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2A3C3F]">Actionable Insights, Not Just Data</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Don't drown in data. We give you clear, prioritized recommendations: 'Offer a vegan option,' 'Improve
                  service speed,' 'Add more gluten-free choices.'
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8EE0B2] rounded-full">
                    <Users className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2A3C3F]">Understand Your Competition's Playbook</h3>
                </div>
                <p className="text-sm text-gray-600">
                  See what's working (and what's not) for other eateries in your area. Discover opportunities and avoid
                  making the same mistakes.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8EE0B2] rounded-full">
                    <TrendingUp className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2A3C3F]">Measure the Impact of Your Actions</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Changed the menu? Renovated the space? See how your metrics react in real-time and verify what's truly
                  working.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="integrations" className="w-full py-12 md:py-16 lg:py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm">Integrations</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#2A3C3F]">
                  All Your Data in One Place
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We start with Google Maps, the key tool for any restaurant.
                  <br />
                  And much more, coming soon.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <MapPin className="h-12 w-12 text-red-500" />
                <span className="font-semibold">Google Maps</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center opacity-50">
                <Image
                  src="/tiktok-logo.png"
                  alt="TikTok Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  style={{ filter: "grayscale(1) brightness(0.6) contrast(1.2)" }}
                />
                <span className="font-semibold">TikTok</span>
                <span className="text-xs font-medium text-gray-500">(Coming Soon)</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center opacity-50">
                <Image
                  src="/yelp-logo.png"
                  alt="Yelp Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  style={{ filter: "grayscale(1) brightness(0.6) contrast(1.2)" }}
                />
                <span className="font-semibold">Yelp</span>
                <span className="text-xs font-medium text-gray-500">(Coming Soon)</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center opacity-50">
                <Image
                  src="/tripadvisor-logo.png"
                  alt="TripAdvisor Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  style={{ filter: "grayscale(1) brightness(0.6) contrast(1.2)" }}
                />
                <span className="font-semibold">TripAdvisor</span>
                <span className="text-xs font-medium text-gray-500">(Coming Soon)</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center opacity-50">
                <Instagram className="h-12 w-12 text-gray-500" />
                <span className="font-semibold">Instagram</span>
                <span className="text-xs font-medium text-gray-500">(Coming Soon)</span>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="w-full py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#2A3C3F] text-center">
                Ready to Stop Guessing?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the waitlist and be one of the first to try Dishboard. You'll get early access and special beta
                user benefits.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <WaitlistFormEN />
              <p className="text-xs text-gray-500">
                It's free. No strings attached. This site is protected by reCAPTCHA and Google policies apply.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-gray-500">&copy; 2025 Dishboard. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Terms
          </Link>
          <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
        </div>
      </footer>
    </div>
  )
}

"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu, LayoutDashboard, Lightbulb, Users, TrendingUp, MapPin, Instagram } from "lucide-react"
import { EvolutionChart } from "@/components/line-chart"
import { ComparisonChart } from "@/components/bar-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WaitlistForm } from "@/components/waitlist-form"
// import { AnimateOnScroll } from "@/components/animate-on-scroll"

export default function DishboardLandingPageES() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center">
          <Link href="#" className="flex items-center justify-center" prefetch={false}>
            <Image src="/logo.png" alt="Logo de Dishboard" width={150} height={40} className="object-contain" />
            <span className="sr-only">Dishboard</span>
          </Link>
          <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Qué Hacemos
            </Link>
            <Link
              href="#integrations"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Integraciones
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2 relative">
            <Link href="/en">
              <Button variant="ghost">EN</Button>
            </Link>
            <Button className="bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2] hidden sm:flex">Unite a la lista</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden ml-4 bg-transparent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú de navegación</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium">
                <Link href="#" className="flex items-center gap-2 text-lg font-semibold" prefetch={false}>
                  <Image src="/logo.png" alt="Logo de Dishboard" width={150} height={40} className="object-contain" />
                  <span className="sr-only">Dishboard</span>
                </Link>
                <Link href="#features" className="hover:text-foreground" prefetch={false}>
                  Qué Hacemos
                </Link>
                <Link href="#integrations" className="text-muted-foreground hover:text-foreground" prefetch={false}>
                  Integraciones
                </Link>
                <div className="flex flex-col gap-4 mt-4">
                  <Button className="bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2]">Unirse a la lista</Button>
                  <Link href="/en" className="text-muted-foreground hover:text-foreground">
                    EN - English version
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
                    Hacé que tu local gastronómico destaque de la competencia.
                  </h1>
                  <p className="max-w-[600px] text-gray-600 md:text-xl">
                    Convertimos las opiniones dispersas de tus clientes en recomendaciones claras y{" "}
                    <span className="underline decoration-[#8EE0B2] decoration-2 underline-offset-4">accionables</span>{" "}
                    para mejorar tu local.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#waitlist">
                    <Button size="lg" className="bg-[#8EE0B2] text-gray-900 hover:bg-[#7cd4a2] w-full">
                      Unite a la lista de espera
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      Descubrí cómo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/hero-illustration.png"
                  width="600"
                  height="400"
                  alt="Ilustración de una dueña de local gastronómico analizando datos y gráficos de su negocio en una laptop"
                  className="aspect-video overflow-hidden rounded-xl object-contain w-full max-w-lg lg:order-last"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="competitors" className="w-full py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#2A3C3F]">No te quedes atrás</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ¿Sentís que a tu competencia le va mejor pero no sabés por qué? Dishboard te muestra la foto completa
                para que reacciones rápido y tomes el control.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Tu calificación vs. competencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <EvolutionChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">¿En qué te gana la competencia?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ComparisonChart />
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
                  <h3 className="text-lg font-bold text-[#2A3C3F]">Todo en un solo lugar</h3>
                </div>
                <p className="text-sm text-gray-600">
                  De un vistazo tenés el panorama completo: qué dicen de tu local, cómo te comparás con la competencia y
                  dónde están las oportunidades de mejora.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8EE0B2] rounded-full">
                    <Lightbulb className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2A3C3F]">El "qué hacer" con los datos</h3>
                </div>
                <p className="text-sm text-gray-600">
                  No te ahogues en los datos. Te damos recomendaciones claras y priorizadas: 'Ofrecé opción vegana',
                  'Mejorá la velocidad del servicio', 'Agregá más opciones sin gluten'.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8EE0B2] rounded-full">
                    <Users className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2A3C3F]">Entendé el juego de tu competencia</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Mirá qué les funciona y qué no a los locales gastronómicos de tu zona. Descubrí oportunidades y evitá
                  cometer los mismos errores.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#8EE0B2] rounded-full">
                    <TrendingUp className="h-6 w-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2A3C3F]">Medí el impacto de tus acciones</h3>
                </div>
                <p className="text-sm text-gray-600">
                  ¿Hiciste un cambio en el menú? ¿Renovaste el local? Mirá cómo reaccionan tus métricas en tiempo real y
                  comprobá qué es lo que de verdad funciona.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="integrations" className="w-full py-12 md:py-16 lg:py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm">Integraciones</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#2A3C3F]">
                  Toda tu data en un solo lugar
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Arrancamos con Google Maps, la herramienta clave para cualquier negocio gastronómico.
                  <br />Y pronto, mucho más.
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
                  alt="Logo de TikTok"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  style={{ filter: "grayscale(1) brightness(0.6) contrast(1.2)" }}
                />
                <span className="font-semibold">TikTok</span>
                <span className="text-xs font-medium text-gray-500">(Próximamente)</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center opacity-50">
                <Image
                  src="/yelp-logo.png"
                  alt="Logo de Yelp"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  style={{ filter: "grayscale(1) brightness(0.6) contrast(1.2)" }}
                />
                <span className="font-semibold">Yelp</span>
                <span className="text-xs font-medium text-gray-500">(Próximamente)</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center opacity-50">
                <Image
                  src="/tripadvisor-logo.png"
                  alt="Logo de TripAdvisor"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                  style={{ filter: "grayscale(1) brightness(0.6) contrast(1.2)" }}
                />
                <span className="font-semibold">TripAdvisor</span>
                <span className="text-xs font-medium text-gray-500">(Próximamente)</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-center opacity-50">
                <Instagram className="h-12 w-12 text-gray-500" />
                <span className="font-semibold">Instagram</span>
                <span className="text-xs font-medium text-gray-500">(Próximamente)</span>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="w-full py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-[#2A3C3F] text-center">
                ¿Querés dejar de improvisar?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Anotate en la lista de espera y sé de los primeros en probar Dishboard. Vas a tener acceso anticipado y
                beneficios por ser parte de la beta.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <WaitlistForm />
              <p className="text-xs text-gray-500">
                Gratis y sin vueltas. Usamos Google Places para autocompletar el nombre de tu local.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
        <p className="text-xs text-gray-500">&copy; 2025 Dishboard. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Terminos y Condiciones
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Privacidad
          </Link>
        </nav>
        </div>
      </footer>
    </div>
  )
}

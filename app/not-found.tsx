"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, MapPin } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 dark:from-emerald-950 dark:via-gray-950 dark:to-emerald-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="p-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-full">
              <MapPin className="h-16 w-16 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              404
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Página no encontrada
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-base sm:text-lg">
          Parece que esta ubicación no existe en nuestro mapa.
          La página que buscas puede haber sido movida o eliminada.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            className="bg-[#10B981] hover:bg-[#059669] text-white"
          >
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        {/* Footer note */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          Si crees que esto es un error, contacta a nuestro equipo de soporte.
        </p>
      </div>
    </div>
  )
}

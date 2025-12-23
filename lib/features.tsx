"use client"

import type React from "react"
import {
  TrendingUp,
  Lightbulb,
  Users,
  Clock,
  Target,
  Star,
  QrCode,
  Reply,
  Sparkles,
} from "lucide-react"
import type { Locale } from "./translations"

export interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  image: string
}

export const features: Record<Locale, Feature[]> = {
  es: [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Evolución de calificación",
      description:
        "Mirá cómo cambia tu puntuación a lo largo del tiempo. Detectá qué impacto tuvo una acción que tomaste.",
      image: "Gráfico de evolución de rating",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Hallazgos automáticos",
      description:
        "Un resumen claro de qué funciona y qué mejorar, según tus clientes.",
      image: "Panel de hallazgos destacados",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Empleados destacados",
      description: "Sabé quiénes de tu equipo son mencionados positivamente en las reseñas. Reconocelos y premialos.",
      image: "Ranking de empleados mencionados",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Ocupación por día y hora",
      description: "Entendé cuándo tu local está más lleno y comparalo con tu competencia, según Google Maps",
      image: "Mapa de calor de ocupación",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Tips con IA",
      description:
        "Recibí recomendaciones personalizadas basadas en el análisis de tus reseñas. Acciones concretas para mejorar.",
      image: "Lista de recomendaciones IA",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Competidores inteligentes",
      description: "Compará tu local con la competencia. Descubrí en qué te ganan y en qué sos mejor.",
      image: "Comparativa con competidores",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Todas las reseñas en un lugar",
      description: "Google, TripAdvisor y tu QR. Todo centralizado para que no se te escape ninguna opinión.",
      image: "Vista unificada de reseñas",
    },
    {
      icon: <Reply className="h-6 w-6" />,
      title: "Respuestas automáticas",
      description:
        "Configurá respuestas automáticas para agradecer reseñas positivas o atender las negativas rápidamente.",
      image: "Panel de respuestas automáticas",
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "Gestión de código QR",
      description: "Personalizá tu QR, descargalo en alta calidad, y seguí las métricas de escaneos.",
      image: "Editor de código QR",
    },
  ],
  en: [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Rating evolution",
      description: "See how your score changes over time. Spot if an action you took had a positive or negative impact.",
      image: "Rating evolution chart",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Automatic insights",
      description:
        "dishboard reads all reviews and summarizes what's best about your place and what needs improvement, according to your customers.",
      image: "Key findings panel",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Star employees",
      description: "Know which team members are mentioned positively in reviews. Recognize and reward them.",
      image: "Employee mentions ranking",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Occupancy by day & time",
      description: "Understand when your place is busiest according to what customers mention in their reviews.",
      image: "Occupancy heatmap",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-powered tips",
      description: "Get personalized recommendations based on your review analysis. Concrete actions to improve.",
      image: "AI recommendations list",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart competitors",
      description: "Compare your place with the competition. Discover where they beat you and where you shine.",
      image: "Competitor comparison",
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "All reviews in one place",
      description: "Google, TripAdvisor, and your QR. All centralized so you don't miss any feedback.",
      image: "Unified reviews view",
    },
    {
      icon: <Reply className="h-6 w-6" />,
      title: "Auto-replies",
      description: "Set up automatic responses to thank positive reviews or address negative ones quickly.",
      image: "Auto-reply settings panel",
    },
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "QR code management",
      description: "Customize your QR, download in high quality, and track scan metrics.",
      image: "QR code editor",
    },
  ],
}


export type Locale = 'es' | 'en'

export const translations = {
  es: {
    nav: {
      howItWorks: 'Cómo Funciona',
      platform: 'La Plataforma',
      benefits: 'Beneficios',
      tryIt: 'Quiero probarlo',
    },
    hero: {
      ratingLabel: '¿Te suena?',
      title: 'No más reseñas',
      titleHighlight: 'injustas',
      subtitle: 'Reseñas inteligentes para locales gastronómicos que quieren crecer',
      cta: 'Quiero probarlo gratis',
      howItWorks: '¿Cómo funciona?',
    },
    valueBar: {
      moreReviews: 'Más reseñas',
      betterRanking: 'mejor posición en Google Maps',
      betterReputation: 'Mejor reputación',
      moreCustomers: 'más clientes nuevos',
    },
    qrSection: {
      title: 'Hasta',
      titleSuffix: 'veces más reseñas por mes',
      description1: 'Diseñamos un QR que llama la atención y',
      description1Highlight: 'sumamos un chip NFC',
      description1End: 'para que tus clientes solo acerquen el celular y opinen en segundos.',
      description2: 'El resultado:',
      description2Highlight: 'muchas más reseñas todos los meses',
      badge: 'Más reseñas reales',
      nfcLabel: 'NFC integrado',
    },
    howItWorks: {
      title: 'Cada reseña en el canal correcto',
      subtitle: 'Públicas cuando todo va bien. Privadas cuando no.',
    },
    platform: {
      title: 'Todo lo que pasa en tu restaurante, en un solo lugar',
      subtitle: 'Reseñas y datos clave, ordenados para que entiendas qué funciona y qué mejorar.',
    },
    benefits: {
      title: 'Resultados',
      titleHighlight: 'concretos',
      titleSuffix: 'para tu restaurante',
      subtitle: 'Dishboard impacta directo en tu reputación online y en la cantidad de clientes que te eligen.',
      moreReviews: {
        title: 'Más reseñas reales',
        description: 'Más clientes dejan su opinión todos los meses, de forma simple y natural.',
      },
      fewerComplaints: {
        title: 'Menos quejas públicas',
        description: 'Las experiencias negativas se atienden en privado antes de convertirse en reseñas públicas.',
      },
      moreCustomers: {
        title: 'Más clientes nuevos',
        description: 'Una mejor reputación hace que más personas te elijan cuando buscan dónde comer.',
      },
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          question: '¿Dishboard es sólo un QR?',
          answer:
            'No. El QR es el punto de entrada. Dishboard centraliza todas las opiniones y te ayuda a entender qué pasa en tu restaurante y dónde mejorar.',
        },
        {
          question: '¿Reemplaza Google Maps o Google Business Profile?',
          answer:
            'No. Dishboard los complementa. Te ayuda a conseguir más reseñas, a entenderlas mejor y a responderlas desde un solo lugar, de forma manual o automática. Las reseñas siguen siendo públicas en Google y otras plataformas.',
        },
        {
          question: '¿Cuánto tiempo me va a llevar configurarlo?',
          answer:
            'Menos de 10 minutos. Conectás tu perfil de Google, personalizás el mensaje que ven tus clientes y listo. Te enviamos el QR/NFC por correo.',
        },
        {
          question: '¿Funciona para cualquier tipo de local gastronómico?',
          answer:
            'Funciona mejor en locales con atención en el lugar: restaurantes, bares, cafeterías, heladerías. Si tus clientes pasan tiempo en el local, Dishboard funciona.',
        },
        {
          question: '¿Tengo que instalar algo o capacitar a mi equipo?',
          answer: 'No. El QR/NFC lo pones en la mesa y listo. No necesitás app, no necesitas explicarle nada a nadie.',
        },
        {
          question: '¿Qué pasa si un cliente deja una mala reseña igual?',
          answer:
            'Puede pasar. Dishboard no elimina reseñas ni interfiere con las plataformas. Lo que hace es reducir la cantidad de malas reseñas públicas ofreciendo primero un canal privado.',
        },
      ],
    },
    waitlist: {
      title: '¿Tu local no tiene la visibilidad que merece?',
      subtitle: 'Sumate a la lista de espera y sé de los primeros en probar Dishboard.',
    },
    footer: {
      copyright: '© 2025 dishboard. Todos los derechos reservados.',
      terms: 'Términos del Servicio',
      privacy: 'Privacidad',
    },
  },
  en: {
    nav: {
      howItWorks: 'How It Works',
      platform: 'Platform',
      benefits: 'Benefits',
      tryIt: 'Try It Free',
    },
    hero: {
      ratingLabel: 'Sound familiar?',
      title: 'No more unfair reviews',
      titleHighlight: '',
      subtitle: 'Smart reviews for restaurants that want to grow',
      cta: 'Try It Free',
      howItWorks: 'How does it work?',
    },
    valueBar: {
      moreReviews: 'More reviews',
      betterRanking: 'higher Google Maps ranking',
      betterReputation: 'Better reputation',
      moreCustomers: 'more new customers',
    },
    qrSection: {
      title: 'Up to',
      titleSuffix: 'times more reviews per month',
      description1: 'We designed an eye-catching QR and',
      description1Highlight: 'added an NFC chip',
      description1End: 'so customers just tap their phone and leave feedback in seconds.',
      description2: 'The result:',
      description2Highlight: 'way more reviews every month',
      badge: '10x more reviews',
      nfcLabel: 'Built-in NFC',
    },
    howItWorks: {
      title: 'Every review in the right channel',
      subtitle: 'Public when things go well. Private when they don\'t.',
    },
    platform: {
      title: 'More than a QR: your intelligence hub',
      subtitle: 'dishboard collects all feedback (from Google, TripAdvisor, and your QR) and turns it into insights you can act on.',
    },
    benefits: {
      title: 'Real results for your restaurant',
      titleHighlight: '',
      titleSuffix: '',
      subtitle: 'Dishboard directly impacts your online reputation and the number of customers who choose you.',
      moreReviews: {
        title: 'More real reviews',
        description: 'More customers leave their feedback every month, simply and naturally.',
      },
      fewerComplaints: {
        title: 'Fewer public complaints',
        description: 'Negative experiences are handled privately before becoming public reviews.',
      },
      moreCustomers: {
        title: 'More new customers',
        description: 'A better reputation means more people choose you when looking for a place to eat.',
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Is Dishboard just a QR code?',
          answer:
            'No. The QR is the entry point. Dishboard centralizes all opinions and helps you understand what\'s happening in your restaurant and where to improve.',
        },
        {
          question: 'Does it replace Google Maps or Google Business Profile?',
          answer:
            'No. Dishboard complements them. It helps you get more reviews, understand them better, and respond to them from one place, manually or automatically. Reviews remain public on Google and other platforms.',
        },
        {
          question: 'How long will it take to set up?',
          answer:
            'Less than 10 minutes. Connect your Google profile, customize the message your customers see, and you\'re done. We\'ll send you the QR/NFC by mail.',
        },
        {
          question: 'Does it work for any type of food establishment?',
          answer:
            'It works best in places with on-site service: restaurants, bars, cafes, ice cream shops. If your customers spend time at the establishment, Dishboard works.',
        },
        {
          question: 'Do I need to install anything or train my team?',
          answer: 'No. You just put the QR/NFC on the table and you\'re done. No app needed, no need to explain anything to anyone.',
        },
        {
          question: 'What if a customer leaves a bad review anyway?',
          answer:
            'It can happen. Dishboard doesn\'t remove reviews or interfere with platforms. What it does is reduce the number of public bad reviews by offering a private channel first.',
        },
      ],
    },
    waitlist: {
      title: 'Does your restaurant deserve more visibility?',
      subtitle: 'Improve your online reputation, attract more customers, and use real feedback to keep improving. Leave your details and we\'ll let you know when it\'s ready.',
    },
    footer: {
      copyright: '© 2025 dishboard. All rights reserved.',
      terms: 'Terms of Service',
      privacy: 'Privacy',
    },
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale]
}


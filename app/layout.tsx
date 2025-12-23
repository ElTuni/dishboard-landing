import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'dishboard',
  description: 'Reseñas inteligentes para locales gastronómicos que quieren crecer',
  generator: 'dishboard',
  icons: {
    icon: [
      {
        url: '/logonotext.png',
      },
    ],
    apple: '/logonotext.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="text-base lg:text-[120%]">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

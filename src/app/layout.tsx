import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Forum BOOST Entrepreneurship 2026",
    template: "%s | Forum BOOST Entrepreneurship",
  },
  description: "Le Forum BOOST Entrepreneurship réunit les 120 MSMEs leaders du programme EDQ, organisé par le CLE avec le soutien de l'Union Européenne et de la Banque Mondiale. 29 mars – 1er avril 2026, Djibouti-Ville.",
  keywords: ['forum', 'entrepreneuriat', 'djibouti', 'CLE', 'EDQ', 'MSMEs', 'G2B', 'UE', 'banque mondiale', '2026'],
  openGraph: {
    title: "Forum BOOST Entrepreneurship 2026",
    description: "Organisé par le CLE — 120 MSMEs leaders, Caravane G2B, inclusion financière. 29 mars – 1er avril 2026, Djibouti-Ville.",
    type: 'website',
    locale: 'fr_DJ',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ThematiquesSection from '@/components/sections/ThematiquesSection'
import ProgramSection from '@/components/sections/ProgramSection'
import OrateurSection from '@/components/sections/OrateurSection'
import SponsorsSection from '@/components/sections/SponsorsSection'
import FAQSection from '@/components/sections/FAQSection'

export const metadata = {
  title: "Forum National de l'Entrepreneuriat 2026",
  description:
    "Organisé par le CLE — 120 MSMEs leaders, Caravane G2B, inclusion financière. 23 mars 2026, Djibouti-Ville.",
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ThematiquesSection />
      <ProgramSection />
      <OrateurSection />
      <SponsorsSection />
      <FAQSection />
    </main>
  )
}

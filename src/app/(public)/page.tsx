import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ThematiquesSection from '@/components/sections/ThematiquesSection'
import ProgramSection from '@/components/sections/ProgramSection'
import SponsorsSection from '@/components/sections/SponsorsSection'
import FAQSection from '@/components/sections/FAQSection'
import RegistrationForm from '@/components/forms/RegistrationForm'

export const metadata = {
  title: "Forum National de l'Entrepreneuriat 2026 — FISDJ",
  description:
    "Forum International des Startups et de l'Innovation Numérique de Djibouti — Organisé par MDENI × CLE. 120 MSMEs leaders, Caravane G2B, inclusion financière. 23 mars 2026, Palais du Peuple, Djibouti-Ville.",
}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SponsorsSection />
      <ThematiquesSection />
      <ProgramSection />
      <section id="inscription" className="py-14 md:py-12 bg-gradient-to-br from-djibouti-navy to-djibouti-dark">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-djibouti-gold text-sm font-semibold uppercase tracking-widest mb-4 block">
              Inscription
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
              Réservez votre place
            </h2>
            <p className="text-white/70 text-lg">
              Les places sont limitées – Inscrivez-vous avant le 20 mars 2026
            </p>
          </div>
          <RegistrationForm />
        </div>
      </section>
      <FAQSection />
    </main>
  )
}

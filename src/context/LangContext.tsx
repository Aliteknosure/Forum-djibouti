'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Lang = 'fr' | 'en'

// ──────────────────────────────────────────────────────────────
// Dictionnaire de traductions
// ──────────────────────────────────────────────────────────────
export const translations = {
  fr: {
    // Navigation
    nav: {
      about:     'À propos',
      program:   'Programme',
      speakers:  'Partenaires',
      sponsors:  'Soutiens',
      faq:       'FAQ',
      register:  "S'inscrire",
      registerNow: "S'inscrire maintenant",
    },
    // Hero
    hero: {
      badge:    'Forum BOOST Entrepreneurship · 23 mars 2026',
      title:    "Forum BOOST\nEntrepreneurship",
      subtitle: "Transformer l'entrepreneuriat de quartier en moteur de croissance nationale. 120 MSMEs leaders réunies pour un jour de connexions, de financement et d'opportunités.",
      cta:      "S'inscrire maintenant",
      ctaSub:   'Voir le programme',
      date:     '23 mars 2026',
      location: 'Djibouti-Ville',
      seats:    'Inscription gratuite',
    },
    // About
    about: {
      tag:      'À propos',
      title:    "Programme EDQ — Entrepreneurs de Quartier",
      subtitle: "Organisé par le CLE avec le soutien de l'Union Européenne et de la Banque Mondiale, le Forum BOOST Entrepreneurship réunit les 120 MSMEs les plus performantes du programme EDQ.",
      card1Title: 'Formalisation G2B',
      card1Desc:  'Guichet unique de formalisation avec le MDENI et les partenaires territoriaux.',
      card2Title: 'Inclusion financière',
      card2Desc:  'Panel et signature de conventions bancaires pour l\'accès au crédit.',
      card3Title: '50% femmes',
      card3Desc:  'Bénéficiaires du programme EDQ parmi les 200 MSMEs accompagnées.',
      stat1: 'MSMEs accompagnées',
      stat2: 'Régions couvertes',
      stat3: 'Femmes bénéficiaires',
      stat4: 'MSMEs au Forum',
    },
    // Program
    program: {
      tag:      'Agenda',
      title:    'Programme du Forum BOOST Entrepreneurship',
      subtitle: '23 mars 2026 — De la cérémonie d\'ouverture à la signature des conventions bancaires.',
    },
    // Speakers
    speakers: {
      tag:      'Institutions & Partenaires',
      title:    'Les acteurs du Forum BOOST Entrepreneurship',
      subtitle: 'Institutions nationales, bailleurs de fonds internationaux et partenaires territoriaux réunis pour l\'entrepreneuriat djiboutien.',
    },
    // Sponsors
    sponsors: {
      tag:      'Partenaires & Soutiens',
      title:    'Ils rendent ce forum possible',
      subtitle: 'Institutions internationales et partenaires territoriaux unis pour développer l\'entrepreneuriat à Djibouti.',
    },
    // FAQ
    faq: {
      tag:      'FAQ',
      title:    'Questions fréquentes',
      subtitle: "Tout ce que vous devez savoir sur le Forum BOOST Entrepreneurship 2026.",
    },
    // Register
    register: {
      title:    "Inscription au Forum",
      subtitle: "Réservez votre place gratuite pour le 23 mars 2026.",
      firstName: 'Prénom',
      lastName:  'Nom',
      email:     'Adresse email',
      phone:     'Téléphone',
      organization: 'Organisation / Entreprise',
      jobTitle:  'Fonction / Poste',
      type:      'Type de participant',
      country:   'Pays',
      message:   'Message (optionnel)',
      submit:    "Confirmer l'inscription",
      submitting: 'Envoi en cours...',
    },
    // Confirmation
    confirmation: {
      title:    'Inscription reçue !',
      subtitle: 'Votre dossier est en cours d\'examen. Vous recevrez votre badge par email dès validation.',
      back:     'Retour à l\'accueil',
    },
    // Footer
    footer: {
      rights:   'Tous droits réservés.',
      contact:  'Contact',
      legal:    'Mentions légales',
    },
  },

  en: {
    // Navigation
    nav: {
      about:     'About',
      program:   'Program',
      speakers:  'Partners',
      sponsors:  'Supporters',
      faq:       'FAQ',
      register:  'Register',
      registerNow: 'Register now',
    },
    // Hero
    hero: {
      badge:    'Forum BOOST Entrepreneurship · March 23, 2026',
      title:    'Forum BOOST\nEntrepreneurship',
      subtitle: 'Transforming neighborhood entrepreneurship into a national growth engine. 120 leading MSMEs gathered for a day of connections, financing and opportunities.',
      cta:      'Register now',
      ctaSub:   'View the program',
      date:     'March 23, 2026',
      location: 'Djibouti City',
      seats:    'Free registration',
    },
    // About
    about: {
      tag:      'About',
      title:    'EDQ Program — Neighborhood Entrepreneurs',
      subtitle: 'Organized by CLE with the support of the European Union and World Bank, the Forum BOOST Entrepreneurship brings together the 120 top-performing MSMEs from the EDQ program.',
      card1Title: 'G2B Formalization',
      card1Desc:  'One-stop formalization desk with MDENI and territorial partners.',
      card2Title: 'Financial Inclusion',
      card2Desc:  'Panel and banking convention signing for MSMEs credit access.',
      card3Title: '50% Women',
      card3Desc:  'Beneficiaries of the EDQ program among 200 accompanied MSMEs.',
      stat1: 'MSMEs accompanied',
      stat2: 'Regions covered',
      stat3: 'Women beneficiaries',
      stat4: 'MSMEs at Forum',
    },
    // Program
    program: {
      tag:      'Agenda',
      title:    'Forum BOOST Entrepreneurship Program',
      subtitle: 'March 23, 2026 — From the opening ceremony to the signing of banking conventions.',
    },
    // Speakers
    speakers: {
      tag:      'Institutions & Partners',
      title:    'Key actors of Forum BOOST Entrepreneurship',
      subtitle: 'National institutions, international funders and territorial partners united for Djiboutian entrepreneurship.',
    },
    // Sponsors
    sponsors: {
      tag:      'Partners & Supporters',
      title:    'They make this forum possible',
      subtitle: 'International institutions and territorial partners united to develop entrepreneurship in Djibouti.',
    },
    // FAQ
    faq: {
      tag:      'FAQ',
      title:    'Frequently Asked Questions',
      subtitle: 'Everything you need to know about Forum BOOST Entrepreneurship 2026.',
    },
    // Register
    register: {
      title:    'Forum Registration',
      subtitle: 'Reserve your free spot for March 23, 2026.',
      firstName: 'First name',
      lastName:  'Last name',
      email:     'Email address',
      phone:     'Phone',
      organization: 'Organization / Company',
      jobTitle:  'Job title / Position',
      type:      'Participant type',
      country:   'Country',
      message:   'Message (optional)',
      submit:    'Confirm registration',
      submitting: 'Submitting...',
    },
    // Confirmation
    confirmation: {
      title:    'Registration received!',
      subtitle: 'Your application is under review. You will receive your badge by email once validated.',
      back:     'Back to home',
    },
    // Footer
    footer: {
      rights:   'All rights reserved.',
      contact:  'Contact',
      legal:    'Legal notice',
    },
  },
} satisfies Record<Lang, object>

export type Translations = typeof translations.fr

// ──────────────────────────────────────────────────────────────
// Context
// ──────────────────────────────────────────────────────────────
interface LangContextValue {
  lang: Lang
  t: Translations
  setLang: (lang: Lang) => void
  toggle: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  const setLang = (l: Lang) => setLangState(l)
  const toggle = () => setLangState((prev) => (prev === 'fr' ? 'en' : 'fr'))
  const t = translations[lang] as Translations

  return (
    <LangContext.Provider value={{ lang, t, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}

# Contexte du projet — Forum International de Djibouti

Document de référence : ce que fait le projet, comment il est constitué, et le prompt d’origine.

---

## Ce que fait le projet

Site vitrine et plateforme de gestion des inscriptions pour le **Forum International de Djibouti** (23 mars 2026) : inscriptions en ligne, validation par l’admin, envoi de badges PDF avec QR code, check-in sur place.

### Site public
- **Accueil** (`/`) — Hero, À propos, Programme, Intervenants, Partenaires, FAQ, footer avec carte.
- **Inscription** (`/register`) — Formulaire validé (Zod), envoi vers Supabase, email de confirmation (Resend), redirection vers `/confirmation`.
- **Confirmation** (`/confirmation`) — Page de remerciement après inscription.

### Dashboard admin (NextAuth)
- **Tableau de bord** (`/admin`) — Stats (total, par type, en attente / approuvées).
- **Inscriptions** (`/admin/registrations`) — Liste filtrable et recherche, détail par inscription.
- **Détail** (`/admin/registrations/[id]`) — Approuver / Rejeter, renvoyer badge, supprimer (avec confirmation).
- **Badges** (`/admin/badges`) — Envoi en masse des badges aux approuvés.
- **Check-in** (`/admin/checkin`) — Scan caméra (QR) ou saisie manuelle ID → marquage « checked in », historique persistant.

### Emails
- **Confirmation** — À l’inscription : récap + identifiant unique (UUID).
- **Badge** — À l’approbation : message + QR code dans l’email + PDF en pièce jointe.

### Badge PDF
Généré avec `@react-pdf/renderer` : nom, fonction, organisation, type (couleur), QR code (lien check-in), date et lieu.

---

## Stack technique

| Rôle | Technologie |
|------|-------------|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript |
| Styles | Tailwind CSS |
| Base de données | Supabase (PostgreSQL) |
| Emails | Resend |
| PDF badge | @react-pdf/renderer |
| QR codes | `qrcode` (génération), `html5-qrcode` (scan caméra) |
| Formulaires | react-hook-form + Zod |
| UI | shadcn/ui (Radix), Framer Motion |
| Auth admin | NextAuth.js v5 (Credentials) |

---

## Structure du projet

```
src/
├── app/
│   ├── (public)/                    # Routes publiques (layout commun)
│   │   ├── page.tsx                  # Accueil
│   │   ├── register/page.tsx
│   │   ├── confirmation/page.tsx
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── page.tsx                  # Dashboard
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── registrations/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── badges/page.tsx
│   │   └── checkin/page.tsx
│   ├── api/
│   │   ├── register/route.ts         # POST inscription
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── checkin/route.ts          # Check-in (scan ou ID manuel)
│   │   ├── admin/
│   │   │   ├── registrations/route.ts
│   │   │   ├── registrations/[id]/route.ts  # GET, PATCH, DELETE
│   │   │   ├── stats/route.ts
│   │   │   ├── checkins/route.ts
│   │   │   ├── badges/send/route.ts
│   │   │   └── export/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/       (Header, Footer)
│   ├── sections/     (Hero, About, Program, Speakers, Sponsors, FAQ)
│   ├── forms/        (RegistrationForm)
│   ├── admin/        (StatsCards, RegistrationsTable, RegistrationDetail, BadgesBulkSender, CheckInScanner, QRScanner)
│   └── ui/           (shadcn: button, input, card, table, dialog, etc.)
├── lib/
│   ├── supabase.ts       # Clients Supabase (public + service role)
│   ├── resend.ts         # Client Resend + templates HTML (confirmation, badge)
│   ├── auth.ts           # Config NextAuth (Credentials)
│   ├── validations.ts    # Schéma Zod inscription
│   ├── qrcode.ts         # Génération QR (data URL / buffer)
│   ├── badge-generator.tsx  # Composant PDF + generateBadgePDF()
│   └── utils.ts
├── types/
│   └── registration.ts   # Registration, ParticipantType, Status, constantes
├── hooks/
│   └── use-toast.ts
└── middleware.ts         # Protection des routes /admin/*
```

---

## Prompt d’origine

> Build a complete Next.js 14 (App Router) website for an international forum event with the following features:
>
> ### Tech Stack
> - Next.js 14 (App Router)
> - TypeScript
> - Tailwind CSS
> - Supabase (database + auth)
> - Resend (email sending)
> - @react-pdf/renderer (badge PDF generation)
> - qrcode (QR code generation)
> - react-hook-form + zod (form validation)
> - shadcn/ui (UI components)
>
> ### 1. Public Website (Vitrine)
> - **/** — Home: Hero, About, Program, Speakers, Sponsors, FAQ, Footer (contact, Google Maps)
> - **/register** — Formulaire d'inscription
> - **/confirmation** — Page après inscription réussie
>
> ### 2. Registration Form
> Champs : First Name, Last Name, Email (unique), Phone, Organization, Job Title, Participant type (Visitor / Speaker / Press / VIP / Student), Country, Photo (optionnel), Message / Special needs (optionnel).  
> À la soumission : validation Zod, enregistrement Supabase, email de confirmation Resend, redirection vers `/confirmation`.
>
> ### 3. Admin Dashboard (`/admin`)
> Protégé par NextAuth.js.  
> - `/admin` — Stats (total, par type, validées / en attente)
> - `/admin/registrations` — Tableau des inscriptions (filtres, recherche)
> - `/admin/registrations/[id]` — Détail, actions : approuver, rejeter, renvoyer badge, supprimer
> - `/admin/badges` — Envoi en masse des badges aux participants approuvés  
> Actions : approuver / rejeter, envoyer badge individuel ou en masse, export CSV.
>
> ### 4. Badge
> À l'approbation : génération PDF (@react-pdf/renderer) avec logo, nom, fonction, organisation, type (couleur), **QR code (UUID)**, date et lieu. Envoi du PDF en pièce jointe par Resend. Le QR code est aussi affiché dans le corps de l'email.
>
> ### 5. QR Code Check-in (bonus)
> `/admin/checkin` — Page réservée admin : scan caméra ou saisie manuelle de l'ID → marquage « checked in » en base, affichage des infos participant et historique persistant.
>
> ### Base de données (Supabase)
> Table **registrations** : id (uuid), created_at, first_name, last_name, email (unique), phone, organization, job_title, participant_type, country, photo_url, message, status (pending/approved/rejected), badge_sent, checked_in, checked_in_at.
>
> ### Emails (Resend)
> 1. Confirmation — envoyé à l'inscription (récap + identifiant UUID).  
> 2. Badge — envoyé à l'approbation (message + QR code dans l'email + PDF en pièce jointe).
>
> ### Design
> Moderne, professionnel ; bleu marine / navy, accent or/orange ; responsive ; animations Framer Motion ; composants shadcn/ui.

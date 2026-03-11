# 🏗️ Architecture - Forum International de Djibouti

---

## 🧱 Stack Technique

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                               │
│                                                             │
│   Next.js 14 (App Router)  +  TypeScript  +  Tailwind CSS  │
│                    shadcn/ui components                     │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND                                │
│                                                             │
│        Next.js API Routes  +  NextAuth.js (JWT)             │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────────────┐  ┌────────────────┐  ┌────────────────┐
│   Supabase    │  │    Resend      │  │ react-pdf +    │
│  PostgreSQL   │  │  (Emails)      │  │  qrcode        │
│  + Auth RLS   │  │                │  │  (Badges PDF)  │
└───────────────┘  └────────────────┘  └────────────────┘
```

---

## 📁 Structure des Pages

```
src/app/
│
├── (public)/                   ← Accessible sans login
│   ├── page.tsx                ← 🏠 Page d'accueil
│   ├── register/
│   │   └── page.tsx            ← 📝 Formulaire d'inscription
│   └── confirmation/
│       └── page.tsx            ← ✅ Confirmation inscription
│
├── admin/                      ← 🔒 Protégé par NextAuth
│   ├── login/
│   │   └── page.tsx            ← 🔑 Login admin
│   ├── page.tsx                ← 📊 Dashboard
│   ├── registrations/
│   │   ├── page.tsx            ← 📋 Liste inscriptions
│   │   └── [id]/
│   │       └── page.tsx        ← 👤 Détail inscription
│   ├── checkin/
│   │   └── page.tsx            ← 📷 Scanner QR Code
│   └── badges/
│       └── page.tsx            ← 🏷️  Envoi badges
│
└── api/                        ← 🔌 API REST
    ├── auth/[...nextauth]/     ← NextAuth handler
    ├── register/               ← POST nouvelle inscription
    └── admin/
        ├── registrations/      ← GET / PUT / DELETE
        ├── checkin/            ← POST check-in
        ├── badges/send/        ← POST envoi badge email
        ├── export/             ← GET export CSV
        └── stats/              ← GET statistiques
```

---

## 🔄 Flux : Inscription Participant

```
  Participant
      │
      │  Remplit formulaire
      ▼
┌─────────────────┐
│  /register      │
│  RegistrationForm│
└────────┬────────┘
         │ POST /api/register
         ▼
┌─────────────────────────────────────────┐
│           API Route                     │
│                                         │
│  1. Validation des données              │
│  2. INSERT → Supabase (registrations)   │
│  3. Génère QR Code                      │
│  4. Envoie email via Resend             │
└──────────┬──────────────────────────────┘
           │
     ┌─────┴──────┐
     │            │
     ▼            ▼
┌─────────┐  ┌──────────────────────┐
│Supabase │  │  Email Resend        │
│         │  │  ┌────────────────┐  │
│ INSERT  │  │  │ Confirmation   │  │
│  row    │  │  │ + détails      │  │
└─────────┘  │  └────────────────┘  │
             └──────────────────────┘
                      │
                      ▼
             ┌────────────────┐
             │ /confirmation  │
             │ ✅ Merci !     │
             └────────────────┘
```

---

## 🔄 Flux : Check-in Participant

```
  Admin
    │
    ▼
┌───────────────────┐
│  /admin/checkin   │
│  CheckInScanner   │
└────────┬──────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐  ┌──────────────┐
│Scanner │  │ Saisie       │
│  QR    │  │ manuelle ID  │
└────┬───┘  └──────┬───────┘
     └──────┬───────┘
            │ POST /api/admin/checkin
            ▼
  ┌──────────────────────────┐
  │  API Route               │
  │                          │
  │  UPDATE registrations    │
  │  SET checked_in = true   │
  │  SET checked_in_at = now │
  └──────────┬───────────────┘
             │
             ▼
      ┌─────────────┐
      │  Supabase   │
      │  ✅ Mis à   │
      │    jour     │
      └─────────────┘
```

---

## 🔄 Flux : Envoi Badge

```
  Admin
    │
    ▼
┌──────────────────────┐
│  /admin/badges       │
│  BadgesBulkSender    │
└──────────┬───────────┘
           │ POST /api/admin/badges/send
           ▼
┌────────────────────────────────────────┐
│           API Route                    │
│                                        │
│  1. Récupère données participant       │
│  2. badge-generator.tsx                │
│     └─ Génère PDF (react-pdf)          │
│  3. qrcode.ts                          │
│     └─ Génère QR Code (dataURL)        │
│  4. Resend                             │
│     └─ Envoie email + PDF en pièce     │
│  5. UPDATE badge_sent = true           │
└───────────────────┬────────────────────┘
                    │
          ┌─────────┴──────────┐
          │                    │
          ▼                    ▼
   ┌─────────────┐    ┌─────────────────┐
   │  Supabase   │    │  Email Resend   │
   │ badge_sent  │    │ ┌─────────────┐ │
   │  = true ✅  │    │ │  Badge PDF  │ │
   └─────────────┘    │ │  + QR Code  │ │
                      │ └─────────────┘ │
                      └─────────────────┘
```

---

## 🔐 Authentification Admin

```
  Admin
    │
    │  /admin/login
    ▼
┌──────────────────────────────┐
│  NextAuth Credentials        │
│                              │
│  email    == ADMIN_EMAIL     │
│  password == ADMIN_PASSWORD  │
└──────────────┬───────────────┘
               │
        ✅ OK  │  ❌ Refusé
               │
               ▼
        ┌─────────────┐
        │  JWT Token  │
        │  en session │
        └──────┬──────┘
               │
               ▼
        ┌─────────────────────────────┐
        │  Middleware Next.js          │
        │  Protège toutes les routes  │
        │  /admin/* et /api/admin/*   │
        └─────────────────────────────┘
```

---

## 🗄️ Schéma Base de Données

```
┌──────────────────────────────────────────┐
│          TABLE: registrations            │
├──────────────────────────────────────────┤
│  id              UUID        PK          │
│  first_name      TEXT        NOT NULL    │
│  last_name       TEXT        NOT NULL    │
│  email           TEXT        UNIQUE      │
│  phone           TEXT                    │
│  organization    TEXT                    │
│  job_title       TEXT                    │
│  country         TEXT                    │
│  participant_type ENUM                   │
│  ─────────────────────────────────────   │
│  checked_in      BOOLEAN     DEFAULT ❌  │
│  checked_in_at   TIMESTAMP               │
│  ─────────────────────────────────────   │
│  badge_sent      BOOLEAN     DEFAULT ❌  │
│  badge_sent_at   TIMESTAMP               │
│  ─────────────────────────────────────   │
│  created_at      TIMESTAMP   DEFAULT NOW │
└──────────────────────────────────────────┘

Types de participants :
┌─────────────────┬────────────┐
│  TYPE           │  COULEUR   │
├─────────────────┼────────────┤
│  ministre       │  🔴 Rouge  │
│  ambassadeur    │  🟣 Violet │
│  institutionnel │  🔵 Bleu   │
│  entrepreneur   │  🟢 Vert   │
│  etudiant       │  🟡 Jaune  │
│  presse         │  🟠 Orange │
│  invite         │  ⚫ Gris   │
└─────────────────┴────────────┘
```

---

## 🚀 Déploiement

```
  Développeur
      │
      │  git push origin main
      ▼
┌─────────────────┐
│     GitHub      │
│  Aliteknosure/  │
│  Forum-djibouti │
└────────┬────────┘
         │  Webhook auto-deploy
         ▼
┌─────────────────────────────────────┐
│              RENDER                 │
│                                     │
│  1. npm install                     │
│  2. npm run build (next build)      │
│  3. npm run start (next start)      │
│                                     │
│  URL: forum-djibouti.onrender.com   │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│  Supabase   │  │   Resend    │
│  (Cloud DB) │  │  (Emails)   │
└─────────────┘  └─────────────┘
```

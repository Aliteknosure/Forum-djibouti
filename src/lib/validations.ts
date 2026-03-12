import { z } from 'zod'

export const registrationSchema = z.object({
  // Champs communs à tous les rôles
  first_name: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  last_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(6, 'Numéro de téléphone invalide'),
  organization: z.string().optional().or(z.literal('')),
  job_title: z.string().optional().or(z.literal('')),
  participant_type: z.enum(['speaker', 'investor', 'startup_msme', 'exhibitor', 'ecosystem_leader', 'partner', 'visitor'] as const, {
    error: 'Veuillez sélectionner un type de participant',
  }),
  country: z.string().min(2, 'Veuillez indiquer votre pays'),
  message: z.string().optional().or(z.literal('')),

  // Champs Exposant MSME (optionnels — string vide accepté)
  company_name: z.string().optional().or(z.literal('')),
  sector: z.string().optional().or(z.literal('')),
  region_origin: z.string().optional().or(z.literal('')),
  stand_needs: z.array(z.string()).optional(),

  // Champs Panéliste
  institution: z.string().optional().or(z.literal('')),
  topic: z.string().optional().or(z.literal('')),
  bio: z.string().optional().or(z.literal('')),

  // Champs Presse
  media_name: z.string().optional().or(z.literal('')),
  media_type: z.string().optional().or(z.literal('')),
})

export type RegistrationSchemaType = z.infer<typeof registrationSchema>

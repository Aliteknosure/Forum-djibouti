import { z } from 'zod'

export const registrationSchema = z.object({
  first_name: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  last_name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().optional(),
  organization: z.string().optional(),
  job_title: z.string().optional(),
  participant_type: z.enum(['visitor', 'speaker', 'press', 'vip', 'student'] as const, {
    error: 'Veuillez sélectionner un type de participant',
  }),
  country: z.string().min(2, 'Veuillez indiquer votre pays'),
  message: z.string().optional(),
})

export type RegistrationSchemaType = z.infer<typeof registrationSchema>

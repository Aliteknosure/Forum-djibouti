export type ParticipantType = 'speaker' | 'investor' | 'startup_msme' | 'exhibitor' | 'ecosystem_leader' | 'partner' | 'visitor'
export type RegistrationStatus = 'pending' | 'approved' | 'rejected'

export interface Registration {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  organization: string | null
  job_title: string | null
  participant_type: ParticipantType
  country: string
  photo_url: string | null
  message: string | null
  status: RegistrationStatus
  badge_sent: boolean
  checked_in: boolean
  checked_in_at: string | null

  // Champs Exposant MSME
  company_name: string | null
  sector: string | null
  region_origin: string | null
  stand_needs: string[] | null

  // Champs Panéliste
  institution: string | null
  topic: string | null
  bio: string | null

  // Champs Presse
  media_name: string | null
  media_type: string | null
}

export interface RegistrationFormData {
  first_name: string
  last_name: string
  email: string
  phone?: string
  organization?: string
  job_title?: string
  participant_type: ParticipantType
  country: string
  message?: string
  company_name?: string
  sector?: string
  region_origin?: string
  stand_needs?: string
  institution?: string
  topic?: string
  bio?: string
  media_name?: string
  media_type?: string
}

export const PARTICIPANT_TYPE_LABELS: Record<ParticipantType, string> = {
  speaker: 'Intervenant / Speaker',
  investor: 'Investisseur',
  startup_msme: 'Startup / MSME',
  exhibitor: 'Exposant',
  ecosystem_leader: 'Ecosystem Leader',
  partner: 'Partenaire',
  visitor: 'Visiteur',
}

export const PARTICIPANT_TYPE_COLORS: Record<ParticipantType, string> = {
  speaker: '#8B5CF6',
  investor: '#10B981',
  startup_msme: '#F59E0B',
  exhibitor: '#3B82F6',
  ecosystem_leader: '#EF4444',
  partner: '#06B6D4',
  visitor: '#6B7280',
}

export const PARTICIPANT_TYPE_ICONS: Record<ParticipantType, string> = {
  speaker: '🎤',
  investor: '�',
  startup_msme: '�',
  exhibitor: '🏪',
  ecosystem_leader: '�',
  partner: '🤝',
  visitor: '👥',
}

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  pending: 'En attente',
  approved: 'Validé',
  rejected: 'Refusé',
}

export const STATUS_COLORS: Record<RegistrationStatus, string> = {
  pending: '#F59E0B',
  approved: '#10B981',
  rejected: '#EF4444',
}

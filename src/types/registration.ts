export type ParticipantType = 'visitor' | 'press' | 'exposant_msme' | 'paneliste'
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
  visitor: 'Visiteur',
  press: 'Presse',
  exposant_msme: 'Exposant MSME',
  paneliste: 'Panéliste',
}

export const PARTICIPANT_TYPE_COLORS: Record<ParticipantType, string> = {
  visitor: '#3B82F6',
  press: '#10B981',
  exposant_msme: '#F59E0B',
  paneliste: '#8B5CF6',
}

export const PARTICIPANT_TYPE_ICONS: Record<ParticipantType, string> = {
  visitor: '👥',
  press: '📰',
  exposant_msme: '🏪',
  paneliste: '🎤',
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

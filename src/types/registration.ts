export type ParticipantType = 'visitor' | 'speaker' | 'press' | 'vip' | 'student'
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
}

export const PARTICIPANT_TYPE_LABELS: Record<ParticipantType, string> = {
  visitor: 'Visiteur',
  speaker: 'Intervenant',
  press: 'Presse',
  vip: 'VIP',
  student: 'Étudiant',
}

export const PARTICIPANT_TYPE_COLORS: Record<ParticipantType, string> = {
  visitor: '#3B82F6',
  speaker: '#8B5CF6',
  press: '#10B981',
  vip: '#F59E0B',
  student: '#06B6D4',
}

export const STATUS_LABELS: Record<RegistrationStatus, string> = {
  pending: 'En attente',
  approved: 'Approuvé',
  rejected: 'Rejeté',
}

export const STATUS_COLORS: Record<RegistrationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

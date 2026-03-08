'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { registrationSchema, RegistrationSchemaType } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

const COUNTRIES = [
  'Djibouti', 'Éthiopie', 'Somalie', 'Érythrée', 'Kenya', 'Ouganda', 'Tanzanie',
  'Soudan', 'Égypte', 'France', 'États-Unis', 'Royaume-Uni', 'Allemagne',
  'Arabie Saoudite', 'Émirats Arabes Unis', 'Qatar', 'Chine', 'Inde', 'Canada',
  'Belgique', 'Suisse', 'Italie', 'Espagne', 'Maroc', 'Tunisie', 'Algérie',
  'Sénégal', 'Côte d\'Ivoire', 'Ghana', 'Nigeria', 'Autre',
]

const PARTICIPANT_TYPES = [
  { value: 'visitor', label: 'Visiteur', desc: 'Participant général' },
  { value: 'speaker', label: 'Intervenant', desc: 'Conférencier ou paneliste' },
  { value: 'press', label: 'Presse', desc: 'Journaliste ou média' },
  { value: 'vip', label: 'VIP', desc: 'Invité officiel' },
  { value: 'student', label: 'Étudiant', desc: 'Étudiant inscrit' },
]

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  })

  const participantType = watch('participant_type')

  const onSubmit = async (data: RegistrationSchemaType) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Une erreur est survenue')
      }

      router.push('/confirmation')
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Informations personnelles */}
      <div>
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: '#0a1932' }}>
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)' }}
          >1</span>
          Informations personnelles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
              Prénom <span className="text-red-500">*</span>
            </Label>
            <Input
              id="first_name"
              placeholder="Votre prénom"
              {...register('first_name')}
              className={errors.first_name ? 'border-red-400' : ''}
            />
            {errors.first_name && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">
              Nom <span className="text-red-500">*</span>
            </Label>
            <Input
              id="last_name"
              placeholder="Votre nom de famille"
              {...register('last_name')}
              className={errors.last_name ? 'border-red-400' : ''}
            />
            {errors.last_name && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.last_name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              {...register('email')}
              className={errors.email ? 'border-red-400' : ''}
            />
            {errors.email && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Téléphone
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+253 77 00 00 00"
              {...register('phone')}
            />
          </div>
        </div>
      </div>

      {/* Informations professionnelles */}
      <div>
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: '#0a1932' }}>
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)' }}
          >2</span>
          Informations professionnelles
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="organization" className="text-sm font-medium text-gray-700">
              Organisation / Entreprise
            </Label>
            <Input
              id="organization"
              placeholder="Votre organisation"
              {...register('organization')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job_title" className="text-sm font-medium text-gray-700">
              Fonction / Titre
            </Label>
            <Input
              id="job_title"
              placeholder="Votre titre ou fonction"
              {...register('job_title')}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Type de participant <span className="text-red-500">*</span>
            </Label>
            <Select
              value={participantType}
              onValueChange={(v) => setValue('participant_type', v as RegistrationSchemaType['participant_type'])}
            >
              <SelectTrigger className={errors.participant_type ? 'border-red-400' : ''}>
                <SelectValue placeholder="Sélectionner votre catégorie" />
              </SelectTrigger>
              <SelectContent>
                {PARTICIPANT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <span className="font-medium">{type.label}</span>
                      <span className="text-gray-400 text-xs ml-2">— {type.desc}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.participant_type && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.participant_type.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Pays <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={(v) => setValue('country', v)}>
              <SelectTrigger className={errors.country ? 'border-red-400' : ''}>
                <SelectValue placeholder="Votre pays" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.country.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: '#0a1932' }}>
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)' }}
          >3</span>
          Besoins spéciaux (optionnel)
        </h3>
        <Textarea
          placeholder="Régime alimentaire, accessibilité, demandes particulières..."
          {...register('message')}
          rows={4}
          className="resize-none"
        />
      </div>

      {/* Consentement */}
      <div
        className="rounded-xl p-4 text-xs text-gray-500 leading-relaxed"
        style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
      >
        <CheckCircle2 size={14} className="inline mr-1 text-green-500" />
        En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour l'organisation 
        du Forum International de Djibouti 2026 et que vous receviez des communications relatives à l'événement.
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 text-base font-bold rounded-xl transition-all hover:opacity-90 hover:scale-[1.01] shadow-lg"
        style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin mr-2" />
            Envoi en cours...
          </>
        ) : (
          'Confirmer mon inscription'
        )}
      </Button>
    </form>
  )
}

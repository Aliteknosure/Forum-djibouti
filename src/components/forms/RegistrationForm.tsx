'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { registrationSchema, RegistrationSchemaType } from '@/lib/validations'
import { useToast } from '@/hooks/use-toast'
import { Loader2, ArrowRight, AlertCircle, Check, Mic, TrendingUp, Rocket, Store, Globe, Handshake, Users } from 'lucide-react'
import PhotoUpload from '@/components/forms/PhotoUpload'

const PARTICIPANT_TYPES = [
  {
    value: 'speaker',
    label: 'Intervenant / Speaker',
    icon: <Mic size={20} />,
    desc: 'Conférenciers, panélistes, experts',
    color: 'border-purple-400 bg-purple-50 text-purple-700',
    activeColor: 'border-purple-500 bg-purple-500 text-white',
  },
  {
    value: 'investor',
    label: 'Investisseur',
    icon: <TrendingUp size={20} />,
    desc: 'Investisseurs, fonds, banques',
    color: 'border-green-400 bg-green-50 text-green-700',
    activeColor: 'border-green-500 bg-green-500 text-white',
  },
  {
    value: 'startup_msme',
    label: 'Startup / MSME',
    icon: <Rocket size={20} />,
    desc: 'Startups, PME, entrepreneurs',
    color: 'border-djibouti-gold bg-amber-50 text-amber-700',
    activeColor: 'border-djibouti-gold bg-djibouti-gold text-white',
  },
  {
    value: 'exhibitor',
    label: 'Exposant',
    icon: <Store size={20} />,
    desc: 'Exposants avec stand au forum',
    color: 'border-blue-400 bg-blue-50 text-blue-700',
    activeColor: 'border-blue-500 bg-blue-500 text-white',
  },
  {
    value: 'ecosystem_leader',
    label: 'Ecosystem Leader',
    icon: <Globe size={20} />,
    desc: 'Leaders, décideurs, institutions',
    color: 'border-red-400 bg-red-50 text-red-700',
    activeColor: 'border-red-500 bg-red-500 text-white',
  },
  {
    value: 'partner',
    label: 'Partenaire',
    icon: <Handshake size={20} />,
    desc: 'Partenaires institutionnels, sponsors',
    color: 'border-cyan-400 bg-cyan-50 text-cyan-700',
    activeColor: 'border-cyan-500 bg-cyan-500 text-white',
  },
  {
    value: 'visitor',
    label: 'Visiteur',
    icon: <Users size={20} />,
    desc: 'Grand public, étudiants, curieux',
    color: 'border-gray-400 bg-gray-50 text-gray-700',
    activeColor: 'border-gray-500 bg-gray-500 text-white',
  },
]

const COUNTRIES = [
  'Djibouti', 'Éthiopie', 'Somalie', 'Érythrée', 'Kenya', 'Ouganda', 'Tanzanie',
  'Soudan', 'Égypte', 'France', 'États-Unis', 'Royaume-Uni', 'Allemagne',
  'Arabie Saoudite', 'Émirats Arabes Unis', 'Qatar', 'Chine', 'Inde', 'Canada',
  'Belgique', 'Suisse', 'Italie', 'Espagne', 'Maroc', 'Tunisie', 'Algérie',
  'Sénégal', "Côte d'Ivoire", 'Ghana', 'Nigeria', 'Autre',
]

const SECTORS = [
  'Agriculture / Agro-alimentaire', 'Commerce / Distribution', 'Artisanat / Mode',
  'Tech / Numérique', 'Santé / Bien-être', 'Éducation / Formation',
  'Tourisme / Hôtellerie', 'Logistique / Transport', 'Énergie', 'Finance / Fintech', 'Autre',
]

const REGIONS_DJ = [
  'Djibouti-Ville', 'Balbala', 'Ali Sabieh', 'Arta', 'Dikhil', 'Obock', 'Tadjourah',
]

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <span className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <AlertCircle size={12} /> {message}
    </span>
  )
}

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [submittedType, setSubmittedType] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      stand_needs: [],
    },
  })

  const participantType = watch('participant_type')
  const country = watch('country')
  const sector = watch('sector')
  const regionOrigin = watch('region_origin')
  const standNeeds = watch('stand_needs') ?? []

  const toggleStandNeed = (need: string) => {
    const current = (watch('stand_needs') ?? []) as string[]
    if (current.includes(need)) {
      setValue('stand_needs', current.filter((n) => n !== need))
    } else {
      setValue('stand_needs', [...current, need])
    }
  }

  const selectedTypeInfo = PARTICIPANT_TYPES.find(t => t.value === participantType)

  const onSubmit = async (data: RegistrationSchemaType) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Une erreur est survenue')
      setSubmittedName(`${data.first_name} ${data.last_name}`)
      setSubmittedEmail(data.email)
      setSubmittedType(selectedTypeInfo?.label ?? '')
      setIsSuccess(true)
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errs: any) => {
    const firstMsg = Object.values(errs)[0] as { message?: string }
    toast({
      title: 'Champs manquants',
      description: firstMsg?.message ?? 'Veuillez remplir tous les champs obligatoires.',
      variant: 'destructive',
    })
  }

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-2xl max-w-2xl mx-auto"
        >
          <div className="w-16 h-16 bg-djibouti-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-djibouti-green" size={32} />
          </div>
          <h3 className="font-heading font-bold text-2xl text-djibouti-navy mb-2">
            Demande reçue !
          </h3>
          <p className="text-gray-500 mb-2">
            Merci <strong>{submittedName}</strong> pour votre demande d&apos;inscription en tant que <strong>{submittedType}</strong>.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Un email de confirmation a été envoyé à <strong>{submittedEmail}</strong>. Votre dossier sera examiné et vous recevrez une réponse sous 48h.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push('/confirmation')}
              className="btn-primary px-6 py-3"
            >
              Voir ma confirmation
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => { setIsSuccess(false); reset() }}
              className="text-djibouti-green font-medium hover:underline px-6 py-3"
            >
              Nouvelle inscription
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">

            {/* ÉTAPE 1 : Choix du rôle */}
            <div>
              <label className="block text-sm font-semibold text-djibouti-navy mb-3">
                Je m&apos;inscris en tant que <span className="text-red-500">*</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {PARTICIPANT_TYPES.map((type) => {
                  const isActive = participantType === type.value
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setValue('participant_type', type.value as RegistrationSchemaType['participant_type'])}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                        isActive ? type.activeColor : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className={`mt-0.5 ${isActive ? 'text-white' : ''}`}>{type.icon}</span>
                      <div>
                        <p className="font-semibold text-sm">{type.label}</p>
                        <p className={`text-xs mt-0.5 ${isActive ? 'text-white/80' : 'text-gray-400'}`}>{type.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
              <FieldError message={errors.participant_type?.message} />
            </div>

            {/* CHAMPS COMMUNS */}
            <AnimatePresence>
              {participantType && (
                <motion.div
                  key="common-fields"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  {/* Séparateur */}
                  <div className="flex items-center gap-3 my-2">
                    <div className="flex-1 h-px bg-gray-100" />
                    <span className="text-xs text-gray-400 font-medium">Informations personnelles</span>
                    <div className="flex-1 h-px bg-gray-100" />
                  </div>

                  {/* Prénom / Nom */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-djibouti-navy mb-2">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Votre prénom"
                        {...register('first_name')}
                        className={`form-input ${errors.first_name ? 'border-red-500' : ''}`}
                      />
                      <FieldError message={errors.first_name?.message} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-djibouti-navy mb-2">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Votre nom"
                        {...register('last_name')}
                        className={`form-input ${errors.last_name ? 'border-red-500' : ''}`}
                      />
                      <FieldError message={errors.last_name?.message} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-djibouti-navy mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      {...register('email')}
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-sm font-medium text-djibouti-navy mb-2">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+253 XX XX XX XX"
                      {...register('phone')}
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    <FieldError message={errors.phone?.message} />
                  </div>

                  {/* Organisation / Poste — masqué pour les visiteurs */}
                  {participantType !== 'visitor' && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-djibouti-navy mb-2">
                        Organisation <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Entreprise / Institution"
                        {...register('organization')}
                        className={`form-input ${errors.organization ? 'border-red-500' : ''}`}
                      />
                      <FieldError message={errors.organization?.message} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-djibouti-navy mb-2">
                        Fonction <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Votre poste"
                        {...register('job_title')}
                        className={`form-input ${errors.job_title ? 'border-red-500' : ''}`}
                      />
                      <FieldError message={errors.job_title?.message} />
                    </div>
                  </div>
                  )}

                  {/* Pays */}
                  <div>
                    <label className="block text-sm font-medium text-djibouti-navy mb-2">
                      Pays <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={country ?? ''}
                      onChange={(e) => setValue('country', e.target.value)}
                      className={`form-input ${errors.country ? 'border-red-500' : country ? 'valid' : ''}`}
                    >
                      <option value="">Sélectionnez votre pays</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <FieldError message={errors.country?.message} />
                  </div>

                  {/* ── CHAMPS EXPOSANT ── */}
                  {participantType === 'exhibitor' && (
                    <motion.div
                      key="exposant-fields"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-amber-100" />
                        <span className="text-xs text-amber-600 font-semibold">🏪 Informations Exposant MSME</span>
                        <div className="flex-1 h-px bg-amber-100" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-djibouti-navy mb-2">
                          Nom de l&apos;entreprise / activité <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Atelier Fatima Couture"
                          {...register('company_name')}
                          className="form-input"
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-djibouti-navy mb-2">
                            Secteur d&apos;activité <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={sector ?? ''}
                            onChange={(e) => setValue('sector', e.target.value)}
                            className={`form-input ${sector ? 'valid' : ''}`}
                          >
                            <option value="">Sélectionnez un secteur</option>
                            {SECTORS.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-djibouti-navy mb-2">
                            Région d&apos;origine <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={regionOrigin ?? ''}
                            onChange={(e) => setValue('region_origin', e.target.value)}
                            className={`form-input ${regionOrigin ? 'valid' : ''}`}
                          >
                            <option value="">Sélectionnez une région</option>
                            {REGIONS_DJ.map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-djibouti-navy mb-2">
                          Besoins pour le stand
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {['Table', 'Électricité', 'Chaise', 'Étagère', 'Connexion WiFi', 'Autre'].map((need) => (
                            <label key={need} className="flex items-center gap-2 text-sm cursor-pointer">
                              <input
                                type="checkbox"
                                value={need}
                                checked={(standNeeds as string[]).includes(need)}
                                onChange={() => toggleStandNeed(need)}
                                className="rounded border-gray-300 text-djibouti-gold"
                              />
                              {need}
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── CHAMPS SPEAKER ── */}
                  {participantType === 'speaker' && (
                    <motion.div
                      key="speaker-fields"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-purple-100" />
                        <span className="text-xs text-purple-600 font-semibold">🎤 Informations Intervenant</span>
                        <div className="flex-1 h-px bg-purple-100" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-djibouti-navy mb-2">
                          Institution représentée <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Banque Mondiale, Ministère..."
                          {...register('institution')}
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-djibouti-navy mb-2">
                          Sujet / Thématique <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Financement des startups africaines"
                          {...register('topic')}
                          className="form-input"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-djibouti-navy mb-2">
                          Bio courte <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Présentez-vous en quelques lignes (sera utilisé dans le programme)"
                          {...register('bio')}
                          className="form-input resize-none"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* ── CHAMPS INVESTISSEUR ── */}
                  {participantType === 'investor' && (
                    <motion.div
                      key="investor-fields"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-green-100" />
                        <span className="text-xs text-green-600 font-semibold">� Informations Investisseur</span>
                        <div className="flex-1 h-px bg-green-100" />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-djibouti-navy mb-2">
                            Nom du fonds / institution <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Fonds d'investissement XYZ"
                            {...register('institution')}
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-djibouti-navy mb-2">
                            Secteurs d&apos;intérêt <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: Tech, Agro, Énergie..."
                            {...register('topic')}
                            className="form-input"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-djibouti-navy mb-2">
                      Message / Motivation <span className="text-gray-400 font-normal">(optionnel)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Pourquoi souhaitez-vous participer ?"
                      {...register('message')}
                      className="form-input resize-none"
                    />
                  </div>

                  {/* Photo de profil */}
                  <PhotoUpload
                    onUpload={(url) => setValue('photo_url', url)}
                    onClear={() => setValue('photo_url', '')}
                  />

                  {/* Consentement */}
                  <div className="rounded-xl p-4 text-xs text-gray-500 leading-relaxed bg-slate-50 border border-gray-100">
                    <Check size={14} className="inline mr-1 text-djibouti-green" />
                    En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour l&apos;organisation
                    du Forum BOOST Entrepreneurship 2026.
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary justify-center text-lg py-4 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Soumettre ma demande
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

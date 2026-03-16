'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import {
  CheckCircle2, XCircle, Loader2, Search, QrCode,
  User, Mail, Building2, MapPin, AlertTriangle, Camera, Keyboard, RefreshCw,
  CameraOff, Video, VideoOff
} from 'lucide-react'
import { Registration, PARTICIPANT_TYPE_LABELS } from '@/types/registration'
import dynamic from 'next/dynamic'

const QRScanner = dynamic(() => import('./QRScanner'), { ssr: false })

type CheckInResult =
  | { type: 'success'; participant: Registration }
  | { type: 'already'; participant: Registration }
  | { type: 'error'; message: string }
  | { type: 'not_approved'; participant: Registration }
  | null

type InputMode = 'camera' | 'manual'

interface HistoryEntry {
  id: string
  name: string
  time: string
  type: string
  organization?: string
}

const typeColors: Record<string, string> = {
  visitor: '#3b82f6',
  speaker: '#8b5cf6',
  press: '#10b981',
  vip: '#f59e0b',
  student: '#06b6d4',
}

export default function CheckInScanner() {
  const [mode, setMode] = useState<InputMode>('camera')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CheckInResult>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const [scannerActive, setScannerActive] = useState(true)
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const { toast } = useToast()

  // Charger l'historique depuis Supabase au montage
  const loadHistory = useCallback(async () => {
    setHistoryLoading(true)
    try {
      const res = await fetch('/api/admin/checkins')
      if (res.ok) {
        const data = await res.json()
        setHistory(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((r: any) => ({
            id: r.id,
            name: `${r.first_name} ${r.last_name}`,
            time: r.checked_in_at
              ? new Date(r.checked_in_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
              : '—',
            type: r.participant_type,
            organization: r.organization,
          }))
        )
      }
    } catch {}
    setHistoryLoading(false)
  }, [])

  useEffect(() => { loadHistory() }, [loadHistory])

  const handleCheckIn = async (idOrUrl: string) => {
    const raw = idOrUrl.trim()
    if (!raw) return

    // Extraire l'UUID de l'URL ou utiliser directement
    const uuidMatch = raw.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)
    const id = uuidMatch ? uuidMatch[0] : raw

    // Mettre en pause le scanner pendant le traitement
    setScannerActive(false)
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const json = await res.json()

      if (res.status === 404) {
        setResult({ type: 'error', message: 'Participant non trouvé. Vérifiez le QR code.' })
      } else if (res.status === 403) {
        setResult({ type: 'not_approved', participant: json.participant })
      } else if (json.warning) {
        setResult({ type: 'already', participant: json.participant })
      } else if (json.success) {
        setResult({ type: 'success', participant: json.participant })
        // Ajouter en tête de l'historique immédiatement (sans attendre le rechargement)
        const newEntry: HistoryEntry = {
          id: json.participant.id,
          name: `${json.participant.first_name} ${json.participant.last_name}`,
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          type: json.participant.participant_type,
          organization: json.participant.organization,
        }
        setHistory((prev) => [newEntry, ...prev.filter((h) => h.id !== json.participant.id)])
        toast({
          title: '✓ Check-in réussi',
          description: `${json.participant.first_name} ${json.participant.last_name}`,
        })
      } else {
        setResult({ type: 'error', message: json.error || 'Erreur inconnue' })
      }
    } catch {
      setResult({ type: 'error', message: 'Erreur de connexion au serveur.' })
    } finally {
      setLoading(false)
      setInput('')
      // Reprendre le scanner après 5 secondes seulement si caméra activée
      setTimeout(() => { if (cameraEnabled) setScannerActive(true) }, 5000)
    }
  }

  const handleManualSubmit = () => handleCheckIn(input)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleManualSubmit()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
      {/* Colonne gauche — Scanner */}
      <div className="space-y-4">
        {/* Toggle mode */}
        <div
          className="flex rounded-xl overflow-hidden p-1"
          style={{ backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}
        >
          <button
            onClick={() => { setMode('camera'); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'camera'
                ? 'bg-white shadow-sm text-navy-900'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ color: mode === 'camera' ? '#0a1932' : undefined }}
          >
            <Camera size={15} />
            Scanner caméra
          </button>
          <button
            onClick={() => { setMode('manual'); setScannerActive(false); setCameraEnabled(false) }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              mode === 'manual'
                ? 'bg-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            style={{ color: mode === 'manual' ? '#0a1932' : undefined }}
          >
            <Keyboard size={15} />
            Saisie manuelle
          </button>
        </div>

        {/* Mode caméra */}
        {mode === 'camera' && (
          <div className="space-y-3">

            {/* Bouton ON/OFF caméra */}
            <button
              onClick={() => {
                const next = !cameraEnabled
                setCameraEnabled(next)
                setScannerActive(next)
                if (!next) setResult(null)
              }}
              className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95"
              style={cameraEnabled ? {
                background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                border: '2px solid #22c55e',
                color: '#15803d',
                boxShadow: '0 0 16px rgba(34,197,94,0.2)',
              } : {
                background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                border: '2px solid #f87171',
                color: '#b91c1c',
              }}
            >
              <div className="flex items-center gap-2.5">
                {cameraEnabled
                  ? <Video size={18} className="text-green-600" />
                  : <VideoOff size={18} className="text-red-500" />
                }
                <span>{cameraEnabled ? 'Caméra active — Cliquer pour désactiver' : 'Caméra désactivée — Cliquer pour activer'}</span>
              </div>
              {/* Indicateur LED */}
              <span
                className={`w-2.5 h-2.5 rounded-full ${cameraEnabled ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse' : 'bg-red-400'}`}
              />
            </button>

            {/* Scanner QR — monté/démonté complètement selon l'état caméra */}
            {cameraEnabled ? (
              <>
                <QRScanner
                  key={cameraEnabled ? 'camera-on' : 'camera-off'}
                  active={scannerActive && !loading}
                  onScan={handleCheckIn}
                />
                {loading && (
                  <div className="flex items-center justify-center gap-2 py-3 text-sm text-gray-500">
                    <Loader2 size={16} className="animate-spin" />
                    Vérification en cours...
                  </div>
                )}
                <p className="text-xs text-gray-400 text-center">
                  Pointez la caméra vers le QR code du badge participant
                </p>
              </>
            ) : (
              /* Placeholder caméra éteinte */
              <div
                className="rounded-2xl flex flex-col items-center justify-center gap-3 py-12"
                style={{ background: '#f8fafc', border: '2px dashed #cbd5e1' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-200 flex items-center justify-center">
                  <CameraOff size={26} className="text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm font-medium">Caméra désactivée</p>
                <p className="text-gray-300 text-xs">Activez la caméra pour scanner les badges</p>
              </div>
            )}
          </div>
        )}

        {/* Mode manuel */}
        {mode === 'manual' && (
          <div
            className="rounded-2xl p-6"
            style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
          >
            <p className="text-xs text-gray-400 mb-4">
              Collez l'UUID du participant ou l'URL complète du QR code.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <QrCode size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="UUID ou URL du QR code..."
                  className="pl-9 font-mono text-sm"
                  autoFocus
                />
              </div>
              <Button
                onClick={handleManualSubmit}
                disabled={loading || !input.trim()}
                style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Search size={15} />}
              </Button>
            </div>
          </div>
        )}

        {/* Résultat */}
        {result && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            {result.type === 'success' && (
              <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #dcfce7, #f0fdf4)', border: '2px solid #22c55e' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 size={20} color="white" />
                  </div>
                  <div>
                    <p className="font-bold text-green-800">Check-in réussi !</p>
                    <p className="text-green-600 text-sm">Bienvenue au forum 👋</p>
                  </div>
                </div>
                <ParticipantCard participant={result.participant} />
              </div>
            )}

            {result.type === 'already' && (
              <div className="rounded-2xl p-5" style={{ background: '#fef9c3', border: '2px solid #eab308' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
                    <AlertTriangle size={20} color="white" />
                  </div>
                  <div>
                    <p className="font-bold text-yellow-800">Déjà enregistré</p>
                    <p className="text-yellow-600 text-sm">
                      Check-in à {result.participant.checked_in_at
                        ? new Date(result.participant.checked_in_at).toLocaleTimeString('fr-FR')
                        : '—'}
                    </p>
                  </div>
                </div>
                <ParticipantCard participant={result.participant} />
              </div>
            )}

            {result.type === 'not_approved' && (
              <div className="rounded-2xl p-5" style={{ background: '#fee2e2', border: '2px solid #ef4444' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <XCircle size={20} color="white" />
                  </div>
                  <div>
                    <p className="font-bold text-red-800">Accès refusé</p>
                    <p className="text-red-600 text-sm">Inscription non approuvée</p>
                  </div>
                </div>
                <ParticipantCard participant={result.participant} />
              </div>
            )}

            {result.type === 'error' && (
              <div className="rounded-2xl p-5 flex items-center gap-3" style={{ background: '#fee2e2', border: '2px solid #ef4444' }}>
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                  <XCircle size={20} color="white" />
                </div>
                <p className="font-semibold text-red-800 text-sm">{result.message}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Colonne droite — Historique */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: 'white', border: '1px solid #e2e8f0' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold" style={{ color: '#0a1932' }}>Historique total</h2>
            <p className="text-xs text-gray-400 mt-0.5">Persistant — survit aux rechargements</p>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: '#dcfce7', color: '#15803d' }}
              >
                {history.length} check-in{history.length > 1 ? 's' : ''}
              </span>
            )}
            <button
              onClick={loadHistory}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              title="Actualiser"
            >
              <RefreshCw size={13} className={historyLoading ? 'animate-spin text-gray-400' : 'text-gray-400'} />
            </button>
          </div>
        </div>

        {historyLoading ? (
          <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm">Chargement...</span>
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <QrCode size={32} className="mb-3 opacity-30" />
            <p className="text-sm">Aucun check-in encore</p>
            <p className="text-xs mt-1 text-center">Scannez un badge pour commencer</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {history.map((h) => (
              <div
                key={h.id}
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: typeColors[h.type] || '#3b82f6' }}
                  >
                    <CheckCircle2 size={14} color="white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm" style={{ color: '#0a1932' }}>{h.name}</p>
                    <p className="text-xs text-gray-400">
                      {PARTICIPANT_TYPE_LABELS[h.type as keyof typeof PARTICIPANT_TYPE_LABELS] || h.type}
                      {h.organization && ` · ${h.organization}`}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-mono shrink-0 ml-2">{h.time}</span>
              </div>
            ))}
          </div>
        )}

        {/* Compteur total */}
        {history.length > 0 && (
          <div
            className="mt-4 pt-4 text-center"
            style={{ borderTop: '1px solid #e2e8f0' }}
          >
            <p className="text-3xl font-bold" style={{ color: '#0a1932' }}>{history.length}</p>
            <p className="text-xs text-gray-400 mt-0.5">check-in{history.length > 1 ? 's' : ''} au total</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ParticipantCard({ participant: p }: { participant: Registration }) {
  const typeColor = typeColors[p.participant_type] || '#3b82f6'
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0"
          style={{ background: `linear-gradient(135deg, ${typeColor}, ${typeColor}88)` }}
        >
          {p.first_name[0]}{p.last_name[0]}
        </div>
        <div>
          <p className="font-bold text-sm" style={{ color: '#0a1932' }}>
            {p.first_name} {p.last_name}
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
            style={{ backgroundColor: typeColor }}
          >
            {PARTICIPANT_TYPE_LABELS[p.participant_type]}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-1.5 text-xs text-gray-500">
        <div className="flex items-center gap-1.5"><Mail size={11} /> {p.email}</div>
        {p.organization && <div className="flex items-center gap-1.5"><Building2 size={11} /> {p.organization}</div>}
        {p.job_title && <div className="flex items-center gap-1.5"><User size={11} /> {p.job_title}</div>}
        <div className="flex items-center gap-1.5"><MapPin size={11} /> {p.country}</div>
      </div>
    </div>
  )
}

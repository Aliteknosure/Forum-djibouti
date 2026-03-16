'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, Clock } from 'lucide-react'

// 30 minutes d'inactivité → déconnexion automatique
const INACTIVITY_LIMIT_MS = 30 * 60 * 1000
// Avertissement 60 secondes avant
const WARNING_BEFORE_MS = 60 * 1000

export function SessionWatcher() {
  const { data: session, status } = useSession()
  const [showWarning, setShowWarning] = useState(false)
  const [countdown, setCountdown] = useState(60)

  // ── Timer inactivité ──
  useEffect(() => {
    if (status !== 'authenticated') return

    let inactivityTimer: ReturnType<typeof setTimeout>
    let warningTimer: ReturnType<typeof setTimeout>
    let countdownInterval: ReturnType<typeof setInterval>

    const resetTimers = () => {
      clearTimeout(inactivityTimer)
      clearTimeout(warningTimer)
      clearInterval(countdownInterval)
      setShowWarning(false)
      setCountdown(60)

      // Avertissement 60s avant déconnexion
      warningTimer = setTimeout(() => {
        setShowWarning(true)
        setCountdown(60)
        countdownInterval = setInterval(() => {
          setCountdown((c) => {
            if (c <= 1) {
              clearInterval(countdownInterval)
              return 0
            }
            return c - 1
          })
        }, 1000)
      }, INACTIVITY_LIMIT_MS - WARNING_BEFORE_MS)

      // Déconnexion automatique après inactivité
      inactivityTimer = setTimeout(() => {
        signOut({ callbackUrl: '/admin/login?expired=1' })
      }, INACTIVITY_LIMIT_MS)
    }

    const EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']
    EVENTS.forEach((e) => window.addEventListener(e, resetTimers))
    resetTimers()

    return () => {
      clearTimeout(inactivityTimer)
      clearTimeout(warningTimer)
      clearInterval(countdownInterval)
      EVENTS.forEach((e) => window.removeEventListener(e, resetTimers))
    }
  }, [status])

  // ── Expiration JWT exacte ──
  useEffect(() => {
    if (!session?.expires) return

    const expiresAt = new Date(session.expires).getTime()
    const delay = expiresAt - Date.now()

    if (delay <= 0) {
      signOut({ callbackUrl: '/admin/login?expired=1' })
      return
    }

    const timer = setTimeout(() => {
      signOut({ callbackUrl: '/admin/login?expired=1' })
    }, delay)

    return () => clearTimeout(timer)
  }, [session])

  if (!showWarning) return null

  return (
    <div
      className="fixed top-4 right-4 z-[9999] rounded-2xl p-4 shadow-2xl flex items-start gap-3 w-80"
      style={{
        background: 'linear-gradient(135deg, #0a1932, #0d2545)',
        border: '1px solid rgba(212,175,55,0.5)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Icône */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'rgba(212,175,55,0.15)' }}
      >
        <Clock size={18} style={{ color: '#d4af37' }} />
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold mb-0.5">
          Session sur le point d&apos;expirer
        </p>
        <p className="text-white/50 text-xs leading-relaxed">
          Déconnexion automatique dans{' '}
          <span className="font-bold" style={{ color: '#d4af37' }}>
            {countdown}s
          </span>{' '}
          en raison d&apos;inactivité.
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => {
              setShowWarning(false)
              window.dispatchEvent(new MouseEvent('mousedown'))
            }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            style={{ background: 'rgba(212,175,55,0.2)', color: '#d4af37' }}
          >
            Rester connecté
          </button>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            <LogOut size={12} />
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  )
}

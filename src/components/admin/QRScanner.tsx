'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Camera, CameraOff, Loader2 } from 'lucide-react'

interface Props {
  onScan: (result: string) => void
  active: boolean
}

// Arrêt global de tous les flux vidéo du navigateur
async function killAllVideoStreams() {
  try {
    // Stopper tous les tracks sur tous les éléments <video> du DOM
    document.querySelectorAll('video').forEach((video) => {
      const stream = video.srcObject as MediaStream | null
      if (stream) {
        stream.getTracks().forEach((t) => { t.stop(); t.enabled = false })
      }
      video.srcObject = null
      video.pause()
    })
    // Stopper aussi via l'API navigator si une permission active existe
    const devices = await navigator.mediaDevices.enumerateDevices()
    const hasCamera = devices.some(d => d.kind === 'videoinput')
    if (hasCamera) {
      // Demander un stream juste pour récupérer les tracks et les stopper
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => stream.getTracks().forEach(t => t.stop()))
        .catch(() => {})
    }
  } catch {}
}

export default function QRScanner({ onScan, active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scannerRef = useRef<unknown>(null)
  const isStoppingRef = useRef(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'running' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  // lastScanned reset à 5s pour éviter scan en boucle
  const lastScanned = useRef<string>('')
  const lastScannedTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stopScanner = useCallback(async () => {
    if (isStoppingRef.current) return
    isStoppingRef.current = true

    if (scannerRef.current) {
      try {
        const scanner = scannerRef.current as {
          isScanning: boolean
          stop: () => Promise<void>
          clear: () => void
        }
        if (scanner.isScanning) {
          await scanner.stop()
        }
        scanner.clear()
      } catch {}
      scannerRef.current = null
    }

    // Tuer tous les flux vidéo
    await killAllVideoStreams()

    setStatus('idle')
    isStoppingRef.current = false
  }, [])

  const startScanner = useCallback(async () => {
    if (!containerRef.current) return
    setStatus('loading')

    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      const scannerId = 'qr-reader-' + Date.now()
      containerRef.current.id = scannerId

      const scanner = new Html5Qrcode(scannerId)
      scannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 8, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          // Bloquer les doublons pendant 5 secondes
          if (decodedText === lastScanned.current) return
          lastScanned.current = decodedText
          if (lastScannedTimer.current) clearTimeout(lastScannedTimer.current)
          lastScannedTimer.current = setTimeout(() => {
            lastScanned.current = ''
          }, 5000)
          onScan(decodedText)
        },
        () => {}
      )
      setStatus('running')
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Impossible d'accéder à la caméra"
      setErrorMsg(
        msg.includes('permission') || msg.includes('NotAllowed') || msg.includes('NotFound')
          ? 'Accès à la caméra refusé. Autorisez la caméra dans votre navigateur.'
          : msg
      )
      setStatus('error')
    }
  }, [onScan])

  useEffect(() => {
    if (active) {
      startScanner()
    } else {
      stopScanner()
    }
    return () => {
      stopScanner()
    }
  }, [active, startScanner, stopScanner])

  // Cleanup au démontage du composant
  useEffect(() => {
    return () => {
      if (lastScannedTimer.current) clearTimeout(lastScannedTimer.current)
      stopScanner()
    }
  }, [stopScanner])

  return (
    <div className="relative w-full">
      {/* Viewfinder */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#0a1932',
          aspectRatio: '4/3',
          border: '2px solid rgba(212,175,55,0.3)',
        }}
      >
        {/* Scanner container */}
        <div ref={containerRef} className="w-full h-full" />

        {/* Overlay états */}
        {status !== 'running' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            {status === 'loading' && (
              <>
                <Loader2 size={32} className="animate-spin" style={{ color: '#d4af37' }} />
                <p className="text-white/70 text-sm">Démarrage de la caméra...</p>
              </>
            )}
            {status === 'idle' && (
              <>
                <Camera size={40} style={{ color: 'rgba(255,255,255,0.3)' }} />
                <p className="text-white/40 text-sm">Caméra inactive</p>
              </>
            )}
            {status === 'error' && (
              <>
                <CameraOff size={32} className="text-red-400" />
                <p className="text-red-300 text-sm text-center px-6">{errorMsg}</p>
              </>
            )}
          </div>
        )}

        {/* Viseur animé quand actif */}
        {status === 'running' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-56 h-56">
              {/* Coins du viseur */}
              {[
                'top-0 left-0 border-t-2 border-l-2',
                'top-0 right-0 border-t-2 border-r-2',
                'bottom-0 left-0 border-b-2 border-l-2',
                'bottom-0 right-0 border-b-2 border-r-2',
              ].map((cls, i) => (
                <div
                  key={i}
                  className={`absolute w-6 h-6 ${cls}`}
                  style={{ borderColor: '#d4af37' }}
                />
              ))}
              {/* Ligne de scan animée */}
              <div
                className="absolute left-2 right-2 h-0.5 animate-scan-line"
                style={{ background: 'linear-gradient(90deg, transparent, #d4af37, transparent)', top: '50%' }}
              />
            </div>
          </div>
        )}

        {/* Badge "En direct" */}
        {status === 'running' && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(16,185,129,0.2)', border: '1px solid rgba(16,185,129,0.4)', color: '#34d399' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            En direct
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scan-line {
          0%, 100% { transform: translateY(-60px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { transform: translateY(60px); }
        }
        .animate-scan-line {
          animation: scan-line 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

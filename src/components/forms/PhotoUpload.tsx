'use client'

import { useState, useRef } from 'react'
import { Camera, X, Loader2, CheckCircle2 } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// Client public (pas admin) pour upload depuis le browser
const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PhotoUploadProps {
  onUpload: (url: string) => void
  onClear: () => void
}

export default function PhotoUpload({ onUpload, onClear }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    // Validation type
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Format invalide — JPG, PNG ou WEBP uniquement')
      return
    }
    // Validation taille (2 Mo)
    if (file.size > 2 * 1024 * 1024) {
      setError('Taille max : 2 Mo')
      return
    }

    setError(null)
    setUploading(true)
    setUploaded(false)

    // Aperçu local immédiat
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    // Nom de fichier unique
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadError } = await supabasePublic.storage
      .from('avatars')
      .upload(fileName, file, { upsert: false, contentType: file.type })

    if (uploadError) {
      setError('Erreur lors de l\'upload — réessayez')
      setPreview(null)
      setUploading(false)
      return
    }

    // URL publique
    const { data } = supabasePublic.storage.from('avatars').getPublicUrl(fileName)
    onUpload(data.publicUrl)
    setUploading(false)
    setUploaded(true)
  }

  const handleClear = () => {
    setPreview(null)
    setError(null)
    setUploaded(false)
    onClear()
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Photo de profil{' '}
        <span className="text-gray-400 font-normal text-xs">
          (optionnel — apparaîtra sur votre badge)
        </span>
      </label>

      {preview ? (
        /* ── Aperçu avec photo ── */
        <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-200 bg-gray-50">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-djibouti-gold/50 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 size={18} className="text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            {uploading ? (
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin" /> Upload en cours...
              </p>
            ) : uploaded ? (
              <p className="text-sm text-green-600 flex items-center gap-2">
                <CheckCircle2 size={14} /> Photo ajoutée avec succès
              </p>
            ) : null}
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-red-500 hover:text-red-700 hover:underline mt-1 flex items-center gap-1 transition-colors"
            >
              <X size={11} /> Supprimer la photo
            </button>
          </div>
        </div>
      ) : (
        /* ── Zone de drop / clic ── */
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            const file = e.dataTransfer.files[0]
            if (file) handleFile(file)
          }}
          className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-djibouti-gold/50 hover:bg-djibouti-gold/5 transition-all select-none"
        >
          <Camera size={26} className="mx-auto mb-2 text-gray-300" />
          <p className="text-sm text-gray-500 font-medium">Cliquez ou glissez une photo</p>
          <p className="text-xs text-gray-400 mt-0.5">JPG, PNG, WEBP · max 2 Mo</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
      />

      {error && (
        <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
          ⚠️ {error}
        </p>
      )}
    </div>
  )
}

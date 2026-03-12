'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Lock, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      console.log('signIn response:', res)

      if (!res) {
        setError('Pas de réponse du serveur. Vérifiez les logs Render.')
        return
      }

      if (res.error) {
        setError(`Email ou mot de passe incorrect. (${res.error})`)
        return
      }

      if (res.ok) {
        // Forcer un hard redirect plutôt que router.push pour s'assurer
        // que la session est bien rechargée
        window.location.href = '/admin'
        return
      }

      setError('Erreur inconnue. Vérifiez les variables d\'environnement sur Render.')
    } catch (err) {
      console.error('signIn error:', err)
      setError('Erreur réseau. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(160deg, #020b18, #0a1932, #0d2545)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 shadow-2xl"
        style={{ backgroundColor: 'white' }}
      >
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)' }}
          >
            <Lock size={24} color="#060f1f" />
          </div>
          <h1 className="font-bold text-xl" style={{ color: '#0a1932' }}>Espace Admin</h1>
          <p className="text-gray-500 text-sm mt-1">Forum BOOST Entrepreneurship</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@forum.dj"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 border border-red-200 py-3 px-4 rounded-lg">
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full font-semibold py-3 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Se connecter'}
          </Button>
        </form>
      </div>
    </div>
  )
}

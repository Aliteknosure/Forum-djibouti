import Link from 'next/link'
import { signOut } from '@/lib/auth'
import { LayoutDashboard, Users, CreditCard, QrCode, LogOut, Globe } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/registrations', label: 'Inscriptions', icon: Users },
  { href: '/admin/badges', label: 'Badges', icon: CreditCard },
  { href: '/admin/checkin', label: 'Check-in', icon: QrCode },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f1f5f9' }}>

      {/* ── Sidebar desktop (md+) ── */}
      <aside
        className="hidden md:flex w-56 flex-col fixed inset-y-0 left-0 z-30"
        style={{ backgroundColor: '#0a1932', borderRight: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo */}
        <div className="px-5 py-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
              style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
            >
              F
            </div>
            <div>
              <p className="text-white text-xs font-bold leading-tight">Forum Admin</p>
              <p className="text-xs" style={{ color: '#d4af37' }}>Djibouti 2026</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all hover:bg-white/10 text-white/70 hover:text-white"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 space-y-1" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white/70 transition-colors"
          >
            <Globe size={16} />
            Site public
          </Link>
          <form
            action={async () => {
              'use server'
              await signOut({ redirectTo: '/admin/login' })
            }}
          >
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-400 transition-colors w-full"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 md:ml-56 min-h-screen pb-20 md:pb-0">
        {children}
      </main>

      {/* ── Bottom nav mobile (< md) ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 py-2"
        style={{ backgroundColor: '#0a1932', borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-white/60 hover:text-white transition-colors"
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
        <Link
          href="/"
          className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-white/60 hover:text-white transition-colors"
        >
          <Globe size={20} />
          <span className="text-[10px] font-medium">Site</span>
        </Link>
      </nav>
    </div>
  )
}

import Link from 'next/link'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#060f1f' }} className="text-white">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-md"
                style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: '#060f1f' }}
              >
                F
              </div>
              <div>
                <p className="font-bold text-lg text-white">Forum National</p>
                <p className="text-sm" style={{ color: '#d4af37' }}>de l&apos;Entrepreneuriat 2026</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Organisé par le <strong className="text-white/80">CLE — Centre de Leadership et d&apos;Entrepreneuriat</strong>, 
              avec le soutien de l&apos;Union Européenne et de la Banque Mondiale dans le cadre du 
              programme Entrepreneurs de Quartier (EDQ).
            </p>
            <div className="flex items-center gap-2 mt-6 p-3 rounded-lg" style={{ backgroundColor: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
              <span style={{ color: '#d4af37' }} className="text-sm font-semibold">📅 23 mars 2026</span>
              <span className="text-white/30 mx-2">·</span>
              <span className="text-white/70 text-sm">Djibouti</span>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: '#d4af37' }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: '#about',    label: 'À propos' },
                { href: '#program',  label: 'Programme' },
                { href: '#orateurs', label: 'Orateurs' },
                { href: '#speakers', label: 'Partenaires' },
                { href: '#sponsors', label: 'Soutiens' },
                { href: '#faq',      label: 'FAQ' },
                { href: '/register', label: "S'inscrire" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: '#d4af37' }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: '#d4af37' }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0" style={{ color: '#d4af37' }} />
                <a href="mailto:contact@cle-djibouti.dj" className="text-white/60 hover:text-white text-sm transition-colors">
                  contact@cle-djibouti.dj
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0" style={{ color: '#d4af37' }} />
                <span className="text-white/60 text-sm">+253 21 35 00 00</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: '#d4af37' }} />
                <span className="text-white/60 text-sm">CLE — Siège social<br />Djibouti-Ville, République de Djibouti</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe size={16} className="mt-0.5 shrink-0" style={{ color: '#d4af37' }} />
                <a href="https://www.cle-djibouti.dj" className="text-white/60 hover:text-white text-sm transition-colors">
                  www.cle-djibouti.dj
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Google Maps embed */}
        <div className="mt-12 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.9!2d43.1456!3d11.5892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM1JzIxLjEiTiA0M8KwMDgnNDQuMiJF!5e0!3m2!1sfr!2sdj!4v1234567890"
            width="100%"
            height="250"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation Forum Djibouti"
          />
        </div>

        {/* Copyright */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p>© 2026 CLE — Forum National de l&apos;Entrepreneuriat. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white/70 transition-colors">Confidentialité</a>
            <Link href="/admin" className="hover:text-white/70 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

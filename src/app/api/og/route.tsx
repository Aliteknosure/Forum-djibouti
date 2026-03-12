import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const TYPE_CONFIG: Record<string, { label: string; color: string; icon: string; bg: string }> = {
  visitor:       { label: 'Participant',      color: '#3B82F6', icon: '👥', bg: '#1e3a5f' },
  press:         { label: 'Presse',           color: '#10B981', icon: '📰', bg: '#064e3b' },
  exposant_msme: { label: 'Exposant MSME',    color: '#F5A623', icon: '🏪', bg: '#78350f' },
  paneliste:     { label: 'Panéliste',        color: '#8B5CF6', icon: '🎤', bg: '#3b0764' },
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name  = searchParams.get('name')  || 'Participant'
  const type  = searchParams.get('type')  || 'visitor'
  const org   = searchParams.get('org')   || ''

  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.visitor

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a1932 0%, #1A3C6E 60%, #0d2a4a 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cercles décoratifs */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '360px', height: '360px', borderRadius: '50%',
          background: `${cfg.color}18`, border: `2px solid ${cfg.color}30`,
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-120px', left: '-60px',
          width: '420px', height: '420px', borderRadius: '50%',
          background: '#F5A62310', border: '2px solid #F5A62325',
          display: 'flex',
        }} />

        {/* Bande dorée top */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #F5A623, #d4af37, #F5A623)', display: 'flex' }} />

        {/* Contenu principal */}
        <div style={{ display: 'flex', flex: 1, padding: '48px 64px', flexDirection: 'column', justifyContent: 'space-between' }}>

          {/* Header — Logo + event */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                fontSize: '13px', fontWeight: 800, letterSpacing: '3px',
                textTransform: 'uppercase', color: '#F5A623',
              }}>
                FORUM INTERNATIONAL DES STARTUPS
              </div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
                DE DJIBOUTI 2026
              </div>
            </div>
            {/* Badge type */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: `${cfg.color}22`, border: `2px solid ${cfg.color}`,
              borderRadius: '50px', padding: '10px 22px',
            }}>
              <span style={{ fontSize: '22px' }}>{cfg.icon}</span>
              <span style={{ color: cfg.color, fontWeight: 800, fontSize: '16px' }}>{cfg.label}</span>
            </div>
          </div>

          {/* Centre — Nom du participant */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              PARTICIPANT OFFICIEL
            </div>
            <div style={{ fontSize: '68px', fontWeight: 900, color: '#ffffff', lineHeight: 1.1 }}>
              {name}
            </div>
            {org && (
              <div style={{ fontSize: '22px', color: 'rgba(255,255,255,0.65)', marginTop: '4px' }}>
                {org}
              </div>
            )}
          </div>

          {/* Footer — Infos événement */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>📅</span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', fontWeight: 600 }}>29 Mars – 1er Avril 2026</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', fontWeight: 600 }}>Djibouti-Ville</span>
              </div>
            </div>
            {/* Hashtags */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {['#FISDJ2026', '#StartupDjibouti'].map((tag) => (
                <div key={tag} style={{
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '20px', padding: '6px 14px',
                  color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 600,
                  display: 'flex',
                }}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bande dorée bottom */}
        <div style={{ height: '4px', background: 'linear-gradient(90deg, #F5A623, #d4af37, #F5A623)', display: 'flex' }} />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

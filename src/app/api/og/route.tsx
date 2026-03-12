import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const TYPE_CONFIG: Record<string, { label: string; color: string; icon: string; tagline: string }> = {
  visitor:          { label: 'Participant',         color: '#3B82F6', icon: '👥', tagline: "Je serai au Forum !" },
  speaker:          { label: 'Intervenant',         color: '#8B5CF6', icon: '🎤', tagline: "Je prends la parole !" },
  investor:         { label: 'Investisseur',        color: '#F5A623', icon: '💼', tagline: "Je rencontre les startups !" },
  startup_msme:     { label: 'Startup / MSME',      color: '#10B981', icon: '�', tagline: "Je pitche mon projet !" },
  exhibitor:        { label: 'Exposant',            color: '#F97316', icon: '🏪', tagline: "Je tiens un stand !" },
  ecosystem_leader: { label: 'Leader Écosystème',   color: '#06B6D4', icon: '🌐', tagline: "Je porte l'écosystème !" },
  partner:          { label: 'Partenaire',          color: '#EC4899', icon: '🤝', tagline: "Je soutiens l'événement !" },
  press:            { label: 'Presse / Médias',     color: '#84CC16', icon: '📰', tagline: "Je couvre l'événement !" },
  // legacy
  exposant_msme:    { label: 'Exposant MSME',       color: '#F5A623', icon: '🏪', tagline: "Je tiens un stand !" },
  paneliste:        { label: 'Panéliste',           color: '#8B5CF6', icon: '🎤', tagline: "Je prends la parole !" },
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
          background: 'linear-gradient(135deg, #030d1a 0%, #0D1B2A 50%, #0a1932 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Bandes verticales décoratives gauche */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '8px',
          background: `linear-gradient(180deg, ${cfg.color}, #F5A623, ${cfg.color})`,
          display: 'flex',
        }} />

        {/* Grand cercle décoratif haut-droite */}
        <div style={{
          position: 'absolute', top: '-160px', right: '-160px',
          width: '520px', height: '520px', borderRadius: '50%',
          border: `2px solid ${cfg.color}30`,
          background: `radial-gradient(circle, ${cfg.color}12 0%, transparent 70%)`,
          display: 'flex',
        }} />
        {/* Petit cercle bas-gauche */}
        <div style={{
          position: 'absolute', bottom: '-80px', left: '80px',
          width: '280px', height: '280px', borderRadius: '50%',
          border: `1px solid ${cfg.color}20`,
          background: `${cfg.color}08`,
          display: 'flex',
        }} />

        {/* Colonne gauche — contenu principal */}
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1,
          padding: '52px 56px 52px 64px', justifyContent: 'space-between',
        }}>

          {/* Header — Nom event + date */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{
              fontSize: '13px', fontWeight: 800, letterSpacing: '4px',
              color: '#F5A623', textTransform: 'uppercase',
            }}>
              FORUM BOOST ENTREPRENEURSHIP
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '20px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
                DJIBOUTI 2026
              </div>
              <div style={{
                height: '1px', flex: 1,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)',
                display: 'flex',
              }} />
              <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                29 Mars – 1er Avril
              </div>
            </div>
          </div>

          {/* Centre — Tagline + Nom */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Tagline */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '14px',
            }}>
              <div style={{
                fontSize: '36px', fontWeight: 900, color: '#ffffff',
                letterSpacing: '-0.5px', lineHeight: 1,
              }}>
                {cfg.tagline}
              </div>
            </div>

            {/* Badge rôle */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: `${cfg.color}20`, border: `2px solid ${cfg.color}`,
              borderRadius: '12px', padding: '10px 20px', width: 'fit-content',
            }}>
              <span style={{ fontSize: '22px' }}>{cfg.icon}</span>
              <span style={{ color: cfg.color, fontWeight: 800, fontSize: '18px', letterSpacing: '1px' }}>
                {cfg.label.toUpperCase()}
              </span>
            </div>

            {/* Nom */}
            <div style={{
              fontSize: name.length > 20 ? '52px' : '64px',
              fontWeight: 900, color: '#ffffff', lineHeight: 1.05,
              letterSpacing: '-1px',
            }}>
              {name}
            </div>
            {org && (
              <div style={{
                fontSize: '22px', color: 'rgba(255,255,255,0.55)',
                fontWeight: 500, marginTop: '-8px',
              }}>
                {org}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '20px', padding: '6px 16px',
            }}>
              <span style={{ fontSize: '16px' }}>📍</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: 600 }}>Djibouti-Ville</span>
            </div>
            <div style={{
              fontSize: '14px', color: cfg.color, fontWeight: 700, letterSpacing: '1px',
            }}>
              #BoostEntrepreneurship
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
              #StartupDjibouti
            </div>
          </div>
        </div>

        {/* Colonne droite — bloc coloré impactant */}
        <div style={{
          width: '320px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(160deg, ${cfg.color}22 0%, ${cfg.color}08 100%)`,
          borderLeft: `1px solid ${cfg.color}30`,
          padding: '40px 32px',
          gap: '24px',
        }}>
          {/* Grand icône */}
          <div style={{
            fontSize: '80px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: `${cfg.color}15`, border: `2px solid ${cfg.color}40`,
            borderRadius: '50%', width: '140px', height: '140px',
          }}>
            {cfg.icon}
          </div>
          {/* MEET ME THERE */}
          <div style={{
            textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            <div style={{
              background: cfg.color, borderRadius: '10px',
              padding: '12px 20px', display: 'flex',
            }}>
              <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '16px', letterSpacing: '2px' }}>
                MEET ME THERE
              </span>
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', fontWeight: 500 }}>
              forum-djibouti.onrender.com
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

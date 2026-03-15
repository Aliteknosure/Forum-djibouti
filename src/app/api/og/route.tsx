import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const TYPE_CONFIG: Record<string, { label: string; color: string; tagline: string }> = {
  visitor:          { label: 'Participant',       color: '#3B82F6', tagline: "Je serai au Forum !" },
  speaker:          { label: 'Intervenant',       color: '#8B5CF6', tagline: "Je prends la parole !" },
  investor:         { label: 'Investisseur',      color: '#F59E0B', tagline: "Je rencontre les startups !" },
  startup_msme:     { label: 'Startup / MSME',    color: '#10B981', tagline: "Je pitche mon projet !" },
  exhibitor:        { label: 'Exposant',          color: '#F97316', tagline: "Venez voir notre stand !" },
  ecosystem_leader: { label: 'Ecosystem Leader',  color: '#06B6D4', tagline: "Je bâtis l'écosystème !" },
  partner:          { label: 'Partenaire',        color: '#EC4899', tagline: "Nous soutenons le Forum !" },
  press:            { label: 'Presse',            color: '#84CC16', tagline: "Je couvre l'événement !" },
  // legacy
  exposant_msme:    { label: 'Exposant MSME',     color: '#F97316', tagline: "Venez voir notre stand !" },
  paneliste:        { label: 'Panéliste',         color: '#8B5CF6', tagline: "Je prends la parole !" },
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const name  = searchParams.get('name')  || 'Participant'
  const type  = searchParams.get('type')  || 'visitor'
  const org   = searchParams.get('org')   || ''
  const photo = searchParams.get('photo') || ''   // URL photo Supabase

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
        {/* Bande colorée gauche */}
        <div style={{
          width: '8px', display: 'flex',
          background: `linear-gradient(180deg, ${cfg.color}, #F5A623)`,
        }} />

        {/* Cercle décoratif haut-droite */}
        <div style={{
          position: 'absolute', top: '-150px', right: '-150px',
          width: '500px', height: '500px', borderRadius: '50%',
          border: `2px solid ${cfg.color}25`,
          background: `radial-gradient(circle, ${cfg.color}10 0%, transparent 70%)`,
          display: 'flex',
        }} />

        {/* Colonne gauche — contenu */}
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1,
          padding: '50px 52px 50px 60px', justifyContent: 'space-between',
        }}>

          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '4px', color: '#F5A623', textTransform: 'uppercase' }}>
              FORUM BOOST ENTREPRENEURSHIP
            </div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.45)' }}>
              29 Mars – 1er Avril 2026 · Djibouti
            </div>
          </div>

          {/* Centre */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Tagline */}
            <div style={{ fontSize: '32px', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
              {cfg.tagline}
            </div>
            {/* Badge rôle */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: `${cfg.color}20`, border: `2px solid ${cfg.color}`,
              borderRadius: '10px', padding: '8px 18px', alignSelf: 'flex-start',
            }}>
              <span style={{ color: cfg.color, fontWeight: 800, fontSize: '16px', letterSpacing: '1px' }}>
                {cfg.label.toUpperCase()}
              </span>
            </div>
            {/* Nom */}
            <div style={{
              fontSize: name.length > 22 ? '48px' : '62px',
              fontWeight: 900, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-1px',
            }}>
              {name}
            </div>
            {org && (
              <div style={{ fontSize: '20px', color: 'rgba(255,255,255,0.5)', marginTop: '-6px' }}>
                {org}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px', padding: '5px 14px',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600 }}>📍 Djibouti-Ville</span>
            </div>
            <div style={{ fontSize: '13px', color: cfg.color, fontWeight: 700 }}>#ForumBOOST</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>#BoostEntrepreneurship</div>
          </div>
        </div>

        {/* Colonne droite — photo ou bloc icône */}
        <div style={{
          width: '300px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(160deg, ${cfg.color}18 0%, ${cfg.color}06 100%)`,
          borderLeft: `1px solid ${cfg.color}25`,
          padding: '40px 28px', gap: '20px',
        }}>
          {/* Photo ou placeholder */}
          {photo ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={photo}
              width={160}
              height={160}
              style={{
                borderRadius: '50%',
                border: `4px solid ${cfg.color}`,
                objectFit: 'cover',
                display: 'flex',
              }}
            />
          ) : (
            <div style={{
              width: '140px', height: '140px', borderRadius: '50%',
              background: `${cfg.color}15`, border: `3px solid ${cfg.color}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '52px',
            }}>
              👤
            </div>
          )}

          {/* MEET ME THERE */}
          <div style={{
            background: cfg.color, borderRadius: '10px',
            padding: '12px 18px', display: 'flex',
          }}>
            <span style={{ color: '#ffffff', fontWeight: 900, fontSize: '14px', letterSpacing: '2px' }}>
              MEET ME THERE
            </span>
          </div>
        </div>

        {/* Bande dorée bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px',
          background: 'linear-gradient(90deg, #F5A623, #d4af37, #F5A623)',
          display: 'flex',
        }} />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}




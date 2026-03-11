import { Resend } from 'resend'
import { Registration, PARTICIPANT_TYPE_LABELS } from '@/types/registration'
import { generateProgramPDF } from './program-generator'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@forum-djibouti.dj'
export const FORUM_NAME = "Forum National de l'Entrepreneuriat"
export const FORUM_DATE = '23 mars 2026'
export const FORUM_LOCATION = 'Djibouti-Ville, République de Djibouti'
export const FORUM_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://fisdj2026.com'

// ──────────────────────────────────────────────────────────────
// Textes LinkedIn par type de participant
// ──────────────────────────────────────────────────────────────
const LINKEDIN_POSTS: Record<string, string> = {
  visitor: `🚀 Je serai au Forum International des Startups de Djibouti 2026 !

📅 Le 23 Mars 2026 à Djibouti-Ville
🌍 Un événement historique pour l'entrepreneuriat en Afrique de l'Est

Au programme : 120 MSMEs exposantes, des panels d'experts, des opportunités de networking et bien plus encore !

Rejoignez-nous pour célébrer l'innovation et la transformation digitale de Djibouti. 💡

#FISDJ2026 #StartupDjibouti #SmartNation #Entrepreneuriat #Innovation #Djibouti`,

  press: `📰 Je couvre le Forum International des Startups de Djibouti 2026 !

📅 Le 23 Mars 2026 à Djibouti-Ville
🎙️ Un événement majeur pour l'économie djiboutienne

Retrouvez mes reportages sur cet événement incontournable dédié à l'innovation et aux MSMEs.

#FISDJ2026 #StartupDjibouti #Presse #Médias #Journalisme #Djibouti`,

  exposant_msme: `🏪 Mon entreprise est officiellement sélectionnée pour exposer au Forum International des Startups de Djibouti 2026 !

📅 Le 23 Mars 2026 à Djibouti-Ville
🌍 Parmi les 120 MSMEs sélectionnées pour transformer l'économie djiboutienne

Venez découvrir notre stand et échanger sur nos solutions et innovations !

#FISDJ2026 #MSME #StartupDjibouti #Entrepreneuriat #MadeInDjibouti #Innovation`,

  paneliste: `🎤 Je suis confirmé(e) comme panéliste au Forum International des Startups de Djibouti 2026 !

📅 Le 23 Mars 2026 à Djibouti-Ville
💡 Au programme : Innovation, Financement, Transformation digitale & Développement des MSMEs

Rendez-vous pour des échanges enrichissants sur l'avenir de l'entrepreneuriat en Afrique de l'Est !

#FISDJ2026 #StartupDjibouti #Innovation #Leadership #Conférence #Djibouti`,
}

function buildShareBlock(registration: { id: string; participant_type: string; first_name: string; last_name: string }): string {
  const sharePageUrl = `${FORUM_URL}/share/${registration.id}`
  const postPreview = (LINKEDIN_POSTS[registration.participant_type] ?? LINKEDIN_POSTS.visitor)
    .split('\n').slice(0, 3).join('<br>')

  const linkedinPost = LINKEDIN_POSTS[registration.participant_type] ?? LINKEDIN_POSTS.visitor
  const linkedinFullText = `${linkedinPost}\n\n👤 ${registration.first_name} ${registration.last_name}\n\n${sharePageUrl}`
  // linkedin.com/feed/?shareActive=true&text= → pré-remplit le texte ET attache l'URL comme aperçu OG
  const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(linkedinFullText)}`

  const twitterText = `🚀 Je participe au Forum International des Startups de Djibouti 2026 !\n📅 23 Mars 2026 • Djibouti-Ville\n#FISDJ2026 #StartupDjibouti`
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(sharePageUrl)}`
  const whatsappText = `Je participe au Forum International des Startups de Djibouti 2026 ! 🎉\n${sharePageUrl}`
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappText)}`

  return `
    <!-- ═══ SHARE BLOCK ═══ -->
    <tr><td style="padding:0 40px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4ff;border:1px solid #c7d4f0;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="width:4px;background:linear-gradient(180deg,#0A66C2,#8B5CF6);">&nbsp;</td>
          <td style="padding:22px 24px;">

            <!-- Titre -->
            <p style="margin:0 0 4px;color:#0a1932;font-size:15px;font-weight:700;">🎉 Partagez votre participation !</p>
            <p style="margin:0 0 16px;color:#475569;font-size:12px;">Annoncez votre présence au FISDJ 2026 et inspirez votre réseau.</p>

            <!-- Aperçu du post -->
            <div style="background:#ffffff;border:1px solid #dce6f0;border-radius:8px;padding:14px 16px;font-size:12px;color:#475569;line-height:1.7;margin-bottom:18px;">
              ${postPreview}<br><span style="color:#94a3b8;">...</span>
            </div>

            <!-- Bouton principal — page de partage -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
              <tr>
                <td style="background:#0a1932;border-radius:8px;">
                  <a href="${sharePageUrl}" target="_blank"
                    style="display:inline-block;padding:12px 28px;color:#d4af37;text-decoration:none;font-weight:700;font-size:14px;letter-spacing:0.3px;">
                    ✦ Voir ma page de participation
                  </a>
                </td>
              </tr>
            </table>

            <!-- Partage direct -->
            <p style="margin:0 0 10px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">Ou partager directement sur</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:8px;">
                  <a href="${linkedinUrl}" target="_blank"
                    style="display:inline-block;background:#0A66C2;color:#fff;text-decoration:none;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;">
                    in LinkedIn
                  </a>
                </td>
                <td style="padding-right:8px;">
                  <a href="${twitterUrl}" target="_blank"
                    style="display:inline-block;background:#000000;color:#fff;text-decoration:none;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;">
                    𝕏 Twitter
                  </a>
                </td>
                <td>
                  <a href="${whatsappUrl}" target="_blank"
                    style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;">
                    WhatsApp
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>
    </td></tr>`
}

// ──────────────────────────────────────────────────────────────
// Builder HTML de confirmation (utilisable sans objet Registration complet)
// ──────────────────────────────────────────────────────────────
export function buildConfirmationEmailHtml(data: {
  first_name: string
  last_name: string
  email: string
  participant_type: string
  organization?: string | null
  job_title?: string | null
  country: string
  id: string
}): string {
  const typeLabel = PARTICIPANT_TYPE_LABELS[data.participant_type as keyof typeof PARTICIPANT_TYPE_LABELS] || data.participant_type

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Confirmation d'inscription</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="background:#0a1932;padding:36px 40px;text-align:center;">
          <p style="margin:0;color:#d4af37;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${FORUM_NAME}</p>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:12px;">${FORUM_DATE} · ${FORUM_LOCATION}</p>
          <div style="height:2px;background:#d4af37;margin-top:20px;"></div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="color:#0a1932;margin:0 0 8px;font-size:22px;">Inscription confirmée ✓</h2>
          <p style="color:#475569;margin:0 0 24px;font-size:15px;">
            Bonjour <strong>${data.first_name} ${data.last_name}</strong>,<br>
            votre inscription au <strong>${FORUM_NAME}</strong> a bien été reçue.
          </p>
          <!-- Recap card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:28px;">
            <tr><td style="padding:24px;">
              <p style="margin:0 0 12px;color:#0a1932;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Récapitulatif</p>
              <table cellpadding="6" cellspacing="0" style="width:100%;font-size:14px;color:#334155;">
                <tr><td style="color:#94a3b8;width:140px;">Nom complet</td><td><strong>${data.first_name} ${data.last_name}</strong></td></tr>
                <tr><td style="color:#94a3b8;">Email</td><td>${data.email}</td></tr>
                ${data.organization ? `<tr><td style="color:#94a3b8;">Organisation</td><td>${data.organization}</td></tr>` : ''}
                ${data.job_title ? `<tr><td style="color:#94a3b8;">Fonction</td><td>${data.job_title}</td></tr>` : ''}
                <tr><td style="color:#94a3b8;">Type</td><td><span style="background:#0a1932;color:#fff;padding:2px 10px;border-radius:20px;font-size:12px;">${typeLabel}</span></td></tr>
                <tr><td style="color:#94a3b8;">Pays</td><td>${data.country}</td></tr>
              </table>
            </td></tr>
          </table>
          <!-- ID -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;margin-bottom:28px;">
            <tr><td style="padding:16px 24px;">
              <p style="margin:0;color:#92400e;font-size:13px;font-weight:600;">Votre identifiant unique</p>
              <p style="margin:6px 0 0;color:#78350f;font-family:monospace;font-size:12px;word-break:break-all;">${data.id}</p>
              <p style="margin:6px 0 0;color:#92400e;font-size:12px;">Conservez cet identifiant — il sera utilisé pour votre check-in.</p>
            </td></tr>
          </table>
          <p style="color:#475569;font-size:14px;margin:0 0 8px;">Votre dossier est en cours d'examen. Vous recevrez votre badge par email dès validation.</p>
          <p style="color:#475569;font-size:14px;margin:0;">À très bientôt,<br><strong>L'équipe du ${FORUM_NAME}</strong></p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#0a1932;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;">${FORUM_DATE} · ${FORUM_LOCATION}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ──────────────────────────────────────────────────────────────
// Email de confirmation d'inscription
// ──────────────────────────────────────────────────────────────
export async function sendConfirmationEmail(registration: Registration) {
  const typeLabel = PARTICIPANT_TYPE_LABELS[registration.participant_type] || registration.participant_type

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Confirmation d'inscription</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr><td style="background:#0a1932;padding:36px 40px;text-align:center;">
          <p style="margin:0;color:#d4af37;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${FORUM_NAME}</p>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:12px;">${FORUM_DATE} · ${FORUM_LOCATION}</p>
          <div style="height:2px;background:#d4af37;margin-top:20px;"></div>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="color:#0a1932;margin:0 0 8px;font-size:22px;">Inscription confirmée ✓</h2>
          <p style="color:#475569;margin:0 0 24px;font-size:15px;">
            Bonjour <strong>${registration.first_name} ${registration.last_name}</strong>,<br>
            votre inscription au <strong>${FORUM_NAME}</strong> a bien été reçue.
          </p>

          <!-- Recap card -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:28px;">
            <tr><td style="padding:24px;">
              <p style="margin:0 0 12px;color:#0a1932;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Récapitulatif</p>
              <table cellpadding="6" cellspacing="0" style="width:100%;font-size:14px;color:#334155;">
                <tr><td style="color:#94a3b8;width:140px;">Nom complet</td><td><strong>${registration.first_name} ${registration.last_name}</strong></td></tr>
                <tr><td style="color:#94a3b8;">Email</td><td>${registration.email}</td></tr>
                ${registration.organization ? `<tr><td style="color:#94a3b8;">Organisation</td><td>${registration.organization}</td></tr>` : ''}
                ${registration.job_title ? `<tr><td style="color:#94a3b8;">Fonction</td><td>${registration.job_title}</td></tr>` : ''}
                <tr><td style="color:#94a3b8;">Type</td><td><span style="background:#0a1932;color:#fff;padding:2px 10px;border-radius:20px;font-size:12px;">${typeLabel}</span></td></tr>
                <tr><td style="color:#94a3b8;">Pays</td><td>${registration.country}</td></tr>
              </table>
            </td></tr>
          </table>

          <!-- ID -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;margin-bottom:28px;">
            <tr><td style="padding:16px 24px;">
              <p style="margin:0;color:#92400e;font-size:13px;font-weight:600;">Votre identifiant unique</p>
              <p style="margin:6px 0 0;color:#78350f;font-family:monospace;font-size:12px;word-break:break-all;">${registration.id}</p>
              <p style="margin:6px 0 0;color:#92400e;font-size:12px;">Conservez cet identifiant — il sera utilisé pour votre check-in.</p>
            </td></tr>
          </table>

          <p style="color:#475569;font-size:14px;margin:0 0 8px;">Votre dossier est en cours d'examen. Vous recevrez votre badge par email dès validation.</p>
          <p style="color:#475569;font-size:14px;margin:0;">À très bientôt,<br><strong>L'équipe du ${FORUM_NAME}</strong></p>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#0a1932;padding:20px 40px;text-align:center;">
          <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;">${FORUM_DATE} · ${FORUM_LOCATION}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return resend.emails.send({
    from: FROM_EMAIL,
    to: registration.email,
    subject: `✅ Confirmation d'inscription — ${FORUM_NAME}`,
    html,
  })
}

// ──────────────────────────────────────────────────────────────
// Email de badge (badge PDF + programme PDF en pièces jointes)
// ──────────────────────────────────────────────────────────────
export async function sendBadgeEmail(registration: Registration, pdfBuffer: Buffer, _qrDataUrl?: string) {
  const typeLabel = PARTICIPANT_TYPE_LABELS[registration.participant_type] || registration.participant_type
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const checkinUrl = `${appUrl}/checkin?id=${registration.id}`

  // Générer le PDF du programme
  const programBuffer = await generateProgramPDF()

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Votre badge — ${FORUM_NAME}</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- ═══ HEADER ═══ -->
        <tr><td style="background:#0a1932;padding:36px 40px;text-align:center;">
          <p style="margin:0;color:#d4af37;font-size:13px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${FORUM_NAME}</p>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:12px;">${FORUM_DATE} · ${FORUM_LOCATION}</p>
          <div style="height:2px;background:#d4af37;margin-top:20px;"></div>
        </td></tr>

        <!-- ═══ BADGE APPROUVÉ ═══ -->
        <tr><td style="padding:40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:32px;">🎟️</p>
          <h2 style="color:#0a1932;margin:8px 0;font-size:22px;">Votre badge est prêt !</h2>
          <p style="color:#475569;margin:0 0 32px;font-size:15px;">
            Bonjour <strong>${registration.first_name} ${registration.last_name}</strong>,<br>
            votre participation au <strong>${FORUM_NAME}</strong> a été approuvée.
          </p>

          <!-- Info participant -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:28px;text-align:left;font-size:14px;color:#334155;">
            <tr><td style="color:#94a3b8;width:140px;padding:12px 16px;">Nom</td><td style="padding:12px 16px;"><strong>${registration.first_name} ${registration.last_name}</strong></td></tr>
            ${registration.job_title ? `<tr><td style="color:#94a3b8;padding:8px 16px;">Fonction</td><td style="padding:8px 16px;">${registration.job_title}</td></tr>` : ''}
            ${registration.organization ? `<tr><td style="color:#94a3b8;padding:8px 16px;">Organisation</td><td style="padding:8px 16px;">${registration.organization}</td></tr>` : ''}
            <tr><td style="color:#94a3b8;padding:8px 16px;">Type</td><td style="padding:8px 16px;"><span style="background:#0a1932;color:#fff;padding:2px 10px;border-radius:20px;font-size:12px;">${typeLabel}</span></td></tr>
          </table>

          <!-- Pièces jointes info -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fefce8;border:1px solid #fde68a;border-radius:8px;margin-bottom:28px;text-align:left;">
            <tr><td style="padding:16px 20px;">
              <p style="margin:0 0 10px;color:#92400e;font-size:13px;font-weight:700;">📎 Pièces jointes</p>
              <table cellpadding="4" cellspacing="0">
                <tr>
                  <td style="font-size:20px;padding-right:10px;">🎟️</td>
                  <td>
                    <p style="margin:0;color:#78350f;font-size:13px;font-weight:600;">badge-forum-djibouti.pdf</p>
                    <p style="margin:2px 0 0;color:#92400e;font-size:11px;">Votre badge nominatif avec QR code — à imprimer ou présenter sur téléphone</p>
                  </td>
                </tr>
                <tr>
                  <td style="font-size:20px;padding-right:10px;padding-top:8px;">📋</td>
                  <td style="padding-top:8px;">
                    <p style="margin:0;color:#78350f;font-size:13px;font-weight:600;">programme-forum-djibouti.pdf</p>
                    <p style="margin:2px 0 0;color:#92400e;font-size:11px;">Programme officiel complet de la journée du ${FORUM_DATE}</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>

          <a href="${checkinUrl}" style="background:#d4af37;color:#0a1932;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:14px;display:inline-block;">
            Voir ma page de check-in
          </a>
        </td></tr>

        ${buildShareBlock(registration)}

        <!-- ═══ FOOTER ═══ -->
        <tr><td style="background:#0a1932;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 6px;color:#d4af37;font-size:12px;font-weight:600;">${FORUM_NAME}</p>
          <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;">${FORUM_DATE} · ${FORUM_LOCATION}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  const badgeFileName = `badge-${registration.first_name.toLowerCase()}-${registration.last_name.toLowerCase()}-forum-djibouti.pdf`

  return resend.emails.send({
    from: FROM_EMAIL,
    to: registration.email,
    subject: `🎟️ Votre badge & programme — ${FORUM_NAME}`,
    html,
    attachments: [
      {
        filename: badgeFileName,
        content: pdfBuffer,
      },
      {
        filename: 'programme-forum-djibouti.pdf',
        content: programBuffer,
      },
    ],
  })
}

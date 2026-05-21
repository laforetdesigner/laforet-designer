/**
 * Vercel Serverless Function — Formulaire de contact
 * POST /api/contact
 * → Sauvegarde dans Notion + notification email via Resend
 */

export default async function handler(req, res) {
  // CORS pour le même domaine + dev local
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' })

  const { projectType, name, email, company, phone, message, budget, deadline } = req.body ?? {}

  // Validation basique
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Champs requis manquants (nom, email, message)' })
  }

  const projectLabels = {
    branding:             'Branding',
    'com-360':            'COM 360',
    'solutions-digitales': 'Solutions Digitales',
    coaching:             'Coaching / Formation',
  }
  const projectLabel = projectLabels[projectType] ?? projectType ?? 'Non précisé'
  const today = new Date().toISOString().split('T')[0]

  const errs = []

  // ── 1. Notion ────────────────────────────────────────────────────────────────
  if (process.env.NOTION_API_KEY && process.env.NOTION_DATABASE_ID) {
    try {
      const notionRes = await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          Authorization:    `Bearer ${process.env.NOTION_API_KEY}`,
          'Content-Type':   'application/json',
          'Notion-Version': '2022-06-28',
        },
        body: JSON.stringify({
          parent: { database_id: process.env.NOTION_DATABASE_ID },
          properties: {
            'Nom':              { title:     [{ text: { content: name } }] },
            'Email':            { email:     email },
            'Entreprise':       { rich_text: [{ text: { content: company  || '' } }] },
            'Téléphone':        { rich_text: [{ text: { content: phone    || '' } }] },
            'Type de projet':   { select:    { name: projectLabel } },
            'Budget':           { rich_text: [{ text: { content: budget   || '' } }] },
            'Délai':            { rich_text: [{ text: { content: deadline || '' } }] },
            'Message':          { rich_text: [{ text: { content: message  } }] },
            'Date':             { date:      { start: today } },
            'Statut':           { select:    { name: 'Nouveau' } },
          },
        }),
      })
      if (!notionRes.ok) {
        const body = await notionRes.text()
        errs.push(`Notion: ${notionRes.status} — ${body}`)
      }
    } catch (e) {
      errs.push(`Notion exception: ${e.message}`)
    }
  }

  // ── 2. Email via Resend ───────────────────────────────────────────────────────
  if (process.env.RESEND_API_KEY) {
    try {
      const to = process.env.NOTIFICATION_EMAIL || 'laforet.designer@gmail.com'
      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization:  `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:    process.env.RESEND_FROM || 'Laforet Designer <onboarding@resend.dev>',
          to:      [to],
          subject: `🎯 Nouveau contact : ${name} — ${projectLabel}`,
          html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;background:#f9f9f9;padding:32px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e8e8e8;">
    <div style="background:#0A0A0A;padding:24px 32px;">
      <h1 style="color:#fff;font-size:20px;margin:0;">Nouveau contact — Laforet Designer</h1>
      <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:8px 0 0;">${today}</p>
    </div>
    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr style="background:#f9f9f9;">
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-weight:bold;font-size:13px;width:160px;">Nom</td>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-size:13px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-weight:bold;font-size:13px;">Email</td>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-size:13px;"><a href="mailto:${email}" style="color:#1E40AF;">${email}</a></td>
        </tr>
        <tr style="background:#f9f9f9;">
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-weight:bold;font-size:13px;">Entreprise</td>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-size:13px;">${company || '—'}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-weight:bold;font-size:13px;">Téléphone</td>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-size:13px;">${phone || '—'}</td>
        </tr>
        <tr style="background:#f9f9f9;">
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-weight:bold;font-size:13px;">Type de projet</td>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-size:13px;">
            <span style="background:#1E40AF;color:#fff;padding:2px 10px;border-radius:3px;font-size:12px;">${projectLabel}</span>
          </td>
        </tr>
        <tr>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-weight:bold;font-size:13px;">Budget</td>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-size:13px;">${budget || '—'}</td>
        </tr>
        <tr style="background:#f9f9f9;">
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-weight:bold;font-size:13px;">Délai</td>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-size:13px;">${deadline || '—'}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-weight:bold;font-size:13px;vertical-align:top;">Message</td>
          <td style="padding:10px 14px;border:1px solid #e8e8e8;font-size:13px;line-height:1.6;">${message.replace(/\n/g, '<br>')}</td>
        </tr>
      </table>
      <div style="margin-top:24px;text-align:center;">
        <a href="mailto:${email}?subject=Re: Votre demande Laforet Designer"
           style="background:#0A0A0A;color:#fff;padding:12px 24px;text-decoration:none;font-size:13px;font-weight:bold;display:inline-block;">
          Répondre à ${name} →
        </a>
      </div>
    </div>
    <div style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #e8e8e8;">
      <p style="font-size:11px;color:#aaa;margin:0;">Laforet Designer — laforetdesigner.com</p>
    </div>
  </div>
</body>
</html>`,
        }),
      })
      if (!emailRes.ok) {
        const body = await emailRes.text()
        errs.push(`Resend: ${emailRes.status} — ${body}`)
      }
    } catch (e) {
      errs.push(`Resend exception: ${e.message}`)
    }
  }

  // Succès même si notifications ont échoué (formulaire enregistré dans Notion)
  return res.status(200).json({
    success: true,
    ...(errs.length > 0 && { warnings: errs }),
  })
}

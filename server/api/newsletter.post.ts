import { db } from '../db'
import { subscribers } from '../db/schema'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = body?.email?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  const existing = await db.select().from(subscribers).where(eq(subscribers.email, email))

  if (existing.length > 0) {
    return { success: false, message: 'already_subscribed' }
  }

  await db.insert(subscribers).values({ email })

  const { data, error } = await resend.emails.send({
    from: 'Nicolas Harter <newsletter@nicolasharter.fr>',
    to: email,
    subject: "Vous perdez de l'argent chaque mois. Voici comment y remédier.",
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 560px; margin: 0 auto; padding: 40px 24px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="display: inline-block; background-color: #ecfdf5; border: 1px solid #bbf7d0; border-radius: 999px; padding: 6px 16px; font-size: 13px; font-weight: 600; color: #16a34a;">
        Bienvenue dans la newsletter
      </div>
    </div>

    <!-- Card -->
    <div style="background-color: #ffffff; border-radius: 16px; padding: 40px 32px; border: 1px solid #e2e8f0;">

      <h1 style="font-size: 26px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0; line-height: 1.3;">
        Salut, et merci d'avoir rejoint l'aventure.
      </h1>

      <div style="width: 48px; height: 3px; background-color: #22c55e; border-radius: 2px; margin: 16px 0 24px 0;"></div>

      <p style="font-size: 16px; line-height: 1.7; color: #475569; margin: 0 0 16px 0;">
        Je m'appelle Nicolas. Je suis dev freelance en regie, et il y a quelques annees j'etais salarie en ESN comme vous peut-etre.
      </p>

      <p style="font-size: 16px; line-height: 1.7; color: #475569; margin: 0 0 16px 0;">
        Le jour ou j'ai compris combien mon ESN facturait au client vs ce que je touchais, j'ai commence a poser les bonnes questions. Aujourd'hui, <strong style="color: #0f172a;">je gagne plus, je travaille mieux, et je construis un vrai patrimoine.</strong>
      </p>

      <p style="font-size: 16px; line-height: 1.7; color: #475569; margin: 0 0 24px 0;">
        Chaque semaine, je partage dans cette newsletter :
      </p>

      <!-- Bullet points -->
      <table role="presentation" style="width: 100%; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 28px;">
            <div style="width: 20px; height: 20px; background-color: #dcfce7; border-radius: 50%; text-align: center; line-height: 20px; font-size: 12px;">&#10003;</div>
          </td>
          <td style="padding: 8px 0; font-size: 15px; line-height: 1.6; color: #475569;">
            <strong style="color: #0f172a;">Comment trouver des missions</strong> — sans passer par une ESN qui prend 40%
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 28px;">
            <div style="width: 20px; height: 20px; background-color: #dcfce7; border-radius: 50%; text-align: center; line-height: 20px; font-size: 12px;">&#10003;</div>
          </td>
          <td style="padding: 8px 0; font-size: 15px; line-height: 1.6; color: #475569;">
            <strong style="color: #0f172a;">Comment negocier son TJM</strong> — les vrais leviers que personne ne vous dit
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 28px;">
            <div style="width: 20px; height: 20px; background-color: #dcfce7; border-radius: 50%; text-align: center; line-height: 20px; font-size: 12px;">&#10003;</div>
          </td>
          <td style="padding: 8px 0; font-size: 15px; line-height: 1.6; color: #475569;">
            <strong style="color: #0f172a;">Comment optimiser fiscalement</strong> — statut, charges, investissement
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; vertical-align: top; width: 28px;">
            <div style="width: 20px; height: 20px; background-color: #dcfce7; border-radius: 50%; text-align: center; line-height: 20px; font-size: 12px;">&#10003;</div>
          </td>
          <td style="padding: 8px 0; font-size: 15px; line-height: 1.6; color: #475569;">
            <strong style="color: #0f172a;">Comment proteger votre retraite</strong> — parce que le salariat en ESN ne le fera pas pour vous
          </td>
        </tr>
      </table>

      <!-- Highlight box -->
      <div style="background-color: #f0fdf4; border-left: 3px solid #22c55e; border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 24px;">
        <p style="font-size: 15px; line-height: 1.6; color: #166534; margin: 0; font-weight: 500;">
          Le premier email arrive des la semaine prochaine. En attendant, vous pouvez jouer avec le simulateur ESN vs Freelance sur mon site pour voir combien vous laissez sur la table.
        </p>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 24px;">
        <a href="https://nicolasharter.fr/newsletter" style="display: inline-block; background-color: #22c55e; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 12px;">
          Voir le simulateur
        </a>
      </div>

      <p style="font-size: 16px; line-height: 1.7; color: #475569; margin: 0 0 4px 0;">
        A tres vite,
      </p>
      <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0;">
        Nicolas
      </p>

    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px; padding: 0 16px;">
      <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin: 0;">
        Vous recevez cet email car vous vous etes inscrit sur nicolasharter.fr<br />
        <a href="https://nicolasharter.fr" style="color: #64748b; text-decoration: underline;">nicolasharter.fr</a>
      </p>
    </div>

  </div>
</body>
</html>
    `,
  })

  if (error) {
    console.error('[Newsletter] Failed to send welcome email to', email, error)
  } else {
    console.log('[Newsletter] Welcome email sent to', email, '- id:', data?.id)
  }

  return { success: true, message: 'subscribed' }
})

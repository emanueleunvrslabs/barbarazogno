import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

interface ResetPasswordRequest {
  email: string
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    )

    const body: ResetPasswordRequest = await req.json()
    const { email } = body

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email obbligatoria' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user exists (but don't reveal this info to prevent email enumeration)
    const { data: userData } = await supabaseAdmin.auth.admin.listUsers()
    const userExists = userData?.users?.some(u => u.email?.toLowerCase() === email.trim().toLowerCase())

    // For security, we always return success even if email doesn't exist
    if (!userExists) {
      console.log('User not found, returning success for security')
      return new Response(
        JSON.stringify({ success: true, message: 'Se l\'email è registrata, riceverai un link di recupero.' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate password reset link
    const siteUrl = 'https://33348e92-4913-4638-b2b0-acc71eff9392.lovableproject.com'
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email: email.trim(),
      options: {
        redirectTo: `${siteUrl}/reset-password`,
      },
    })

    if (linkError) {
      console.error('Link generation error:', linkError)
      return new Response(
        JSON.stringify({ error: 'Errore nella generazione del link' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send password reset email with Resend
    if (linkData?.properties?.action_link) {
      try {
        await resend.emails.send({
          from: 'LexAI <noreply@unvrslabs.dev>',
          to: [email.trim()],
          subject: 'Reimposta la tua password - LexAI',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1a1a2e; text-align: center;">Reimposta la tua password</h1>
              <p style="color: #333; font-size: 16px;">Ciao,</p>
              <p style="color: #333; font-size: 16px;">Hai richiesto di reimpostare la password del tuo account LexAI. Clicca sul pulsante qui sotto per creare una nuova password:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${linkData.properties.action_link}" style="background-color: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reimposta Password</a>
              </div>
              <p style="color: #666; font-size: 14px;">Questo link scadrà tra 1 ora.</p>
              <p style="color: #666; font-size: 14px;">Se non hai richiesto tu il reset della password, puoi ignorare questa email. Il tuo account rimarrà sicuro.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="color: #999; font-size: 12px; text-align: center;">© 2024 LexAI - Gestionale per Studi Legali</p>
            </div>
          `,
        })
        console.log('Password reset email sent successfully')
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        return new Response(
          JSON.stringify({ error: 'Errore nell\'invio dell\'email' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Se l\'email è registrata, riceverai un link di recupero.' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Reset password error:', error)
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

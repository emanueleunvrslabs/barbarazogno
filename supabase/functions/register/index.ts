import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Resend } from 'https://esm.sh/resend@2.0.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  mode: 'create' | 'join'
  // For create mode
  studioName?: string
  studioPIVA?: string
  studioAddress?: string
  studioPhone?: string
  studioEmail?: string
  // For join mode
  inviteCode?: string
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

    const body: RegisterRequest = await req.json()
    const { email, password, firstName, lastName, phone, mode } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !mode) {
      return new Response(
        JSON.stringify({ error: 'Campi obbligatori mancanti' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let studioId: string | null = null

    // If joining, verify invite code first
    if (mode === 'join') {
      if (!body.inviteCode) {
        return new Response(
          JSON.stringify({ error: 'Codice invito obbligatorio' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      const { data: studioData, error: studioError } = await supabaseAdmin
        .from('studios')
        .select('id')
        .eq('invite_code', body.inviteCode.trim().toLowerCase())
        .single()

      if (studioError || !studioData) {
        return new Response(
          JSON.stringify({ error: 'Codice invito non valido' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      studioId = studioData.id
    }

    // Validate studio name for create mode
    if (mode === 'create' && !body.studioName) {
      return new Response(
        JSON.stringify({ error: 'Nome studio obbligatorio' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create user - email confirmation required
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email.trim(),
      password,
      email_confirm: false, // User must confirm via email link
    })

    if (authError) {
      console.error('Auth error:', authError)
      const errorMessage = authError.message.includes('already been registered')
        ? 'Questa email è già registrata. Prova ad accedere o usa un\'altra email.'
        : authError.message
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!authData.user) {
      return new Response(
        JSON.stringify({ error: 'Errore nella creazione dell\'account' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const userId = authData.user.id

    // If creating new studio
    if (mode === 'create') {
      const { data: newStudio, error: studioCreateError } = await supabaseAdmin
        .from('studios')
        .insert({
          name: body.studioName!.trim(),
          p_iva: body.studioPIVA?.trim() || null,
          address: body.studioAddress?.trim() || null,
          phone: body.studioPhone?.trim() || null,
          email: body.studioEmail?.trim() || null,
        })
        .select()
        .single()

      if (studioCreateError) {
        console.error('Studio create error:', studioCreateError)
        // Rollback: delete user
        await supabaseAdmin.auth.admin.deleteUser(userId)
        return new Response(
          JSON.stringify({ error: 'Errore nella creazione dello studio' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      studioId = newStudio.id

      // Create owner role
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: userId,
          studio_id: studioId,
          role: 'owner',
        })

      if (roleError) {
        console.error('Role error:', roleError)
      }
    } else if (mode === 'join' && studioId) {
      // Create member role
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: userId,
          studio_id: studioId,
          role: 'member',
        })

      if (roleError) {
        console.error('Role error:', roleError)
      }
    }

    // Create profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        user_id: userId,
        studio_id: studioId,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone?.trim() || null,
      })

    if (profileError) {
      console.error('Profile error:', profileError)
    }

    // Generate confirmation link with redirect to login with email pre-filled
    const siteUrl = 'https://33348e92-4913-4638-b2b0-acc71eff9392.lovableproject.com'
    const encodedEmail = encodeURIComponent(email.trim())
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'signup',
      email: email.trim(),
      password,
      options: {
        redirectTo: `${siteUrl}/login?confirmed=true&email=${encodedEmail}`,
      },
    })

    if (linkError) {
      console.error('Link generation error:', linkError)
    }

    // Send confirmation email with Resend
    if (linkData?.properties?.action_link) {
      try {
        await resend.emails.send({
          from: 'LexAI <noreply@unvrslabs.dev>',
          to: [email.trim()],
          subject: 'Conferma il tuo account LexAI',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #1a1a2e; text-align: center;">Benvenuto in LexAI!</h1>
              <p style="color: #333; font-size: 16px;">Ciao ${firstName},</p>
              <p style="color: #333; font-size: 16px;">Grazie per esserti registrato. Per completare la registrazione e attivare il tuo account, clicca sul pulsante qui sotto:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${linkData.properties.action_link}" style="background-color: #7c3aed; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Conferma Email</a>
              </div>
              <p style="color: #666; font-size: 14px;">Se non hai creato questo account, puoi ignorare questa email.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              <p style="color: #999; font-size: 12px; text-align: center;">© 2024 LexAI - Gestionale per Studi Legali</p>
            </div>
          `,
        })
        console.log('Confirmation email sent successfully')
      } catch (emailError) {
        console.error('Email sending error:', emailError)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Account creato con successo. Controlla la tua email per confermare l\'account.',
        userId 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

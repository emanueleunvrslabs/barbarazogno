import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VALID_PRICE_IDS = [
  "price_1T27NDKMHtAMmeThxNdmxyCw", // Quick Legal Call
  "price_1T27O7KMHtAMmeThuD6hp43P", // Consulenza Standard
  "price_1T27OKKMHtAMmeThnlGUrf4O", // Pacchetto Base
  "price_1T27OYKMHtAMmeThk2fPgjpL", // Pacchetto Growth
  "price_1T27PEKMHtAMmeThBhpgiYUM", // Pacchetto Strategic
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { priceId } = await req.json();
    if (!priceId) throw new Error("priceId is required");
    if (!VALID_PRICE_IDS.includes(priceId)) throw new Error("Invalid price ID");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const origin = req.headers.get("origin") || "https://barbarazogno.lovable.app";

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      phone_number_collection: { enabled: true },
      custom_fields: [
        {
          key: "full_name",
          label: { type: "custom", custom: "Nome e Cognome" },
          type: "text",
        },
      ],
      success_url: `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      metadata: {
        type: "consultation",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error creating consultation checkout:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId } = await req.json();
    if (!sessionId) throw new Error("sessionId is required");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Verify payment was completed
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    const contractId = session.metadata?.contract_id;
    if (!contractId) throw new Error("No contract associated with this session");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Fetch the contract to get file_url
    const { data: contract, error: contractError } = await supabaseClient
      .from("contract_templates")
      .select("*")
      .eq("id", contractId)
      .single();

    if (contractError || !contract) throw new Error("Contract not found");
    if (!contract.file_url) throw new Error("No file available for this contract");

    // Build download URL - files are served from the public site
    const origin = req.headers.get("origin") || "https://barbarazogno.lovable.app";
    const downloadUrl = `${origin}${contract.file_url}`;

    // Record the download (ignore conflict if already recorded)
    await supabaseClient.from("contract_downloads").upsert({
      contract_id: contractId,
      stripe_session_id: sessionId,
      downloaded_at: new Date().toISOString(),
    }, { onConflict: "stripe_session_id" });

    // Record the purchase
    await supabaseClient.from("contract_purchases").upsert({
      contract_id: contractId,
      studio_id: contract.studio_id,
      buyer_name: session.customer_details?.name || session.custom_fields?.find((f: any) => f.key === "full_name")?.text?.value || "Guest",
      buyer_email: session.customer_details?.email || "",
      buyer_phone: session.customer_details?.phone || null,
      amount: (session.amount_total || 0) / 100,
      status: "completed",
      stripe_session_id: sessionId,
      stripe_payment_intent_id: session.payment_intent as string,
    }, {
      onConflict: "stripe_session_id",
    });

    return new Response(JSON.stringify({ 
      downloadUrl,
      contractName: contract.name 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error generating download:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

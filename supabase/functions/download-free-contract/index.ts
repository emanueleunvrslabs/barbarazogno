import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    const { contractId, email, name } = await req.json();
    
    if (!contractId) throw new Error("contractId is required");
    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw new Error("A valid email is required");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Fetch the contract
    const { data: contract, error: contractError } = await supabaseClient
      .from("contract_templates")
      .select("*")
      .eq("id", contractId)
      .single();

    if (contractError || !contract) throw new Error("Contract not found");
    if (contract.price > 0) throw new Error("This contract is not free");
    if (!contract.file_url) throw new Error("No file available for this contract");

    // Record the "purchase" (lead capture)
    await supabaseClient.from("contract_purchases").insert({
      contract_id: contractId,
      studio_id: contract.studio_id,
      buyer_name: name?.trim() || "Guest",
      buyer_email: email.trim(),
      amount: 0,
      status: "completed",
    });

    const origin = req.headers.get("origin") || "https://barbarazogno.lovable.app";
    const downloadUrl = `${origin}${contract.file_url}`;

    return new Response(JSON.stringify({ downloadUrl, contractName: contract.name }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});


# Integrazione Contratti Reali con Pagamento Stripe

## Panoramica
Sostituire i 6 contratti placeholder con contratti reali (partendo dal "Reseller Agreement + EULA + SLA") e implementare il flusso di acquisto tramite Stripe checkout. L'utente vede una preview (PDF data sheet), paga con Stripe, e riceve il file originale (DOCX) da scaricare.

## Flusso Utente

```text
Card contratto --> Click "Acquista" --> Stripe Checkout --> Pagamento --> Pagina di successo --> Download file DOCX
```

## Step di Implementazione

### Step 1 - Abilitare Stripe
Attivare l'integrazione Stripe nel progetto. Servira la tua chiave segreta Stripe.

### Step 2 - Storage dei file
- Caricare il PDF preview e il DOCX originale su Supabase Storage
- Creare un bucket `contract-previews` (pubblico) per i PDF di anteprima
- Creare un bucket `contract-files` (privato) per i DOCX scaricabili dopo il pagamento

### Step 3 - Database
Utilizzare la tabella `contract_templates` gia esistente, aggiungendo eventuali colonne necessarie:
- `preview_url` - link al PDF di anteprima
- `file_url` - link al file DOCX originale (gia presente)
- `stripe_price_id` - ID del prezzo Stripe associato

### Step 4 - Edge Function per Stripe Checkout
Creare una edge function `create-contract-checkout` che:
- Riceve l'ID del contratto
- Crea una sessione Stripe Checkout con il prezzo corretto
- Restituisce l'URL di checkout al frontend

### Step 5 - Edge Function per il Download
Creare una edge function `download-contract` che:
- Verifica che il pagamento sia stato completato (tramite session ID)
- Genera un URL firmato temporaneo per il download del DOCX
- Registra l'acquisto nella tabella `contract_purchases`

### Step 6 - Webhook Stripe
Edge function `stripe-webhook` per ricevere conferma pagamento e aggiornare lo stato dell'acquisto.

### Step 7 - Aggiornare il Frontend
- Rimuovere i 6 contratti hardcoded dalla `ContractTemplatesSection`
- Caricare i contratti dal database (tabella `contract_templates`)
- Click su "Acquista" apre una modale con preview PDF + bottone per andare a Stripe Checkout
- Creare una pagina `/checkout-success` per il download post-pagamento
- Click su "Anteprima" mostra il PDF data sheet

### Step 8 - Primo contratto reale
Inserire il "Reseller Agreement + EULA + SLA" come primo contratto:
- Prezzo: EUR 299
- Categoria: International / IoT
- 20 pagine, include EULA + SLA
- Upload dei file (PDF preview + DOCX originale) su Supabase Storage

## Dettagli Tecnici

### Struttura file
- `supabase/functions/create-contract-checkout/index.ts` - crea sessione Stripe
- `supabase/functions/stripe-contract-webhook/index.ts` - gestisce webhook
- `supabase/functions/download-contract/index.ts` - genera link download
- `src/pages/CheckoutSuccess.tsx` - pagina post-pagamento con download
- `src/components/landing/ContractPreviewModal.tsx` - modale anteprima PDF

### Sicurezza
- I file DOCX originali sono in un bucket privato, accessibili solo tramite URL firmati generati dalla edge function dopo verifica del pagamento
- I PDF di anteprima sono in un bucket pubblico per la visualizzazione
- RLS policies sulla tabella `contract_purchases` per tracciare gli acquisti

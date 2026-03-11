

# Mutual NDA Gratuito con Checkout Stripe a €0

## Problema

Stripe Checkout in modalita `payment` richiede un importo minimo di €0.50. Non e possibile creare una sessione di checkout con prezzo zero.

## Soluzione proposta

Dato che l'obiettivo e raccogliere l'email del cliente prima del download, propongo un **dialog di raccolta email** integrato nel sito (senza passare da Stripe). Il flusso:

1. Il contratto NDA appare nella sezione contratti con prezzo "Gratuito" e pulsante "Scarica Gratis"
2. Click → si apre un dialog che chiede **email** (obbligatoria) e **nome** (opzionale)
3. L'email viene salvata nella tabella `contract_purchases` (con amount = 0, status = "completed")
4. Download immediato del file DOCX

Tu vedrai tutte le email nella dashboard, esattamente come per i contratti a pagamento.

## Modifiche tecniche

### 1. File: copiare il DOCX nella cartella pubblica
- `public/contracts/Mutual_NDA_Template.docx`

### 2. Database: inserire il contratto nella tabella `contract_templates`
- Prezzo: 0, nessun `stripe_price_id`
- Categoria: "NDA / Riservatezza"
- Features: protezione bilaterale, definizioni chiare, clausole standard internazionali

### 3. Frontend: `ContractTemplatesSection.tsx`
- Per i contratti con `price === 0`: mostrare "Gratuito" invece del prezzo e "Scarica Gratis" invece di "Acquista ora"
- Al click, aprire un dialog con campo email (obbligatorio) e nome (opzionale)
- Dopo submit: salvare nella tabella `contract_purchases` via edge function, poi avviare il download

### 4. Edge Function: `download-free-contract/index.ts`
- Riceve `contractId`, `email`, `name`
- Salva il record in `contract_purchases` (amount = 0, status = "completed")
- Restituisce l'URL di download

### 5. Traduzioni
- Aggiungere chiavi per "Gratuito", "Scarica Gratis", "Inserisci la tua email per scaricare"

## Risultato

Il flusso diventa: **click "Scarica Gratis" → inserisci email → download immediato**. Tu ricevi l'email del cliente nella dashboard come per tutti gli altri contratti.


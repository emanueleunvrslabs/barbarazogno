

# Piano: Sezione Consulenze con Pagamento Anticipato via Stripe

## Cosa faremo

Sostituiremo l'attuale sezione Pricing generica con le 5 offerte di consulenza specifiche dal documento PRICING.docx. Ogni consulenza dovra essere pagata prima tramite Stripe Checkout.

## Le 5 offerte

| # | Nome | Durata | Prezzo | Prezzo originale |
|---|------|--------|--------|-----------------|
| 1 | Quick Legal Call | 30 min | 150 EUR | - |
| 2 | Consulenza Standard | 1 ora | 250 EUR | - |
| 3 | Pacchetto Base | 2 ore | 400 EUR | 500 EUR |
| 4 | Pacchetto Growth | 5 ore | 900 EUR | 1.250 EUR |
| 5 | Pacchetto Strategic | 10 ore | 1.500 EUR | 2.500 EUR |

## Passaggi

### 1. Creare 5 prodotti e prezzi su Stripe
Creeremo un prodotto Stripe con relativo prezzo per ciascuna delle 5 consulenze.

### 2. Creare edge function `create-consultation-checkout`
Una nuova edge function che:
- Riceve il `price_id` dal frontend
- Crea una sessione Stripe Checkout in modalita `payment` (pagamento unico)
- Supporta checkout senza login (guest): l'utente inserisce la sua email direttamente su Stripe
- Redirige alla pagina di successo dopo il pagamento

### 3. Riprogettare la sezione Pricing
Sostituire le 3 card generiche attuali con un layout a 2 gruppi:

**Consulenze Singole** (2 card affiancate):
- Quick Legal Call (30 min, 150 EUR)
- Consulenza Standard (1 ora, 250 EUR, con badge "include follow-up scritto")

**Pacchetti Ore Prepagati** (3 card affiancate):
- Base (2h, 400 EUR, barrato 500 EUR)
- Growth (5h, 900 EUR, barrato 1.250 EUR) - evidenziato come piu popolare
- Strategic (10h, 1.500 EUR, barrato 2.500 EUR)

Ogni card avra un pulsante "Acquista ora" che apre Stripe Checkout.

Sotto le card, sezione "Cosa e incluso" e "Non incluso" dal documento.

### 4. Aggiungere testi multilingua
Aggiornare il LanguageContext con le traduzioni IT/EN per tutti i nuovi testi della sezione.

### 5. Pagina di successo
Riutilizzare o adattare la pagina `CheckoutSuccess` gia esistente per confermare l'avvenuto pagamento della consulenza.

---

### Dettagli tecnici

**Edge function `create-consultation-checkout`:**
- Importa Stripe SDK
- Accetta `priceId` nel body della richiesta
- Crea sessione checkout con `mode: "payment"`
- Non richiede autenticazione (guest checkout supportato)
- Utilizza `STRIPE_SECRET_KEY` gia configurato nei secrets

**Modifiche file:**
- `src/components/landing/PricingSection.tsx` - riscrittura completa con le 5 offerte
- `src/contexts/LanguageContext.tsx` - nuove chiavi di traduzione
- `supabase/functions/create-consultation-checkout/index.ts` - nuova edge function
- `src/pages/Index.tsx` - nessuna modifica necessaria (PricingSection gia incluso)


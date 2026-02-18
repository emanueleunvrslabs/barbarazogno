

# Semplificare il flusso: raccolta dati direttamente in Stripe

## Cosa cambia

Rimuoviamo il dialog che chiede nome e WhatsApp prima del pagamento. Stripe Checkout raccoglie gia tutto:
- **Nome**: campo nativo di Stripe
- **Email**: campo nativo di Stripe  
- **Telefono/WhatsApp**: tramite `phone_number_collection` (gia attivo)

Il cliente cliccera "Acquista ora" e andra direttamente al checkout Stripe, dove inserira tutti i suoi dati in un unico passaggio.

## Modifiche

### 1. Frontend - PricingSection.tsx
- Rimuovere il `Dialog` pre-checkout con i campi nome e WhatsApp
- Il pulsante "Acquista ora" chiamera direttamente l'edge function senza passaggi intermedi
- Rimuovere gli state `showWhatsAppDialog`, `customerName`, `customerWhatsApp`

### 2. Edge Function - create-consultation-checkout
- Rimuovere i parametri `customerName` e `customerWhatsApp` dal body
- Mantenere `phone_number_collection: { enabled: true }` (gia presente)
- Semplificare i metadata rimuovendo i campi che ora Stripe raccoglie nativamente

### 3. Traduzioni - LanguageContext.tsx
- Rimuovere le chiavi di traduzione non piu necessarie (`pricing.contactInfoTitle`, `pricing.yourName`, ecc.)

## Risultato

Il flusso diventa: **click "Acquista ora" -> Stripe Checkout (nome, email, telefono, pagamento) -> pagina di successo**

L'avvocato trovera nome, email e telefono del cliente direttamente nella notifica Stripe e nel dashboard Stripe, sotto "Customer details".

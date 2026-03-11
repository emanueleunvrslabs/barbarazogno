

# Fix del flusso di consegna contratti

## Problema
Le edge function `download-contract` e `download-free-contract` generano signed URL dal bucket privato `contract-files`, ma:
1. I `file_url` nel DB potrebbero ancora avere il prefisso `/contracts/` invece dei soli nomi file
2. I file DOCX devono essere presenti nel bucket `contract-files`

## Modifiche

### 1. Migrazione DB: normalizzare file_url
Eseguire un UPDATE che rimuove il prefisso `/contracts/` se ancora presente, per tutti i record:
```sql
UPDATE contract_templates 
SET file_url = regexp_replace(file_url, '^/contracts/', '')
WHERE file_url LIKE '/contracts/%';
```

### 2. Edge function `download-contract`: gestire entrambi i formati
Aggiungere un fallback che rimuove `/contracts/` dal path prima di cercare nel bucket, in caso la migrazione non sia ancora applicata.

### 3. Edge function `download-free-contract`: stesso fix

### 4. Azione manuale richiesta
L'utente deve caricare tutti i file DOCX nel bucket `contract-files` su Supabase Storage. Senza questo, il download non funzionerà.

## Risultato
Dopo queste modifiche + upload dei file nel bucket, il flusso sarà:
- Pagamento → Stripe → redirect a checkout-success → download automatico via signed URL (5 min expiry)
- Gratuito → email dialog → download immediato via signed URL


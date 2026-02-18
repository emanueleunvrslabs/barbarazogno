INSERT INTO public.contract_templates (
  studio_id, name, name_en, description, description_en, category, category_en,
  price, original_price, features, features_en, is_bestseller, color,
  preview_url, file_url, stripe_price_id, display_order, is_active, page_count
) VALUES (
  (SELECT id FROM public.studios LIMIT 1),
  'Reseller Agreement + EULA + SLA',
  'Reseller Agreement + EULA + SLA',
  'Contratto completo per la distribuzione e rivendita di prodotti/servizi, include EULA e SLA integrati.',
  'Complete agreement for product/service distribution and resale, includes integrated EULA and SLA.',
  'Distribuzione / IoT',
  'Distribution / IoT',
  299,
  399,
  ARRAY['Accordo di rivendita completo', 'EULA integrato', 'SLA con livelli di servizio', 'Clausole di proprietà intellettuale'],
  ARRAY['Complete reseller agreement', 'Integrated EULA', 'SLA with service levels', 'IP protection clauses'],
  true,
  'from-emerald-500 to-teal-600',
  '/contracts/RESELLER_AGREEMENT_EULA_DATA_SHEET.pdf',
  '/contracts/RESELLER_AGREEMENT_EULA_SLA.docx',
  'price_1T27H2KMHtAMmeThM6RJiyii',
  3,
  true,
  20
);

-- Create the default studio
INSERT INTO public.studios (id, name, slug, description)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Zogno & Partners',
  'zogno-partners',
  'International legal boutique specializing in commercial contracts and corporate law'
);

-- Insert Development and Supply Agreement
INSERT INTO public.contract_templates (
  studio_id, name, name_en, description, description_en, 
  price, original_price, category, category_en,
  features, features_en,
  stripe_price_id, page_count, is_bestseller, display_order, is_active, color,
  preview_url, file_url
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Development and Purchase Agreement + SOW',
  'Development and Purchase Agreement + SOW',
  'Accordo per lo sviluppo di prodotti personalizzati e il successivo acquisto dopo completamento dello sviluppo, test e approvazione per la produzione in serie.',
  'Agreement for the development of customized products and subsequent supply after completion of development, testing and approval for mass production.',
  299, NULL,
  'Commerciale', 'Commercial',
  ARRAY['Servizi di sviluppo e milestone', 'Proprietà intellettuale', 'Ordini, consegna e rischio', 'Garanzie e responsabilità', 'Conformità normativa', 'Template SOW incluso'],
  ARRAY['Development services & milestones', 'Intellectual property rights', 'Order, delivery & risk allocation', 'Warranties & liability', 'Compliance obligations', 'SOW Template included'],
  'price_1T26zIKMHtAMmeThRwNV1yBp',
  20, false, 1, true,
  'from-blue-500 to-cyan-600',
  '/contracts/Development_and_Supply_DATA_SHEET.pdf',
  '/contracts/Development_and_Supply_Agreement_Template.docx'
);

-- Insert EULA
INSERT INTO public.contract_templates (
  studio_id, name, name_en, description, description_en, 
  price, original_price, category, category_en,
  features, features_en,
  stripe_price_id, page_count, is_bestseller, display_order, is_active, color,
  preview_url, file_url
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'End User License Agreement (EULA)',
  'End User License Agreement (EULA)',
  'Contratto tra sviluppatore software e utente finale. Definisce come il software può essere usato, diritti e restrizioni.',
  'Legal contract between software developer and end-user. Defines software usage rights and restrictions.',
  18, NULL,
  'Software & IT', 'Software & IT',
  ARRAY['Termini di licenza', 'Proprietà intellettuale', 'Esclusione garanzie', 'Limitazione responsabilità', 'Controlli export'],
  ARRAY['Licensing terms & restrictions', 'Intellectual property rights', 'Warranty disclaimer', 'Limitation of liability', 'Export control restrictions'],
  NULL,
  4, false, 2, true,
  'from-violet-500 to-purple-600',
  '/contracts/EULA_DATA_SHEET.pdf',
  '/contracts/EULA_End_User_License_Agreement.docx'
);

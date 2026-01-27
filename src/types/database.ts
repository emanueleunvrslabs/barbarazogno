// Custom types for new tables (extending the auto-generated types)

export type ConsultationStatus = 'new' | 'in_progress' | 'completed' | 'archived';

export interface ConsultationRequest {
  id: string;
  studio_id: string;
  lawyer_id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  service_type: string;
  message: string | null;
  status: ConsultationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContractTemplate {
  id: string;
  studio_id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  file_url: string | null;
  is_bestseller: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContractPurchase {
  id: string;
  contract_id: string;
  studio_id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string | null;
  amount: number;
  status: string;
  created_at: string;
  contract?: ContractTemplate;
}

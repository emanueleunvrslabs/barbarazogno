import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Mail, 
  Phone,
  Euro,
  CheckCircle,
  Clock,
  XCircle,
  FileText
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import type { ContractPurchase } from "@/types/database";

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  pending: { label: "In attesa", icon: Clock, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  completed: { label: "Completato", icon: CheckCircle, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  refunded: { label: "Rimborsato", icon: XCircle, color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export function ContractPurchasesSection() {
  const { studio } = useAuth();
  const [purchases, setPurchases] = useState<ContractPurchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studio?.id) {
      fetchPurchases();
    }
  }, [studio?.id]);

  const fetchPurchases = async () => {
    if (!studio?.id) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("contract_purchases")
      .select(`
        *,
        contract:contract_templates(name, category)
      `)
      .eq("studio_id", studio.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching purchases:", error);
      toast.error("Errore nel caricamento degli acquisti");
    } else {
      setPurchases((data as unknown as ContractPurchase[]) || []);
    }
    setLoading(false);
  };

  const totalRevenue = purchases
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingCount = purchases.filter(p => p.status === "pending").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-5 rounded-xl liquid-glass-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <span className="text-sm text-muted-foreground">Totale acquisti</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{purchases.length}</p>
        </div>

        <div className="p-5 rounded-xl liquid-glass-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
              <Euro className="w-5 h-5" />
            </div>
            <span className="text-sm text-muted-foreground">Ricavi totali</span>
          </div>
          <p className="text-2xl font-bold text-foreground">€{totalRevenue.toFixed(2)}</p>
        </div>

        <div className="p-5 rounded-xl liquid-glass-card">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-sm text-muted-foreground">In attesa</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
        </div>
      </div>

      {/* Purchases List */}
      {purchases.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nessun acquisto ancora</p>
          <p className="text-sm mt-2">Gli acquisti dei tuoi contratti appariranno qui</p>
        </div>
      ) : (
        <div className="space-y-3">
          {purchases.map((purchase, index) => {
            const config = statusConfig[purchase.status] || statusConfig.pending;
            const Icon = config.icon;
            
            return (
              <motion.div
                key={purchase.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-xl liquid-glass-card"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">
                        {purchase.buyer_name}
                      </h4>
                      <Badge className={`${config.color} border`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <a href={`mailto:${purchase.buyer_email}`} className="flex items-center gap-1 hover:text-foreground transition-colors">
                        <Mail className="w-3 h-3" />
                        {purchase.buyer_email}
                      </a>
                      {purchase.buyer_phone && (
                        <a href={`tel:${purchase.buyer_phone}`} className="flex items-center gap-1 hover:text-foreground transition-colors">
                          <Phone className="w-3 h-3" />
                          {purchase.buyer_phone}
                        </a>
                      )}
                    </div>
                    
                    {purchase.contract && (
                      <div className="flex items-center gap-2 mt-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">
                          {(purchase.contract as { name: string }).name}
                        </span>
                        {(purchase.contract as { category: string | null }).category && (
                          <Badge variant="outline" className="text-xs">
                            {(purchase.contract as { category: string }).category}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        €{purchase.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(purchase.created_at).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

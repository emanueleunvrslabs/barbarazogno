import { motion } from "framer-motion";
import { 
  FileText, 
  ShoppingCart, 
  Eye,
  Check,
  Star,
  Shield,
  Clock,
  Download,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { ContractPreviewModal } from "./ContractPreviewModal";
import { toast } from "sonner";

interface ContractTemplate {
  id: string;
  name: string;
  name_en: string | null;
  description: string | null;
  description_en: string | null;
  category: string | null;
  category_en: string | null;
  price: number;
  original_price: number | null;
  features: string[] | null;
  features_en: string[] | null;
  is_bestseller: boolean;
  color: string | null;
  preview_url: string | null;
  stripe_price_id: string | null;
  page_count: number | null;
}

const ContractCard = ({ 
  contract, 
  index, 
  onPreview, 
  onBuy, 
  buying 
}: { 
  contract: ContractTemplate; 
  index: number;
  onPreview: () => void;
  onBuy: () => void;
  buying: boolean;
}) => {
  const { language, t } = useLanguage();
  
  const title = language === 'en' && contract.name_en ? contract.name_en : contract.name;
  const category = language === 'en' && contract.category_en ? contract.category_en : contract.category;
  const description = language === 'en' && contract.description_en ? contract.description_en : contract.description;
  const features = language === 'en' && contract.features_en ? contract.features_en : contract.features;
  const color = contract.color || "from-primary to-amber-600";
  const discount = contract.original_price 
    ? Math.round((1 - contract.price / contract.original_price) * 100) 
    : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-[320px] group"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div 
        className="relative h-full rounded-xl p-6 liquid-glass-card-sm flex flex-col transition-shadow duration-300 hover:shadow-xl"
        style={{
          background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)'
        }}
      >
        {contract.is_bestseller && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-primary to-amber-500 text-primary-foreground px-3 py-1 flex items-center gap-1 shadow-lg text-xs">
              <Star className="w-3 h-3 fill-current" />
              {t("contracts.mostSold")}
            </Badge>
          </div>
        )}

        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
              <FileText className="w-5 h-5 text-white" />
            </div>
            {category && (
              <Badge variant="outline" className="text-xs">
                {category}
              </Badge>
            )}
          </div>
        <h3 className="text-lg font-bold text-foreground font-serif leading-tight min-h-[56px] flex items-start">
            {title}
          </h3>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground mb-4 min-h-[60px] line-clamp-3">
            {description}
          </p>
        )}

        {features && features.length > 0 && (
          <ul className="space-y-2 mb-6 flex-grow">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="truncate">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-foreground">€{contract.price}</span>
            {contract.original_price && (
              <>
                <span className="text-sm text-muted-foreground line-through">€{contract.original_price}</span>
                <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-400 text-xs ml-auto">
                  -{discount}%
                </Badge>
              </>
            )}
          </div>

          <div className="flex gap-2">
            {contract.preview_url && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={onPreview}
              >
                <Eye className="w-4 h-4" />
                {language === 'en' ? 'Preview' : 'Anteprima'}
              </Button>
            )}
            <Button 
              className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold gap-2"
              onClick={onBuy}
              disabled={buying}
            >
              {buying ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
              {t("contracts.buyNow")}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ContractTemplatesSection = () => {
  const { language, t } = useLanguage();
  const [previewModal, setPreviewModal] = useState<{ open: boolean; url: string | null; name: string }>({
    open: false, url: null, name: ""
  });
  const [buyingId, setBuyingId] = useState<string | null>(null);

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contract-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contract_templates")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return (data as unknown) as ContractTemplate[];
    },
  });

  const handleBuy = async (contractId: string) => {
    setBuyingId(contractId);
    try {
      const { data, error } = await supabase.functions.invoke("create-contract-checkout", {
        body: { contractId },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast.error(language === 'en' ? 'Error starting checkout' : 'Errore nell\'avvio del checkout');
      console.error(err);
    } finally {
      setBuyingId(null);
    }
  };

  const handlePreview = (contract: ContractTemplate) => {
    const name = language === 'en' && contract.name_en ? contract.name_en : contract.name;
    setPreviewModal({ open: true, url: contract.preview_url, name });
  };

  if (isLoading) return null;
  if (!contracts || contracts.length === 0) return null;

  return (
    <section id="contratti" className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(43 74% 49% / 0.05) 0%, transparent 60%)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block px-5 py-2 rounded-lg liquid-glass text-primary text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            {t("contracts.badge")}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif">
            {t("contracts.title1")}
            <br />
            <span className="gradient-text-gold">{t("contracts.title2")}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("contracts.description")}
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>{t("contracts.draftedByLawyers")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <span>{t("contracts.immediateDownload")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>{t("contracts.updated")}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div 
        className="flex gap-6 px-4 md:px-8 overflow-x-auto scrollbar-hide py-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className="flex-shrink-0 w-4 md:w-[calc((100vw-1280px)/2)]" />
        
        {contracts.map((contract, index) => (
          <ContractCard 
            key={contract.id} 
            contract={contract} 
            index={index}
            onPreview={() => handlePreview(contract)}
            onBuy={() => handleBuy(contract.id)}
            buying={buyingId === contract.id}
          />
        ))}

        <div className="flex-shrink-0 w-8" />
      </div>

      {contracts.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-6"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
            <span>{t("contracts.scrollHint")}</span>
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            {t("contracts.customRequest")}
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold"
            onClick={() => window.dispatchEvent(new CustomEvent("open-consultation", { detail: { serviceName: t("contracts.requestCustom") } }))}
          >
            {t("contracts.requestCustom")}
          </Button>
        </motion.div>
      </div>

      <ContractPreviewModal
        open={previewModal.open}
        onOpenChange={(open) => setPreviewModal(prev => ({ ...prev, open }))}
        previewUrl={previewModal.url}
        contractName={previewModal.name}
      />
    </section>
  );
};

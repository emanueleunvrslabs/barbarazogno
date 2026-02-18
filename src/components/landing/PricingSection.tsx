import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Phone, Briefcase, Zap, Crown, Loader2, ShoppingCart, Sparkles, Clock, Package, ArrowRight, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

interface ConsultationPlan {
  nameKey: string;
  descKey: string;
  price: number;
  originalPrice?: number;
  durationKey: string;
  icon: React.ElementType;
  priceId: string;
  featuresKeys: string[];
  highlighted?: boolean;
  badgeKey?: string;
}

const singlePlans: ConsultationPlan[] = [
  {
    nameKey: "pricing.quickCall", descKey: "pricing.quickCallDesc", price: 150,
    durationKey: "pricing.duration30min", icon: Phone, priceId: "price_1T27NDKMHtAMmeThxNdmxyCw",
    featuresKeys: ["pricing.feat.phoneConsultation", "pricing.feat.quickAnalysis", "pricing.feat.actionableAdvice"],
  },
  {
    nameKey: "pricing.standard", descKey: "pricing.standardDesc", price: 250,
    durationKey: "pricing.duration1h", icon: Briefcase, priceId: "price_1T27O7KMHtAMmeThuD6hp43P",
    featuresKeys: ["pricing.feat.deepAnalysis", "pricing.feat.writtenFollowUp", "pricing.feat.actionPlan", "pricing.feat.documentReview"],
    badgeKey: "pricing.includesFollowUp",
  },
];

const packagePlans: ConsultationPlan[] = [
  {
    nameKey: "pricing.base", descKey: "pricing.baseDesc", price: 400, originalPrice: 500,
    durationKey: "pricing.duration2h", icon: Zap, priceId: "price_1T27OKKMHtAMmeThnlGUrf4O",
    featuresKeys: ["pricing.feat.flexibleUsage", "pricing.feat.priorityAccess", "pricing.feat.writtenSummary"],
  },
  {
    nameKey: "pricing.growth", descKey: "pricing.growthDesc", price: 900, originalPrice: 1250,
    durationKey: "pricing.duration5h", icon: ArrowRight, priceId: "price_1T27OYKMHtAMmeThk2fPgjpL",
    featuresKeys: ["pricing.feat.flexibleUsage", "pricing.feat.priorityAccess", "pricing.feat.writtenSummary", "pricing.feat.dedicatedLawyer", "pricing.feat.monthlyReport"],
    highlighted: true,
  },
  {
    nameKey: "pricing.strategic", descKey: "pricing.strategicDesc", price: 1500, originalPrice: 2500,
    durationKey: "pricing.duration10h", icon: Crown, priceId: "price_1T27PEKMHtAMmeThBhpgiYUM",
    featuresKeys: ["pricing.feat.flexibleUsage", "pricing.feat.priorityAccess", "pricing.feat.writtenSummary", "pricing.feat.dedicatedLawyer", "pricing.feat.monthlyReport", "pricing.feat.strategicPlanning"],
  },
];

const termsKeys = [
  "pricing.term.prepayment", "pricing.term.validity", "pricing.term.scheduling",
  "pricing.term.cancellation", "pricing.term.nonTransferable", "pricing.term.noRefund",
];
const includedKeys = ["pricing.incl.analysis", "pricing.incl.oralAdvice", "pricing.incl.writtenFollowUp", "pricing.incl.simpleDocReview", "pricing.incl.strategy"];
const excludedKeys = ["pricing.excl.draftingContracts", "pricing.excl.courtFiling", "pricing.excl.notarization", "pricing.excl.adminFees"];

const TermsDialog = () => {
  const { t } = useLanguage();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1.5 rounded-lg hover:bg-muted/30 transition-colors text-muted-foreground hover:text-foreground" title={t("pricing.termsTitle")}>
          <Info className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif">{t("pricing.termsTitle")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {/* Included */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" /> {t("pricing.included")}
            </h4>
            <ul className="space-y-2">
              {includedKeys.map((key, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" /> {t(key)}
                </li>
              ))}
            </ul>
          </div>
          {/* Not Included */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
              <X className="w-4 h-4 text-destructive" /> {t("pricing.notIncluded")}
            </h4>
            <ul className="space-y-2">
              {excludedKeys.map((key, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <X className="w-3.5 h-3.5 text-destructive flex-shrink-0" /> {t(key)}
                </li>
              ))}
            </ul>
          </div>
          {/* Terms */}
          <div className="border-t border-border pt-4">
            <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">{t("pricing.termsTitle")}</h4>
            <ul className="space-y-2">
              {termsKeys.map((key, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-primary mt-0.5">•</span> {t(key)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PlanCard = ({ plan, index }: { plan: ConsultationPlan; index: number }) => {
  const { t, language } = useLanguage();
  const [buying, setBuying] = useState(false);
  const discount = plan.originalPrice ? Math.round((1 - plan.price / plan.originalPrice) * 100) : 0;

  const handleBuy = async () => {
    setBuying(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-consultation-checkout", { body: { priceId: plan.priceId } });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      if (data?.url) window.location.href = data.url;
    } catch (err: any) {
      toast.error(language === "en" ? "Error starting checkout" : "Errore nell'avvio del checkout");
      console.error(err);
    } finally {
      setBuying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`relative ${plan.highlighted ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4" /> {t("pricing.mostRequested")}
          </div>
        </div>
      )}

      <div
        className="relative h-full rounded-xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 overflow-hidden"
        style={{
          background: plan.highlighted
            ? "linear-gradient(135deg, hsl(43 74% 49% / 0.1) 0%, hsl(0 0% 100% / 0.06) 50%, hsl(0 0% 100% / 0.03) 100%)"
            : "linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)",
          border: plan.highlighted ? "1px solid hsl(43 74% 49% / 0.25)" : "1px solid hsl(0 0% 100% / 0.1)",
        }}
      >
        {plan.highlighted && (
          <div className="absolute inset-0 rounded-xl opacity-40 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(43 74% 49% / 0.12) 0%, transparent 60%)" }} />
        )}

        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <plan.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <Badge variant="outline" className="text-xs">{t(plan.durationKey)}</Badge>
              {plan.badgeKey && <Badge className="bg-emerald-500/15 text-emerald-400 text-xs border-0">{t(plan.badgeKey)}</Badge>}
              <div className="ml-auto">
                <TermsDialog />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground font-serif">{t(plan.nameKey)}</h3>
            <p className="text-sm text-muted-foreground mt-1">{t(plan.descKey)}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground font-serif">€{plan.price}</span>
              {plan.originalPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">€{plan.originalPrice}</span>
                  <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-400 text-xs border-0">-{discount}%</Badge>
                </>
              )}
            </div>
          </div>

          <ul className="space-y-3 mb-6 flex-grow">
            {plan.featuresKeys.map((key, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlighted ? "bg-primary/20" : "bg-muted/50"}`}>
                  <Check className={`w-3 h-3 ${plan.highlighted ? "text-primary" : "text-foreground/70"}`} />
                </div>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>

          <Button
            onClick={handleBuy}
            disabled={buying}
            className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg shadow-primary/20"
            size="lg"
          >
            {buying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
            {t("pricing.buyNow")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export const PricingSection = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"single" | "packages">("single");

  const tabs = [
    { id: "single" as const, labelKey: "pricing.singleConsultations", icon: Clock },
    { id: "packages" as const, labelKey: "pricing.prepaidPackages", icon: Package },
  ];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span className="inline-block px-5 py-2 rounded-lg liquid-glass text-primary text-sm font-semibold mb-6" whileHover={{ scale: 1.05 }}>
            {t("pricing.badge")}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif">
            {t("pricing.title1")}<br /><span className="gradient-text-gold">{t("pricing.title2")}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">{t("pricing.description")}</p>
        </motion.div>

        {/* Tab Menu */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="flex justify-center mb-12">
          <div className="inline-flex rounded-xl p-1.5 liquid-glass gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          {activeTab === "single" ? (
            <motion.div key="single" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {singlePlans.map((plan, i) => <PlanCard key={plan.priceId} plan={plan} index={i} />)}
            </motion.div>
          ) : (
            <motion.div key="packages" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {packagePlans.map((plan, i) => <PlanCard key={plan.priceId} plan={plan} index={i} />)}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust text */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center mt-12 text-muted-foreground">
          {t("pricing.trustText")}
        </motion.p>
      </div>
    </section>
  );
};

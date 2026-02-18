import { motion } from "framer-motion";
import { Check, X, ArrowRight, Sparkles, Phone, Clock, Briefcase, Zap, Crown, Loader2, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";

interface ConsultationPlan {
  nameKey: string;
  descKey: string;
  price: number;
  originalPrice?: number;
  duration: string;
  durationKey: string;
  icon: React.ElementType;
  priceId: string;
  featuresKeys: string[];
  highlighted?: boolean;
  badgeKey?: string;
}

const singlePlans: ConsultationPlan[] = [
  {
    nameKey: "pricing.quickCall",
    descKey: "pricing.quickCallDesc",
    price: 150,
    duration: "30 min",
    durationKey: "pricing.duration30min",
    icon: Phone,
    priceId: "price_1T27NDKMHtAMmeThxNdmxyCw",
    featuresKeys: [
      "pricing.feat.phoneConsultation",
      "pricing.feat.quickAnalysis",
      "pricing.feat.actionableAdvice",
    ],
  },
  {
    nameKey: "pricing.standard",
    descKey: "pricing.standardDesc",
    price: 250,
    duration: "1h",
    durationKey: "pricing.duration1h",
    icon: Briefcase,
    priceId: "price_1T27O7KMHtAMmeThuD6hp43P",
    featuresKeys: [
      "pricing.feat.deepAnalysis",
      "pricing.feat.writtenFollowUp",
      "pricing.feat.actionPlan",
      "pricing.feat.documentReview",
    ],
    badgeKey: "pricing.includesFollowUp",
  },
];

const packagePlans: ConsultationPlan[] = [
  {
    nameKey: "pricing.base",
    descKey: "pricing.baseDesc",
    price: 400,
    originalPrice: 500,
    duration: "2h",
    durationKey: "pricing.duration2h",
    icon: Zap,
    priceId: "price_1T27OKKMHtAMmeThnlGUrf4O",
    featuresKeys: [
      "pricing.feat.flexibleUsage",
      "pricing.feat.priorityAccess",
      "pricing.feat.writtenSummary",
    ],
  },
  {
    nameKey: "pricing.growth",
    descKey: "pricing.growthDesc",
    price: 900,
    originalPrice: 1250,
    duration: "5h",
    durationKey: "pricing.duration5h",
    icon: ArrowRight,
    priceId: "price_1T27OYKMHtAMmeThk2fPgjpL",
    featuresKeys: [
      "pricing.feat.flexibleUsage",
      "pricing.feat.priorityAccess",
      "pricing.feat.writtenSummary",
      "pricing.feat.dedicatedLawyer",
      "pricing.feat.monthlyReport",
    ],
    highlighted: true,
  },
  {
    nameKey: "pricing.strategic",
    descKey: "pricing.strategicDesc",
    price: 1500,
    originalPrice: 2500,
    duration: "10h",
    durationKey: "pricing.duration10h",
    icon: Crown,
    priceId: "price_1T27PEKMHtAMmeThBhpgiYUM",
    featuresKeys: [
      "pricing.feat.flexibleUsage",
      "pricing.feat.priorityAccess",
      "pricing.feat.writtenSummary",
      "pricing.feat.dedicatedLawyer",
      "pricing.feat.monthlyReport",
      "pricing.feat.strategicPlanning",
    ],
  },
];

const PlanCard = ({ plan, index }: { plan: ConsultationPlan; index: number }) => {
  const { t, language } = useLanguage();
  const [buying, setBuying] = useState(false);
  const discount = plan.originalPrice
    ? Math.round((1 - plan.price / plan.originalPrice) * 100)
    : 0;

  const handleBuy = async () => {
    setBuying(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-consultation-checkout", {
        body: { priceId: plan.priceId },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      if (data?.url) window.open(data.url, "_blank");
    } catch (err: any) {
      toast.error(language === "en" ? "Error starting checkout" : "Errore nell'avvio del checkout");
      console.error(err);
    } finally {
      setBuying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative ${plan.highlighted ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {plan.highlighted && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4" />
            {t("pricing.mostRequested")}
          </div>
        </motion.div>
      )}

      <motion.div
        className="relative h-full rounded-xl p-7 flex flex-col transition-all duration-500 overflow-hidden"
        whileHover={{ y: -4 }}
        style={{
          background: plan.highlighted
            ? "linear-gradient(135deg, hsl(43 74% 49% / 0.1) 0%, hsl(0 0% 100% / 0.06) 50%, hsl(0 0% 100% / 0.03) 100%)"
            : "linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)",
          border: plan.highlighted
            ? "1px solid hsl(43 74% 49% / 0.25)"
            : "1px solid hsl(0 0% 100% / 0.1)",
        }}
      >
        {plan.highlighted && (
          <div
            className="absolute inset-0 rounded-xl opacity-40"
            style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(43 74% 49% / 0.12) 0%, transparent 60%)" }}
          />
        )}

        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <plan.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <Badge variant="outline" className="text-xs">
                {t(plan.durationKey)}
              </Badge>
              {plan.badgeKey && (
                <Badge className="bg-emerald-500/15 text-emerald-400 text-xs">
                  {t(plan.badgeKey)}
                </Badge>
              )}
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
                  <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-400 text-xs">
                    -{discount}%
                  </Badge>
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
            className={`w-full gap-2 ${
              plan.highlighted
                ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg shadow-primary/20"
                : "liquid-glass text-foreground hover:bg-muted/30"
            }`}
            size="lg"
          >
            {buying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingCart className="w-4 h-4" />}
            {t("pricing.buyNow")}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const PricingSection = () => {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span
            className="inline-block px-5 py-2 rounded-lg liquid-glass text-primary text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            {t("pricing.badge")}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif">
            {t("pricing.title1")}
            <br />
            <span className="gradient-text-gold">{t("pricing.title2")}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.description")}
          </p>
        </motion.div>

        {/* Single Consultations */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground font-serif mb-8 flex items-center gap-3"
          >
            <Clock className="w-6 h-6 text-primary" />
            {t("pricing.singleConsultations")}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {singlePlans.map((plan, i) => (
              <PlanCard key={i} plan={plan} index={i} />
            ))}
          </div>
        </div>

        {/* Prepaid Packages */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-foreground font-serif mb-8 flex items-center gap-3"
          >
            <Briefcase className="w-6 h-6 text-primary" />
            {t("pricing.prepaidPackages")}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packagePlans.map((plan, i) => (
              <PlanCard key={i} plan={plan} index={i} />
            ))}
          </div>
        </div>

        {/* Included / Not Included */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12"
        >
          <div className="rounded-xl p-6 liquid-glass-card-sm">
            <h4 className="font-bold text-foreground mb-4 font-serif flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              {t("pricing.included")}
            </h4>
            <ul className="space-y-2">
              {["pricing.incl.analysis", "pricing.incl.oralAdvice", "pricing.incl.writtenFollowUp", "pricing.incl.simpleDocReview", "pricing.incl.strategy"].map((key, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-6 liquid-glass-card-sm">
            <h4 className="font-bold text-foreground mb-4 font-serif flex items-center gap-2">
              <X className="w-5 h-5 text-destructive" />
              {t("pricing.notIncluded")}
            </h4>
            <ul className="space-y-2">
              {["pricing.excl.draftingContracts", "pricing.excl.courtFiling", "pricing.excl.notarization", "pricing.excl.adminFees"].map((key, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <X className="w-4 h-4 text-destructive flex-shrink-0" />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Trust text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 text-muted-foreground"
        >
          {t("pricing.trustText")}
        </motion.p>
      </div>
    </section>
  );
};

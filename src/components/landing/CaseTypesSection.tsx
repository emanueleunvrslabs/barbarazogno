import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Globe, Building2, Shield, Briefcase, FileText, Gavel } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ServiceCard = ({ service, index }: { service: { 
  id: number;
  titleKey: string;
  categoryKey: string;
  icon: typeof Briefcase;
  highlightKey: string;
  featuresKeys: string[];
  color: string;
}; index: number }) => {
  const { t } = useLanguage();
  const IconComponent = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-[320px] group cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
    >
      <div 
        className="relative h-full rounded-xl p-6 glass-card-hover flex flex-col transition-shadow duration-300 hover:shadow-xl"
      >
        {/* Top Row - Category & Badge */}
        <div className="flex items-center justify-between mb-4">
          {/* Category Tag */}
          <div className="inline-flex items-center px-3 py-1 rounded-lg bg-primary/15 text-primary text-xs font-medium">
            {t(service.categoryKey)}
          </div>
          
          {/* Highlight Badge */}
          <div className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400">
            {t(service.highlightKey)}
          </div>
        </div>

        {/* Icon & Title - fixed height */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors font-serif h-[48px] flex items-start">
              {t(service.titleKey)}
            </h3>
          </div>
        </div>

        {/* Features - fixed height */}
        <div className="space-y-2 mb-6 h-[90px]">
          {service.featuresKeys.map((featureKey, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary/70 flex-shrink-0" />
              <span className="truncate">{t(featureKey)}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-end pt-4 border-t border-border mt-auto">
          <div className="flex items-center gap-1 text-sm font-semibold text-primary">
            {t("services.requestConsultation")}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const CaseTypesSection = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      id: 1,
      titleKey: "marquee.generalCounselling",
      categoryKey: "services.consulting",
      icon: Briefcase,
      highlightKey: "services.dailySupport",
      featuresKeys: ["services.continuousLegal", "services.quickResponse", "services.dedicatedTeam"],
      color: "from-primary to-amber-600",
    },
    {
      id: 2,
      titleKey: "marquee.internationalTrade",
      categoryKey: "services.international",
      icon: Globe,
      highlightKey: "services.globalExpansion",
      featuresKeys: ["services.internationalContracts", "services.customsRegulations", "services.foreignRelations"],
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 3,
      titleKey: "marquee.maCorporate",
      categoryKey: "services.corporate",
      icon: Building2,
      highlightKey: "services.extraordinaryOps",
      featuresKeys: ["services.dueDiligence", "services.mergersAcquisitions", "services.restructuring"],
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 4,
      titleKey: "marquee.contracts",
      categoryKey: "services.contractsTag",
      icon: FileText,
      highlightKey: "services.secureAgreements",
      featuresKeys: ["services.draftingNegotiation", "services.contractReview", "services.contractManagement"],
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      titleKey: "marquee.compliance",
      categoryKey: "services.complianceTag",
      icon: Shield,
      highlightKey: "services.guaranteedCompliance",
      featuresKeys: ["services.privacyGdpr", "services.dlgs231", "services.complianceAudit"],
      color: "from-violet-500 to-purple-600",
    },
    {
      id: 6,
      titleKey: "marquee.litigation",
      categoryKey: "services.litigationTag",
      icon: Gavel,
      highlightKey: "services.defenseProtection",
      featuresKeys: ["services.civilLitigation", "services.commercialDisputes", "services.alternativeResolution"],
      color: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <section id="servizi" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-lg bg-primary/15 text-primary text-sm font-medium mb-4">
            {t("services.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("services.description")}
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scrolling Gallery */}
      <div 
        className="flex gap-6 px-4 md:px-8 overflow-x-auto scrollbar-hide pt-4 pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Spacer for initial offset */}
        <div className="flex-shrink-0 w-4 md:w-[calc((100vw-1280px)/2)]" />
        
        {services.map((service, index) => (
          <div key={service.id} style={{ scrollSnapAlign: 'start' }}>
            <ServiceCard service={service} index={index} />
          </div>
        ))}

        {/* Spacer for end offset */}
        <div className="flex-shrink-0 w-8" />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="flex justify-center mt-8"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
          <span>{t("services.scrollHint")}</span>
        </div>
      </motion.div>
    </section>
  );
};

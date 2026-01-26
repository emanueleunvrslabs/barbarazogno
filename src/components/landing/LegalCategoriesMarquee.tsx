import { motion } from "framer-motion";
import { 
  Briefcase,
  Globe,
  Building2,
  FileText,
  Shield,
  TrendingUp,
  Scale,
  Users,
  Landmark,
  Gavel
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CategoryCard = ({ icon: Icon, label }: { icon: LucideIcon; label: string }) => (
  <div 
    className="flex items-center gap-3 px-5 py-3 rounded-lg border border-primary/30 bg-primary/5 backdrop-blur-sm whitespace-nowrap"
    style={{
      boxShadow: '0 0 20px hsl(var(--primary) / 0.1), inset 0 1px 0 0 hsl(0 0% 100% / 0.08)'
    }}
  >
    <Icon className="w-5 h-5 text-primary" />
    <span className="text-sm font-medium text-foreground">{label}</span>
  </div>
);

export const LegalCategoriesMarquee = () => {
  const { t } = useLanguage();
  
  const legalCategories: { icon: LucideIcon; labelKey: string }[] = [
    { icon: Briefcase, labelKey: "marquee.generalCounselling" },
    { icon: Globe, labelKey: "marquee.internationalTrade" },
    { icon: Building2, labelKey: "marquee.maCorporate" },
    { icon: FileText, labelKey: "marquee.contracts" },
    { icon: Shield, labelKey: "marquee.compliance" },
    { icon: TrendingUp, labelKey: "marquee.businessDev" },
    { icon: Scale, labelKey: "marquee.civilLaw" },
    { icon: Users, labelKey: "marquee.laborLaw" },
    { icon: Landmark, labelKey: "marquee.bankingLaw" },
    { icon: Gavel, labelKey: "marquee.litigation" },
  ];

  // Duplicate for infinite scroll effect
  const duplicatedCategories = [...legalCategories, ...legalCategories];

  return (
    <section className="py-12 overflow-hidden">
      <div className="relative">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <motion.div
          className="flex gap-4"
          animate={{
            x: [0, -50 * legalCategories.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {duplicatedCategories.map((category, index) => (
            <CategoryCard key={`${category.labelKey}-${index}`} icon={category.icon} label={t(category.labelKey)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

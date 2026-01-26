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

const legalCategories: { icon: LucideIcon; label: string }[] = [
  { icon: Briefcase, label: "General Counselling" },
  { icon: Globe, label: "International Trade" },
  { icon: Building2, label: "M&A & Corporate" },
  { icon: FileText, label: "Contract Law" },
  { icon: Shield, label: "Compliance & GDPR" },
  { icon: TrendingUp, label: "Business Development" },
  { icon: Scale, label: "Diritto Civile" },
  { icon: Users, label: "Diritto del Lavoro" },
  { icon: Landmark, label: "Diritto Bancario" },
  { icon: Gavel, label: "Contenzioso" },
];

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
            <CategoryCard key={`${category.label}-${index}`} icon={category.icon} label={category.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { 
  Briefcase, 
  Globe, 
  Building2, 
  FileText, 
  Shield, 
  TrendingUp,
  ArrowUpRight
} from "lucide-react";

const features = [
  {
    icon: Briefcase,
    title: "General Counselling",
    description: "Supporto legale quotidiano a 360 gradi per ogni esigenza aziendale.",
    size: "small",
    color: "from-primary to-amber-600"
  },
  {
    icon: Globe,
    title: "International Trade",
    description: "Accompagniamo la crescita internazionale della vostra impresa con competenza globale.",
    size: "small",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Building2,
    title: "M&A & Corporate Law",
    description: "Assistenza specialistica nelle operazioni societarie ordinarie e straordinarie.",
    size: "small",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: FileText,
    title: "Contract Law",
    description: "Negoziazione e redazione di contratti commerciali nazionali e internazionali.",
    size: "small",
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: Shield,
    title: "Compliance & Data Protection",
    description: "GDPR e D.Lgs 231/2001: costruiamo il framework di conformità per la vostra azienda.",
    size: "small",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: TrendingUp,
    title: "Business Development",
    description: "Consulenza strategica legale ed economica per lo sviluppo del vostro business.",
    size: "small",
    color: "from-cyan-500 to-blue-500"
  }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const isLarge = feature.size === "large";
  const isMedium = feature.size === "medium";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`
        ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
        ${isMedium ? 'md:col-span-2' : ''}
        group relative
      `}
    >
      <motion.div
        className={`
          relative h-full liquid-glass-card-sm p-6 md:p-8 
          transition-all duration-500 overflow-hidden
          ${isLarge ? 'min-h-[280px]' : 'min-h-[180px]'}
        `}
        whileHover={{ 
          y: -4,
          transition: { duration: 0.3 }
        }}
        style={{
          background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)'
        }}
      >
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, hsl(43 74% 49% / 0.06) 0%, transparent 60%)`
          }}
        />
        
        {/* Icon - Layered with gradient */}
        <motion.div 
          className={`
            relative z-10
            ${isLarge ? 'w-14 h-14' : 'w-11 h-11'} 
            rounded-xl bg-gradient-to-br ${feature.color}
            flex items-center justify-center mb-4 shadow-lg
          `}
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <feature.icon className={`${isLarge ? 'w-7 h-7' : 'w-5 h-5'} text-white`} />
        </motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          <h3 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-serif`}>
            {feature.title}
          </h3>
          <p className={`text-muted-foreground ${isLarge ? 'text-base' : 'text-sm'} leading-relaxed`}>
            {feature.description}
          </p>
        </div>

        {/* Hover arrow */}
        <motion.div
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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
            Competenze
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif">
            Aree di Competenza
            <br />
            <span className="gradient-text-gold">al vostro servizio</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Un team specializzato per accompagnare la vostra impresa in ogni sfida legale.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

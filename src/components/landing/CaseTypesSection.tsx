import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Globe, Building2, FileText, Shield, Briefcase, TrendingUp } from "lucide-react";

const services = [
  {
    id: 1,
    title: "General Counselling",
    category: "Consulenza",
    icon: Briefcase,
    highlight: "Supporto quotidiano",
    features: ["Assistenza legale continuativa", "Risposta rapida", "Team dedicato"],
    color: "from-primary to-amber-600",
  },
  {
    id: 2,
    title: "International Trade",
    category: "Internazionale",
    icon: Globe,
    highlight: "Espansione globale",
    features: ["Contratti internazionali", "Normativa doganale", "Rapporti esteri"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "M&A & Corporate",
    category: "Societario",
    icon: Building2,
    highlight: "Operazioni straordinarie",
    features: ["Due diligence", "Fusioni e acquisizioni", "Ristrutturazioni"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "Compliance & GDPR",
    category: "Compliance",
    icon: Shield,
    highlight: "Conformità garantita",
    features: ["Privacy & GDPR", "D.Lgs 231/2001", "Audit compliance"],
    color: "from-violet-500 to-purple-600",
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const IconComponent = service.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="flex-shrink-0 w-[340px] md:w-[380px] h-[340px] group cursor-pointer"
    >
      <div 
        className="relative h-full rounded-xl p-6 glass-card-hover flex flex-col"
      >
        {/* Top Row - Category & Badge */}
        <div className="flex items-center justify-between mb-4">
          {/* Category Tag */}
          <div className="inline-flex items-center px-3 py-1 rounded-lg bg-primary/15 text-primary text-xs font-medium">
            {service.category}
          </div>
          
          {/* Highlight Badge */}
          <div className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400">
            {service.highlight}
          </div>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors font-serif">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6 flex-1">
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary/70" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-end pt-4 border-t border-border mt-auto">
          <motion.div 
            className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
          >
            Scopri di più
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const CaseTypesSection = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 rounded-lg bg-primary/15 text-primary text-sm font-medium mb-4">
            I Nostri Servizi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
            Soluzioni legali per ogni esigenza
          </h2>
          <p className="text-lg text-muted-foreground">
            Offriamo servizi strutturati per accompagnare PMI e grandi imprese in ogni sfida legale, con costi sostenibili e qualità internazionale.
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

        {/* View All Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="flex-shrink-0 w-[280px]"
          style={{ scrollSnapAlign: 'start' }}
        >
          <a 
            href="#contact"
            className="flex flex-col items-center justify-center h-full min-h-[340px] rounded-xl border-2 border-dashed border-primary/25 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
              <ArrowRight className="w-7 h-7 text-primary" />
            </div>
            <span className="text-lg font-semibold text-primary font-serif">Contattaci</span>
            <span className="text-sm text-muted-foreground mt-1">Per una consulenza</span>
          </a>
        </motion.div>

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
          <span>Scorri per vedere tutti i servizi</span>
        </div>
      </motion.div>
    </section>
  );
};

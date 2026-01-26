import { motion } from "framer-motion";
import { Clock, FileText, ArrowRight, CheckCircle, Scale, Users, Briefcase, Heart } from "lucide-react";

const caseTypes = [
  {
    id: 1,
    title: "Divorzio e Separazione",
    category: "Famiglia",
    icon: Heart,
    timeReduced: "65%",
    docsGenerated: "Memoria, Accordi, Ricorso",
    aiCapabilities: ["Raccolta fatti guidata", "Timeline automatica", "Precedenti simili"],
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 2,
    title: "Controversie di Lavoro",
    category: "Lavoro",
    icon: Briefcase,
    timeReduced: "58%",
    docsGenerated: "Lettera, Ricorso, Memo",
    aiCapabilities: ["Analisi contratto", "Calcolo TFR", "CCNL applicabile"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "Procedimenti Penali",
    category: "Penale",
    icon: Scale,
    timeReduced: "52%",
    docsGenerated: "Memoria difensiva, Istanze",
    aiCapabilities: ["Ricerca giurisprudenza", "Articoli codice", "Attenuanti"],
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 4,
    title: "Recupero Crediti",
    category: "Civile",
    icon: Users,
    timeReduced: "72%",
    docsGenerated: "Diffida, Decreto ingiuntivo",
    aiCapabilities: ["Verifica documentale", "Calcolo interessi", "Procedura monitoriale"],
    color: "from-emerald-500 to-teal-600",
  },
];

const CaseCard = ({ caseType, index }: { caseType: typeof caseTypes[0]; index: number }) => {
  const IconComponent = caseType.icon;
  
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
        {/* Top Row - Category & Time Badge */}
        <div className="flex items-center justify-between mb-4">
          {/* Category Tag */}
          <div className="inline-flex items-center px-3 py-1 rounded-lg bg-primary/15 text-primary text-xs font-medium">
            {caseType.category}
          </div>
          
          {/* Time Reduction Badge */}
          <div className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400">
            -{caseType.timeReduced} tempo
          </div>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${caseType.color} flex items-center justify-center flex-shrink-0`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors font-serif">
              {caseType.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              <FileText className="w-3.5 h-3.5 inline mr-1" />
              {caseType.docsGenerated}
            </p>
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="space-y-2 mb-6 flex-1">
          {caseType.aiCapabilities.map((capability, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-primary/70" />
              <span>{capability}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Intake: ~15 min</span>
          </div>
          <motion.div 
            className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
          >
            Prova
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
            Tipologie di Casi
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
            Supporto AI per ogni area del diritto
          </h2>
          <p className="text-lg text-muted-foreground">
            L'AI analizza il caso, trova i precedenti e prepara la documentazione iniziale per ogni tipologia di procedimento.
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
        
        {caseTypes.map((caseType, index) => (
          <div key={caseType.id} style={{ scrollSnapAlign: 'start' }}>
            <CaseCard caseType={caseType} index={index} />
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
            href="/cases"
            className="flex flex-col items-center justify-center h-full min-h-[340px] rounded-xl border-2 border-dashed border-primary/25 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
              <ArrowRight className="w-7 h-7 text-primary" />
            </div>
            <span className="text-lg font-semibold text-primary font-serif">Tutte le tipologie</span>
            <span className="text-sm text-muted-foreground mt-1">+25 aree del diritto</span>
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
          <span>Scorri per vedere altre tipologie</span>
        </div>
      </motion.div>
    </section>
  );
};
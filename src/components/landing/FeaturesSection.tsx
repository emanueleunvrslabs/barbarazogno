import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Globe, 
  Building2, 
  FileText, 
  Shield, 
  TrendingUp,
  ArrowUpRight,
  CheckCircle
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const features = [
  {
    icon: Briefcase,
    title: "General Counselling",
    description: "Supporto legale quotidiano a 360 gradi per ogni esigenza aziendale.",
    size: "small",
    color: "from-primary to-amber-600",
    fullContent: {
      subtitle: "Assistenza quotidiana altamente formata",
      intro: "L'avvocato oggi non è e non può più essere il soggetto a cui rivolgersi al solo fine di risolvere i problemi dopo la loro insorgenza. Viste le lungaggini della giustizia italiana ed i costi necessari a porre rimedio ad una situazione già degradata, l'obiettivo deve essere obbligatoriamente quello di prevenire l'insorgere di problemi già nella loro fase embrionale.",
      whyUs: "Noi abbiamo da sempre prestato tale tipo di assistenza, trasformandola in uno dei nostri punti di forza. Siamo costantemente al fianco dei nostri clienti ed agiamo sia da consulenti legali esterni per coloro che sono sprovvisti di un team legale interno che da consulenti specializzati chiamati ad intervenire nelle questioni più delicate.",
      benefits: [
        "Consulenza ed assistenza altamente formata",
        "Presenza costante ed immediata",
        "Capacità ed esperienza nel capire i bisogni delle imprese"
      ]
    }
  },
  {
    icon: Globe,
    title: "Commercio Internazionale",
    description: "Un'opportunità di crescita: accompagniamo l'espansione internazionale della vostra impresa.",
    size: "small",
    color: "from-blue-500 to-indigo-600",
    fullContent: {
      subtitle: "Un'opportunità di crescita",
      intro: "Per la crescita di un'impresa, espandersi nei mercati esteri è basilare, soprattutto a fronte di un mondo odierno sempre più globalizzato. Le imprese non possono permettersi di perdere l'occasione non solo in ordine all'immissione dei propri prodotti e servizi, ma anche in relazione alla produzione di questi ultimi.\n\nIl commercio internazionale comporta dei rischi diversi e maggiori rispetto al commercio domestico. Servono conoscenze specifiche che non tutti gli studi interni delle imprese sono in grado di garantire e, molto spesso, nemmeno gli studi legali esterni che non siano fortemente specializzati, con un'esperienza necessariamente pluriennale nel settore.\n\nIn tali transazioni è indispensabile affidarsi ad un consulente che abbia una profonda conoscenza delle dinamiche internazionali, che derivi non solo da una navigata esperienza nella negoziazione di contratti con i più grandi fornitori e produttori, ma anche e soprattutto da un aggiornamento costante.",
      whyUs: "Una parte importante della nostra attività, dialogando quotidianamente con multinazionali, è tutto ciò che riguarda la vita di una società nella sua dimensione internazionale, in special modo gestione dei contratti di import-export. Non solo da e verso l'Italia, ma anche cura di contratti da e verso entità societarie entrambe con sedi all'estero. In particolare, abbiamo sviluppato una profonda conoscenza nella negoziazione con i principali fornitori e produttori con sede in oriente.\n\nNessuna impresa si può permettere di non regolamentare in maniera adeguata tutte le forme di cooperazione internazionali che sono la sua linfa vitale. Affidandoti a noi nel processo di internazionalizzazione della tua impresa hai la certezza di contare su un partner strategico.",
      benefits: [
        "Conosciamo i rischi del commercio internazionale ed aiutiamo ad evitarli",
        "Anni di esperienza nell'ambito del commercio internazionale",
        "Profonda conoscenza delle modalità di negoziazione dei paesi orientali",
        "Contratti con fornitori: fornitura, sub-fornitura, distribuzione",
        "Contratti di licenza, agenzia e joint venture",
        "Valutazione della commerciabilità di prodotti in Italia"
      ]
    }
  },
  {
    icon: Building2,
    title: "M&A & Corporate Law",
    description: "Assistenza specialistica nelle operazioni societarie ordinarie e straordinarie.",
    size: "small",
    color: "from-emerald-500 to-teal-500",
    fullContent: {
      subtitle: "Piena soddisfazione senza sprechi di risorse economiche e di tempo",
      intro: "Questo ramo del diritto richiede non solo padronanza delle norme sostanziali ma anche conoscenza del mondo imprenditoriale, navigata esperienza negoziale e capacità di relazionarsi con le parti.",
      whyUs: "Da anni accompagniamo clienti italiani e stranieri, PMI o grandi gruppi internazionali, nella gestione ordinaria e straordinaria delle imprese. Affianchiamo nella compravendita di aziende, joint-venture e operazioni di riassetto societario come fusioni, scissioni, conferimenti.",
      benefits: [
        "Costituzione società e start-up",
        "Fusioni, scissioni, trasformazioni",
        "Due diligence e data room",
        "Patti parasociali e corporate governance",
        "Assistenza pre e post-closing"
      ]
    }
  },
  {
    icon: FileText,
    title: "Contract Law",
    description: "Negoziazione e redazione di contratti commerciali nazionali e internazionali.",
    size: "small",
    color: "from-violet-500 to-purple-600",
    fullContent: {
      subtitle: "Prevenire il contenzioso attraverso contratti solidi",
      intro: "La contrattualistica è fondamentale per prevenire controversie legali. Un contratto ben redatto tutela i vostri interessi e definisce chiaramente diritti e obblighi delle parti.",
      whyUs: "Redigiamo, revisioniamo e negoziamo contratti commerciali di ogni tipo: distribuzione, fornitura, franchising, licensing e molto altro. La nostra esperienza internazionale ci permette di gestire contratti cross-border con competenza.",
      benefits: [
        "Contratti di distribuzione e fornitura",
        "Accordi di franchising e licensing",
        "Contratti internazionali",
        "Negoziazione e revisione"
      ]
    }
  },
  {
    icon: Shield,
    title: "Compliance & Data Protection",
    description: "GDPR e D.Lgs 231/2001: costruiamo il framework di conformità per la vostra azienda.",
    size: "small",
    color: "from-pink-500 to-rose-500",
    fullContent: {
      subtitle: "Trasformare gli obblighi legali in vantaggio competitivo",
      intro: "La compliance non è solo un obbligo ma un'opportunità. Un sistema di conformità efficace protegge l'azienda da rischi legali e reputazionali, trasformando l'adempimento normativo in valore aggiunto.",
      whyUs: "Implementiamo il Modello 231 e i sistemi di compliance GDPR, costruendo strutture su misura che si integrano con i processi aziendali. Trasformiamo gli obblighi legali in opportunità di business.",
      benefits: [
        "Modello Organizzativo 231",
        "Privacy e GDPR compliance",
        "Audit e gap analysis",
        "Formazione del personale"
      ]
    }
  },
  {
    icon: TrendingUp,
    title: "Business Development",
    description: "Consulenza strategica legale ed economica per lo sviluppo del vostro business.",
    size: "small",
    color: "from-cyan-500 to-blue-500",
    fullContent: {
      subtitle: "Tutta la nostra esperienza multidisciplinare al servizio dei vostri obiettivi",
      intro: "Le scelte legali influenzano profondamente gli aspetti economici dell'impresa. Una loro attenta valutazione è indispensabile, basti pensare alle conseguenze sul piano impositivo.",
      whyUs: "Grazie all'esperienza maturata negli anni al fianco di molteplici imprese, apportiamo un contributo utile nella scelta degli obiettivi e nell'implementazione della strategia. La nostra sede di Cipro ci permette di proporre diverse soluzioni organizzative.",
      benefits: [
        "Internazionalizzazione dell'impresa",
        "Stesura del business plan",
        "Analisi organizzazione legale",
        "Pianificazione fiscale"
      ]
    }
  }
];

const FeatureSheet = ({ 
  feature, 
  isOpen, 
  onClose 
}: { 
  feature: typeof features[0] | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!feature) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg overflow-y-auto border-l border-border"
        style={{
          background: 'linear-gradient(135deg, hsl(220 28% 12%) 0%, hsl(220 30% 8%) 100%)',
        }}
      >
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
              <feature.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <SheetTitle className="text-2xl font-bold text-foreground font-serif text-left">
                {feature.title}
              </SheetTitle>
              <p className="text-primary font-medium text-left">
                {feature.fullContent.subtitle}
              </p>
            </div>
          </div>
        </SheetHeader>
        
        {/* Content */}
        <div className="py-6 space-y-6">
          <div>
            <p className="text-foreground/90 leading-relaxed">
              {feature.fullContent.intro}
            </p>
          </div>

          <div 
            className="p-5 rounded-xl"
            style={{
              background: 'linear-gradient(135deg, hsl(43 74% 49% / 0.08) 0%, hsl(0 0% 100% / 0.03) 100%)',
              border: '1px solid hsl(43 74% 49% / 0.15)'
            }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-3 font-serif">
              Perché affidarti a noi?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {feature.fullContent.whyUs}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-serif">
              Perché le imprese ci scelgono
            </h3>
            <ul className="space-y-3">
              {feature.fullContent.benefits.map((benefit, i) => (
                <li 
                  key={i}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground/80">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={onClose}
            className="w-full py-4 px-6 rounded-lg font-semibold text-center bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            Richiedi Consulenza
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const FeatureCard = ({ 
  feature, 
  index,
  onClick 
}: { 
  feature: typeof features[0]; 
  index: number;
  onClick: () => void;
}) => {
  const isLarge = feature.size === "large";
  const isMedium = feature.size === "medium";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onClick}
      className={`
        ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}
        ${isMedium ? 'md:col-span-2' : ''}
        group relative cursor-pointer
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

        {/* Click indicator */}
        <motion.div
          className="absolute bottom-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <span className="text-xs text-primary font-medium">Scopri di più</span>
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const FeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (feature: typeof features[0]) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedFeature(null), 300);
  };

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
            Un team specializzato per accompagnare la vostra impresa in ogni sfida legale. Clicca per scoprire di più.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index}
              onClick={() => handleCardClick(feature)}
            />
          ))}
        </div>
      </div>

      {/* Sheet */}
      <FeatureSheet 
        feature={selectedFeature}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

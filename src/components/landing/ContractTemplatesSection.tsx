import { motion } from "framer-motion";
import { 
  FileText, 
  ShoppingCart, 
  Download, 
  Check,
  Star,
  Shield,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const contractTemplates = [
  {
    id: 1,
    title: "Contratto di Fornitura",
    titleEn: "Supply Contract",
    category: "Commerciale",
    categoryEn: "Commercial",
    description: "Modello completo per regolare i rapporti con i fornitori, incluse clausole su qualità, tempistiche e penali.",
    descriptionEn: "Complete template to regulate supplier relationships, including quality, timing and penalty clauses.",
    price: 149,
    originalPrice: 199,
    features: ["Personalizzabile", "Clausole di garanzia", "Penali per inadempimento", "Formato Word + PDF"],
    featuresEn: ["Customizable", "Warranty clauses", "Default penalties", "Word + PDF format"],
    popular: false,
    color: "from-primary to-amber-600"
  },
  {
    id: 2,
    title: "Contratto di Distribuzione",
    titleEn: "Distribution Agreement",
    category: "Internazionale",
    categoryEn: "International",
    description: "Accordo per la distribuzione di prodotti su territorio nazionale o estero con esclusiva e target.",
    descriptionEn: "Agreement for product distribution on national or foreign territory with exclusivity and targets.",
    price: 249,
    originalPrice: 349,
    features: ["Versione IT + EN", "Clausole di esclusiva", "Obiettivi minimi", "Risoluzione anticipata"],
    featuresEn: ["IT + EN version", "Exclusivity clauses", "Minimum targets", "Early termination"],
    popular: true,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 3,
    title: "NDA - Accordo di Riservatezza",
    titleEn: "NDA - Non-Disclosure Agreement",
    category: "Essenziale",
    categoryEn: "Essential",
    description: "Proteggi le tue informazioni riservate con un accordo di non divulgazione professionale.",
    descriptionEn: "Protect your confidential information with a professional non-disclosure agreement.",
    price: 79,
    originalPrice: 99,
    features: ["Bilaterale o unilaterale", "Definizione informazioni", "Durata personalizzabile", "Clausola penale"],
    featuresEn: ["Bilateral or unilateral", "Information definition", "Customizable duration", "Penalty clause"],
    popular: false,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: 4,
    title: "Contratto di Agenzia",
    titleEn: "Agency Agreement",
    category: "Commerciale",
    categoryEn: "Commercial",
    description: "Regola i rapporti con agenti commerciali secondo la normativa italiana ed europea.",
    descriptionEn: "Regulates relationships with commercial agents according to Italian and European regulations.",
    price: 179,
    originalPrice: 229,
    features: ["Conforme normativa UE", "Provvigioni e bonus", "Zona e clientela", "Indennità di cessazione"],
    featuresEn: ["EU compliant", "Commissions and bonuses", "Territory and clients", "Termination indemnity"],
    popular: false,
    color: "from-violet-500 to-purple-600"
  },
  {
    id: 5,
    title: "Contratto di Licenza",
    titleEn: "License Agreement",
    category: "IP & Marchi",
    categoryEn: "IP & Trademarks",
    description: "Concedi in licenza marchi, brevetti o know-how con tutela completa della proprietà intellettuale.",
    descriptionEn: "License trademarks, patents or know-how with complete intellectual property protection.",
    price: 299,
    originalPrice: 399,
    features: ["Licenza esclusiva/non", "Royalties strutturate", "Controllo qualità", "Territorialità"],
    featuresEn: ["Exclusive/non license", "Structured royalties", "Quality control", "Territoriality"],
    popular: true,
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 6,
    title: "Patto Parasociale",
    titleEn: "Shareholders Agreement",
    category: "Societario",
    categoryEn: "Corporate",
    description: "Accordi tra soci per governance, trasferimento quote, lock-up e gestione dei conflitti.",
    descriptionEn: "Agreements between shareholders for governance, share transfers, lock-up and conflict management.",
    price: 349,
    originalPrice: 449,
    features: ["Tag/Drag along", "Diritto di prelazione", "Lock-up period", "Governance rules"],
    featuresEn: ["Tag/Drag along", "Right of first refusal", "Lock-up period", "Governance rules"],
    popular: false,
    color: "from-cyan-500 to-blue-500"
  }
];

const ContractCard = ({ contract, index }: { contract: typeof contractTemplates[0]; index: number }) => {
  const { language, t } = useLanguage();
  const discount = Math.round((1 - contract.price / contract.originalPrice) * 100);
  
  const title = language === 'en' ? contract.titleEn : contract.title;
  const category = language === 'en' ? contract.categoryEn : contract.category;
  const description = language === 'en' ? contract.descriptionEn : contract.description;
  const features = language === 'en' ? contract.featuresEn : contract.features;
  
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
        {/* Popular Badge - inside the card */}
        {contract.popular && (
          <div className="absolute top-4 right-4 z-10">
            <Badge className="bg-gradient-to-r from-primary to-amber-500 text-primary-foreground px-3 py-1 flex items-center gap-1 shadow-lg text-xs">
              <Star className="w-3 h-3 fill-current" />
              {t("contracts.mostSold")}
            </Badge>
          </div>
        )}

        {/* Header - fixed height */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${contract.color} flex items-center justify-center flex-shrink-0`}>
              <FileText className="w-5 h-5 text-white" />
            </div>
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
          </div>
          <h3 className="text-lg font-bold text-foreground font-serif leading-tight h-[56px] flex items-start">
            {title}
          </h3>
        </div>

        {/* Description - fixed height */}
        <p className="text-sm text-muted-foreground mb-4 h-[60px] line-clamp-3">
          {description}
        </p>

        {/* Features - fixed height */}
        <ul className="space-y-2 mb-4 h-[120px]">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Price - fixed position at bottom */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-foreground">€{contract.price}</span>
            <span className="text-sm text-muted-foreground line-through">€{contract.originalPrice}</span>
            <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-400 text-xs ml-auto">
              -{discount}%
            </Badge>
          </div>

          {/* CTA Button */}
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            {t("contracts.buyNow")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export const ContractTemplatesSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contratti" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, hsl(43 74% 49% / 0.05) 0%, transparent 60%)'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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

          {/* Trust badges */}
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

      {/* Horizontal Scrolling Gallery */}
      <div 
        className="flex gap-6 px-4 md:px-8 overflow-x-auto scrollbar-hide py-4"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Spacer for initial offset */}
        <div className="flex-shrink-0 w-4 md:w-[calc((100vw-1280px)/2)]" />
        
        {contractTemplates.map((contract, index) => (
          <ContractCard key={contract.id} contract={contract} index={index} />
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

      <div className="container mx-auto px-4 relative z-10">

        {/* Bottom CTA */}
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
            asChild
          >
            <a href="#contact">
              {t("contracts.requestCustom")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { 
  FileText, 
  ShoppingCart, 
  Download, 
  Check,
  Star,
  Shield,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const contractTemplates = [
  {
    id: 1,
    title: "Contratto di Fornitura",
    category: "Commerciale",
    description: "Modello completo per regolare i rapporti con i fornitori, incluse clausole su qualità, tempistiche e penali.",
    price: 149,
    originalPrice: 199,
    features: [
      "Personalizzabile",
      "Clausole di garanzia",
      "Penali per inadempimento",
      "Formato Word + PDF"
    ],
    popular: false,
    color: "from-primary to-amber-600"
  },
  {
    id: 2,
    title: "Contratto di Distribuzione",
    category: "Internazionale",
    description: "Accordo per la distribuzione di prodotti su territorio nazionale o estero con esclusiva e target.",
    price: 249,
    originalPrice: 349,
    features: [
      "Versione IT + EN",
      "Clausole di esclusiva",
      "Obiettivi minimi",
      "Risoluzione anticipata"
    ],
    popular: true,
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: 3,
    title: "NDA - Accordo di Riservatezza",
    category: "Essenziale",
    description: "Proteggi le tue informazioni riservate con un accordo di non divulgazione professionale.",
    price: 79,
    originalPrice: 99,
    features: [
      "Bilaterale o unilaterale",
      "Definizione informazioni",
      "Durata personalizzabile",
      "Clausola penale"
    ],
    popular: false,
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: 4,
    title: "Contratto di Agenzia",
    category: "Commerciale",
    description: "Regola i rapporti con agenti commerciali secondo la normativa italiana ed europea.",
    price: 179,
    originalPrice: 229,
    features: [
      "Conforme normativa UE",
      "Provvigioni e bonus",
      "Zona e clientela",
      "Indennità di cessazione"
    ],
    popular: false,
    color: "from-violet-500 to-purple-600"
  },
  {
    id: 5,
    title: "Contratto di Licenza",
    category: "IP & Marchi",
    description: "Concedi in licenza marchi, brevetti o know-how con tutela completa della proprietà intellettuale.",
    price: 299,
    originalPrice: 399,
    features: [
      "Licenza esclusiva/non",
      "Royalties strutturate",
      "Controllo qualità",
      "Territorialità"
    ],
    popular: true,
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 6,
    title: "Patto Parasociale",
    category: "Societario",
    description: "Accordi tra soci per governance, trasferimento quote, lock-up e gestione dei conflitti.",
    price: 349,
    originalPrice: 449,
    features: [
      "Tag/Drag along",
      "Diritto di prelazione",
      "Lock-up period",
      "Governance rules"
    ],
    popular: false,
    color: "from-cyan-500 to-blue-500"
  }
];

const ContractCard = ({ contract, index }: { contract: typeof contractTemplates[0]; index: number }) => {
  const discount = Math.round((1 - contract.price / contract.originalPrice) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative ${contract.popular ? 'pt-4' : ''}`}
    >
      {/* Popular Badge - positioned outside the card */}
      {contract.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-gradient-to-r from-primary to-amber-500 text-primary-foreground px-4 py-1.5 flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            Più venduto
          </Badge>
        </div>
      )}
      
      <div 
        className="relative h-full rounded-xl p-6 liquid-glass-card-sm flex flex-col transition-all duration-300 hover:shadow-xl"
        style={{
          background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)'
        }}
      >

        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contract.color} flex items-center justify-center flex-shrink-0`}>
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="mb-2 text-xs">
              {contract.category}
            </Badge>
            <h3 className="text-lg font-bold text-foreground font-serif leading-tight">
              {contract.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 flex-1">
          {contract.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {contract.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">€{contract.price}</span>
              <span className="text-sm text-muted-foreground line-through">€{contract.originalPrice}</span>
            </div>
            <Badge variant="secondary" className="mt-1 bg-emerald-500/15 text-emerald-400 text-xs">
              -{discount}% di sconto
            </Badge>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Acquista ora
        </Button>
      </div>
    </motion.div>
  );
};

export const ContractTemplatesSection = () => {
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
            Modelli Pronti all'Uso
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif">
            Contratti Professionali
            <br />
            <span className="gradient-text-gold">a portata di click</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Modelli di contratto redatti dai nostri avvocati, pronti per essere personalizzati. 
            Risparmia tempo e denaro con documenti legali professionali.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span>Redatti da avvocati</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              <span>Download immediato</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Aggiornati 2024</span>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contractTemplates.map((contract, index) => (
            <ContractCard key={contract.id} contract={contract} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Hai bisogno di un contratto su misura? Contattaci per una consulenza personalizzata.
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary/30 hover:bg-primary/10"
            asChild
          >
            <a href="#contact">
              Richiedi contratto personalizzato
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Globe, 
  Building2, 
  FileText, 
  Shield, 
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  CheckCircle
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    id: 1,
    icon: Briefcase,
    title: "General Counselling",
    titleEn: "General Counselling",
    description: "Supporto legale quotidiano a 360 gradi per ogni esigenza aziendale.",
    descriptionEn: "360-degree daily legal support for every business need.",
    color: "from-primary to-amber-600",
    badge: "Supporto quotidiano",
    badgeEn: "Daily support",
    fullContent: {
      subtitle: "Assistenza quotidiana altamente formata",
      subtitleEn: "Highly trained daily assistance",
      intro: "L'avvocato oggi non è e non può più essere il soggetto a cui rivolgersi al solo fine di risolvere i problemi dopo la loro insorgenza. Viste le lungaggini della giustizia italiana ed i costi necessari a porre rimedio ad una situazione già degradata, l'obiettivo deve essere obbligatoriamente quello di prevenire l'insorgere di problemi già nella loro fase embrionale.",
      introEn: "Today, a lawyer can no longer be someone you turn to only to solve problems after they arise. Given the delays in Italian justice and the costs required to remedy an already degraded situation, the goal must be to prevent problems from arising in their early stages.",
      whyUs: "Noi abbiamo da sempre prestato tale tipo di assistenza, trasformandola in uno dei nostri punti di forza. Siamo costantemente al fianco dei nostri clienti ed agiamo sia da consulenti legali esterni per coloro che sono sprovvisti di un team legale interno che da consulenti specializzati chiamati ad intervenire nelle questioni più delicate.",
      whyUsEn: "We have always provided this type of assistance, making it one of our strengths. We are constantly by our clients' side and act as external legal consultants for those without an in-house legal team, as well as specialized consultants called upon to intervene in the most delicate matters.",
      benefits: [
        "Consulenza ed assistenza altamente formata",
        "Presenza costante ed immediata",
        "Capacità ed esperienza nel capire i bisogni delle imprese"
      ],
      benefitsEn: [
        "Highly trained advice and assistance",
        "Constant and immediate presence",
        "Ability and experience in understanding business needs"
      ]
    }
  },
  {
    id: 2,
    icon: Globe,
    title: "Commercio Internazionale",
    titleEn: "International Trade",
    description: "Un'opportunità di crescita: accompagniamo l'espansione internazionale della vostra impresa.",
    descriptionEn: "A growth opportunity: we accompany the international expansion of your business.",
    color: "from-blue-500 to-indigo-600",
    badge: "Espansione globale",
    badgeEn: "Global expansion",
    fullContent: {
      subtitle: "Un'opportunità di crescita",
      subtitleEn: "A growth opportunity",
      intro: "Per la crescita di un'impresa, espandersi nei mercati esteri è basilare, soprattutto a fronte di un mondo odierno sempre più globalizzato. Le imprese non possono permettersi di perdere l'occasione non solo in ordine all'immissione dei propri prodotti e servizi, ma anche in relazione alla produzione di questi ultimi.",
      introEn: "For a company's growth, expanding into foreign markets is essential, especially in today's increasingly globalized world. Companies cannot afford to miss the opportunity not only in terms of introducing their products and services, but also in relation to their production.",
      whyUs: "Una parte importante della nostra attività, dialogando quotidianamente con multinazionali, è tutto ciò che riguarda la vita di una società nella sua dimensione internazionale, in special modo gestione dei contratti di import-export. Non solo da e verso l'Italia, ma anche cura di contratti da e verso entità societarie entrambe con sedi all'estero.",
      whyUsEn: "An important part of our activity, in daily dialogue with multinationals, is everything concerning a company's life in its international dimension, especially management of import-export contracts. Not only to and from Italy, but also care of contracts to and from corporate entities both based abroad.",
      benefits: [
        "Conosciamo i rischi del commercio internazionale ed aiutiamo ad evitarli",
        "Anni di esperienza nell'ambito del commercio internazionale",
        "Profonda conoscenza delle modalità di negoziazione dei paesi orientali",
        "Contratti con fornitori: fornitura, sub-fornitura, distribuzione",
        "Contratti di licenza, agenzia e joint venture",
        "Valutazione della commerciabilità di prodotti in Italia"
      ],
      benefitsEn: [
        "We know the risks of international trade and help avoid them",
        "Years of experience in international trade",
        "Deep knowledge of negotiation methods in Eastern countries",
        "Supplier contracts: supply, sub-supply, distribution",
        "License, agency and joint venture contracts",
        "Assessment of product marketability in Italy"
      ]
    }
  },
  {
    id: 3,
    icon: Building2,
    title: "Diritto Societario e M&A",
    titleEn: "Corporate Law & M&A",
    description: "Assistenza specialistica nelle operazioni societarie ordinarie e straordinarie.",
    descriptionEn: "Specialized assistance in ordinary and extraordinary corporate operations.",
    color: "from-emerald-500 to-teal-600",
    badge: "Operazioni straordinarie",
    badgeEn: "Extraordinary operations",
    fullContent: {
      subtitle: "Piena soddisfazione senza sprechi di risorse economiche e di tempo",
      subtitleEn: "Full satisfaction without waste of economic and time resources",
      intro: "Questo ramo del diritto è uno dei più delicati, poiché richiede non solo padronanza delle norme sostanziali ma anche e soprattutto conoscenza del mondo imprenditoriale, navigata esperienza negoziale, capacità di relazionarsi con le parti e molto altro.",
      introEn: "This branch of law is one of the most delicate, as it requires not only mastery of substantive rules but also and above all knowledge of the business world, seasoned negotiating experience, ability to relate to the parties and much more.",
      whyUs: "Da anni accompagniamo clienti italiani e stranieri, siano essi PMI o grandi gruppi internazionali, nella cura di tutti gli aspetti relativi alla gestione sia ordinaria che straordinaria delle imprese.",
      whyUsEn: "For years we have accompanied Italian and foreign clients, whether SMEs or large international groups, in taking care of all aspects relating to both ordinary and extraordinary business management.",
      benefits: [
        "Conosciamo il mondo imprenditoriale e ne condividiamo la visione pragmatica",
        "Assistiamo i clienti in ogni fase delle attività necessarie",
        "Costituzione di società, start-up e strutture societarie",
        "Fusioni, scissioni, trasformazioni, aumenti di capitale",
        "Due diligence e predisposizione della data room",
        "Patti parasociali e corporate governance",
        "Gestione completa M&A: pre e post-closing",
        "Acquisizioni e cessioni di partecipazioni",
        "Put and call option agreements"
      ],
      benefitsEn: [
        "We know the business world and share its pragmatic vision",
        "We assist clients at every stage of the necessary activities",
        "Company incorporation, start-ups and corporate structures",
        "Mergers, demergers, transformations, capital increases",
        "Due diligence and data room preparation",
        "Shareholders' agreements and corporate governance",
        "Complete M&A management: pre and post-closing",
        "Acquisitions and disposals of shareholdings",
        "Put and call option agreements"
      ]
    }
  },
  {
    id: 4,
    icon: FileText,
    title: "Contrattualistica",
    titleEn: "Contract Law",
    description: "Negoziazione e redazione di contratti commerciali domestici e internazionali.",
    descriptionEn: "Negotiation and drafting of domestic and international commercial contracts.",
    color: "from-orange-500 to-red-600",
    badge: "Accordi sicuri",
    badgeEn: "Secure agreements",
    fullContent: {
      subtitle: "Struttura portante del commercio",
      subtitleEn: "The backbone of commerce",
      intro: "Nelle imprese ben ramificate ed intenzionate ad espandersi i contratti sono la struttura portante, interessandone sia l'organizzazione che le attività. Purtroppo, per quanto la loro importanza sia evidente, non sempre sono oggetto della necessaria attenzione.",
      introEn: "In well-branched companies intending to expand, contracts are the backbone, affecting both their organization and activities. Unfortunately, despite their evident importance, they are not always given the necessary attention.",
      whyUs: "Affidandovi al nostro studio, avrete la certezza che i vostri contratti verranno predisposti in maniera completa, con l'individuazione e previsione di tutto ciò che potrebbe accadere nella fase di esecuzione degli stessi.",
      whyUsEn: "By entrusting our firm, you will be certain that your contracts will be prepared completely, with the identification and prediction of everything that could happen during their execution phase.",
      benefits: [
        "Assistenza efficace in ogni fase delle negoziazioni nazionali e internazionali",
        "Attenzione nella predisposizione e redazione dei contratti",
        "Esperienza per garantire la maggiore protezione possibile",
        "Negoziazione, redazione e revisione contratti commerciali",
        "Analisi e mappatura degli impianti contrattuali aziendali",
        "Contratti con fornitori, finanziatori, licenze e brevetti"
      ],
      benefitsEn: [
        "Effective assistance at every stage of national and international negotiations",
        "Care in preparing and drafting contracts",
        "Experience to ensure the greatest possible protection",
        "Negotiation, drafting and revision of commercial contracts",
        "Analysis and mapping of company contractual systems",
        "Contracts with suppliers, lenders, licenses and patents"
      ]
    }
  },
  {
    id: 5,
    icon: Shield,
    title: "Compliance e Data Protection",
    titleEn: "Compliance & Data Protection",
    description: "GDPR e D.Lgs 231/2001: trasformiamo gli obblighi in vantaggi per la vostra azienda.",
    descriptionEn: "GDPR and D.Lgs 231/2001: we transform obligations into advantages for your company.",
    color: "from-violet-500 to-purple-600",
    badge: "Conformità garantita",
    badgeEn: "Guaranteed compliance",
    fullContent: {
      subtitle: "Da obbligo a vantaggio",
      subtitleEn: "From obligation to advantage",
      intro: "Nel nostro ordinamento vi sono diverse normative che richiedono un ingente impegno alle imprese nell'adeguarsi ai provvedimenti legislativi e regolamentari. Adeguarsi a tale moltitudine di requisiti ed obblighi non è opera facile.",
      introEn: "In our legal system there are various regulations that require a huge commitment from companies to comply with legislative and regulatory provisions. Adapting to this multitude of requirements and obligations is not easy.",
      whyUs: "Consci di tutto questo, costruiamo la struttura di compliance in modo da sfruttare tutti i vantaggi che la legge concede ed allo stesso tempo limitiamo e formalizziamo il meno possibile la tua impresa.",
      whyUsEn: "Aware of all this, we build the compliance structure in order to take advantage of all the benefits that the law grants and at the same time we limit and formalize your company as little as possible.",
      benefits: [
        "Trasformiamo un obbligo legislativo in vantaggio",
        "Struttura ad hoc senza ricorrere a prestampati",
        "Assistenza continua con aggiornamenti normativi",
        "Redazione e revisione di Modelli 231",
        "Implementazione documentazione GDPR",
        "Sviluppo organigramma privacy con DPO",
        "Valutazioni d'Impatto Privacy",
        "Consulenza per ispezioni e indagini"
      ],
      benefitsEn: [
        "We transform a legal obligation into an advantage",
        "Ad hoc structure without using templates",
        "Continuous assistance with regulatory updates",
        "Drafting and revision of 231 Models",
        "GDPR documentation implementation",
        "Privacy organization chart development with DPO",
        "Privacy Impact Assessments",
        "Consulting for inspections and investigations"
      ]
    }
  },
  {
    id: 6,
    icon: TrendingUp,
    title: "Business Development",
    titleEn: "Business Development",
    description: "Consulenza strategica legale ed economica per lo sviluppo del vostro business.",
    descriptionEn: "Strategic legal and economic consulting for the development of your business.",
    color: "from-cyan-500 to-blue-500",
    badge: "Crescita strategica",
    badgeEn: "Strategic growth",
    fullContent: {
      subtitle: "Tutta la nostra esperienza multidisciplinare al servizio dei vostri obiettivi",
      subtitleEn: "All our multidisciplinary experience at the service of your goals",
      intro: "Per quanto il punto focale degli imprenditori sia la cura dell'aspetto economico-commerciale dell'impresa, tralasciare l'importanza dell'aspetto legale costituisce non solo un grande rischio, ma anche una perdita in termini di opportunità.",
      introEn: "Although the focal point for entrepreneurs is the economic-commercial aspect of the company, neglecting the importance of the legal aspect constitutes not only a great risk, but also a loss in terms of opportunities.",
      whyUs: "Grazie all'esperienza ed alle conoscenze maturate negli anni al fianco di molteplici imprese operanti in vari settori industriali, del commercio e dei servizi, siamo in grado di apportare un contributo utile nella scelta degli obiettivi ed implementazione della strategia per il loro raggiungimento.",
      whyUsEn: "Thanks to the experience and knowledge gained over the years alongside multiple companies operating in various industrial, trade and service sectors, we are able to make a useful contribution in choosing objectives and implementing the strategy to achieve them.",
      benefits: [
        "Preparazione per assistere sulle scelte legali per il business",
        "Contributo alla crescita del business dei nostri clienti",
        "Supporto dalla sede di Cipro",
        "Internazionalizzazione dell'impresa",
        "Stesura del business plan",
        "Analisi dell'organizzazione legale",
        "Assistenza nella pianificazione fiscale"
      ],
      benefitsEn: [
        "Preparation to assist on legal choices for business",
        "Contribution to the business growth of our clients",
        "Support from Cyprus headquarters",
        "Company internationalization",
        "Business plan drafting",
        "Legal organization analysis",
        "Assistance in tax planning"
      ]
    }
  }
];

type ServiceType = typeof services[0];

const ServiceSheet = ({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: ServiceType | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const { language, t } = useLanguage();
  
  if (!service) return null;

  const title = language === 'en' ? service.titleEn : service.title;
  const subtitle = language === 'en' ? service.fullContent.subtitleEn : service.fullContent.subtitle;
  const intro = language === 'en' ? service.fullContent.introEn : service.fullContent.intro;
  const whyUs = language === 'en' ? service.fullContent.whyUsEn : service.fullContent.whyUs;
  const benefits = language === 'en' ? service.fullContent.benefitsEn : service.fullContent.benefits;

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
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
              <service.icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <SheetTitle className="text-2xl font-bold text-foreground font-serif text-left">
                {title}
              </SheetTitle>
              <p className="text-primary font-medium text-left">
                {subtitle}
              </p>
            </div>
          </div>
        </SheetHeader>
        
        {/* Content */}
        <div className="py-6 space-y-6">
          <div>
            <p className="text-foreground/90 leading-relaxed">
              {intro}
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
              {t("services.whyUs")}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {whyUs}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 font-serif">
              {t("services.whatWeOffer")}
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit, i) => (
                <li 
                  key={i}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
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
            {t("services.requestQuote")}
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const ServiceCard = ({ 
  service, 
  index,
  onClick 
}: { 
  service: ServiceType; 
  index: number;
  onClick: () => void;
}) => {
  const { language, t } = useLanguage();
  const IconComponent = service.icon;
  
  const title = language === 'en' ? service.titleEn : service.title;
  const description = language === 'en' ? service.descriptionEn : service.description;
  const badge = language === 'en' ? service.badgeEn : service.badge;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex-shrink-0 w-[320px] group cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
      onClick={onClick}
    >
      <div 
        className="relative h-full rounded-xl p-6 glass-card-hover flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      >
        {/* Top Row - Badge */}
        <div className="flex items-center justify-end mb-4">
          <div className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-400">
            {badge}
          </div>
        </div>

        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors font-serif">
              {title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-6 flex-grow line-clamp-3">
          {description}
        </p>

        {/* CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <span className="text-xs text-muted-foreground">{t("services.clickForDetails")}</span>
          <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
            {t("services.learnMore")}
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { t } = useLanguage();

  const handleCardClick = (service: ServiceType) => {
    setSelectedService(service);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

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
          <ServiceCard 
            key={service.id} 
            service={service} 
            index={index}
            onClick={() => handleCardClick(service)}
          />
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

      {/* Sheet */}
      <ServiceSheet 
        service={selectedService}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
      />
    </section>
  );
};

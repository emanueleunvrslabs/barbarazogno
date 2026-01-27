import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "it" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  it: {
    // Navbar
    "nav.home": "Home",
    "nav.services": "Servizi",
    "nav.about": "Chi Siamo",
    "nav.expertise": "Competenze",
    "nav.contracts": "Contratti",
    "nav.pricing": "Prezzi",
    "nav.contact": "Contattaci",
    "nav.logout": "Esci",

    // Hero Section
    "hero.partner": "IL TUO PARTNER",
    "hero.with": "CON",
    "hero.word1": "REATTIVITÀ.",
    "hero.word2": "COMPETENZA.",
    "hero.word3": "AFFIDABILITÀ.",
    "hero.description": "Coniughiamo la reattività di un team legale interno con la preparazione di uno studio di livello internazionale. La vostra crescita è la nostra missione.",
    "hero.cta": "Richiedi Consulenza",
    "hero.italy": "Italia",
    "hero.cyprus": "Cipro",
    "hero.clients": "Clienti assistiti con successo",
    "hero.international": "Presenza Internazionale",
    "hero.outsourcing": "Studio Legale in OutSourcing",
    "hero.support": "Supporto continuo",
    "hero.costs": "Costi sostenibili",

    // Legal Categories Marquee
    "marquee.generalCounselling": "General Counselling",
    "marquee.internationalTrade": "Commercio Internazionale",
    "marquee.maCorporate": "M&A & Societario",
    "marquee.contracts": "Contrattualistica",
    "marquee.compliance": "Compliance & GDPR",
    "marquee.businessDev": "Business Development",
    "marquee.civilLaw": "Diritto Civile",
    "marquee.laborLaw": "Diritto del Lavoro",
    "marquee.bankingLaw": "Diritto Bancario",
    "marquee.litigation": "Contenzioso",

    // Case Types Section
    "services.badge": "I Nostri Servizi",
    "services.title": "Soluzioni legali per ogni esigenza",
    "services.description": "Offriamo servizi strutturati per accompagnare PMI e grandi imprese in ogni sfida legale, con costi sostenibili e qualità internazionale.",
    "services.scrollHint": "Scorri per vedere tutti i servizi",
    "services.requestConsultation": "Richiedi consulenza",
    "services.consulting": "Consulenza",
    "services.international": "Internazionale",
    "services.corporate": "Societario",
    "services.complianceTag": "Compliance",
    "services.dailySupport": "Supporto quotidiano",
    "services.globalExpansion": "Espansione globale",
    "services.extraordinaryOps": "Operazioni straordinarie",
    "services.guaranteedCompliance": "Conformità garantita",
    "services.continuousLegal": "Assistenza legale continuativa",
    "services.quickResponse": "Risposta rapida",
    "services.dedicatedTeam": "Team dedicato",
    "services.internationalContracts": "Contratti internazionali",
    "services.customsRegulations": "Normativa doganale",
    "services.foreignRelations": "Rapporti esteri",
    "services.dueDiligence": "Due diligence",
    "services.mergersAcquisitions": "Fusioni e acquisizioni",
    "services.restructuring": "Ristrutturazioni",
    "services.privacyGdpr": "Privacy & GDPR",
    "services.dlgs231": "D.Lgs 231/2001",
    "services.complianceAudit": "Audit compliance",
    "services.contractsTag": "Contratti",
    "services.secureAgreements": "Accordi sicuri",
    "services.draftingNegotiation": "Redazione e negoziazione",
    "services.contractReview": "Revisione contratti",
    "services.contractManagement": "Gestione contrattuale",
    "services.litigationTag": "Contenzioso",
    "services.defenseProtection": "Difesa e tutela",
    "services.civilLitigation": "Contenzioso civile",
    "services.commercialDisputes": "Controversie commerciali",
    "services.alternativeResolution": "Risoluzione alternativa",
    "services.whyUs": "Perché affidarti a noi?",
    "services.whatWeOffer": "Cosa offriamo",
    "services.requestQuote": "Richiedi Preventivo",
    "services.learnMore": "Scopri di più",
    "services.clickForDetails": "Clicca per dettagli",

    // How It Works
    "how.badge": "Come Lavoriamo",
    "how.title1": "Dal primo contatto",
    "how.title2": "alla partnership",
    "how.description": "Un processo chiaro e trasparente per costruire un rapporto di fiducia duraturo.",
    "how.step1.title": "Primo contatto",
    "how.step1.description": "Ci racconti la tua situazione e le tue esigenze. Ascoltiamo attentamente per capire come possiamo aiutarti al meglio.",
    "how.step2.title": "Analisi e strategia",
    "how.step2.description": "Il nostro team analizza il caso e definisce la strategia più efficace, con la reattività di uno studio interno e la competenza internazionale.",
    "how.step3.title": "Proposta personalizzata",
    "how.step3.description": "Presentiamo una proposta chiara con costi definiti e tempi certi. Trasparenza totale, senza sorprese.",
    "how.step4.title": "Partnership duratura",
    "how.step4.description": "Costruiamo un rapporto di fiducia nel tempo, diventando il vostro partner strategico per ogni sfida legale.",
    "how.quote": "\"Questa legal boutique è nata dalla mia passione verso il mondo delle imprese e della professione. Provvediamo ad offrire i nostri servizi ogni giorno con piena soddisfazione e senza inutili complicazioni.\"",
    "how.quoteAuthor": "— Barbara Zogno, Founder e Managing Partner",
    "how.cta": "Richiedi una Consulenza",

    // Features Section
    "features.whyUs": "Perché affidarti a noi?",
    "features.whyChoose": "Perché le imprese ci scelgono",
    "features.learnMore": "Scopri di più",
    "features.requestConsultation": "Richiedi Consulenza",
    "features.badge": "Le Nostre Competenze",
    "features.title": "Expertise che fa la differenza",
    "features.description": "Competenze specialistiche sviluppate in anni di esperienza al fianco delle imprese.",

    // Pricing Section
    "pricing.badge": "Le Nostre Soluzioni",
    "pricing.title1": "Pacchetti su misura",
    "pricing.title2": "per ogni esigenza",
    "pricing.description": "Soluzioni flessibili che si adattano alle dimensioni e alle necessità della vostra impresa.",
    "pricing.mostRequested": "Più Richiesto",
    "pricing.consultation": "Consulenza",
    "pricing.consultationDesc": "Per esigenze specifiche e puntuali",
    "pricing.onQuote": "Su preventivo",
    "pricing.outsourcing": "OutSourcing",
    "pricing.outsourcingDesc": "Studio Legale in OutSourcing per PMI",
    "pricing.monthlyPackage": "Pacchetto mensile",
    "pricing.international": "International",
    "pricing.internationalDesc": "Per imprese con operatività internazionale",
    "pricing.customized": "Personalizzato",
    "pricing.requestQuote": "Richiedi Preventivo",
    "pricing.discoverPackage": "Scopri il Pacchetto",
    "pricing.contactUs": "Contattaci",
    "pricing.feature.targetedLegal": "Consulenza legale mirata",
    "pricing.feature.contractDrafting": "Redazione contratti",
    "pricing.feature.legalOpinions": "Pareri legali",
    "pricing.feature.judicialAssistance": "Assistenza giudiziale",
    "pricing.feature.transparentQuote": "Preventivo trasparente",
    "pricing.feature.continuousSupport": "Supporto legale continuativo",
    "pricing.feature.immediateReactivity": "Reattività immediata",
    "pricing.feature.sustainableCosts": "Costi sostenibili e prevedibili",
    "pricing.feature.dedicatedTeam": "Team dedicato",
    "pricing.feature.fullAssistance": "Assistenza a 360 gradi",
    "pricing.feature.lastingRelationship": "Rapporto duraturo",
    "pricing.feature.italyCyprus": "Sedi Italia e Cipro",
    "pricing.feature.internationalContracts": "Contrattualistica internazionale",
    "pricing.feature.tradeCompliance": "Trade compliance",
    "pricing.feature.crossBorderMA": "M&A cross-border",
    "pricing.feature.globalNetwork": "Network globale",
    "pricing.trustText": "⚖️ Prima consulenza gratuita · 🔒 Riservatezza garantita · 🌍 Operatività internazionale",

    // Contract Templates Section
    "contracts.badge": "Modelli Pronti all'Uso",
    "contracts.title1": "Contratti Professionali",
    "contracts.title2": "a portata di click",
    "contracts.description": "Modelli di contratto redatti dai nostri avvocati, pronti per essere personalizzati. Risparmia tempo e denaro con documenti legali professionali.",
    "contracts.draftedByLawyers": "Redatti da avvocati",
    "contracts.immediateDownload": "Download immediato",
    "contracts.updated": "Aggiornati 2024",
    "contracts.scrollHint": "Scorri per vedere tutti i contratti",
    "contracts.customRequest": "Hai bisogno di un contratto su misura? Contattaci per una consulenza personalizzata.",
    "contracts.requestCustom": "Richiedi contratto personalizzato",
    "contracts.mostSold": "Più venduto",
    "contracts.buyNow": "Acquista ora",

    // Footer
    "footer.ctaTitle": "Pronti a diventare il vostro partner legale?",
    "footer.ctaDescription": "Contattateci per una consulenza gratuita. Costruiamo insieme il futuro della vostra impresa.",
    "footer.requestConsultation": "Richiedi Consulenza",
    "footer.callUs": "Chiamaci",
    "footer.services": "Servizi",
    "footer.studio": "Studio",
    "footer.legal": "Legale",
    "footer.aboutUs": "Chi Siamo",
    "footer.team": "Il Team",
    "footer.contact": "Contatti",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.cookiePolicy": "Cookie Policy",
    "footer.description": "Legal Boutique con la reattività di un team interno e la competenza di uno studio internazionale.",
    "footer.allRights": "Tutti i diritti riservati.",
    "footer.developedWith": "Sviluppato con",
    "footer.by": "da",
    "footer.lawyerAccess": "Area Avvocati",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About Us",
    "nav.expertise": "Expertise",
    "nav.contracts": "Contracts",
    "nav.pricing": "Pricing",
    "nav.contact": "Contact Us",
    "nav.logout": "Logout",

    // Hero Section
    "hero.partner": "YOUR PARTNER",
    "hero.with": "WITH",
    "hero.word1": "REACTIVITY.",
    "hero.word2": "EXPERTISE.",
    "hero.word3": "RELIABILITY.",
    "hero.description": "We combine the reactivity of an in-house legal team with the expertise of an international law firm. Your growth is our mission.",
    "hero.cta": "Request Consultation",
    "hero.italy": "Italy",
    "hero.cyprus": "Cyprus",
    "hero.clients": "Clients successfully assisted",
    "hero.international": "International Presence",
    "hero.outsourcing": "Outsourced Legal Services",
    "hero.support": "Continuous support",
    "hero.costs": "Sustainable costs",

    // Legal Categories Marquee
    "marquee.generalCounselling": "General Counselling",
    "marquee.internationalTrade": "International Trade",
    "marquee.maCorporate": "M&A & Corporate",
    "marquee.contracts": "Contract Law",
    "marquee.compliance": "Compliance & GDPR",
    "marquee.businessDev": "Business Development",
    "marquee.civilLaw": "Civil Law",
    "marquee.laborLaw": "Labor Law",
    "marquee.bankingLaw": "Banking Law",
    "marquee.litigation": "Litigation",

    // Case Types Section
    "services.badge": "Our Services",
    "services.title": "Legal solutions for every need",
    "services.description": "We offer structured services to support SMEs and large companies in every legal challenge, with sustainable costs and international quality.",
    "services.scrollHint": "Scroll to see all services",
    "services.requestConsultation": "Request consultation",
    "services.consulting": "Consulting",
    "services.international": "International",
    "services.corporate": "Corporate",
    "services.complianceTag": "Compliance",
    "services.dailySupport": "Daily support",
    "services.globalExpansion": "Global expansion",
    "services.extraordinaryOps": "Extraordinary operations",
    "services.guaranteedCompliance": "Guaranteed compliance",
    "services.continuousLegal": "Continuous legal assistance",
    "services.quickResponse": "Quick response",
    "services.dedicatedTeam": "Dedicated team",
    "services.internationalContracts": "International contracts",
    "services.customsRegulations": "Customs regulations",
    "services.foreignRelations": "Foreign relations",
    "services.dueDiligence": "Due diligence",
    "services.mergersAcquisitions": "Mergers & acquisitions",
    "services.restructuring": "Restructuring",
    "services.privacyGdpr": "Privacy & GDPR",
    "services.dlgs231": "D.Lgs 231/2001",
    "services.complianceAudit": "Compliance audit",
    "services.contractsTag": "Contracts",
    "services.secureAgreements": "Secure agreements",
    "services.draftingNegotiation": "Drafting & negotiation",
    "services.contractReview": "Contract review",
    "services.contractManagement": "Contract management",
    "services.litigationTag": "Litigation",
    "services.defenseProtection": "Defense & protection",
    "services.civilLitigation": "Civil litigation",
    "services.commercialDisputes": "Commercial disputes",
    "services.alternativeResolution": "Alternative resolution",
    "services.whyUs": "Why trust us?",
    "services.whatWeOffer": "What we offer",
    "services.requestQuote": "Request Quote",
    "services.learnMore": "Learn more",
    "services.clickForDetails": "Click for details",

    // How It Works
    "how.badge": "How We Work",
    "how.title1": "From first contact",
    "how.title2": "to partnership",
    "how.description": "A clear and transparent process to build a lasting relationship of trust.",
    "how.step1.title": "First contact",
    "how.step1.description": "Tell us about your situation and needs. We listen carefully to understand how we can best help you.",
    "how.step2.title": "Analysis and strategy",
    "how.step2.description": "Our team analyzes the case and defines the most effective strategy, with the reactivity of an in-house firm and international expertise.",
    "how.step3.title": "Customized proposal",
    "how.step3.description": "We present a clear proposal with defined costs and certain timelines. Total transparency, no surprises.",
    "how.step4.title": "Lasting partnership",
    "how.step4.description": "We build a relationship of trust over time, becoming your strategic partner for every legal challenge.",
    "how.quote": "\"This legal boutique was born from my passion for the business world and the profession. We provide our services every day with full satisfaction and without unnecessary complications.\"",
    "how.quoteAuthor": "— Barbara Zogno, Founder and Managing Partner",
    "how.cta": "Request a Consultation",

    // Features Section
    "features.whyUs": "Why trust us?",
    "features.whyChoose": "Why companies choose us",
    "features.learnMore": "Learn more",
    "features.requestConsultation": "Request Consultation",
    "features.badge": "Our Expertise",
    "features.title": "Expertise that makes the difference",
    "features.description": "Specialized skills developed through years of experience alongside companies.",

    // Pricing Section
    "pricing.badge": "Our Solutions",
    "pricing.title1": "Tailored packages",
    "pricing.title2": "for every need",
    "pricing.description": "Flexible solutions that adapt to the size and needs of your company.",
    "pricing.mostRequested": "Most Requested",
    "pricing.consultation": "Consultation",
    "pricing.consultationDesc": "For specific and punctual needs",
    "pricing.onQuote": "On quote",
    "pricing.outsourcing": "Outsourcing",
    "pricing.outsourcingDesc": "Outsourced Legal Services for SMEs",
    "pricing.monthlyPackage": "Monthly package",
    "pricing.international": "International",
    "pricing.internationalDesc": "For companies with international operations",
    "pricing.customized": "Customized",
    "pricing.requestQuote": "Request Quote",
    "pricing.discoverPackage": "Discover the Package",
    "pricing.contactUs": "Contact Us",
    "pricing.feature.targetedLegal": "Targeted legal advice",
    "pricing.feature.contractDrafting": "Contract drafting",
    "pricing.feature.legalOpinions": "Legal opinions",
    "pricing.feature.judicialAssistance": "Judicial assistance",
    "pricing.feature.transparentQuote": "Transparent quote",
    "pricing.feature.continuousSupport": "Continuous legal support",
    "pricing.feature.immediateReactivity": "Immediate reactivity",
    "pricing.feature.sustainableCosts": "Sustainable and predictable costs",
    "pricing.feature.dedicatedTeam": "Dedicated team",
    "pricing.feature.fullAssistance": "360° assistance",
    "pricing.feature.lastingRelationship": "Lasting relationship",
    "pricing.feature.italyCyprus": "Italy and Cyprus offices",
    "pricing.feature.internationalContracts": "International contracts",
    "pricing.feature.tradeCompliance": "Trade compliance",
    "pricing.feature.crossBorderMA": "Cross-border M&A",
    "pricing.feature.globalNetwork": "Global network",
    "pricing.trustText": "⚖️ Free first consultation · 🔒 Guaranteed confidentiality · 🌍 International operations",

    // Contract Templates Section
    "contracts.badge": "Ready-to-Use Templates",
    "contracts.title1": "Professional Contracts",
    "contracts.title2": "at your fingertips",
    "contracts.description": "Contract templates drafted by our lawyers, ready to be customized. Save time and money with professional legal documents.",
    "contracts.draftedByLawyers": "Drafted by lawyers",
    "contracts.immediateDownload": "Immediate download",
    "contracts.updated": "Updated 2024",
    "contracts.scrollHint": "Scroll to see all contracts",
    "contracts.customRequest": "Need a custom contract? Contact us for a personalized consultation.",
    "contracts.requestCustom": "Request custom contract",
    "contracts.mostSold": "Best seller",
    "contracts.buyNow": "Buy now",

    // Footer
    "footer.ctaTitle": "Ready to become your legal partner?",
    "footer.ctaDescription": "Contact us for a free consultation. Let's build the future of your company together.",
    "footer.requestConsultation": "Request Consultation",
    "footer.callUs": "Call Us",
    "footer.services": "Services",
    "footer.studio": "Firm",
    "footer.legal": "Legal",
    "footer.aboutUs": "About Us",
    "footer.team": "The Team",
    "footer.contact": "Contact",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.cookiePolicy": "Cookie Policy",
    "footer.description": "Legal Boutique with the reactivity of an in-house team and the expertise of an international firm.",
    "footer.allRights": "All rights reserved.",
    "footer.developedWith": "Developed with",
    "footer.by": "by",
    "footer.lawyerAccess": "Lawyer Access",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language");
      return (saved as Language) || "it";
    }
    return "it";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

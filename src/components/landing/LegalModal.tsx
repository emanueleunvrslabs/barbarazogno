import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface LegalModalProps {
  open: boolean;
  onClose: () => void;
  type: "privacy" | "cookie";
}

export const LegalModal = ({ open, onClose, type }: LegalModalProps) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  const privacySections = [
    {
      titleIt: "1. Titolare del Trattamento",
      titleEn: "1. Data Controller",
      contentIt: "Il titolare del trattamento dei dati personali è Zogno & Partners, con sede in Viale Trento, 36100 Vicenza (VI), Italia. Email: info@legalboutiques.com",
      contentEn: "The data controller is Zogno & Partners, located at Viale Trento, 36100 Vicenza (VI), Italy. Email: info@legalboutiques.com",
    },
    {
      titleIt: "2. Dati Raccolti",
      titleEn: "2. Data Collected",
      contentIt: "Raccogliamo i seguenti dati personali: nome, cognome, indirizzo email, numero di telefono e qualsiasi informazione fornita volontariamente tramite i moduli di contatto presenti sul sito.",
      contentEn: "We collect the following personal data: first name, last name, email address, phone number, and any information voluntarily provided through the contact forms on the website.",
    },
    {
      titleIt: "3. Finalità del Trattamento",
      titleEn: "3. Purpose of Processing",
      contentIt: "I dati personali sono trattati per le seguenti finalità: rispondere alle richieste di consulenza, gestire i rapporti contrattuali, adempiere agli obblighi di legge e, previo consenso, inviare comunicazioni informative.",
      contentEn: "Personal data is processed for the following purposes: responding to consultation requests, managing contractual relationships, fulfilling legal obligations, and, with consent, sending informational communications.",
    },
    {
      titleIt: "4. Base Giuridica",
      titleEn: "4. Legal Basis",
      contentIt: "Il trattamento dei dati è basato sul consenso dell'interessato, sull'esecuzione di un contratto o di misure precontrattuali, e sull'adempimento di obblighi legali.",
      contentEn: "Data processing is based on the data subject's consent, the performance of a contract or pre-contractual measures, and compliance with legal obligations.",
    },
    {
      titleIt: "5. Diritti dell'Interessato",
      titleEn: "5. Data Subject Rights",
      contentIt: "L'interessato ha diritto di accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione al trattamento. Per esercitare tali diritti, contattare: info@legalboutiques.com",
      contentEn: "The data subject has the right to access, rectify, erase, restrict processing, data portability, and object to processing. To exercise these rights, contact: info@legalboutiques.com",
    },
    {
      titleIt: "6. Conservazione dei Dati",
      titleEn: "6. Data Retention",
      contentIt: "I dati personali saranno conservati per il tempo necessario al perseguimento delle finalità per cui sono stati raccolti e comunque nel rispetto dei termini di legge.",
      contentEn: "Personal data will be retained for the time necessary to fulfill the purposes for which it was collected and in compliance with legal requirements.",
    },
  ];

  const cookieSections = [
    {
      titleIt: "1. Cosa Sono i Cookie",
      titleEn: "1. What Are Cookies",
      contentIt: "I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente quando visita un sito web. Servono a migliorare l'esperienza di navigazione e a fornire informazioni al proprietario del sito.",
      contentEn: "Cookies are small text files stored on the user's device when visiting a website. They serve to improve the browsing experience and provide information to the site owner.",
    },
    {
      titleIt: "2. Cookie Tecnici",
      titleEn: "2. Technical Cookies",
      contentIt: "Questo sito utilizza cookie tecnici necessari per il corretto funzionamento del sito. Questi cookie non richiedono il consenso dell'utente e non possono essere disattivati.",
      contentEn: "This website uses technical cookies necessary for the proper functioning of the site. These cookies do not require user consent and cannot be disabled.",
    },
    {
      titleIt: "3. Cookie Analitici",
      titleEn: "3. Analytics Cookies",
      contentIt: "Utilizziamo cookie analitici per comprendere come gli utenti interagiscono con il sito, al fine di migliorarne le funzionalità e i contenuti. Questi dati sono raccolti in forma anonima.",
      contentEn: "We use analytics cookies to understand how users interact with the site, in order to improve its functionality and content. This data is collected anonymously.",
    },
    {
      titleIt: "4. Gestione dei Cookie",
      titleEn: "4. Managing Cookies",
      contentIt: "L'utente può gestire le preferenze sui cookie attraverso le impostazioni del proprio browser. La disattivazione di alcuni cookie potrebbe influire sulla funzionalità del sito.",
      contentEn: "Users can manage cookie preferences through their browser settings. Disabling some cookies may affect the functionality of the site.",
    },
    {
      titleIt: "5. Contatti",
      titleEn: "5. Contact",
      contentIt: "Per qualsiasi domanda relativa alla nostra cookie policy, contattare: info@legalboutiques.com",
      contentEn: "For any questions regarding our cookie policy, contact: info@legalboutiques.com",
    },
  ];

  const sections = type === "privacy" ? privacySections : cookieSections;
  const title = type === "privacy"
    ? (language === "it" ? "Informativa sulla Privacy" : "Privacy Policy")
    : "Cookie Policy";

  // Desktop: slide from left. Mobile: sheet from bottom.
  const desktopVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
    exit: { x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" as const } },
  };

  const mobileVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, damping: 30, stiffness: 300 } },
    exit: { y: "100%", opacity: 0, transition: { duration: 0.3, ease: "easeInOut" as const } },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className={`fixed z-50 bg-background border-border overflow-y-auto ${
              isMobile
                ? "inset-x-0 bottom-0 max-h-[85vh] rounded-t-2xl border-t"
                : "left-0 top-0 bottom-0 w-full max-w-xl border-r"
            }`}
            variants={isMobile ? mobileVariants : desktopVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Handle bar for mobile */}
            {isMobile && (
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>
            )}

            <div className="p-6 md:p-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground mb-8">
                {language === "it"
                  ? "Ultimo aggiornamento: Febbraio 2026"
                  : "Last updated: February 2026"}
              </p>

              {/* Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => (
                  <motion.section
                    key={index}
                    className="space-y-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      {language === "it" ? section.titleIt : section.titleEn}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {language === "it" ? section.contentIt : section.contentEn}
                    </p>
                  </motion.section>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

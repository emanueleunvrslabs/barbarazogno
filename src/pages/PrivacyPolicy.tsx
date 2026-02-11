import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <div className="fixed inset-0 mesh-gradient" />
      <div className="fixed inset-0 aurora-bg pointer-events-none" />
      <div className="grain-overlay" />
      <div className="relative z-10">
        <Navbar />
        <main className="container mx-auto px-4 py-32 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8 font-serif">
            {language === "it" ? "Informativa sulla Privacy" : "Privacy Policy"}
          </h1>
          <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
            <p className="text-lg text-muted-foreground">
              {language === "it"
                ? "Ultimo aggiornamento: Febbraio 2026"
                : "Last updated: February 2026"}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "1. Titolare del Trattamento" : "1. Data Controller"}
              </h2>
              <p>
                {language === "it"
                  ? "Il titolare del trattamento dei dati personali è Zogno & Partners, con sede in Viale Trento, 36100 Vicenza (VI), Italia. Email: info@legalboutiques.com"
                  : "The data controller is Zogno & Partners, located at Viale Trento, 36100 Vicenza (VI), Italy. Email: info@legalboutiques.com"}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "2. Dati Raccolti" : "2. Data Collected"}
              </h2>
              <p>
                {language === "it"
                  ? "Raccogliamo i seguenti dati personali: nome, cognome, indirizzo email, numero di telefono e qualsiasi informazione fornita volontariamente tramite i moduli di contatto presenti sul sito."
                  : "We collect the following personal data: first name, last name, email address, phone number, and any information voluntarily provided through the contact forms on the website."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "3. Finalità del Trattamento" : "3. Purpose of Processing"}
              </h2>
              <p>
                {language === "it"
                  ? "I dati personali sono trattati per le seguenti finalità: rispondere alle richieste di consulenza, gestire i rapporti contrattuali, adempiere agli obblighi di legge e, previo consenso, inviare comunicazioni informative."
                  : "Personal data is processed for the following purposes: responding to consultation requests, managing contractual relationships, fulfilling legal obligations, and, with consent, sending informational communications."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "4. Base Giuridica" : "4. Legal Basis"}
              </h2>
              <p>
                {language === "it"
                  ? "Il trattamento dei dati è basato sul consenso dell'interessato, sull'esecuzione di un contratto o di misure precontrattuali, e sull'adempimento di obblighi legali."
                  : "Data processing is based on the data subject's consent, the performance of a contract or pre-contractual measures, and compliance with legal obligations."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "5. Diritti dell'Interessato" : "5. Data Subject Rights"}
              </h2>
              <p>
                {language === "it"
                  ? "L'interessato ha diritto di accesso, rettifica, cancellazione, limitazione del trattamento, portabilità dei dati e opposizione al trattamento. Per esercitare tali diritti, contattare: info@legalboutiques.com"
                  : "The data subject has the right to access, rectify, erase, restrict processing, data portability, and object to processing. To exercise these rights, contact: info@legalboutiques.com"}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "6. Conservazione dei Dati" : "6. Data Retention"}
              </h2>
              <p>
                {language === "it"
                  ? "I dati personali saranno conservati per il tempo necessario al perseguimento delle finalità per cui sono stati raccolti e comunque nel rispetto dei termini di legge."
                  : "Personal data will be retained for the time necessary to fulfill the purposes for which it was collected and in compliance with legal requirements."}
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;

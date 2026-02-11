import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const CookiePolicy = () => {
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
            {language === "it" ? "Cookie Policy" : "Cookie Policy"}
          </h1>
          <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
            <p className="text-lg text-muted-foreground">
              {language === "it"
                ? "Ultimo aggiornamento: Febbraio 2026"
                : "Last updated: February 2026"}
            </p>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "1. Cosa Sono i Cookie" : "1. What Are Cookies"}
              </h2>
              <p>
                {language === "it"
                  ? "I cookie sono piccoli file di testo che vengono memorizzati sul dispositivo dell'utente quando visita un sito web. Servono a migliorare l'esperienza di navigazione e a fornire informazioni al proprietario del sito."
                  : "Cookies are small text files stored on the user's device when visiting a website. They serve to improve the browsing experience and provide information to the site owner."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "2. Cookie Tecnici" : "2. Technical Cookies"}
              </h2>
              <p>
                {language === "it"
                  ? "Questo sito utilizza cookie tecnici necessari per il corretto funzionamento del sito. Questi cookie non richiedono il consenso dell'utente e non possono essere disattivati."
                  : "This website uses technical cookies necessary for the proper functioning of the site. These cookies do not require user consent and cannot be disabled."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "3. Cookie Analitici" : "3. Analytics Cookies"}
              </h2>
              <p>
                {language === "it"
                  ? "Utilizziamo cookie analitici per comprendere come gli utenti interagiscono con il sito, al fine di migliorarne le funzionalità e i contenuti. Questi dati sono raccolti in forma anonima."
                  : "We use analytics cookies to understand how users interact with the site, in order to improve its functionality and content. This data is collected anonymously."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "4. Gestione dei Cookie" : "4. Managing Cookies"}
              </h2>
              <p>
                {language === "it"
                  ? "L'utente può gestire le preferenze sui cookie attraverso le impostazioni del proprio browser. La disattivazione di alcuni cookie potrebbe influire sulla funzionalità del sito."
                  : "Users can manage cookie preferences through their browser settings. Disabling some cookies may affect the functionality of the site."}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {language === "it" ? "5. Contatti" : "5. Contact"}
              </h2>
              <p>
                {language === "it"
                  ? "Per qualsiasi domanda relativa alla nostra cookie policy, contattare: info@legalboutiques.com"
                  : "For any questions regarding our cookie policy, contact: info@legalboutiques.com"}
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default CookiePolicy;

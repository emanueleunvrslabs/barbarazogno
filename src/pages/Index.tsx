import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { LegalCategoriesMarquee } from "@/components/landing/LegalCategoriesMarquee";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { ContractTemplatesSection } from "@/components/landing/ContractTemplatesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ConsultationDialog } from "@/components/landing/ConsultationDialog";
import { Footer } from "@/components/landing/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationReason, setConsultationReason] = useState("");

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  // Listen for custom event to open consultation dialog
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setConsultationReason(detail?.serviceName || "");
      setConsultationOpen(true);
    };
    window.addEventListener("open-consultation", handler);
    return () => window.removeEventListener("open-consultation", handler);
  }, []);

  // Show nothing while checking auth to avoid flash
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // If user is logged in, don't render (redirect is happening)
  if (user) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* SEO: Hidden structured text for search engines and AI crawlers */}
      <div className="sr-only" aria-hidden="false">
        <h1>Zogno &amp; Partners — Studio Legale Boutique a Vicenza e Cipro</h1>
        <p>
          Zogno &amp; Partners è uno studio legale boutique fondato dall'avvocato Barbara Zogno, 
          con sede a Vicenza (Italia) e Paphos (Cipro). Offriamo consulenza legale specializzata 
          per PMI e grandi imprese in General Counselling, M&amp;A, International Trade, 
          Compliance GDPR e contratti internazionali. Oltre 500 clienti soddisfatti in tutta Europa.
        </p>
        <p>
          Contatti: info@legalboutiques.com | Tel: +357 96619112 | 
          Viale Trento, 36100 Vicenza (VI) Italia | Paphos, Onisiforou Center, Cipro
        </p>
        <nav aria-label="Servizi offerti">
          <ul>
            <li>General Counselling — supporto legale quotidiano per imprese</li>
            <li>M&amp;A e Diritto Societario — fusioni, acquisizioni, operazioni straordinarie</li>
            <li>International Trade — commercio internazionale e contratti cross-border</li>
            <li>Compliance GDPR — adeguamento normativo e protezione dati</li>
            <li>Contratti legali pronti all'uso — templates professionali scaricabili</li>
          </ul>
        </nav>
      </div>
      {/* Modern mesh gradient background */}
      <div className="fixed inset-0 mesh-gradient" />
      
      {/* Subtle aurora effect */}
      <div className="fixed inset-0 aurora-bg pointer-events-none" />
      
      {/* Very subtle grain for texture */}
      <div className="grain-overlay" />
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <HeroSection />
          <LegalCategoriesMarquee />
          <ContractTemplatesSection />
          <PricingSection />
          <HowItWorksSection />
          <ServicesSection />
        </main>
        
        <Footer />
      </div>

      <ConsultationDialog open={consultationOpen} onOpenChange={setConsultationOpen} defaultReason={consultationReason} />
    </div>
  );
};

export default Index;

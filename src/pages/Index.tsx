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

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  // Listen for custom event to open consultation dialog
  useEffect(() => {
    const handler = () => setConsultationOpen(true);
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
          <HowItWorksSection />
          <ServicesSection />
          <ContractTemplatesSection />
          <PricingSection />
        </main>
        
        <Footer />
      </div>

      <ConsultationDialog open={consultationOpen} onOpenChange={setConsultationOpen} />
    </div>
  );
};

export default Index;

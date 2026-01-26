import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { LegalCategoriesMarquee } from "@/components/landing/LegalCategoriesMarquee";
import { CaseTypesSection } from "@/components/landing/CaseTypesSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ProblemSolutionSection } from "@/components/landing/ProblemSolutionSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { Footer } from "@/components/landing/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

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
          <CaseTypesSection />
          <HowItWorksSection />
          <ProblemSolutionSection />
          <FeaturesSection />
          <PricingSection />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
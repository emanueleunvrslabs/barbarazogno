import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { ConsultationRequestsSection } from "@/components/dashboard/ConsultationRequestsSection";
import { ContractTemplatesSection } from "@/components/dashboard/ContractTemplatesSection";
import { ContractPurchasesSection } from "@/components/dashboard/ContractPurchasesSection";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const currentTab = searchParams.get("tab") || "requests";

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar variant="dashboard" />

      {/* Main content with top padding for fixed navbar */}
      <main className="container mx-auto px-4 pt-24 pb-8">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentTab === "requests" && <ConsultationRequestsSection />}
          {currentTab === "contracts" && <ContractTemplatesSection />}
          {currentTab === "purchases" && <ContractPurchasesSection />}
        </motion.div>
      </main>
    </div>
  );
}

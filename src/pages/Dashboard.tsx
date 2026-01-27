import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Copy, 
  Check, 
  Briefcase, 
  Link2, 
  MessageSquare, 
  Share2,
  FileText,
  ShoppingCart
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { ConsultationRequestsSection } from "@/components/dashboard/ConsultationRequestsSection";
import { ContractTemplatesSection } from "@/components/dashboard/ContractTemplatesSection";
import { ContractPurchasesSection } from "@/components/dashboard/ContractPurchasesSection";

export default function Dashboard() {
  const { user, profile, studio, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [clientLinkCopied, setClientLinkCopied] = useState(false);

  // Genera il link unico per i clienti con nome studio e avvocato
  const clientIntakeLink = user ? (() => {
    const baseUrl = `${window.location.origin}/intake/${user.id}`;
    const params = new URLSearchParams();
    if (studio?.name) params.set("studio", studio.name);
    if (profile?.first_name || profile?.last_name) {
      const lawyerName = [profile.first_name, profile.last_name].filter(Boolean).join(" ");
      params.set("avvocato", lawyerName);
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  })() : "";

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const copyInviteCode = () => {
    if (studio?.invite_code) {
      navigator.clipboard.writeText(studio.invite_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          {/* Main Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Tabs defaultValue="requests" className="space-y-6">
              <TabsList className="bg-muted/30 border border-border p-1">
                <TabsTrigger 
                  value="requests" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <MessageSquare className="w-4 h-4" />
                  Richieste
                </TabsTrigger>
                <TabsTrigger 
                  value="contracts"
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <FileText className="w-4 h-4" />
                  Contratti
                </TabsTrigger>
                <TabsTrigger 
                  value="purchases"
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Acquisti
                </TabsTrigger>
              </TabsList>

              <TabsContent value="requests" className="mt-6">
                <ConsultationRequestsSection />
              </TabsContent>

              <TabsContent value="contracts" className="mt-6">
                <ContractTemplatesSection />
              </TabsContent>

              <TabsContent value="purchases" className="mt-6">
                <ContractPurchasesSection />
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

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
          {/* Quick Cards Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {/* Studio Card */}
            <motion.div
              className="p-5 liquid-glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-foreground">Il tuo studio</h2>
              </div>
              
              {studio ? (
                <div className="space-y-1">
                  <p className="text-lg font-medium text-foreground">{studio.name}</p>
                  {studio.p_iva && (
                    <p className="text-sm text-muted-foreground">P.IVA: {studio.p_iva}</p>
                  )}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary capitalize">
                    {userRole?.role || "member"}
                  </span>
                </div>
              ) : (
                <p className="text-muted-foreground">Nessuno studio associato</p>
              )}
            </motion.div>

            {/* Client Intake Link Card */}
            <motion.div
              className="p-5 liquid-glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="font-semibold text-foreground">Link per i clienti</h2>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                Condividi questo link con i tuoi clienti
              </p>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 py-2 rounded-lg bg-muted/30 border border-border text-sm text-muted-foreground truncate">
                  {clientIntakeLink}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(clientIntakeLink);
                    setClientLinkCopied(true);
                    setTimeout(() => setClientLinkCopied(false), 2000);
                  }}
                  className="shrink-0 bg-muted/30 border-border hover:bg-muted/50"
                  title="Copia link"
                >
                  {clientLinkCopied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Link2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={async () => {
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: `Consulenza legale - ${studio?.name || "Studio Legale"}`,
                          text: "Avvia una consulenza con il nostro assistente AI",
                          url: clientIntakeLink,
                        });
                      } catch {
                        // User cancelled or share failed
                      }
                    } else {
                      navigator.clipboard.writeText(clientIntakeLink);
                    }
                  }}
                  className="shrink-0 bg-muted/30 border-border hover:bg-muted/50"
                  title="Condividi"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            {/* Invite Code Card - Only for owners/admins */}
            {(userRole?.role === "owner" || userRole?.role === "admin") && studio && (
              <motion.div
                className="p-5 liquid-glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <Users className="w-5 h-5" />
                  </div>
                  <h2 className="font-semibold text-foreground">Invita colleghi</h2>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  Condividi questo codice con i tuoi colleghi
                </p>
                
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 rounded-lg bg-muted/30 border border-border font-mono text-lg tracking-wider text-center text-foreground">
                    {studio.invite_code}
                  </code>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyInviteCode}
                    className="shrink-0 bg-muted/30 border-border hover:bg-muted/50"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

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

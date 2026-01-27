import { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ContactFormSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get the first studio (for now, we'll use a default studio)
      const { data: studios, error: studioError } = await supabase
        .from("studios")
        .select("id")
        .limit(1);

      if (studioError || !studios || studios.length === 0) {
        throw new Error("Studio non trovato");
      }

      const studioId = studios[0].id;

      // Get a lawyer from the studio
      const { data: userRoles, error: userRoleError } = await supabase
        .from("user_roles")
        .select("user_id")
        .eq("studio_id", studioId)
        .limit(1);

      if (userRoleError || !userRoles || userRoles.length === 0) {
        throw new Error("Nessun avvocato trovato");
      }

      const lawyerId = userRoles[0].user_id;

      // Insert the consultation request
      const { error: insertError } = await supabase
        .from("consultation_requests")
        .insert({
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone || null,
          service_type: formData.service || "Consulenza Generale",
          message: formData.message || null,
          studio_id: studioId,
          lawyer_id: lawyerId,
          status: "new"
        });

      if (insertError) {
        throw insertError;
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      
      toast({
        title: t("contact.successTitle"),
        description: t("contact.successMessage"),
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: t("contact.errorTitle"),
        description: t("contact.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-lg bg-primary/15 text-primary text-sm font-medium mb-4">
              {t("contact.badge")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-serif">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              className="liquid-glass-card-lg p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)',
                border: '1px solid hsl(0 0% 100% / 0.1)'
              }}
            >
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 font-serif">
                    {t("contact.successTitle")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("contact.successMessage")}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        {t("contact.name")} *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t("contact.namePlaceholder")}
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        {t("contact.email")} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t("contact.emailPlaceholder")}
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" />
                        {t("contact.phone")}
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t("contact.phonePlaceholder")}
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service" className="text-foreground flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        {t("contact.service")}
                      </Label>
                      <Input
                        id="service"
                        type="text"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        placeholder={t("contact.servicePlaceholder")}
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t("contact.messagePlaceholder")}
                      className="bg-background/50 border-border focus:border-primary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t("contact.sending")}
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        {t("contact.submit")}
                      </>
                    )}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    {t("contact.privacy")}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

const WHATSAPP_NUMBER = "393468684244";

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConsultationDialog = ({ open, onOpenChange }: ConsultationDialogProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = [
      `*Richiesta Consulenza*`,
      ``,
      `👤 *Nome:* ${formData.firstName} ${formData.lastName}`,
      `📧 *Email:* ${formData.email}`,
      formData.phone ? `📞 *Telefono:* ${formData.phone}` : "",
      ``,
      `📝 *Motivo della consulenza:*`,
      formData.reason,
    ]
      .filter(Boolean)
      .join("\n");

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Reset and close
    setFormData({ firstName: "", lastName: "", email: "", phone: "", reason: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg border-border"
        style={{
          background:
            "linear-gradient(135deg, hsl(220 28% 14%) 0%, hsl(220 30% 10%) 100%)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground font-serif">
            {t("contact.title")}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {t("contact.description")}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                {t("contact.name")} *
              </Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                placeholder={t("contact.namePlaceholder")}
                className="bg-background/50 border-border focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Cognome *
              </Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                placeholder="Inserisci il cognome"
                className="bg-background/50 border-border focus:border-primary"
              />
            </div>
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
            <Label htmlFor="reason" className="text-foreground flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Motivo della consulenza *
            </Label>
            <Textarea
              id="reason"
              required
              rows={4}
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Descrivi brevemente il motivo della consulenza..."
              className="bg-background/50 border-border focus:border-primary resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-5 text-base font-semibold bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2"
          >
            <Send className="w-5 h-5" />
            Invia su WhatsApp
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            {t("contact.privacy")}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

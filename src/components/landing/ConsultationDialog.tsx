import { useState, useEffect } from "react";
import { User, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

const WHATSAPP_NUMBER = "393468684244";

interface ConsultationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultReason?: string;
}

const ConsultationForm = ({ onSubmit, defaultReason = "" }: { onSubmit: (e: React.FormEvent) => void; defaultReason?: string }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    reason: defaultReason,
  });

  // Update reason when defaultReason changes
  useEffect(() => {
    if (defaultReason) {
      setFormData(prev => ({ ...prev, reason: defaultReason }));
    }
  }, [defaultReason]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = [
      `*${t("contact.whatsappHeader")}*`,
      ``,
      `👤 *${t("contact.whatsappName")}:* ${formData.firstName} ${formData.lastName}`,
      ``,
      `📝 *${t("contact.whatsappReason")}:*`,
      formData.reason,
    ]
      .join("\n");

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    setFormData({ firstName: "", lastName: "", reason: "" });
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            {t("contact.firstName")} *
          </Label>
          <Input
            id="firstName"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder={t("contact.firstNamePlaceholder")}
            className="bg-background/50 border-border focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-foreground flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            {t("contact.lastName")} *
          </Label>
          <Input
            id="lastName"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder={t("contact.lastNamePlaceholder")}
            className="bg-background/50 border-border focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason" className="text-foreground flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-primary" />
          {t("contact.reason")} *
        </Label>
        <Textarea
          id="reason"
          required
          rows={3}
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          placeholder={t("contact.reasonPlaceholder")}
          className="bg-background/50 border-border focus:border-primary resize-none"
        />
      </div>

      <Button
        type="submit"
        className="w-full py-5 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-primary-foreground gap-2"
      >
        <Send className="w-5 h-5" />
        {t("contact.sendWhatsapp")}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        {t("contact.privacy")}
      </p>
    </form>
  );
};

export const ConsultationDialog = ({ open, onOpenChange, defaultReason = "" }: ConsultationDialogProps) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const handleFormSubmit = () => {
    onOpenChange(false);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          className="border-border px-4 pb-6"
          style={{
            background:
              "linear-gradient(135deg, hsl(220 28% 14%) 0%, hsl(220 30% 10%) 100%)",
          }}
        >
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl font-bold text-foreground font-serif">
              {t("contact.title")}
            </DrawerTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {t("contact.description")}
            </p>
          </DrawerHeader>
          <div className="px-2 overflow-y-auto max-h-[70vh]">
            <ConsultationForm onSubmit={handleFormSubmit} defaultReason={defaultReason} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto border-l border-border"
        style={{
          background:
            "linear-gradient(135deg, hsl(220 28% 14%) 0%, hsl(220 30% 10%) 100%)",
        }}
      >
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="text-2xl font-bold text-foreground font-serif text-left">
            {t("contact.title")}
          </SheetTitle>
          <p className="text-sm text-muted-foreground mt-1 text-left">
            {t("contact.description")}
          </p>
        </SheetHeader>
        <div className="mt-6">
          <ConsultationForm onSubmit={handleFormSubmit} defaultReason={defaultReason} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

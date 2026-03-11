import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Loader2, Mail, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FreeDownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contractId: string;
  contractName: string;
}

export const FreeDownloadDialog = ({ open, onOpenChange, contractId, contractName }: FreeDownloadDialogProps) => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("download-free-contract", {
        body: { contractId, email: email.trim(), name: name.trim() },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      if (data?.downloadUrl) {
        const link = document.createElement("a");
        link.href = data.downloadUrl;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success(language === "en" ? "Download started!" : "Download avviato!");
        onOpenChange(false);
        setEmail("");
        setName("");
      }
    } catch (err: any) {
      toast.error(language === "en" ? "Error starting download" : "Errore nell'avvio del download");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            {t("contracts.freeDownloadTitle")}
          </DialogTitle>
          <DialogDescription>
            {t("contracts.freeDownloadDescription")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="free-email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email *
            </Label>
            <Input
              id="free-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={language === "en" ? "your@email.com" : "tua@email.com"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="free-name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {t("contracts.freeDownloadName")}
            </Label>
            <Input
              id="free-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={language === "en" ? "Your name" : "Il tuo nome"}
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !email.trim()}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {t("contracts.downloadFree")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContractPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previewUrl: string | null;
  contractName: string;
}

export const ContractPreviewModal = ({
  open,
  onOpenChange,
  previewUrl,
  contractName,
}: ContractPreviewModalProps) => {
  const { language } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {language === "en" ? "Preview" : "Anteprima"}: {contractName}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 min-h-0">
          {previewUrl ? (
            <iframe
              src={previewUrl}
              className="w-full h-full rounded-md border"
              title={`Preview ${contractName}`}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              {language === "en" ? "No preview available" : "Anteprima non disponibile"}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

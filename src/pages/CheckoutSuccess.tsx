import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Download, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [contractName, setContractName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided");
      setLoading(false);
      return;
    }

    const fetchDownload = async () => {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("download-contract", {
          body: { sessionId },
        });

        if (fnError) throw new Error(fnError.message);
        if (data?.error) throw new Error(data.error);

        setDownloadUrl(data.downloadUrl);
        setContractName(data.contractName);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDownload();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {loading ? (
          <>
            <Loader2 className="w-16 h-16 text-primary mx-auto animate-spin" />
            <h1 className="text-2xl font-bold text-foreground font-serif">
              {language === "en" ? "Preparing your download..." : "Preparazione del download..."}
            </h1>
          </>
        ) : error ? (
          <>
            <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold text-foreground font-serif">
              {language === "en" ? "Something went wrong" : "Qualcosa è andato storto"}
            </h1>
            <p className="text-muted-foreground">{error}</p>
            <Link to="/#contratti">
              <Button variant="outline">
                {language === "en" ? "Back to contracts" : "Torna ai contratti"}
              </Button>
            </Link>
          </>
        ) : (
          <>
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
            <h1 className="text-2xl font-bold text-foreground font-serif">
              {language === "en" ? "Payment successful!" : "Pagamento completato!"}
            </h1>
            <p className="text-muted-foreground">
              {language === "en"
                ? `Your contract "${contractName}" is ready for download.`
                : `Il tuo contratto "${contractName}" è pronto per il download.`}
            </p>
            {downloadUrl && (
              <a href={downloadUrl} download>
                <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold">
                  <Download className="w-5 h-5" />
                  {language === "en" ? "Download Contract (DOCX)" : "Scarica Contratto (DOCX)"}
                </Button>
              </a>
            )}
            <div>
              <Link to="/">
                <Button variant="ghost" className="text-muted-foreground">
                  {language === "en" ? "Back to home" : "Torna alla home"}
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;

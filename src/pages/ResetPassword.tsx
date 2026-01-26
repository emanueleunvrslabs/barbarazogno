import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, Lock, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const passwordSchema = z.string().min(8, "La password deve avere almeno 8 caratteri");

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [validSession, setValidSession] = useState<boolean | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a valid session from the password reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setValidSession(!!session);
    };
    
    // Listen for auth state changes (when user clicks the reset link)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setValidSession(true);
      }
    });

    checkSession();

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    if (password !== confirmPassword) {
      setError("Le password non coincidono");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        // Translate common Supabase error messages
        let errorMessage = error.message;
        if (error.message.includes("different from the old password")) {
          errorMessage = "La nuova password deve essere diversa da quella attuale.";
        }
        throw new Error(errorMessage);
      }

      setSuccess(true);
      toast({
        title: "Password aggiornata!",
        description: "Ora puoi accedere con la nuova password.",
      });

      // Redirect to login after a delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: "Errore",
        description: error.message || "Si è verificato un errore durante l'aggiornamento della password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (validSession === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Invalid/expired link
  if (!validSession && !success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
            Link non valido
          </h2>
          <p className="text-muted-foreground mb-6">
            Il link per reimpostare la password è scaduto o non è valido. 
            Richiedi un nuovo link di recupero.
          </p>
          <Button asChild>
            <Link to="/forgot-password">Richiedi nuovo link</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.2),transparent_50%)]" />
        
        <div className="relative z-10 flex flex-col justify-center p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Scale className="w-10 h-10 text-primary" />
              <span className="text-3xl font-bold font-serif text-foreground">LexAI</span>
            </div>
            
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              Crea una
              <br />
              <span className="text-primary">nuova password</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Scegli una password sicura per proteggere 
              il tuo account e i dati del tuo studio.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Scale className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold font-serif text-foreground">LexAI</span>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                Password aggiornata!
              </h2>
              <p className="text-muted-foreground mb-6">
                La tua password è stata aggiornata con successo. 
                Verrai reindirizzato alla pagina di login...
              </p>
              <Button asChild>
                <Link to="/login">Vai al login</Link>
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Nuova password
                </h2>
                <p className="text-muted-foreground">
                  Inserisci la tua nuova password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Nuova password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Conferma password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      autoComplete="new-password"
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <Button type="submit" disabled={loading} className="w-full mt-6">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Aggiornamento in corso...
                    </>
                  ) : (
                    "Aggiorna password"
                  )}
                </Button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const emailSchema = z.string().trim().email("Email non valida");

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");

    setLoading(true);

    try {
      const response = await fetch(
        "https://josgdhbscmchrfiwlfnn.supabase.co/functions/v1/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Errore durante l'invio");
      }

      setSent(true);
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast({
        title: "Attenzione",
        description: "Se l'email è registrata, riceverai un link per reimpostare la password.",
      });
      // Show success anyway for security (don't reveal if email exists)
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

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
              Recupera
              <br />
              <span className="text-primary">il tuo accesso</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Ti invieremo un link per reimpostare la password 
              e tornare a gestire il tuo studio.
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

          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Torna al login</span>
          </Link>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                Controlla la tua email
              </h2>
              <p className="text-muted-foreground mb-6">
                Se l'indirizzo <span className="font-medium text-foreground">{email}</span> è registrato, 
                riceverai un link per reimpostare la password.
              </p>
              <p className="text-sm text-muted-foreground">
                Non hai ricevuto l'email?{" "}
                <button 
                  onClick={() => setSent(false)} 
                  className="text-primary hover:underline font-medium"
                >
                  Riprova
                </button>
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Password dimenticata?
                </h2>
                <p className="text-muted-foreground">
                  Inserisci la tua email e ti invieremo un link per reimpostare la password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="avvocato@studio.it"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      autoComplete="email"
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                </div>

                <Button type="submit" disabled={loading} className="w-full mt-6">
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    "Invia link di recupero"
                  )}
                </Button>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Ricordi la password?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Accedi
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

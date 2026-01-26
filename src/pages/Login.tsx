import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scale, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().trim().email("Email non valida");
const passwordSchema = z.string().min(1, "Password obbligatoria");

export default function Login() {
  const [searchParams] = useSearchParams();
  const confirmedEmail = searchParams.get("email");
  const isConfirmed = searchParams.get("confirmed") === "true";
  
  const [email, setEmail] = useState(confirmedEmail || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard", { replace: true });
      } else {
        setCheckingSession(false);
      }
    };
    checkSession();
  }, [navigate]);

  // Show confirmation message if coming from email verification
  useEffect(() => {
    if (isConfirmed && confirmedEmail && !checkingSession) {
      toast({
        title: "Email confermata!",
        description: "Il tuo account è stato attivato. Inserisci la password per accedere.",
      });
    }
  }, [isConfirmed, confirmedEmail, toast, checkingSession]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) newErrors.email = emailResult.error.errors[0].message;
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) newErrors.password = passwordResult.error.errors[0].message;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Errore di accesso",
        description: error.message === "Invalid login credentials" 
          ? "Email o password non corretti" 
          : error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking session
  if (checkingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
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
              Bentornato
              <br />
              <span className="text-primary">nel tuo studio</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Accedi per gestire i tuoi casi, ricerche giurisprudenziali 
              e collaborare con il tuo team.
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

          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              Accedi al tuo account
            </h2>
            <p className="text-muted-foreground">
              Inserisci le tue credenziali per continuare
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Password dimenticata?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <Button type="submit" disabled={loading} className="w-full mt-6">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Accesso in corso...
                </>
              ) : (
                <>
                  Accedi
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Non hai un account?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Registrati
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

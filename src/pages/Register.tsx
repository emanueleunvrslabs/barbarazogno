import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, ArrowLeft, Building2, Users, Mail, Lock, User, Phone, FileText, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Validation schemas
const emailSchema = z.string().trim().email("Email non valida").max(255);
const passwordSchema = z.string().min(8, "La password deve avere almeno 8 caratteri");
const nameSchema = z.string().trim().min(1, "Campo obbligatorio").max(100);
const phoneSchema = z.string().trim().max(20).optional();
const studioNameSchema = z.string().trim().min(1, "Nome studio obbligatorio").max(200);
const pivaSchema = z.string().trim().max(20).optional();
const inviteCodeSchema = z.string().trim().length(8, "Il codice deve essere di 8 caratteri");

type RegistrationMode = "choose" | "create" | "join";
type Step = "credentials" | "personal" | "studio";

export default function Register() {
  const [mode, setMode] = useState<RegistrationMode>("choose");
  const [step, setStep] = useState<Step>("credentials");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Studio creation
  const [studioName, setStudioName] = useState("");
  const [studioPIVA, setStudioPIVA] = useState("");
  const [studioAddress, setStudioAddress] = useState("");
  const [studioPhone, setStudioPhone] = useState("");
  const [studioEmail, setStudioEmail] = useState("");

  // Join studio
  const [inviteCode, setInviteCode] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCredentials = () => {
    const newErrors: Record<string, string> = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) newErrors.email = emailResult.error.errors[0].message;
    
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) newErrors.password = passwordResult.error.errors[0].message;
    
    if (password !== confirmPassword) newErrors.confirmPassword = "Le password non coincidono";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePersonal = () => {
    const newErrors: Record<string, string> = {};
    
    const firstNameResult = nameSchema.safeParse(firstName);
    if (!firstNameResult.success) newErrors.firstName = firstNameResult.error.errors[0].message;
    
    const lastNameResult = nameSchema.safeParse(lastName);
    if (!lastNameResult.success) newErrors.lastName = lastNameResult.error.errors[0].message;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStudio = () => {
    const newErrors: Record<string, string> = {};
    
    if (mode === "create") {
      const studioResult = studioNameSchema.safeParse(studioName);
      if (!studioResult.success) newErrors.studioName = studioResult.error.errors[0].message;
    } else if (mode === "join") {
      const inviteResult = inviteCodeSchema.safeParse(inviteCode);
      if (!inviteResult.success) newErrors.inviteCode = inviteResult.error.errors[0].message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === "credentials" && validateCredentials()) {
      setStep("personal");
    } else if (step === "personal" && validatePersonal()) {
      setStep("studio");
    }
  };

  const handlePrevStep = () => {
    if (step === "studio") setStep("personal");
    else if (step === "personal") setStep("credentials");
    else if (step === "credentials") setMode("choose");
  };

  const handleRegister = async () => {
    if (!validateStudio()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://josgdhbscmchrfiwlfnn.supabase.co/functions/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            phone: phone.trim() || undefined,
            mode,
            // Create mode fields
            studioName: studioName.trim() || undefined,
            studioPIVA: studioPIVA.trim() || undefined,
            studioAddress: studioAddress.trim() || undefined,
            studioPhone: studioPhone.trim() || undefined,
            studioEmail: studioEmail.trim() || undefined,
            // Join mode fields
            inviteCode: inviteCode.trim().toLowerCase() || undefined,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error messages with friendly notifications
        const errorMessage = data.error || "Errore durante la registrazione";
        
        // Check for common errors and show appropriate messages
        if (errorMessage.includes("già registrata") || errorMessage.includes("already been registered")) {
          toast({
            title: "Email già in uso",
            description: "Questa email è già associata a un account. Prova ad accedere oppure usa un'altra email.",
          });
        } else if (errorMessage.includes("Codice invito")) {
          toast({
            title: "Codice invito non valido",
            description: "Il codice inserito non corrisponde a nessuno studio. Verifica di averlo digitato correttamente.",
          });
        } else {
          toast({
            title: "Attenzione",
            description: errorMessage,
          });
        }
        setLoading(false);
        return;
      }

      toast({
        title: "Registrazione completata!",
        description: "Controlla la tua email per confermare l'account.",
      });

      navigate("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Attenzione",
        description: "Si è verificato un problema. Riprova tra qualche istante.",
      });
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
              Benvenuto nel futuro
              <br />
              <span className="text-primary">della pratica legale</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Unisciti a centinaia di studi legali che stanno già utilizzando 
              l'intelligenza artificiale per ottimizzare il loro lavoro.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Scale className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold font-serif text-foreground">LexAI</span>
          </div>

          <AnimatePresence mode="wait">
            {mode === "choose" ? (
              <motion.div
                key="choose"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                    Crea il tuo account
                  </h2>
                  <p className="text-muted-foreground">
                    Come vuoi iniziare?
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.button
                    onClick={() => setMode("create")}
                    className="w-full p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 text-left group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          Crea un nuovo studio
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Diventi amministratore e puoi invitare colleghi
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-2" />
                    </div>
                  </motion.button>

                  <motion.button
                    onClick={() => setMode("join")}
                    className="w-full p-6 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 text-left group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-secondary/50 text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">
                          Unisciti con codice invito
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Hai ricevuto un codice dal tuo studio
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-2" />
                    </div>
                  </motion.button>
                </div>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                  Hai già un account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Accedi
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress indicator */}
                <div className="mb-8">
                  <button
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm">Indietro</span>
                  </button>
                  
                  <div className="flex gap-2 mb-4">
                    {["credentials", "personal", "studio"].map((s, i) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          ["credentials", "personal", "studio"].indexOf(step) >= i
                            ? "bg-primary"
                            : "bg-border"
                        }`}
                      />
                    ))}
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-foreground mb-1">
                    {step === "credentials" && "Credenziali di accesso"}
                    {step === "personal" && "Dati personali"}
                    {step === "studio" && (mode === "create" ? "Dati dello studio" : "Codice invito")}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {step === "credentials" && "Inserisci email e password"}
                    {step === "personal" && "Inserisci i tuoi dati"}
                    {step === "studio" && (mode === "create" ? "Configura il tuo studio legale" : "Inserisci il codice ricevuto")}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {step === "credentials" && (
                    <motion.div
                      key="credentials"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
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
                          />
                        </div>
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Conferma Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                      </div>

                      <Button onClick={handleNextStep} className="w-full mt-6">
                        Continua
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}

                  {step === "personal" && (
                    <motion.div
                      key="personal"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="firstName"
                              placeholder="Mario"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName">Cognome</Label>
                          <Input
                            id="lastName"
                            placeholder="Rossi"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefono (opzionale)</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+39 123 456 7890"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <Button onClick={handleNextStep} className="w-full mt-6">
                        Continua
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}

                  {step === "studio" && mode === "create" && (
                    <motion.div
                      key="studio-create"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="studioName">Nome Studio *</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="studioName"
                            placeholder="Studio Legale Rossi & Associati"
                            value={studioName}
                            onChange={(e) => setStudioName(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        {errors.studioName && <p className="text-sm text-destructive">{errors.studioName}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studioPIVA">Partita IVA (opzionale)</Label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="studioPIVA"
                            placeholder="12345678901"
                            value={studioPIVA}
                            onChange={(e) => setStudioPIVA(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studioAddress">Indirizzo (opzionale)</Label>
                        <Input
                          id="studioAddress"
                          placeholder="Via Roma 1, 00100 Roma"
                          value={studioAddress}
                          onChange={(e) => setStudioAddress(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="studioPhone">Telefono</Label>
                          <Input
                            id="studioPhone"
                            type="tel"
                            placeholder="+39 06 1234567"
                            value={studioPhone}
                            onChange={(e) => setStudioPhone(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="studioEmail">Email Studio</Label>
                          <Input
                            id="studioEmail"
                            type="email"
                            placeholder="info@studio.it"
                            value={studioEmail}
                            onChange={(e) => setStudioEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <Button onClick={handleRegister} disabled={loading} className="w-full mt-6">
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Registrazione in corso...
                          </>
                        ) : (
                          "Crea account e studio"
                        )}
                      </Button>
                    </motion.div>
                  )}

                  {step === "studio" && mode === "join" && (
                    <motion.div
                      key="studio-join"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="inviteCode">Codice Invito</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="inviteCode"
                            placeholder="abc12def"
                            value={inviteCode}
                            onChange={(e) => setInviteCode(e.target.value.toLowerCase())}
                            className="pl-10 font-mono tracking-wider"
                            maxLength={8}
                          />
                        </div>
                        {errors.inviteCode && <p className="text-sm text-destructive">{errors.inviteCode}</p>}
                        <p className="text-xs text-muted-foreground">
                          Inserisci il codice di 8 caratteri che ti è stato inviato dal tuo studio
                        </p>
                      </div>

                      <Button onClick={handleRegister} disabled={loading} className="w-full mt-6">
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Registrazione in corso...
                          </>
                        ) : (
                          "Unisciti allo studio"
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="mt-8 text-center text-sm text-muted-foreground">
                  Hai già un account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Accedi
                  </Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

export const LanguageSelector = ({ className, variant = "desktop" }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  if (variant === "mobile") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <motion.button
          onClick={() => handleLanguageChange("it")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
            language === "it"
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
          )}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">🇮🇹</span>
          <span className="text-sm font-medium">Italiano</span>
        </motion.button>
        <motion.button
          onClick={() => handleLanguageChange("en")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
            language === "en"
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
          )}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">🇬🇧</span>
          <span className="text-sm font-medium">English</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <motion.button
        onClick={() => handleLanguageChange("it")}
        className={cn(
          "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
          language === "it"
            ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
            : "opacity-60 hover:opacity-100"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Italiano"
      >
        <span className="text-lg">🇮🇹</span>
      </motion.button>
      <motion.button
        onClick={() => handleLanguageChange("en")}
        className={cn(
          "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
          language === "en"
            ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
            : "opacity-60 hover:opacity-100"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="English"
      >
        <span className="text-lg">🇬🇧</span>
      </motion.button>
    </div>
  );
};

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scale, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface NavLink {
  labelKey: string;
  href: string;
  isAnchor?: boolean;
}

const landingNavLinks: NavLink[] = [
  { labelKey: "nav.home", href: "#", isAnchor: true },
  { labelKey: "nav.services", href: "#servizi", isAnchor: true },
  { labelKey: "nav.about", href: "#how-it-works", isAnchor: true },
  { labelKey: "nav.expertise", href: "#features", isAnchor: true },
  { labelKey: "nav.contracts", href: "#contratti", isAnchor: true },
  { labelKey: "nav.pricing", href: "#pricing", isAnchor: true },
];

const dashboardNavLinks: NavLink[] = [
  { labelKey: "Dashboard", href: "/dashboard" },
  { labelKey: "Casi", href: "/cases" },
  { labelKey: "Ricerche", href: "/search" },
  { labelKey: "Documenti", href: "/documents" },
  { labelKey: "Team", href: "/team" },
];

interface NavbarProps {
  variant?: "landing" | "dashboard";
}

export const Navbar = ({ variant = "landing" }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(variant === "landing" ? "#" : "/dashboard");
  const location = useLocation();
  const { user, profile, signOut } = useAuth();
  const { t } = useLanguage();

  const navLinks = variant === "landing" ? landingNavLinks : dashboardNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (variant === "dashboard") {
      setActiveLink(location.pathname);
    }
  }, [location.pathname, variant]);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setMobileOpen(false);
  };

  const getLabel = (labelKey: string) => {
    // For dashboard links, don't translate (they're already labels)
    if (variant === "dashboard") return labelKey;
    return t(labelKey);
  };

  const renderLink = (link: NavLink) => {
    const isActive = activeLink === link.href || 
      (variant === "dashboard" && location.pathname === link.href);
    const label = getLabel(link.labelKey);

    if (link.isAnchor) {
      return (
        <motion.a
          key={link.href}
          href={link.href}
          onClick={() => handleLinkClick(link.href)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
            isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isActive && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-full liquid-glass"
              style={{
                background: 'linear-gradient(135deg, hsl(43 74% 49% / 0.1) 0%, hsl(43 74% 49% / 0.03) 100%)',
                border: '1px solid hsl(43 74% 49% / 0.2)'
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </motion.a>
      );
    }

    return (
      <Link
        key={link.href}
        to={link.href}
        onClick={() => handleLinkClick(link.href)}
        className={cn(
          "relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {isActive && (
          <motion.div
            layoutId="activeTabDashboard"
            className="absolute inset-0 rounded-full liquid-glass"
            style={{
              background: 'linear-gradient(135deg, hsl(43 74% 49% / 0.1) 0%, hsl(43 74% 49% / 0.03) 100%)',
              border: '1px solid hsl(43 74% 49% / 0.2)'
            }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">{label}</span>
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      {/* Desktop - Floating Liquid Glass Pill */}
      <motion.div
        className={cn(
          "hidden lg:flex items-center gap-1 px-4 py-2.5 rounded-full transition-all duration-700",
          "liquid-glass-nav"
        )}
        style={{
          boxShadow: scrolled 
            ? '0 8px 32px hsl(0 0% 0% / 0.3), inset 0 1px 0 0 hsl(0 0% 100% / 0.08)'
            : '0 4px 24px hsl(0 0% 0% / 0.2), inset 0 1px 0 0 hsl(0 0% 100% / 0.06)'
        }}
      >
        {/* Logo */}
        <Link to={variant === "landing" ? "/" : "/dashboard"} className="pr-4 pl-2 flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          <span className="text-lg font-bold text-foreground font-serif">
            Zogno & Partners
          </span>
        </Link>
        
        <div className="w-px h-5 bg-border mx-1" />
        
        {navLinks.map((link) => renderLink(link))}
        
        <div className="w-px h-5 bg-border mx-1" />

        {/* Language Selector */}
        <LanguageSelector />

        <div className="w-px h-5 bg-border mx-1" />
        
        {variant === "landing" ? (
          <motion.div>
            <a
              href="#contact"
              className="px-5 py-2 text-sm font-semibold text-primary-foreground bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300 inline-block hover:shadow-lg"
            >
              {t("nav.contact")}
            </a>
          </motion.div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {profile?.first_name} {profile?.last_name}
            </span>
            <motion.button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-4 h-4" />
              {t("nav.logout")}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Mobile Menu Toggle */}
      <motion.div
        className={cn(
          "lg:hidden flex items-center justify-between w-full px-5 py-3 rounded-xl transition-all duration-500",
          "liquid-glass-nav"
        )}
      >
        <Link to={variant === "landing" ? "/" : "/dashboard"} className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-primary" />
          <span className="text-foreground font-bold text-lg font-serif">Zogno & Partners</span>
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-foreground p-2 rounded-lg liquid-glass"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu - Liquid Glass Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden fixed top-[5rem] left-4 right-4 z-50 rounded-xl overflow-hidden liquid-glass-card"
          >
            <div className="flex flex-col p-4 gap-1">
              {variant === "dashboard" && profile && (
                <>
                  <div className="px-4 py-3 text-sm text-muted-foreground">
                    {profile.first_name} {profile.last_name}
                  </div>
                  <div className="h-px bg-border my-1" />
                </>
              )}
              
              {navLinks.map((link, index) => {
                const isActive = activeLink === link.href || 
                  (variant === "dashboard" && location.pathname === link.href);
                const label = getLabel(link.labelKey);
                
                if (link.isAnchor) {
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "px-4 py-3 rounded-lg text-base font-medium transition-all duration-300",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      )}
                    >
                      {label}
                    </motion.a>
                  );
                }
                
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300",
                        isActive
                          ? "text-primary bg-primary/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
              
              <div className="h-px bg-border my-2" />
              
              {variant === "landing" ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <a
                    href="#contact"
                    className="block px-4 py-3 rounded-lg text-base font-semibold text-center text-primary-foreground bg-gradient-to-r from-primary to-primary/80"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t("nav.contact")}
                  </a>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  {t("nav.logout")}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

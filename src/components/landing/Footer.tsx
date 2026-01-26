import { motion } from "framer-motion";
import { Mail, Linkedin, Twitter, ArrowRight, MapPin, Heart, Scale } from "lucide-react";

const footerLinks = {
  Prodotto: [
    { label: "Come Funziona", href: "#how-it-works" },
    { label: "Funzionalità", href: "#features" },
    { label: "Prezzi", href: "#pricing" },
    { label: "Roadmap", href: "#" }
  ],
  Risorse: [
    { label: "Blog Legale", href: "#" },
    { label: "Guide AI", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "API Docs", href: "#" }
  ],
  Azienda: [
    { label: "Chi Siamo", href: "#" },
    { label: "Contatti", href: "#contact" },
    { label: "Lavora con Noi", href: "#" },
    { label: "Partner", href: "#" }
  ],
  Legale: [
    { label: "Privacy Policy", href: "#" },
    { label: "Termini di Servizio", href: "#" },
    { label: "Cookie Policy", href: "#" }
  ]
};

export const Footer = () => {
  return (
    <footer id="contact" className="relative pt-32 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* CTA Section - Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-24"
        >
          <div 
            className="liquid-glass-card-lg p-10 md:p-16 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(43 74% 49% / 0.1) 0%, hsl(0 0% 100% / 0.06) 50%, hsl(0 0% 100% / 0.03) 100%)',
              border: '1px solid hsl(43 74% 49% / 0.2)'
            }}
          >
            {/* Decorative glow */}
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, hsl(43 74% 49% / 0.15) 0%, transparent 50%)'
              }}
            />
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-serif"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Pronto a rivoluzionare il tuo studio?
              </motion.h2>
              <motion.p 
                className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Unisciti a centinaia di avvocati che risparmiano ore ogni settimana con LexAI.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.a 
                  href="/register" 
                  className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-primary/25 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Richiedi una Demo
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="mailto:info@lexai.it" 
                  className="flex items-center gap-2 text-foreground/70 hover:text-foreground font-medium transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <Mail className="w-5 h-5" />
                  Contattaci
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <motion.a 
              href="#" 
              className="text-3xl font-bold text-foreground mb-4 flex items-center gap-2 font-serif"
              whileHover={{ scale: 1.02 }}
            >
              <Scale className="w-8 h-8 text-primary" />
              LexAI
            </motion.a>
            <p className="text-muted-foreground mb-6 max-w-xs">
              L'AI che automatizza l'intake e potenzia la ricerca legale per avvocati e studi legali.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Milano, Italia</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>info@lexai.it</span>
              </div>
            </div>

            {/* Social - Liquid Glass buttons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: "#" },
                { icon: Twitter, href: "#" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-lg liquid-glass flex items-center justify-center"
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <motion.a
                      href={link.href}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors inline-block"
                      whileHover={{ x: 3 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} LexAI. Tutti i diritti riservati.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1.5">
            Sviluppato con <Heart className="w-4 h-4 text-red-500 fill-red-500" /> da{" "}
            <a 
              href="https://www.unvrslabs.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Unvrs Labs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
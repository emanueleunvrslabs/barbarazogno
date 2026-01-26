import { motion } from "framer-motion";
import { X, Check, Clock, AlertTriangle, DollarSign, Users, Zap, Target, Shield, Briefcase } from "lucide-react";

const problems = [
  { icon: DollarSign, text: "Costi elevati per un legale interno qualificato" },
  { icon: AlertTriangle, text: "Rischio di danni per mancanza di supporto legale" },
  { icon: Clock, text: "Tempi lunghi e poca reattività degli studi tradizionali" },
  { icon: Users, text: "Difficoltà con partner commerciali esteri" }
];

const solutions = [
  { icon: Briefcase, text: "Studio Legale in OutSourcing a costi sostenibili" },
  { icon: Zap, text: "Reattività di un team interno, qualità internazionale" },
  { icon: Target, text: "Pacchetti su misura per PMI e grandi imprese" },
  { icon: Shield, text: "Rapporto duraturo basato su fiducia reciproca" }
];

export const ProblemSolutionSection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.span 
            className="inline-block px-5 py-2 rounded-lg liquid-glass text-primary text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            La Nostra Filosofia
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif">
            Competenza che basta?
            <br />
            <span className="gradient-text-gold">Noi andiamo oltre</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            L'esperienza ci ha insegnato che alla competenza serve accompagnare risposta immediata e presenza costante.
          </p>
        </motion.div>

        {/* Comparison Cards - Liquid Glass */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            <div 
              className="liquid-glass-card p-8 md:p-10 h-full"
              style={{
                background: 'linear-gradient(135deg, hsl(0 70% 50% / 0.06) 0%, hsl(0 0% 100% / 0.03) 100%)',
                border: '1px solid hsl(0 70% 50% / 0.15)'
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-red-500/15 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: -10 }}
                >
                  <X className="w-7 h-7 text-red-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground font-serif">Le sfide delle PMI</h3>
                  <p className="text-muted-foreground text-sm">Situazioni comuni</p>
                </div>
              </div>

              <div className="space-y-3">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-red-500/8"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
                      <problem.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-foreground/80 font-medium">{problem.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative group"
          >
            <div 
              className="liquid-glass-card p-8 md:p-10 h-full"
              style={{
                background: 'linear-gradient(135deg, hsl(150 70% 40% / 0.06) 0%, hsl(0 0% 100% / 0.03) 100%)',
                border: '1px solid hsl(150 70% 40% / 0.15)'
              }}
            >
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  className="w-14 h-14 rounded-xl bg-emerald-500/15 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Check className="w-7 h-7 text-emerald-400" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground font-serif">Con Zogno & Partners</h3>
                  <p className="text-muted-foreground text-sm">La nostra soluzione</p>
                </div>
              </div>

              <div className="space-y-3">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-emerald-500/8"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                      <solution.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-foreground/80 font-medium">{solution.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

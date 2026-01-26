import { motion } from "framer-motion";
import { Phone, Users, FileText, Handshake, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Phone,
    title: "Primo contatto",
    description: "Ci racconti la tua situazione e le tue esigenze. Ascoltiamo attentamente per capire come possiamo aiutarti al meglio.",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Users,
    title: "Analisi e strategia",
    description: "Il nostro team analizza il caso e definisce la strategia più efficace, con la reattività di uno studio interno e la competenza internazionale.",
    color: "from-primary to-amber-600"
  },
  {
    icon: FileText,
    title: "Proposta personalizzata",
    description: "Presentiamo una proposta chiara con costi definiti e tempi certi. Trasparenza totale, senza sorprese.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: Handshake,
    title: "Partnership duratura",
    description: "Costruiamo un rapporto di fiducia nel tempo, diventando il vostro partner strategico per ogni sfida legale.",
    color: "from-violet-500 to-purple-600"
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
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
            Come Lavoriamo
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif">
            Dal primo contatto
            <br />
            <span className="gradient-text-gold">alla partnership</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Un processo chiaro e trasparente per costruire un rapporto di fiducia duraturo.
          </p>
        </motion.div>

        {/* Steps - Liquid Glass Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div 
                className="liquid-glass-card-sm p-8 h-full group cursor-pointer"
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3 }
                }}
                style={{
                  background: 'linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)'
                }}
              >
                {/* Step number & icon */}
                <div className="flex items-start gap-5 mb-4">
                  <motion.div 
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center relative shadow-lg`}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-7 h-7 text-white" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-foreground text-background text-xs font-bold flex items-center justify-center shadow-lg">
                      {index + 1}
                    </span>
                  </motion.div>
                  
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-serif">
                      {step.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-base leading-relaxed pl-0 md:pl-[84px]">
                  {step.description}
                </p>

                {/* Hover arrow indicator */}
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight className="w-5 h-5 text-primary" />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <div 
            className="liquid-glass-card-sm p-8 text-center"
            style={{
              background: 'linear-gradient(135deg, hsl(43 74% 49% / 0.08) 0%, hsl(0 0% 100% / 0.04) 100%)',
              border: '1px solid hsl(43 74% 49% / 0.2)'
            }}
          >
            <p className="text-foreground/90 text-lg italic font-serif mb-4">
              "Questa legal boutique è nata dalla mia passione verso il mondo delle imprese e della professione. 
              Provvediamo ad offrire i nostri servizi ogni giorno con piena soddisfazione e senza inutili complicazioni."
            </p>
            <p className="text-primary font-semibold">— Barbara Zogno, Founder e Managing Partner</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a 
            href="#contact" 
            className="btn-premium inline-flex items-center gap-3 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Richiedi una Consulenza
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

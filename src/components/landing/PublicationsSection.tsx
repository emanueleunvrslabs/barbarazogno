import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Award, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

type BookLanguage = "it" | "en";

interface Book {
  id: string;
  cover: string;
  language: BookLanguage;
  titleKey: string;
  descKey: string;
  pages: number;
  amazonUrl: string;
  asin: string;
}

const books: Book[] = [
  {
    id: "negoziazione-it",
    cover: "/books/negoziazione-it.jpg",
    language: "it",
    titleKey: "publications.book.negotiation.title",
    descKey: "publications.book.negotiation.desc",
    pages: 32,
    asin: "B0GTHGX2VF",
    amazonUrl:
      "https://www.amazon.it/TECNICHE-STRATEGIE-NEGOZIAZIONE-Negoziazione-Successo-ebook/dp/B0GTHGX2VF",
  },
  {
    id: "rs-it",
    cover: "/books/rs-it.jpg",
    language: "it",
    titleKey: "publications.book.rd.title",
    descKey: "publications.book.rd.desc",
    pages: 68,
    asin: "B0GV3VKD38",
    amazonUrl:
      "https://www.amazon.it/CONTRATTO-RICERCA-SVILUPPO-PROFESSIONISTI-OPERATORI-ebook/dp/B0GV3VKD38",
  },
  {
    id: "negotiation-en",
    cover: "/books/negotiation-en.jpg",
    language: "en",
    titleKey: "publications.book.negotiation.title",
    descKey: "publications.book.negotiation.desc",
    pages: 32,
    asin: "B0GTHXT1BW",
    amazonUrl:
      "https://www.amazon.it/Negotiation-Techniques-Strategies-Successful-House-ebook/dp/B0GTHXT1BW",
  },
  {
    id: "rd-en",
    cover: "/books/rd-en.jpg",
    language: "en",
    titleKey: "publications.book.rd.title",
    descKey: "publications.book.rd.desc",
    pages: 61,
    asin: "B0GXPQP8P7",
    amazonUrl:
      "https://www.amazon.it/RESEARCH-DEVELOPMENT-CONTRACT-Professionals-Legal4Tech-ebook/dp/B0GXPQP8P7",
  },
];

const BookCard = ({ book, index }: { book: Book; index: number }) => {
  const { t } = useLanguage();
  const langLabel =
    book.language === "it" ? t("publications.italian") : t("publications.english");
  const langFlag = book.language === "it" ? "🇮🇹" : "🇬🇧";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div
        className="relative h-full rounded-2xl p-6 md:p-8 liquid-glass-card-sm flex flex-col md:flex-row gap-6 md:gap-8 transition-all duration-500 hover:shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, hsl(0 0% 100% / 0.06) 0%, hsl(0 0% 100% / 0.02) 100%)",
        }}
      >
        {/* Cover */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <motion.div
            whileHover={{ rotateY: 5, rotateX: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            className="relative"
          >
            <div
              className="absolute -inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, hsl(43 74% 49% / 0.35) 0%, transparent 70%)",
              }}
            />
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(book.titleKey)}
              className="relative block"
            >
              <img
                src={book.cover}
                alt={t(book.titleKey)}
                loading="lazy"
                width={200}
                height={300}
                className="relative w-[180px] md:w-[200px] h-auto rounded-md shadow-2xl ring-1 ring-white/10"
              />
            </a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className="text-xs gap-1.5 border-primary/30 text-primary bg-primary/5"
            >
              <Award className="w-3 h-3" />
              {t("publications.category")}
            </Badge>
            <Badge
              variant="outline"
              className="text-xs gap-1.5 border-white/15 text-foreground/70"
            >
              <span className="text-sm leading-none">{langFlag}</span>
              {langLabel}
            </Badge>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-foreground font-serif leading-tight mb-3">
            {t(book.titleKey)}
          </h3>

          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 line-clamp-5">
            {t(book.descKey)}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold gap-2"
            >
              <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-4 h-4" />
                {t("publications.buyOnAmazon")}
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </Button>
            <span className="text-xs text-muted-foreground/70 tracking-wide uppercase">
              {t("publications.kindleEdition")} · {book.pages}{" "}
              {t("publications.pages")}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const PublicationsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="pubblicazioni" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, hsl(43 74% 49% / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg liquid-glass text-primary text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen className="w-4 h-4" />
            {t("publications.badge")}
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 font-serif">
            {t("publications.title1")}
            <br />
            <span className="gradient-text-gold">{t("publications.title2")}</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("publications.description")}
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span>{t("publications.feat.experience")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary" />
              <span>{t("publications.feat.bilingual")}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>{t("publications.feat.kindle")}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground/60 mt-10"
        >
          {t("publications.disclaimer")}
        </motion.p>
      </div>
    </section>
  );
};

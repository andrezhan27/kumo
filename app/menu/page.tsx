"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const categories = [
  "Sashimi",
  "Nigiri",
  "Marisco",
  "Carpaccio",
  "Tártaro",
  "Tataki",
  "Temaki",
  "Frito",
  "Comida Quente",
  "Bebidas",
];

type MenuImage = {
  fileName: string;
  title: string;
  category: string;
  alt?: string;
  isNew?: boolean;
};

const menuImages: MenuImage[] = [
  {
    fileName: "novidades/carne-salteada-legumes.webp",
    title: "Carne salteada com legumes",
    category: "Pratos quentes",
    alt: "Carne salteada com legumes servida num tacho metálico sobre a mesa",
    isNew: true,
  },
  {
    fileName: "novidades/caldo-marisco.webp",
    title: "Caldo de marisco especial",
    category: "Pratos quentes",
    alt: "Caldo de marisco especial servido num tacho metálico",
    isNew: true,
  },
  {
    fileName: "novidades/gambas-massa-salteada.webp",
    title: "Gambas com massa salteada",
    category: "Massas arroz",
    alt: "Gambas com massa salteada e legumes servidas num tacho metálico",
    isNew: true,
  },
  {
    fileName: "novidades/tempura-camarao.webp",
    title: "Tempura crocante de camarão",
    category: "Frito",
    alt: "Tempura crocante de camarão num prato retangular com molho",
    isNew: true,
  },
  { fileName: "S51.png", title: "S51. Sashimi misto special", category: "Sashimi" },
  { fileName: "548.png", title: "S48. Sashimi de salmão", category: "Sashimi" },
  { fileName: "549.png", title: "S49. Sashimi de atum", category: "Sashimi" },
  { fileName: "2b613dade82b0bb63b01a9a2fb59f9fd.jpg", title: "S51. Sashimi misto special", category: "Sashimi" },
  { fileName: "S15.png", title: "S15. Ostra", category: "Marisco" },
  { fileName: "无编号9.png", title: "Ostra especial", category: "Marisco" },
  { fileName: "S8.png", title: "S8. Sakura scampi", category: "Marisco" },
  { fileName: "无编号1.png", title: "S53. Sashimi scampi", category: "Marisco" },
  { fileName: "无编号2.png", title: "S53. Sashimi scampi", category: "Marisco" },
  { fileName: "无编号3.png", title: "S53. Sashimi scampi", category: "Marisco" },
  { fileName: "687_18.jpg", title: "N41. Nigiri foie gras", category: "Nigiri" },
  { fileName: "687_11.jpg", title: "N31. Nigiri salmão flambado", category: "Nigiri" },
  { fileName: "687_15.jpg", title: "N38. Nigiri salmão Philadelphia", category: "Nigiri" },
  { fileName: "C78.png", title: "C78. Carpaccio de atum", category: "Carpaccio" },
  { fileName: "C79.png", title: "C79. Carpaccio de salmão", category: "Carpaccio" },
  { fileName: "C82.png", title: "C82. Carpaccio salmone flambé", category: "Carpaccio" },
  { fileName: "C85B.png", title: "C86. Carpaccio yuzu salmon", category: "Carpaccio" },
  { fileName: "无编号.png", title: "C80. Carpaccio salmão passione", category: "Carpaccio" },
  { fileName: "无编号4.png", title: "C80. Carpaccio salmão passione", category: "Carpaccio" },
  { fileName: "无编号5.png", title: "S23. Carpaccio cocco", category: "Carpaccio" },
  { fileName: "无编号7.png", title: "C86a. Carpaccio yuzu", category: "Carpaccio" },
  { fileName: "T70.png", title: "T70. Tártaro de salmão", category: "Tártaro" },
  { fileName: "T72.png", title: "T72. Tártaro de salmão sésamo", category: "Tártaro" },
  { fileName: "T73.png", title: "T73. Tarta misto", category: "Tártaro" },
  { fileName: "T75.png", title: "T75. Tarta passione", category: "Tártaro" },
  { fileName: "T76.png", title: "S20. Tártaro de atum com trufa", category: "Tártaro" },
  { fileName: "T71.png", title: "T75. Tártaro de salmão cocco", category: "Tártaro" },
  { fileName: "T76A.png", title: "Tártaro misto especial", category: "Tártaro" },
  { fileName: "T77.png", title: "T77. Black hamburger sake", category: "Tártaro" },
  { fileName: "无编号10.png", title: "S20. Tártaro de atum com trufa", category: "Tártaro" },
  { fileName: "无编号6.png", title: "Tártaro de atum especial", category: "Tártaro" },
  { fileName: "金色盘子-三种鱼.png", title: "T73. Tarta misto", category: "Tártaro" },
  { fileName: "金色盘无编号.png", title: "T75. Tarta passione", category: "Tártaro" },
  { fileName: "T86.png", title: "T86. Tataki salmão", category: "Tataki" },
  { fileName: "T87.png", title: "T87. Tataki atum", category: "Tataki" },
  { fileName: "????_202605281 50700_35_2.jpg", title: "T120. Temaki salmão", category: "Temaki" },
  { fileName: "????_202605281 50702_36_2.jpg", title: "T121. Temaki miura", category: "Temaki" },
  { fileName: "x66.png", title: "X66. Ebifrai", category: "Xiaocai" },
  { fileName: "x69.png", title: "X69. Cirashi salmone flambé", category: "Xiaocai" },
  { fileName: "302.png", title: "004. Batatas fritas", category: "Entradas" },
  { fileName: "328.png", title: "006. Goma wakame", category: "Entradas" },
  { fileName: "311.png", title: "003. Harumaki", category: "Entradas" },
  { fileName: "304.png", title: "081. Croquete frito de batata", category: "Frito" },
  { fileName: "303.png", title: "030. Asas de frango", category: "Frito" },
  { fileName: "305.png", title: "025. Ebi sticks", category: "Frito" },
  { fileName: "307.png", title: "033. Costeleta de porco", category: "Frito" },
  { fileName: "308.png", title: "024. Ebi shinjyo", category: "Frito" },
  { fileName: "312.png", title: "028. Ika karaga", category: "Frito" },
  { fileName: "314.png", title: "023. Ebi tempura", category: "Frito" },
  { fileName: "????_202605280 23455_21_2.jpg", title: "N33a. Gyoza frito", category: "Dimsum" },
  { fileName: "????_202605280 23834_23_2.jpg", title: "016. Shumay", category: "Dimsum" },
  { fileName: "????_202605280 24003_24_2.jpg", title: "016. Gyoza de camarão", category: "Dimsum" },
  { fileName: "????_202605280 25813_25_2.jpg", title: "011. Yutu bao", category: "Dimsum" },
  { fileName: "????_202605280 25820_30_2.jpg", title: "025. Ebi sticks", category: "Frito" },
  { fileName: "????_202605280 30600_31_2.jpg", title: "027. Pinças de caranguejo", category: "Frito" },
  { fileName: "????_202605281 55519_40_2.jpg", title: "049. Ebi yaki", category: "Teppanyaki" },
  { fileName: "402.png", title: "050. Ebi no kushiyaki", category: "Teppanyaki" },
  { fileName: "407.png", title: "049. Ebi yaki", category: "Teppanyaki" },
  { fileName: "409.png", title: "079. Vieira com alho", category: "Hot dishes" },
  { fileName: "401（摆盘）.png", title: "056. Picanha", category: "Teppanyaki" },
  { fileName: "216 NEW.png", title: "036. Ramen com carne de vaca", category: "Massas arroz" },
  { fileName: "217 NEW.png", title: "037. Ramen com frutos do mar", category: "Massas arroz" },
  { fileName: "无编号-虾仁炒面.png", title: "S29. Massa arroz salteado gambas", category: "Pratos quentes" },
  { fileName: "203.png", title: "S27. Massa saltado grosso", category: "Pratos quentes" },
  { fileName: "204.png", title: "S28. Massa arroz salteado picante", category: "Pratos quentes" },
  { fileName: "202.png", title: "043. Yasai gohan", category: "Pratos quentes" },
  { fileName: "209.png", title: "S33. Bife salteado picante", category: "Hot dishes" },
  { fileName: "210.png", title: "068. Pedaços de frango picante", category: "Hot dishes" },
  { fileName: "213.png", title: "073. Camarões com sal e pimenta", category: "Hot dishes" },
  { fileName: "215 NEW.png", title: "S43. Gambas thai", category: "Hot dishes" },
];

const getMenuImageSrc = (fileName: string) => `/menu-page/${encodeURIComponent(fileName)}`;

const getDisplayTitle = (title: string) => title.replace(/^[A-Za-z]?\d+[A-Za-z]?\.?\s*/, "");

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <section className="section-shell pb-12 pt-10 md:pb-16 md:pt-12">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="display-serif text-6xl font-semibold leading-none text-ink md:text-7xl lg:text-8xl">
              Menu
            </h1>

            <nav aria-label="Categorias do menu" className="mt-7 flex max-w-5xl flex-wrap gap-x-3 gap-y-4">
              {categories.map((category, index) => (
                <Link
                  className="inline-flex items-center gap-3 text-sm font-bold text-ink-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  href="#destaques"
                  key={category}
                >
                  {category}
                  {index < categories.length - 1 ? (
                    <span aria-hidden="true" className="text-gold-deep">
                      •
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line bg-background px-6 text-sm font-extrabold text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                href="/"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar ao início
              </Link>
              <a
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-sm font-extrabold text-background transition-colors hover:bg-night focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                href="/menu/jantar-web.pdf"
                rel="noopener noreferrer"
                target="_blank"
              >
                Ver menu completo
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </section>

        <section className="section-shell pb-section" id="destaques">
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="display-serif text-4xl font-semibold leading-none text-ink md:text-5xl">
              Destaques do menu
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {menuImages.map((item, index) => (
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                className="group relative aspect-[1.6/1] overflow-hidden rounded-lg bg-night shadow-sm"
                initial={{ opacity: 0, y: 18 }}
                key={item.fileName}
                transition={{ delay: index * 0.035, duration: 0.45 }}
              >
                <Image
                  alt={item.alt ?? `Imagem do menu ${item.title}`}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  fill
                  priority={index < 3}
                  sizes="(min-width: 1280px) 31vw, (min-width: 640px) 48vw, 100vw"
                  src={getMenuImageSrc(item.fileName)}
                />
                {item.isNew ? (
                  <div className="absolute left-4 top-4 z-10 rounded-full bg-gold px-3.5 py-2 text-[0.68rem] font-extrabold uppercase leading-none tracking-[0.1em] text-ink shadow-sm">
                    Novo
                  </div>
                ) : null}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/82 via-black/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end p-5">
                  <div>
                    <p className="mb-1 text-[0.68rem] font-extrabold uppercase leading-none tracking-[0.08em] text-[#d8b86a]">
                      {item.category}
                    </p>
                    <h3 className="text-sm font-extrabold leading-tight text-white md:text-base">
                      {getDisplayTitle(item.title)}
                    </h3>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import type { Language } from "@/lib/content";

export const reviewsHref = "https://maps.app.goo.gl/RtnC6UqdoKyYLQ3Y8";

type GuestReview = {
  author: string;
  rating: 5;
  originalLanguage: Language;
  excerpt: Record<Language, string>;
};

// Five-star reviews checked on the owner's Google Maps listing on 27 October 2026.
// These are short, attributed excerpts, not an aggregate rating or a live feed.
// Preserve the original wording; the other language is an editorial translation.
export const guestReviews: readonly GuestReview[] = [
  {
    author: "Stephane L.", rating: 5, originalLanguage: "fr",
    excerpt: {
      fr: "Très belle expérience au Kumo Waterloo ! La qualité des plats est au rendez-vous et la présentation est vraiment soignée.",
      en: "A lovely experience at Kumo Waterloo! The food lives up to expectations, and the presentation is really thoughtful.",
    },
  },
  {
    author: "Olivier Wysocki", rating: 5, originalLanguage: "fr",
    excerpt: {
      fr: "Excellent rapport qualité-prix ! Tout était vraiment délicieux. Je recommande particulièrement les langoustines, elles étaient incroyables.",
      en: "Excellent value for money! Everything was truly delicious. I especially recommend the langoustines; they were incredible.",
    },
  },
  {
    author: "Soraya Akritidou", rating: 5, originalLanguage: "fr",
    excerpt: {
      fr: "Très bon restaurant, ma sœur et moi sommes conquises par les choix et la qualité est au rendez-vous!",
      en: "A very good restaurant. My sister and I were delighted with the choice, and the quality lives up to expectations!",
    },
  },
  {
    author: "John Deckstore", rating: 5, originalLanguage: "en",
    excerpt: {
      fr: "De bons plats dans un beau restaurant.",
      en: "Good food in a beautiful restaurant.",
    },
  },
  {
    author: "Stevegauma Véronique", rating: 5, originalLanguage: "fr",
    excerpt: {
      fr: "La cuisine est délicieuse les aliments de qualité et le personnel très accueillant\nUne première expérience réussie\nJe recommande",
      en: "Delicious food, quality ingredients and very welcoming staff. A successful first visit. I recommend it.",
    },
  },
  {
    author: "Ernham", rating: 5, originalLanguage: "fr",
    excerpt: {
      fr: "Très belle découverte chez Kumo à Waterloo !\n\nHonnêtement, nous avons passé un excellent moment. Dès notre arrivée, l'accueil a été particulièrement chaleureux.",
      en: "A lovely discovery at Kumo in Waterloo! We had a wonderful time. From the moment we arrived, the welcome was particularly warm.",
    },
  },
  {
    author: "Zenia Champagne", rating: 5, originalLanguage: "fr",
    excerpt: {
      fr: "Le poisson était tellement excellent qu’on a commandé plusieurs fois les sashimis",
      en: "The fish was so excellent that we ordered the sashimi several times.",
    },
  },
  {
    author: "Chen Li", rating: 5, originalLanguage: "en",
    excerpt: {
      fr: "Les robots sont mignons, mais les humains restent les meilleurs pour le service. Mes enfants ont vraiment adoré l’expérience.",
      en: "The robots are cute, but the humans definitely win when it comes to service. My kids really loved the experience.",
    },
  },
  {
    author: "olivier gouallec", rating: 5, originalLanguage: "fr",
    excerpt: {
      fr: "Testé cette semaine.\nTrès sympa et surtout très qualitatif aux niveau des plats.",
      en: "Tried it this week. Very nice, and above all, the food is of a very high quality.",
    },
  },
  {
    author: "钱佰玔", rating: 5, originalLanguage: "en",
    excerpt: {
      fr: "Les plats sont frais et délicieux, et les préparations sont très bonnes.",
      en: "The food is fresh and delicious, and the dishes are very good.",
    },
  },
];

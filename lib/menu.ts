import data from "@/lib/menu-data.json";
import type { Language } from "@/lib/content";

type LocalizedText = Record<Language, string>;
export type MenuDish = {
  id: string;
  source: string;
  image: string;
  name: LocalizedText;
  needsName: boolean;
  nameOrigin: string;
  isNew: boolean;
};
export type MenuCategory = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  dishes: MenuDish[];
};

export const menuCategories: MenuCategory[] = data;

export const menuCopy = {
  fr: {
    title: "Menu", home: "Accueil", back: "Retour à l’accueil",
    explore: "Explorer la carte", choose: "Choisir une catégorie", categories: "Catégories",
    new: "Nouveau", book: "Réserver une table", phone: "Téléphoner",
    note: "Pour toute information sur les allergènes et la disponibilité des plats, veuillez vous adresser à notre équipe.",
    metadataTitle: "Menu | KUMO Waterloo",
    metadataDescription: "Découvrez le menu de KUMO à Waterloo : entrées, sushi, sashimi, teppanyaki, plats au wok et accompagnements. Réservez votre table.",
  },
  en: {
    title: "Menu", home: "Home", back: "Back to home",
    explore: "Explore the menu", choose: "Choose a category", categories: "Categories",
    new: "New", book: "Book a table", phone: "Call us",
    note: "Please ask our restaurant team about allergens and dish availability.",
    metadataTitle: "Menu | KUMO Waterloo",
    metadataDescription: "Explore the menu at KUMO in Waterloo: starters, sushi, sashimi, teppanyaki, wok dishes and sides. Book your table.",
  },
  nl: {
    title: "Menu", home: "Home", back: "Terug naar home",
    explore: "Ontdek de menukaart", choose: "Kies een categorie", categories: "Categorieën",
    new: "Nieuw", book: "Reserveer een tafel", phone: "Bel ons",
    note: "Vraag ons restaurantteam naar allergenen en de beschikbaarheid van gerechten.",
    metadataTitle: "Menu | KUMO Waterloo",
    metadataDescription: "Ontdek het menu van KUMO in Waterloo: voorgerechten, sushi, sashimi, teppanyaki, wokgerechten en bijgerechten. Reserveer uw tafel.",
  },
} as const;

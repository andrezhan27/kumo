export const brandName = "KUMO";
export const reservationSlug = "kumo";
export const reservationHref = "/reservation";

export const restaurantInfo = {
  reservationWidgetUrl: `https://reserve.intelis.pt/${reservationSlug}`,
  address: "Drève Richelle 8, 1410 Waterloo, Belgique",
  phone: "+32 2 767 63 98",
  phoneHref: "tel:+3227676398",
  mapHref: "https://maps.app.goo.gl/2EeE3jBLwH5xgsZS9",
  hours: { lunch: "12:00 – 14:30", dinner: "18:30 – 22:30" },
} as const;

export const menuItems = [
  { id: "sushi", image: "/food/sushi.webp" },
  { id: "salmon", image: "/food/salmon.webp" },
  { id: "selection", image: "/food/selection.webp" },
  { id: "carpaccio", image: "/food/carpaccio.webp" },
  { id: "grilled", image: "/food/grilled.webp" },
  { id: "dim-sum", image: "/food/dim-sum.webp" },
] as const;

export const spaceSlides = [
  { id: "dining", image: "/space/dining.webp" },
  { id: "alcoves", image: "/space/alcoves.webp" },
  { id: "tables", image: "/space/tables.webp" },
  { id: "lounge", image: "/space/lounge.webp" },
  { id: "bar", image: "/space/bar.webp" },
  { id: "entrance", image: "/space/entrance.webp" },
] as const;

export const translations = {
  fr: {
    nav: { home: "Accueil", menu: "Menu", pricing: "Tarifs", space: "Espace", contact: "Contact", book: "Réserver", toggle: "Ouvrir le menu", close: "Fermer le menu", label: "Navigation principale", explore: "Découvrir KUMO" },
    skip: "Aller au contenu",
    hero: {
      eyebrow: "Cuisine asiatique · Waterloo",
      title: brandName,
      description: "Un nuage de saveurs, au cœur de Waterloo. Sushis, teppanyaki et découvertes à partager.",
      primary: "Réserver",
      imageAlt: "La façade du restaurant KUMO à Waterloo, son enseigne et son emblème bleu",
    },
    menuSection: {
      title: "Notre carte",
      description: "Du sushi délicat aux saveurs du gril, laissez vos envies composer le repas. Une cuisine asiatique généreuse, à savourer ensemble.",
      galleryLabel: "Quelques créations de KUMO",
      imageAlts: ["Sélection de sushis au restaurant KUMO", "Sushis au saumon préparés chez KUMO", "Assiette de sushis et spécialités KUMO", "Carpaccio assaisonné aux herbes chez KUMO", "Une spécialité chaude de KUMO", "Dim sum servis dans leurs paniers vapeur chez KUMO"],
      note: "La sélection et les tarifs sont à découvrir au restaurant. Pour toute allergie ou restriction alimentaire, parlez-en à notre équipe avant de commander.",
    },
    pricing: {
      title: "Tarifs",
      description: "Un déjeuner tout en douceur ou une soirée à prolonger. Choisissez votre moment, savourez à votre rythme.",
      categories: [
        { title: "Lundi – vendredi", detail: "Adultes · Fermé le mardi" },
        { title: "Week-ends et jours fériés", detail: "Adultes" },
        { title: "Enfants", detail: "Tranches d’âge à confirmer" },
      ],
      perPerson: "par personne",
      placeholder: "Tarifs à venir",
      lunch: { title: "Déjeuner", description: "Une pause gourmande au cœur de la journée.", detail: "Sushis, saveurs du gril et découvertes à partager." },
      dinner: { title: "Dîner", description: "Prenez le temps de vous retrouver.", detail: "Un moment à savourer, de la première bouchée à la dernière." },
      note: "Prix indicatifs non renseignés. Les tarifs et les conditions des formules seront confirmés prochainement.",
    },
    space: {
      title: "Notre espace",
      previous: "Photo précédente", next: "Photo suivante",
      labels: ["La salle", "Les alcôves", "À table", "Le salon", "Le bar", "Bienvenue chez KUMO"],
      description: "Des alcôves accueillantes, des matières lumineuses et une ambiance chaleureuse. Retrouvez KUMO au centre Rich’l, pour un déjeuner, un dîner à deux ou une grande tablée.",
      imageAlts: ["La salle de KUMO et ses détails dorés", "Les alcôves et banquettes de KUMO", "Les tables et fauteuils aux tons verts de KUMO", "Un espace intime du restaurant KUMO", "Le bar et son éclairage chaleureux chez KUMO", "L’entrée du restaurant KUMO à Waterloo"],
    },
    booking: {
      title: "Contacts",
      description: "Un repas en famille, une soirée entre amis ou une occasion à célébrer ? Réservez en ligne ou appelez-nous pour préparer votre visite.",
      mapTitle: "Localisation du restaurant KUMO à Waterloo", call: "Réserver", directions: "Itinéraire", addressLabel: "Nous trouver", phoneLabel: "Réservations", hoursLabel: "Horaires", daysLabel: "Du mercredi au lundi", closedLabel: "Fermé le mardi", lunchLabel: "Déjeuner", dinnerLabel: "Dîner",
    },
    reservation: { title: "Réserver", iframeTitle: "Réservation en ligne chez KUMO" },
    footer: { note: "Cuisine asiatique et moments à partager à Waterloo.", navigationLabel: "Navigation de pied de page", rights: "Tous droits réservés.", location: "Waterloo, Belgique" },
    notFound: { title: "Cette page s’est envolée.", description: "Retrouvez la carte, le restaurant et toutes les informations sur notre page d’accueil.", back: "Revenir à l’accueil" },
    error: { title: "Un petit contretemps.", description: "Réessayez ou appelez-nous pour réserver votre table.", retry: "Réessayer" },
  },
  en: {
    nav: { home: "Home", menu: "Menu", pricing: "Pricing", space: "Space", contact: "Contact", book: "Book a table", toggle: "Open navigation", close: "Close navigation", label: "Main navigation", explore: "Explore KUMO" },
    skip: "Skip to content",
    hero: {
      eyebrow: "Asian cuisine · Waterloo",
      title: brandName,
      description: "A cloud of flavours in the heart of Waterloo. Sushi, teppanyaki and discoveries to share.",
      primary: "Book a table",
      imageAlt: "The KUMO restaurant facade in Waterloo, with its sign and blue emblem",
    },
    menuSection: {
      title: "Our menu",
      description: "From delicate sushi to flavours from the grill, let your appetite lead the way. Generous Asian cooking, best enjoyed together.",
      galleryLabel: "A selection from KUMO’s kitchen",
      imageAlts: ["A sushi selection at KUMO restaurant", "Salmon sushi prepared at KUMO", "A plate of sushi and KUMO specialities", "Carpaccio with herbs at KUMO", "A warm speciality from KUMO’s kitchen", "Dim sum in steamer baskets at KUMO"],
      note: "Discover the current selection and prices at the restaurant. Please tell our team about any allergies or dietary requirements before ordering.",
    },
    pricing: {
      title: "Pricing",
      description: "A leisurely lunch or an evening to linger over. Choose your moment, savour it at your own pace.",
      categories: [
        { title: "Monday – Friday", detail: "Adults · Closed on Tuesdays" },
        { title: "Weekends & public holidays", detail: "Adults" },
        { title: "Children", detail: "Age ranges to be confirmed" },
      ],
      perPerson: "per person",
      placeholder: "Prices coming soon",
      lunch: { title: "Lunch", description: "A little escape in the middle of your day.", detail: "Sushi, flavours from the grill and discoveries to share." },
      dinner: { title: "Dinner", description: "Take your time. Make an evening of it.", detail: "A moment to enjoy, from the first bite to the last." },
      note: "Prices shown are placeholders. Dining prices and conditions will be confirmed soon.",
    },
    space: {
      title: "Our Space",
      previous: "Previous photo", next: "Next photo",
      labels: ["The dining room", "The alcoves", "At the table", "The lounge", "The bar", "Welcome to KUMO"],
      description: "Cosy alcoves, glowing details and a warm welcome. Find KUMO at Rich’l for lunch, dinner for two or a gathering around the table.",
      imageAlts: ["KUMO’s dining room with golden details", "Cosy alcoves and booth seating at KUMO", "Tables and green seating at KUMO", "An intimate dining space at KUMO", "KUMO’s bar with warm lighting", "The entrance to KUMO restaurant in Waterloo"],
    },
    booking: {
      title: "Contacts",
      description: "A family meal, an evening with friends or something to celebrate? Book online or call us to plan your visit.",
      mapTitle: "KUMO restaurant location in Waterloo", call: "Book a table", directions: "Get directions", addressLabel: "Find us", phoneLabel: "Reservations", hoursLabel: "Opening hours", daysLabel: "Wednesday to Monday", closedLabel: "Closed on Tuesdays", lunchLabel: "Lunch", dinnerLabel: "Dinner",
    },
    reservation: { title: "Book a table", iframeTitle: "KUMO online reservation form" },
    footer: { note: "Asian cuisine and moments to share in Waterloo.", navigationLabel: "Footer navigation", rights: "All rights reserved.", location: "Waterloo, Belgium" },
    notFound: { title: "This page has drifted away.", description: "Find the menu, restaurant and visitor information on our home page.", back: "Back to home" },
    error: { title: "A small interruption.", description: "Please try again or call us to reserve your table.", retry: "Try again" },
  },
} as const;

export type Language = keyof typeof translations;

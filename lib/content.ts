export const brandName = "KUMO";
export const reservationSlug = "kumo";
export const reservationHref = "/reservation";
export const diningSlogan = ["I don't do Buffets.", "I do", "KUMO."] as const;

export const diningFormulas = [
  { id: "lunch", dishes: 15, orders: 3, dishesPerOrder: 5, waitMinutes: 15 },
  { id: "dinner", dishes: 20, orders: 4, dishesPerOrder: 5, waitMinutes: 20 },
] as const;

// Owner-supplied prices per person. Saturday's €36 rate is interpreted as lunch;
// Friday/Saturday dinner and both Sunday services are explicitly €55.
export const diningPrices = [
  { id: "weekdays", lunch: 31, dinner: 45 },
  { id: "friday", lunch: 31, dinner: 55 },
  { id: "saturday", lunch: 36, dinner: 55 },
  { id: "sunday", lunch: 55, dinner: 55 },
] as const;

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
  { id: "space-01", image: "/space/space-01.webp" },
  { id: "space-02", image: "/space/space-02.webp" },
  { id: "space-03", image: "/space/space-03.webp" },
  { id: "space-04", image: "/space/space-04.webp" },
  { id: "space-05", image: "/space/space-05.webp" },
  { id: "space-06", image: "/space/space-06.webp" },
  { id: "space-07", image: "/space/space-07.webp" },
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
      description: "Sushis, teppanyaki, dim sum et saveurs du gril : découvrez la cuisine asiatique de KUMO à Waterloo. Une carte généreuse, à savourer ensemble au centre Rich’l.",
      galleryLabel: "Quelques créations de KUMO",
      imageAlts: ["Sélection de sushis au restaurant KUMO", "Sushis au saumon préparés chez KUMO", "Assiette de sushis et spécialités KUMO", "Carpaccio assaisonné aux herbes chez KUMO", "Une spécialité chaude de KUMO", "Dim sum servis dans leurs paniers vapeur chez KUMO"],
      note: "La sélection et les tarifs sont à découvrir au restaurant. Pour toute allergie ou restriction alimentaire, parlez-en à notre équipe avant de commander.",
    },
    howItWorks: {
      eyebrow: "À la carte, autrement",
      title: "Comment ça marche ?",
      description: "Une formule individuelle selon le jour et le repas. Choisissez vos plats à la carte : chacun est préparé pour vous.",
      comparisonLabel: "Les formules en un coup d’œil",
      formulaLabel: "Formule",
      meals: { lunch: "Déjeuner", dinner: "Dîner" },
      dishes: "Total de plats maximum",
      perPerson: "par personne",
      orders: "Commandes maximum",
      dishesPerOrder: "plats maximum par personne et par commande.",
      wait: "Entre deux commandes",
      premium: "Le soir et le week-end : une sélection plus large de choix premium.",
      steps: [
        { title: "Choisissez votre formule", description: "Chaque convive paie sa propre formule. Elle dépend du moment de votre visite : déjeuner ou dîner, en semaine ou le week-end. Chaque formule prévoit un nombre maximum de plats par personne." },
        { title: "Commandez à la carte", description: "Choisissez ce qui vous fait envie parmi les plats inclus dans votre formule. Vous pouvez passer jusqu’à 3 commandes au déjeuner ou 4 au dîner, avec un maximum de 5 plats par personne à chaque commande." },
        { title: "Prenez votre temps", description: "Attendez 15 minutes au déjeuner ou 20 minutes au dîner entre deux commandes. Profitez-en pour savourer et faire le point sur votre appétit. Chaque plat est préparé spécialement pour votre commande." },
        { title: "Commencez petit", description: "Notre conseil : commandez quelques plats pour commencer. Vous n’avez pas besoin de prendre les 5 plats dès la première commande. Ajustez les suivantes à votre faim." },
        { title: "Moins de gaspillage. Plus de KUMO.", description: "Commander raisonnablement au début réduit le gaspillage alimentaire et vous laisse la liberté de découvrir d’autres plats au fil du repas.", takeaway: "Votre maximum est une limite, pas un objectif." },
      ],
    },
    pricing: {
      title: "Tarifs",
      description: "Un déjeuner tout en douceur ou une soirée à prolonger. Choisissez votre moment, savourez à votre rythme.",
      days: {
        weekdays: { title: "Lundi – jeudi", detail: "Fermé le mardi" },
        friday: { title: "Vendredi" },
        saturday: { title: "Samedi" },
        sunday: { title: "Dimanche" },
      },
      dayLabel: "Jour",
      perPerson: "par personne",
      lunch: { title: "Déjeuner", description: "Une pause gourmande au cœur de la journée.", detail: "Sushis, saveurs du gril et découvertes à partager." },
      dinner: { title: "Dîner", description: "Prenez le temps de vous retrouver.", detail: "Un moment à savourer, de la première bouchée à la dernière." },
      note: "Chaque formule est individuelle. Fermé le mardi. Pour les tarifs enfants et jours fériés, contactez-nous.",
    },
    space: {
      title: "Notre espace",
      previous: "Photo précédente", next: "Photo suivante",
      labels: ["La salle", "Le salon", "Les robots", "Bienvenue chez KUMO", "Le bar", "Les alcôves", "À table"],
      description: "Au centre Rich’l à Waterloo, en Brabant wallon, KUMO vous accueille dans ses alcôves chaleureuses. Un restaurant asiatique pour un déjeuner en famille, un dîner à deux ou une grande tablée entre amis.",
      imageAlts: ["La salle de KUMO, ses colonnes dorées et ses fauteuils bleu canard", "Le salon de KUMO avec ses vitrages bleus et ses cloisons dorées", "Les robots de service devant le comptoir à sushis de KUMO", "La façade et la terrasse du restaurant KUMO à Waterloo", "Le bar de KUMO et ses étagères de bouteilles illuminées", "L’allée centrale et les alcôves dorées du restaurant KUMO", "Une table entre deux banquettes orange et des colonnes dorées chez KUMO"],
    },
    booking: {
      title: "Contacts",
      description: "Un repas en famille, une soirée entre amis ou une occasion à célébrer ? Réservez en ligne ou appelez-nous pour préparer votre visite.",
      mapTitle: "Localisation du restaurant KUMO à Waterloo", call: "Réserver", directions: "Itinéraire", addressLabel: "Nous trouver", phoneLabel: "Réservations", hoursLabel: "Horaires", daysLabel: "Du mercredi au lundi", closedLabel: "Fermé le mardi", lunchLabel: "Déjeuner", dinnerLabel: "Dîner",
    },
    reviews: {
      eyebrow: "Avis Google",
      title: "Les mots de nos clients",
      description: "Dix extraits d’avis 5 étoiles, partagés par nos clients sur Google. Découvrez leurs impressions sur la cuisine, l’accueil et le cadre.",
      fiveStars: "5 étoiles sur 5",
      excerpt: "Extrait",
      translatedExcerpt: "Extrait traduit de l’anglais",
      showMore: "Afficher les 5 autres avis",
      showLess: "Afficher moins d’avis",
      googleLink: "Voir plus d’avis sur Google",
    },
    reservation: { title: "Réserver", iframeTitle: "Réservation en ligne chez KUMO" },
    footer: {
      title: "Restaurant asiatique à Waterloo",
      note: "Sushis, teppanyaki et dim sum au centre Rich’l, en Brabant wallon. Retrouvez-nous au sud de Bruxelles pour un déjeuner ou un dîner à partager.",
      addressLabel: "Adresse", phoneLabel: "Téléphone", navigationLabel: "Navigation de pied de page", rights: "Tous droits réservés.", location: "Waterloo, Belgique",
    },
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
      description: "Sushi, teppanyaki, dim sum and flavours from the grill: discover Asian dining at KUMO in Waterloo, Belgium. A generous menu to enjoy together at Rich’l.",
      galleryLabel: "A selection from KUMO’s kitchen",
      imageAlts: ["A sushi selection at KUMO restaurant", "Salmon sushi prepared at KUMO", "A plate of sushi and KUMO specialities", "Carpaccio with herbs at KUMO", "A warm speciality from KUMO’s kitchen", "Dim sum in steamer baskets at KUMO"],
      note: "Discover the current selection and prices at the restaurant. Please tell our team about any allergies or dietary requirements before ordering.",
    },
    howItWorks: {
      eyebrow: "À la carte, designed differently",
      title: "How it works",
      description: "One individual formula, based on the day and meal. Choose your dishes à la carte: each is prepared specifically for you.",
      comparisonLabel: "Your formulas at a glance",
      formulaLabel: "Formula",
      meals: { lunch: "Lunch", dinner: "Dinner" },
      dishes: "Total dishes maximum",
      perPerson: "per person",
      orders: "Orders maximum",
      dishesPerOrder: "dishes maximum per person, per order.",
      wait: "Between orders",
      premium: "Evenings and weekends: a wider selection of premium choices.",
      steps: [
        { title: "Choose your formula", description: "Each guest pays for one individual formula. Your formula depends on when you visit: lunch or dinner, weekday or weekend. Each formula includes its own maximum number of dishes per person." },
        { title: "Order à la carte", description: "Choose whatever you like from the dishes included in your formula. You can place up to 3 orders at lunch or 4 at dinner, with a maximum of 5 dishes per person in each order." },
        { title: "Take your time", description: "Wait 15 minutes at lunch or 20 minutes at dinner between orders. Enjoy your dishes and see how hungry you still are before ordering again. Every dish is prepared specifically for your order." },
        { title: "Start small. End big.", description: "Our biggest tip: order a few dishes to begin with. You don’t need to choose all 5 dishes in your first order. Let your appetite guide your next orders." },
        { title: "Less waste. More KUMO.", description: "Ordering reasonably at the beginning helps reduce unnecessary food waste, while leaving you free to discover more dishes throughout your meal.", takeaway: "Your maximum is a limit, not a target." },
      ],
    },
    pricing: {
      title: "Pricing",
      description: "A leisurely lunch or an evening to linger over. Choose your moment, savour it at your own pace.",
      days: {
        weekdays: { title: "Monday – Thursday", detail: "Closed on Tuesdays" },
        friday: { title: "Friday" },
        saturday: { title: "Saturday" },
        sunday: { title: "Sunday" },
      },
      dayLabel: "Day",
      perPerson: "per person",
      lunch: { title: "Lunch", description: "A little escape in the middle of your day.", detail: "Sushi, flavours from the grill and discoveries to share." },
      dinner: { title: "Dinner", description: "Take your time. Make an evening of it.", detail: "A moment to enjoy, from the first bite to the last." },
      note: "Each formula is individual. Closed on Tuesdays. Please contact us for children’s and public holiday prices.",
    },
    space: {
      title: "Our Space",
      previous: "Previous photo", next: "Next photo",
      labels: ["The dining room", "The lounge", "The robots", "Welcome to KUMO", "The bar", "The alcoves", "At the table"],
      description: "Find KUMO at Rich’l in Waterloo, Walloon Brabant, just south of Brussels. Cosy alcoves and a warm welcome set the scene for a family lunch, a romantic dinner or an evening with friends.",
      imageAlts: ["KUMO’s dining room with golden columns and teal seating", "KUMO’s lounge with blue glass panels and golden partitions", "Serving robots in front of KUMO’s sushi counter", "The facade and terrace of KUMO restaurant in Waterloo", "KUMO’s cocktail bar with illuminated bottle shelves", "The central aisle and golden alcoves at KUMO", "A table between orange booths and golden columns at KUMO"],
    },
    booking: {
      title: "Contacts",
      description: "A family meal, an evening with friends or something to celebrate? Book online or call us to plan your visit.",
      mapTitle: "KUMO restaurant location in Waterloo", call: "Book a table", directions: "Get directions", addressLabel: "Find us", phoneLabel: "Reservations", hoursLabel: "Opening hours", daysLabel: "Wednesday to Monday", closedLabel: "Closed on Tuesdays", lunchLabel: "Lunch", dinnerLabel: "Dinner",
    },
    reviews: {
      eyebrow: "Google reviews",
      title: "In our guests’ words",
      description: "Ten excerpts from five-star reviews shared by our guests on Google. Their impressions of the food, the welcome and the setting.",
      fiveStars: "5 out of 5 stars",
      excerpt: "Excerpt",
      translatedExcerpt: "Excerpt translated from French",
      showMore: "Show 5 more reviews",
      showLess: "Show fewer reviews",
      googleLink: "See more reviews on Google",
    },
    reservation: { title: "Book a table", iframeTitle: "KUMO online reservation form" },
    footer: {
      title: "Asian restaurant in Waterloo, Belgium",
      note: "Sushi, teppanyaki and dim sum at Rich’l in Walloon Brabant. Join us south of Brussels for lunch or dinner, whether you live nearby or are visiting Waterloo.",
      addressLabel: "Address", phoneLabel: "Telephone", navigationLabel: "Footer navigation", rights: "All rights reserved.", location: "Waterloo, Belgium",
    },
    notFound: { title: "This page has drifted away.", description: "Find the menu, restaurant and visitor information on our home page.", back: "Back to home" },
    error: { title: "A small interruption.", description: "Please try again or call us to reserve your table.", retry: "Try again" },
  },
} as const;

export type Language = keyof typeof translations;

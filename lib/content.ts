export const brandName = "KUMO";
export const reservationSlug = "kumo";
export const reservationHref = "tel:+3227676398";
export const diningSlogan = ["I don't do Buffets.", "I do", "KUMO."] as const;

// Formulas and prices from the owner's FORMULES KUMO table (5 November 2026).
// The evening formula also applies all day on Sundays and public holidays.
export const diningFormulas = [
  { id: "lunch", orders: 3, dishesPerOrder: 4, waitMinutes: 15 },
  { id: "dinner", orders: 3, dishesPerOrder: 5, waitMinutes: 20 },
] as const;

export const childrenMenu = {
  minAge: 3, maxAge: 10, orders: 2, dishesPerOrder: 4,
  lunchWaitMinutes: 15, dinnerWaitMinutes: 20,
} as const;

export const diningPrices = [
  { id: "weekdayLunch", adult: 31, child: 15.5, hours: "lunch" },
  { id: "saturdayLunch", adult: 36, child: 18, hours: "lunch" },
  { id: "weekdayDinner", adult: 45, child: 22.5, hours: "dinner" },
  { id: "weekendHolidays", adult: 55, child: 27.5, hours: "both" },
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
  { id: "sashimi-04", image: "/menu/sashimi/04.webp" },
  { id: "specialities-09", image: "/menu/specialities/09.webp" },
  { id: "specialities-04", image: "/menu/specialities/04.webp" },
  { id: "specialities-03", image: "/menu/specialities/03.webp" },
  { id: "chirashi-tartare-07", image: "/menu/chirashi-tartare/07.webp" },
  { id: "sashimi-01", image: "/menu/sashimi/01.webp" },
  { id: "uramaki-03", image: "/menu/uramaki/03.webp" },
  { id: "teppanyaki-14", image: "/menu/teppanyaki/14.webp" },
  { id: "bigne-02", image: "/menu/bigne/02.webp" },
  { id: "carpaccio-03", image: "/menu/carpaccio/03.webp" },
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
    languageLabel: "Choisir la langue",
    skip: "Aller au contenu",
    hero: {
      eyebrow: "Cuisine asiatique · Waterloo",
      title: brandName,
      description: "Un nuage de saveurs, au cœur de Waterloo. Sushis, teppanyaki et découvertes à partager.",
      primary: "Réserver",
      imageAlt: "La façade du restaurant KUMO à Waterloo, son enseigne et son emblème bleu",
    },
    story: {
      eyebrow: "Notre histoire",
      title: "Une table, mille découvertes.",
      description: "Au cœur de Waterloo, au centre Rich’l, KUMO réunit les saveurs de la cuisine asiatique autour d’une même table. Sushis, teppanyaki et dim sum composent une carte à explorer à votre rythme, avec des plats préparés à la commande.",
      welcome: "Des alcôves chaleureuses, un déjeuner en famille, un dîner à deux ou entre amis : nous vous accueillons pour le plaisir de bien manger et de vous retrouver.",
      imageAlt: "L’allée centrale et les alcôves dorées du restaurant KUMO à Waterloo",
    },
    menuSection: {
      title: "Notre carte",
      cta: "Découvrir la carte",
      description: "Sushis, teppanyaki, dim sum et saveurs du gril : découvrez la cuisine asiatique de KUMO à Waterloo. Une carte généreuse, à savourer ensemble au centre Rich’l.",
      galleryLabel: "Quelques créations de KUMO",
      imageAlts: ["Sashimi spécial", "Uramaki à la langouste", "Nigiri spéciaux assortis · 4 pièces", "Nigiri wagyu A5 & truffe", "Tartare façon scampi", "Huîtres & Pandalus eous", "Pink thon Ebiten", "Foie gras poêlé", "Bignè ikura", "Carpaccio de thon & passion"],
      note: "La sélection et les tarifs sont à découvrir au restaurant. Pour toute allergie ou restriction alimentaire, parlez-en à notre équipe avant de commander.",
    },
    howItWorks: {
      eyebrow: "À la carte, autrement",
      title: "Comment ça marche ?",
      description: "Une formule individuelle selon le jour et le repas. Choisissez vos plats à la carte : chacun est préparé pour vous.",
      comparisonLabel: "Les formules adultes en un coup d’œil",
      formulaLabel: "Formule",
      meals: {
        lunch: "Midi · lundi–samedi",
        dinner: "Soir, dimanche & fériés"
      },
      perPerson: "par personne",
      orders: "Commandes maximum",
      dishesPerOrder: "Plats par commande (max.)",
      wait: "Entre deux commandes",
      adultWaitNote: "Adultes : 15 min. le dimanche midi et les jours fériés à midi ; 20 min. le soir. La formule du soir s’applique toute la journée le dimanche et les jours fériés.",
      exclusions: "Toutes les formules sont hors boissons et desserts.",
      childrenTitle: "Menu enfants",
      ageUnit: "ans",
      childrenOrders: "commandes par enfant",
      childrenDishes: "plats maximum par commande",
      childrenWaitNote: "Entre deux commandes : 15 min. à midi du lundi au samedi ; 20 min. le soir, le dimanche et les jours fériés, y compris à midi.",
      steps: [
        {
          title: "Choisissez votre formule",
          description: "Chaque convive choisit sa formule selon le jour et le repas. Le dimanche et les jours fériés, la formule du soir s’applique toute la journée. Un menu enfants est proposé de 3 à 10 ans."
        },
        {
          title: "Commandez à la carte",
          description: "Adultes : jusqu’à 3 commandes par personne, avec 4 plats maximum par commande à midi du lundi au samedi, ou 5 avec la formule du soir, le dimanche et les jours fériés. Enfants de 3 à 10 ans : 2 commandes de 4 plats maximum."
        },
        {
          title: "Prenez votre temps",
          description: "Pour les adultes, attendez 15 minutes à midi et 20 minutes le soir, y compris le dimanche et les jours fériés. Pour les enfants, attendez 15 minutes à midi du lundi au samedi et 20 minutes le soir, le dimanche et les jours fériés."
        },
        {
          title: "Commencez petit",
          description: "Notre conseil : commandez quelques plats pour commencer. Vous n’avez pas besoin d’atteindre le maximum à chaque commande. Ajustez les suivantes à votre faim."
        },
        {
          title: "Moins de gaspillage. Plus de KUMO.",
          description: "Commander raisonnablement au début réduit le gaspillage alimentaire et vous laisse la liberté de découvrir d’autres plats au fil du repas.",
          takeaway: "Votre maximum est une limite, pas un objectif."
        }
      ]
    },
    pricing: {
      title: "Tarifs",
      description: "Choisissez votre formule selon le jour et le repas.",
      adult: "Adultes",
      children: "Menu enfants",
      ageUnit: "ans",
      perPerson: "par personne",
      formulas: {
        weekdayLunch: {
          title: "Midi en semaine",
          detail: "Lundi – vendredi"
        },
        saturdayLunch: {
          title: "Midi le samedi",
          detail: "Samedi"
        },
        weekdayDinner: {
          title: "Soir en semaine",
          detail: "Lundi – jeudi"
        },
        weekendHolidays: {
          title: "Week-end & jours fériés",
          detail: "Vendredi et samedi soir · Dimanche et jours fériés toute la journée"
        }
      },
      lunch: "Midi",
      dinner: "Soir",
      exclusions: "Boissons et desserts non inclus.",
      note: "Chaque formule est individuelle. Fermé le mardi. Le tarif des jours fériés s’applique toute la journée."
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
      selectionLabel: "Extraits d’avis 5 étoiles",
      previous: "Avis précédent",
      next: "Avis suivant",
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
    languageLabel: "Choose language",
    skip: "Skip to content",
    hero: {
      eyebrow: "Asian cuisine · Waterloo",
      title: brandName,
      description: "A cloud of flavours in the heart of Waterloo. Sushi, teppanyaki and discoveries to share.",
      primary: "Book a table",
      imageAlt: "The KUMO restaurant facade in Waterloo, with its sign and blue emblem",
    },
    story: {
      eyebrow: "Our story",
      title: "One table. A world of flavours.",
      description: "In the heart of Waterloo, at Rich’l, KUMO brings the flavours of Asian cuisine to one table. From sushi and teppanyaki to dim sum, explore our menu at your own pace, with dishes prepared to order.",
      welcome: "Cosy alcoves, a family lunch, dinner for two or an evening with friends: join us for good food and time together.",
      imageAlt: "The central aisle and golden alcoves at KUMO restaurant in Waterloo",
    },
    menuSection: {
      title: "Our menu",
      cta: "Explore menu",
      description: "Sushi, teppanyaki, dim sum and flavours from the grill: discover Asian dining at KUMO in Waterloo, Belgium. A generous menu to enjoy together at Rich’l.",
      galleryLabel: "A selection from KUMO’s kitchen",
      imageAlts: ["Special sashimi", "Spiny lobster uramaki", "Mixed special nigiri · 4 pieces", "A5 wagyu & truffle nigiri", "Scampi-style tartare", "Oysters & Pandalus eous", "Pink tuna Ebiten", "Pan-seared foie gras", "Bignè ikura", "Tuna & passion fruit carpaccio"],
      note: "Discover the current selection and prices at the restaurant. Please tell our team about any allergies or dietary requirements before ordering.",
    },
    howItWorks: {
      eyebrow: "À la carte, designed differently",
      title: "How it works",
      description: "One individual formula, based on the day and meal. Choose your dishes à la carte: each is prepared specifically for you.",
      comparisonLabel: "Adult formulas at a glance",
      formulaLabel: "Formula",
      meals: {
        lunch: "Lunch · Monday–Saturday",
        dinner: "Evenings, Sundays & holidays"
      },
      perPerson: "per person",
      orders: "Orders maximum",
      dishesPerOrder: "Dishes per order (max.)",
      wait: "Between orders",
      adultWaitNote: "Adults: 15 min. at Sunday and public-holiday lunch; 20 min. in the evening. The evening formula applies all day on Sundays and public holidays.",
      exclusions: "Drinks and desserts are not included in any formula.",
      childrenTitle: "Children’s menu",
      ageUnit: "years",
      childrenOrders: "orders per child",
      childrenDishes: "dishes maximum per order",
      childrenWaitNote: "Between orders: 15 min. at Monday–Saturday lunch; 20 min. in the evening and all day on Sundays and public holidays, including lunch.",
      steps: [
        {
          title: "Choose your formula",
          description: "Each guest chooses an individual formula based on the day and meal. The evening formula applies all day on Sundays and public holidays. A children’s menu is available for ages 3–10."
        },
        {
          title: "Order à la carte",
          description: "Adults: up to 3 orders per person, with a maximum of 4 dishes per order at Monday–Saturday lunch, or 5 with the evening formula and all day on Sundays and public holidays. Children aged 3–10: 2 orders of up to 4 dishes."
        },
        {
          title: "Take your time",
          description: "Adults wait 15 minutes between orders at lunch and 20 minutes in the evening, including Sundays and public holidays. Children wait 15 minutes at Monday–Saturday lunch and 20 minutes in the evening and all day on Sundays and public holidays."
        },
        {
          title: "Start small",
          description: "Our tip: order a few dishes to begin with. You don’t need to reach the maximum in every order. Let your appetite guide your next orders."
        },
        {
          title: "Less waste. More KUMO.",
          description: "Ordering reasonably at the beginning helps reduce unnecessary food waste, while leaving you free to discover more dishes throughout your meal.",
          takeaway: "Your maximum is a limit, not a target."
        }
      ]
    },
    pricing: {
      title: "Pricing",
      description: "Choose your formula based on the day and meal.",
      adult: "Adults",
      children: "Children’s menu",
      ageUnit: "years",
      perPerson: "per person",
      formulas: {
        weekdayLunch: {
          title: "Weekday lunch",
          detail: "Monday – Friday"
        },
        saturdayLunch: {
          title: "Saturday lunch",
          detail: "Saturday"
        },
        weekdayDinner: {
          title: "Weekday dinner",
          detail: "Monday – Thursday"
        },
        weekendHolidays: {
          title: "Weekends & public holidays",
          detail: "Friday and Saturday evenings · All day on Sundays and public holidays"
        }
      },
      lunch: "Lunch",
      dinner: "Dinner",
      exclusions: "Drinks and desserts are not included.",
      note: "Each formula is individual. Closed on Tuesdays. Public-holiday prices apply all day."
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
      selectionLabel: "Selected five-star reviews",
      previous: "Previous review",
      next: "Next review",
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
  nl: {
    nav: { home: "Home", menu: "Menu", pricing: "Prijzen", space: "Restaurant", contact: "Contact", book: "Reserveren", toggle: "Navigatie openen", close: "Navigatie sluiten", label: "Hoofdnavigatie", explore: "Ontdek KUMO" },
    languageLabel: "Taal kiezen",
    skip: "Naar de inhoud",
    hero: {
      eyebrow: "Aziatische keuken · Waterloo",
      title: brandName,
      description: "Een wolk van smaken in het hart van Waterloo. Sushi, teppanyaki en nieuwe smaken om samen te ontdekken.",
      primary: "Reserveren",
      imageAlt: "De gevel van restaurant KUMO in Waterloo, met het uithangbord en het blauwe embleem",
    },
    story: {
      eyebrow: "Ons verhaal",
      title: "Eén tafel. Een wereld aan smaken.",
      description: "In het hart van Waterloo, in het Rich’l-centrum, brengt KUMO de smaken van de Aziatische keuken samen aan tafel. Van sushi en teppanyaki tot dim sum: ontdek onze kaart op uw eigen tempo, met gerechten die op bestelling worden bereid.",
      welcome: "Gezellige nissen, een lunch met het gezin, een diner voor twee of een avond met vrienden: bij ons draait het om lekker eten en samen genieten.",
      imageAlt: "De centrale gang en gouden nissen van restaurant KUMO in Waterloo",
    },
    menuSection: {
      title: "Onze kaart",
      cta: "Ontdek de kaart",
      description: "Sushi, teppanyaki, dim sum en smaken van de grill: ontdek de Aziatische keuken van KUMO in Waterloo. Een uitgebreide kaart om samen van te genieten in het Rich’l-centrum.",
      galleryLabel: "Een selectie uit de keuken van KUMO",
      imageAlts: ["Speciale sashimi", "Uramaki met langoest", "Gemengde speciale nigiri · 4 stuks", "Nigiri met A5 wagyu & truffel", "Tartaar in scampistijl", "Oesters & Pandalus eous", "Pink tonijn Ebiten", "Gebakken foie gras", "Bignè ikura", "Carpaccio van tonijn & passievrucht"],
      note: "Ontdek de actuele selectie en prijzen in het restaurant. Laat ons team vóór het bestellen weten of u allergieën of specifieke dieetwensen heeft.",
    },
    howItWorks: {
      eyebrow: "À la carte, op een andere manier",
      title: "Hoe werkt het?",
      description: "Een individuele formule, afhankelijk van de dag en de maaltijd. Kies uw gerechten à la carte: elk gerecht wordt speciaal voor u bereid.",
      comparisonLabel: "De formules voor volwassenen in één oogopslag",
      formulaLabel: "Formule",
      meals: {
        lunch: "Lunch · maandag–zaterdag",
        dinner: "Avond, zondag & feestdagen"
      },
      perPerson: "per persoon",
      orders: "Maximaal aantal bestellingen",
      dishesPerOrder: "Gerechten per bestelling (max.)",
      wait: "Tussen twee bestellingen",
      adultWaitNote: "Volwassenen: 15 min. tijdens de lunch op zondag en feestdagen; 20 min. ’s avonds. Op zondag en feestdagen geldt de avondformule de hele dag.",
      exclusions: "Dranken en desserts zijn bij geen enkele formule inbegrepen.",
      childrenTitle: "Kindermenu",
      ageUnit: "jaar",
      childrenOrders: "bestellingen per kind",
      childrenDishes: "gerechten maximaal per bestelling",
      childrenWaitNote: "Tussen bestellingen: 15 min. tijdens de lunch van maandag tot zaterdag; 20 min. ’s avonds en de hele dag op zondag en feestdagen, ook tijdens de lunch.",
      steps: [
        {
          title: "Kies uw formule",
          description: "Elke gast kiest een eigen formule volgens de dag en de maaltijd. Op zondag en feestdagen geldt de avondformule de hele dag. Er is een kindermenu voor kinderen van 3 tot 10 jaar."
        },
        {
          title: "Bestel à la carte",
          description: "Volwassenen: maximaal 3 bestellingen per persoon, met maximaal 4 gerechten per bestelling tijdens de lunch van maandag tot zaterdag, of 5 bij de avondformule en de hele dag op zondag en feestdagen. Kinderen van 3 tot 10 jaar: 2 bestellingen van maximaal 4 gerechten."
        },
        {
          title: "Neem uw tijd",
          description: "Volwassenen wachten 15 minuten tussen bestellingen tijdens de lunch en 20 minuten ’s avonds, ook op zondag en feestdagen. Kinderen wachten 15 minuten tijdens de lunch van maandag tot zaterdag en 20 minuten ’s avonds en de hele dag op zondag en feestdagen."
        },
        {
          title: "Begin met een paar gerechten",
          description: "Onze tip: bestel eerst een paar gerechten. U hoeft niet bij elke bestelling het maximum te kiezen. Stem de volgende bestellingen af op uw eetlust."
        },
        {
          title: "Minder verspilling. Meer KUMO.",
          description: "Door in het begin met mate te bestellen, helpt u voedselverspilling te verminderen en houdt u ruimte om tijdens de maaltijd meer gerechten te ontdekken.",
          takeaway: "Het maximum is een grens, geen doel."
        }
      ]
    },
    pricing: {
      title: "Prijzen",
      description: "Kies uw formule volgens de dag en de maaltijd.",
      adult: "Volwassenen",
      children: "Kindermenu",
      ageUnit: "jaar",
      perPerson: "per persoon",
      formulas: {
        weekdayLunch: {
          title: "Lunch op weekdagen",
          detail: "Maandag – vrijdag"
        },
        saturdayLunch: {
          title: "Lunch op zaterdag",
          detail: "Zaterdag"
        },
        weekdayDinner: {
          title: "Diner op weekdagen",
          detail: "Maandag – donderdag"
        },
        weekendHolidays: {
          title: "Weekend & feestdagen",
          detail: "Vrijdag- en zaterdagavond · De hele dag op zondag en feestdagen"
        }
      },
      lunch: "Lunch",
      dinner: "Diner",
      exclusions: "Dranken en desserts zijn niet inbegrepen.",
      note: "Elke formule is individueel. Gesloten op dinsdag. Feestdagtarieven gelden de hele dag."
    },
    space: {
      title: "Ons restaurant",
      previous: "Vorige foto", next: "Volgende foto",
      labels: ["De eetzaal", "De lounge", "De robots", "Welkom bij KUMO", "De bar", "De nissen", "Aan tafel"],
      description: "U vindt KUMO in het Rich’l-centrum in Waterloo, in Waals-Brabant, net ten zuiden van Brussel. Gezellige nissen en een warm onthaal vormen het decor voor een lunch met het gezin, een romantisch diner of een avond met vrienden.",
      imageAlts: ["De eetzaal van KUMO met gouden zuilen en petrolblauwe stoelen", "De lounge van KUMO met blauwe glaspanelen en gouden scheidingswanden", "Bedieningsrobots voor de sushitoog van KUMO", "De gevel en het terras van restaurant KUMO in Waterloo", "De bar van KUMO met verlichte flessenrekken", "De centrale gang en gouden nissen bij KUMO", "Een tafel tussen oranje zitbanken en gouden zuilen bij KUMO"],
    },
    booking: {
      title: "Contact",
      description: "Een maaltijd met het gezin, een avond met vrienden of iets te vieren? Reserveer online of bel ons om uw bezoek te plannen.",
      mapTitle: "Locatie van restaurant KUMO in Waterloo", call: "Reserveren", directions: "Routebeschrijving", addressLabel: "Hier vindt u ons", phoneLabel: "Reserveringen", hoursLabel: "Openingsuren", daysLabel: "Woensdag tot maandag", closedLabel: "Gesloten op dinsdag", lunchLabel: "Lunch", dinnerLabel: "Diner",
    },
    reviews: {
      eyebrow: "Google-reviews",
      title: "Onze gasten aan het woord",
      description: "Tien fragmenten uit vijfsterrenreviews van onze gasten op Google. Hun indrukken van de keuken, het onthaal en de sfeer.",
      fiveStars: "5 van de 5 sterren",
      excerpt: "Fragment",
      translatedExcerpt: "Vertaald fragment",
      showMore: "Toon 5 extra reviews",
      showLess: "Toon minder reviews",
      googleLink: "Meer reviews op Google",
      selectionLabel: "Geselecteerde vijfsterrenreviews",
      previous: "Vorige review",
      next: "Volgende review",
    },
    reservation: { title: "Reserveren", iframeTitle: "Online reserveren bij KUMO" },
    footer: {
      title: "Aziatisch restaurant in Waterloo, België",
      note: "Sushi, teppanyaki en dim sum in het Rich’l-centrum in Waals-Brabant. Kom langs ten zuiden van Brussel voor een lunch of diner om samen van te genieten.",
      addressLabel: "Adres", phoneLabel: "Telefoon", navigationLabel: "Navigatie in de voettekst", rights: "Alle rechten voorbehouden.", location: "Waterloo, België",
    },
    notFound: { title: "Deze pagina is verdwenen.", description: "U vindt de kaart, het restaurant en alle praktische informatie op onze homepagina.", back: "Terug naar de homepagina" },
    error: { title: "Een kleine onderbreking.", description: "Probeer het opnieuw of bel ons om uw tafel te reserveren.", retry: "Opnieuw proberen" },
  },
} as const;

export type Language = keyof typeof translations;

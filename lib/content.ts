export const brandName = "Sushi King";

export const menuItems = [
  {
    id: "akami-nigiri",
    name: "Akami Nigiri",
    price: "8",
    tag: "Spotlight",
    description: "Bluefin tuna, warm rice, nikiri glaze, and a quiet line of wasabi.",
    alt: "Grilled prawns with lemon on a deep green plate",
    image: "/menu-section/grilled-prawns.jpg",
  },
  {
    id: "hamachi",
    name: "Hamachi Citrus",
    price: "12",
    tag: "Bright",
    description: "Yellowtail, yuzu kosho, toasted sesame, and preserved lemon.",
    alt: "Premium sashimi selection arranged over ice with oyster and herbs",
    image: "/menu-section/sashimi-selection.jpg",
  },
  {
    id: "king-roll",
    name: "King Roll",
    price: "18",
    tag: "Signature",
    description: "Toro, avocado, crisp nori, house tare, and gold sesame.",
    alt: "Scallops served in shells on a gold ceramic plate",
    image: "/menu-section/gold-scallops.png",
  },
  {
    id: "sake-tataki",
    name: "Sake Tataki",
    price: "14",
    tag: "Fire",
    description: "Lightly torched salmon, ponzu, chive oil, and sea salt.",
    alt: "Langoustine crudo with salmon and sauce in a white bowl",
    image: "/menu-section/langoustine-crudo.png",
  },
  {
    id: "omakase",
    name: "Omakase",
    price: "85",
    tag: "Chef",
    description: "A seasonal progression shaped around the morning's best catch.",
    alt: "Prawn in ponzu sauce with herbs in a white bowl",
    image: "/menu-section/prawn-ponzu.png",
  },
  {
    id: "matcha",
    name: "Matcha Silk",
    price: "9",
    tag: "Finish",
    description: "Matcha cream, black sesame crumble, and salted white chocolate.",
    alt: "Oyster with roe, egg yolk, and lime in a white bowl",
    image: "/menu-section/oyster-lime.png",
  },
];

export const spaceSlides = [
  {
    id: "space-01",
    label: "Main Dining Room",
    image: "/space/space-01.webp",
    alt: `${brandName} main dining room with premium lighting and gold architectural details`,
  },
  {
    id: "space-02",
    label: "Private Dining",
    image: "/space/space-02.webp",
    alt: `${brandName} private dining room with refined seating and dramatic lighting`,
  },
  {
    id: "space-03",
    label: "Restaurant Interior",
    image: "/space/space-03.webp",
    alt: `${brandName} restaurant interior with illuminated dining areas`,
  },
  {
    id: "space-04",
    label: "Welcome Area",
    image: "/space/space-04.webp",
    alt: `${brandName} welcome area with sculptural decor and warm lighting`,
  },
  {
    id: "space-05",
    label: "Dining Detail",
    image: "/space/space-05.webp",
    alt: `${brandName} dining area detail with polished finishes`,
  },
  {
    id: "space-06",
    label: "Lounge Detail",
    image: "/space/space-06.webp",
    alt: `${brandName} lounge detail with atmospheric restaurant lighting`,
  },
  {
    id: "space-07",
    label: "Interior Detail",
    image: "/space/space-07.webp",
    alt: `${brandName} interior detail with premium materials`,
  },
  {
    id: "space-08",
    label: "Guest Area",
    image: "/space/space-08.webp",
    alt: `${brandName} guest area with elegant restaurant design`,
  },
];

export const restaurantInfo = {
  address: "Almancil, Av. Duarte Pacheco, 8135-104",
  email: "reservas@sushiking.pt",
  phone: "+351 935 178 351",
  phoneHref: "tel:+351935178351",
  mapHref: "https://maps.app.goo.gl/yM64HDoChaWjS5Ci9",
  hours: {
    days: "Todos os dias",
    lunch: "12:00 - 15:00",
    dinner: "19:00 - 23:00",
  },
} as const;

export const reservationPhoneHref = restaurantInfo.phoneHref;

export const pricingGroups = [
  {
    id: "weekday",
    items: [
      { id: "lunch", price: "€18,95" },
      { id: "dinner", price: "€26,95" },
    ],
  },
  {
    id: "weekend-holiday",
    items: [
      { id: "lunch", price: "€26,95" },
      { id: "dinner", price: "€26,95" },
    ],
  },
  {
    id: "children",
    items: [
      { id: "weekday-lunch", price: "€11,95" },
      { id: "weekday-dinner", price: "€14,95" },
      { id: "weekend-holiday", price: "€14,95" },
    ],
  },
] as const;

export const takeawayItems = [
  {
    id: "sashimi-misto-12",
    image: "/takeaway/sashimi misto 12pz - N32 - 15eur.webp",
    price: "15€",
    pieces: "12",
  },
  {
    id: "caixa-12",
    image: "/takeaway/caixa de 12pz - N39 - 15eur.webp",
    price: "15€",
    pieces: "12",
  },
  {
    id: "caixa-18",
    image: "/takeaway/caixa de 18pz - N37 - 15eur.webp",
    price: "15€",
    pieces: "18",
  },
  {
    id: "caixa-23",
    image: "/takeaway/caixa de 23pz - N36 - 18eur.webp",
    price: "18€",
    pieces: "23",
  },
  {
    id: "caixa-38",
    image: "/takeaway/caixa de 38pz - N38 - 30eur.webp",
    price: "30€",
    pieces: "38",
  },
  {
    id: "caixa-56",
    image: "/takeaway/caixa de 56pz - N39 - 50eur.webp",
    price: "50€",
    pieces: "56",
  },
] as const;

export const translations = {
  pt: {
    nav: {
      home: "Início",
      menu: "Menu",
      contact: "Contactos",
      book: "Reservar Mesa",
      takeaway: "Take Away",
    },
    hero: {
      eyebrow: "Sushi premium em Faro",
      title: brandName,
      description:
        "Sushi Buffet em Faro, Algarve — Fresco, Rápido, Sem Limites.",
      primary: "Reservar Mesa",
      secondary: "Ver Menu",
      scroll: "Descer",
    },
    menuSection: {
      eyebrow: "A nossa seleção",
      title: "O Nosso Menu",
      description:
        "Peças precisas, arroz temperado no ponto e produtos escolhidos para uma degustação sofisticada.",
      viewFull: "Explorar o menu",
    },
    pricing: {
      title: "Preçário",
      note: "Bebidas e sobremesas não incluídas.",
      groups: [
        {
          id: "weekday",
          title: "Segunda a sexta",
          items: [
            { id: "lunch", label: "Almoço" },
            { id: "dinner", label: "Jantar" },
          ],
        },
        {
          id: "weekend-holiday",
          title: "Fim de semana e feriado",
          items: [
            { id: "lunch", label: "Almoço" },
            { id: "dinner", label: "Jantar" },
          ],
        },
        {
          id: "children",
          title: "Crianças (90–140 cm)",
          items: [
            { id: "weekday-lunch", label: "Almoço · Segunda a sexta" },
            { id: "weekday-dinner", label: "Jantar · Segunda a sexta" },
            { id: "weekend-holiday", label: "Fim de semana e feriado" },
          ],
        },
      ],
    },
    space: {
      eyebrow: "O espaço",
      title: "O Nosso Espaço",
      description:
        "Luzes vibrantes, materiais táteis e um ritmo intimista. Descubra o ambiente do Sushi King em Faro — perfeito para jantares tranquilos, celebrações e noites especiais.",
      counter: "Balcão",
      diningRoom: "Sala",
      bar: "Bar",
      privateTable: "Mesa privada",
    },
    booking: {
      eyebrow: "Book a Table",
      title: "Reservar Mesa",
      description:
        "Para reservas, grupos ou pedidos especiais, fale connosco diretamente por telefone.",
      addressLabel: "Morada",
      phoneLabel: "Telefone",
      emailLabel: "Email",
      hoursLabel: "Horário",
      daysLabel: "Todos os dias",
      lunchLabel: "Almoço",
      dinnerLabel: "Jantar",
    },
    takeaway: {
      eyebrow: "Take away",
      title: "Menu Take Away",
      description:
        "Caixas preparadas no momento para levar, com combinados frescos e sashimi selecionado.",
      phoneCta: "Encomendar por telefone",
      priceLabel: "Preço",
      readyLabel: "Preparado para levar",
      items: [
        { id: "sashimi-misto-12", name: "Sashimi misto 12 peças" },
        { id: "caixa-12", name: "Caixa de 12 peças" },
        { id: "caixa-18", name: "Caixa de 18 peças" },
        { id: "caixa-23", name: "Caixa de 23 peças" },
        { id: "caixa-38", name: "Caixa de 38 peças" },
        { id: "caixa-56", name: "Caixa de 56 peças" },
      ],
    },
    footer: {
      note: "Sushi Buffet em Faro, Algarve — Fresco, Rápido, Sem Limites.",
      rights: "Designed by Intelis. Todos os direitos reservados.",
    },
    menu: {
      back: "Voltar",
      eyebrow: `Menu ${brandName}`,
      title: "Cortes precisos, arroz quente, final limpo.",
      description:
        "Uma amostra editorial do menu. Os pratos e preços são placeholders até o menu final ser carregado.",
    },
  },
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      contact: "Contact Us",
      book: "Book a Table",
      takeaway: "Takeaway",
    },
    hero: {
      eyebrow: "Premium sushi in Faro",
      title: brandName,
      description:
        "All-You-Can-Eat Sushi in Faro, Algarve — Fresh, Fast, Unlimited.",
      primary: "Book a Table",
      secondary: "View Menu",
      scroll: "Scroll",
    },
    menuSection: {
      eyebrow: "Our selection",
      title: "Our Menu",
      description:
        "Precise cuts, perfectly seasoned rice and ingredients selected for a refined tasting experience.",
      viewFull: "Explore the menu",
    },
    pricing: {
      title: "Pricing",
      note: "Drinks and desserts are not included.",
      groups: [
        {
          id: "weekday",
          title: "Monday to Friday",
          items: [
            { id: "lunch", label: "Lunch" },
            { id: "dinner", label: "Dinner" },
          ],
        },
        {
          id: "weekend-holiday",
          title: "Weekend and holiday",
          items: [
            { id: "lunch", label: "Lunch" },
            { id: "dinner", label: "Dinner" },
          ],
        },
        {
          id: "children",
          title: "Children (90–140 cm)",
          items: [
            { id: "weekday-lunch", label: "Lunch · Monday to Friday" },
            { id: "weekday-dinner", label: "Dinner · Monday to Friday" },
            { id: "weekend-holiday", label: "Weekend and holiday" },
          ],
        },
      ],
    },
    space: {
      eyebrow: "Our space",
      title: "Our Space",
      description:
        "Vibrant lighting, tactile materials and an intimate pace. Discover Sushi King's ambience in Faro — perfect for quiet dinners, celebrations and special evenings.",
      counter: "Counter",
      diningRoom: "Dining Room",
      bar: "Bar",
      privateTable: "Private Table",
    },
    booking: {
      eyebrow: "Book a Table",
      title: "Book a Table",
      description:
        "For reservations, groups, or special requests, contact us directly by phone.",
      addressLabel: "Address",
      phoneLabel: "Phone",
      emailLabel: "Email",
      hoursLabel: "Opening Hours",
      daysLabel: "Every day",
      lunchLabel: "Lunch",
      dinnerLabel: "Dinner",
    },
    takeaway: {
      eyebrow: "Take away",
      title: "Takeaway Menu",
      description:
        "Freshly prepared boxes to take away, with selected sushi combinations and sashimi.",
      phoneCta: "Order by phone",
      priceLabel: "Price",
      readyLabel: "Prepared to take away",
      items: [
        { id: "sashimi-misto-12", name: "Mixed sashimi 12 pc" },
        { id: "caixa-12", name: "12 pc box" },
        { id: "caixa-18", name: "18 pc box" },
        { id: "caixa-23", name: "23 pc box" },
        { id: "caixa-38", name: "38 pc box" },
        { id: "caixa-56", name: "56 pc box" },
      ],
    },
    footer: {
      note: "All-You-Can-Eat Sushi in Faro, Algarve — Fresh, Fast, Unlimited.",
      rights: "Designed by Intelis. All rights reserved.",
    },
    menu: {
      back: "Back",
      eyebrow: `${brandName} menu`,
      title: "Precise cuts, perfectly seasoned rice, and a refined tasting experience.",
      description:
        "An editorial sample of the menu. Dishes and prices are placeholders until the final menu is loaded.",
    },
  },
} as const;

export type Language = keyof typeof translations;

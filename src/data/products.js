export const products = [
  // ===== FEMME =====
  {
    id: 1,
    name: "Robe Soiree Velours",
    category: "femme",
    price: 489,
    originalPrice: 650,
    badge: "Nouveau",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop&q=80",
    description: "Robe longue en velours bordeaux, coupe fluide et elegante."
  },
  {
    id: 2,
    name: "Manteau Cachemire Beige",
    category: "femme",
    price: 1250,
    badge: "Best-seller",
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&h=800&fit=crop&q=80",
    description: "Manteau long en cachemire, coupe oversize, douceur incomparable."
  },
  {
    id: 3,
    name: "Sac Bandouliere Cuir",
    category: "femme",
    price: 385,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=80",
    description: "Sac en cuir pleine fleur, finitions dorees, bandouliere ajustable."
  },
  {
    id: 4,
    name: "Blazer Oversize Noir",
    category: "femme",
    price: 520,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=800&fit=crop&q=80",
    description: "Blazer structuree oversize, doublure satin, boutons nacres."
  },
  {
    id: 5,
    name: "Escarpins Daim Rouge",
    category: "femme",
    price: 345,
    badge: "Edition limitee",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80",
    description: "Escarpins en daim italien, talon 8cm, semelle cuir."
  },
  {
    id: 6,
    name: "Pull Cachemire Col Roule",
    category: "femme",
    price: 295,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop&q=80",
    description: "Pull col roule en cachemire pur, coupe ajustee, toucher ultra-doux."
  },

  // ===== HOMME =====
  {
    id: 7,
    name: "Costume Trois-Pieces Anthracite",
    category: "homme",
    price: 1450,
    badge: "Nouveau",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80",
    description: "Costume trois-pieces en laine italienne, coupe slim, finitions main."
  },
  {
    id: 8,
    name: "Veste Cuir Biker",
    category: "homme",
    price: 890,
    badge: "Best-seller",
    image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=600&h=800&fit=crop&q=80",
    description: "Veste en cuir d'agneau souple, doublure matelassee, zips YKK."
  },
  {
    id: 9,
    name: "Chemise Lin Blanche",
    category: "homme",
    price: 195,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop&q=80",
    description: "Chemise en lin europeen, coupe reguliere, col italien."
  },
  {
    id: 10,
    name: "Montre Automatique Or Rose",
    category: "homme",
    price: 2200,
    badge: "Edition limitee",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop&q=80",
    description: "Montre automatique, boitier or rose 42mm, bracelet cuir alligator."
  },
  {
    id: 11,
    name: "Chelsea Boots Cuir",
    category: "homme",
    price: 420,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&h=800&fit=crop&q=80",
    description: "Bottines Chelsea en cuir de veau, semelle Goodyear, elastiques lateraux."
  },
  {
    id: 12,
    name: "Echarpe Laine Merinos",
    category: "homme",
    price: 165,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&h=800&fit=crop&q=80",
    description: "Echarpe en laine merinos extra-fine, tissage ecossais."
  },

  // ===== ENFANT =====
  {
    id: 13,
    name: "Robe Liberty Fille",
    category: "enfant",
    price: 125,
    badge: "Nouveau",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&h=800&fit=crop&q=80",
    description: "Robe en coton Liberty, col claudine, boutons nacres dans le dos."
  },
  {
    id: 14,
    name: "Blazer Mini-Gentleman",
    category: "enfant",
    price: 145,
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&h=800&fit=crop&q=80",
    description: "Blazer en tweed pour garcon, coupe ajustee, poches passepoilees."
  },
  {
    id: 15,
    name: "Baskets Premium Enfant",
    category: "enfant",
    price: 95,
    badge: "Best-seller",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop&q=80",
    description: "Baskets en cuir souple, semelle confort, scratch et lacets."
  },
  {
    id: 16,
    name: "Pyjama Soie Enfant",
    category: "enfant",
    price: 89,
    image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&h=800&fit=crop&q=80",
    description: "Pyjama en soie naturelle, doux et hypoallergenique, motifs etoiles."
  },
];

export const categories = [
  { id: "all", label: "Tout" },
  { id: "femme", label: "Femme" },
  { id: "homme", label: "Homme" },
  { id: "enfant", label: "Enfant" },
];

export const collections = [
  {
    id: 1,
    title: "Collection Automne-Hiver",
    subtitle: "Elegance intemporelle",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=700&fit=crop&q=80",
    description: "Decouvrez notre selection de pieces raffinées pour la saison froide."
  },
  {
    id: 2,
    title: "Accessoires Premium",
    subtitle: "Les details font la difference",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&h=700&fit=crop&q=80",
    description: "Montres, sacs et chaussures pour completer votre style."
  },
  {
    id: 3,
    title: "Collection Enfant",
    subtitle: "Le luxe des le plus jeune age",
    image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=1200&h=700&fit=crop&q=80",
    description: "Des pieces pensees pour le confort et l'elegance des plus petits."
  }
];

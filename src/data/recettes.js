// Système de recettes pour combiner les aliments

export const CATEGORIES_RECETTES = {
  SALADE: 'salade',
  SOUPE: 'soupe',
  PLAT: 'plat',
  SMOOTHIE: 'smoothie',
  DESSERT: 'dessert'
};

export const RECETTES = [
  // Salades (2-3 ingrédients)
  {
    id: 'salade_mixte',
    nom: 'Salade Fraîche',
    emoji: '🥗',
    categorie: CATEGORIES_RECETTES.SALADE,
    ingredients: ['Salade', 'Tomate', 'Carotte'],
    description: 'Une salade fraîche et croquante',
    temps: '5 min',
    difficulte: 'Facile'
  },
  {
    id: 'salade_fruits',
    nom: 'Salade de Fruits',
    emoji: '🍇',
    categorie: CATEGORIES_RECETTES.SALADE,
    ingredients: ['Pomme', 'Banane', 'Orange'],
    description: 'Un mélange vitaminé et sucré',
    temps: '10 min',
    difficulte: 'Facile'
  },

  // Soupes (2-4 ingrédients)
  {
    id: 'soupe_legumes',
    nom: 'Soupe de Légumes',
    emoji: '🍲',
    categorie: CATEGORIES_RECETTES.SOUPE,
    ingredients: ['Carotte', 'Courgette', 'Poivron'],
    description: 'Une soupe réconfortante et nutritive',
    temps: '25 min',
    difficulte: 'Moyen'
  },
  {
    id: 'veloute_tomate',
    nom: 'Velouté de Tomate',
    emoji: '🍅',
    categorie: CATEGORIES_RECETTES.SOUPE,
    ingredients: ['Tomate', 'Carotte'],
    description: 'Un velouté onctueux et savoureux',
    temps: '20 min',
    difficulte: 'Facile'
  },

  // Plats principaux (3-4 ingrédients)
  {
    id: 'ratatouille',
    nom: 'Ratatouille',
    emoji: '🍆',
    categorie: CATEGORIES_RECETTES.PLAT,
    ingredients: ['Courgette', 'Tomate', 'Poivron'],
    description: 'Le plat traditionnel méditerranéen',
    temps: '45 min',
    difficulte: 'Moyen'
  },
  {
    id: 'plat_poulet',
    nom: 'Poulet aux Légumes',
    emoji: '🍗',
    categorie: CATEGORIES_RECETTES.PLAT,
    ingredients: ['Poulet', 'Carotte', 'Courgette'],
    description: 'Un plat complet et savoureux',
    temps: '30 min',
    difficulte: 'Moyen'
  },

  // Smoothies (1-2 fruits)
  {
    id: 'smoothie_banane',
    nom: 'Smoothie à la Banane',
    emoji: '🥤',
    categorie: CATEGORIES_RECETTES.SMOOTHIE,
    ingredients: ['Banane', 'Lait'],
    description: 'Onctueux et énergisant',
    temps: '5 min',
    difficulte: 'Très facile'
  },
  {
    id: 'smoothie_fraise',
    nom: 'Smoothie aux Fraises',
    emoji: '🍓',
    categorie: CATEGORIES_RECETTES.SMOOTHIE,
    ingredients: ['Fraises', 'Lait'],
    description: 'Plein de vitamines',
    temps: '5 min',
    difficulte: 'Très facile'
  },

  // Desserts (1-2 ingrédients)
  {
    id: 'compote_pomme',
    nom: 'Compote de Pomme',
    emoji: '🍎',
    categorie: CATEGORIES_RECETTES.DESSERT,
    ingredients: ['Pomme'],
    description: 'Simple et délicieux',
    temps: '15 min',
    difficulte: 'Très facile'
  },
  {
    id: 'salade_pomme_banane',
    nom: 'Salade Pomme-Banane',
    emoji: '🥧',
    categorie: CATEGORIES_RECETTES.DESSERT,
    ingredients: ['Pomme', 'Banane'],
    description: 'Un dessert fruité et naturel',
    temps: '5 min',
    difficulte: 'Très facile'
  }
];

// Fonction pour trouver les recettes possibles avec les aliments disponibles
export const getRecettesPossibles = (alimentsDansFrigo) => {
  const nomsAliments = alimentsDansFrigo.map(aliment => aliment.nom);
  
  return RECETTES.filter(recette => {
    // Vérifier si tous les ingrédients de la recette sont disponibles
    return recette.ingredients.every(ingredient => 
      nomsAliments.includes(ingredient)
    );
  });
};

// Fonction pour vérifier si on peut faire une recette spécifique
export const peutFaireRecette = (recette, alimentsDansFrigo) => {
  const nomsAliments = alimentsDansFrigo.map(aliment => aliment.nom);
  return recette.ingredients.every(ingredient => 
    nomsAliments.includes(ingredient)
  );
};

// Fonction pour obtenir les aliments nécessaires pour une recette
export const getAlimentsNecessaires = (recette, alimentsDansFrigo) => {
  const alimentsUtilises = [];
  
  recette.ingredients.forEach(ingredientNom => {
    // Trouver le premier aliment correspondant dans le frigo
    const aliment = alimentsDansFrigo.find(a => a.nom === ingredientNom);
    if (aliment) {
      alimentsUtilises.push(aliment);
    }
  });
  
  return alimentsUtilises;
};

// Fonction pour calculer le score d'une recette (total des points des ingrédients × 2)
export const calculerScoreRecette = (recette) => {
  // Chaque aliment vaut 10 points (valeur de consommation normale)
  const pointsParAliment = 10;
  const totalPointsIngredients = recette.ingredients.length * pointsParAliment;
  
  // Retourner le total × 2 comme demandé
  return totalPointsIngredients * 2;
};

export default RECETTES; 
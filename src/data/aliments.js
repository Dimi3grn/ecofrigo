// Base de données des aliments pour EcoFrigo
// Durées de conservation en jours

export const TYPES_ALIMENTS = {
  LEGUME: 'légume',
  FRUIT: 'fruit',
  VIANDE: 'viande',
  PRODUIT_LAITIER: 'produit_laitier',
  FECULENT: 'féculent',
  AUTRE: 'autre'
};

export const STATUTS_FRAICHEUR = {
  FRAIS: 'frais',        // Plus de 2 jours restants
  ATTENTION: 'attention', // 1-2 jours restants
  EXPIRE: 'expire'       // 0 jour ou moins
};

export const BASE_ALIMENTS = [
  // Légumes
  {
    id: 1,
    nom: 'Carotte',
    emoji: '🥕',
    type: TYPES_ALIMENTS.LEGUME,
    dureeConservation: 14, // jours
    conseils: 'Conservez au frais, retirez les fanes'
  },
  {
    id: 2,
    nom: 'Salade',
    emoji: '🥬',
    type: TYPES_ALIMENTS.LEGUME,
    dureeConservation: 5,
    conseils: 'Lavez et séchez avant conservation'
  },
  {
    id: 3,
    nom: 'Tomate',
    emoji: '🍅',
    type: TYPES_ALIMENTS.LEGUME,
    dureeConservation: 7,
    conseils: 'Ne pas mettre au frigo si pas mûre'
  },
  {
    id: 4,
    nom: 'Courgette',
    emoji: '🥒',
    type: TYPES_ALIMENTS.LEGUME,
    dureeConservation: 10,
    conseils: 'Conserver dans le bac à légumes'
  },
  {
    id: 5,
    nom: 'Poivron',
    emoji: '🫑',
    type: TYPES_ALIMENTS.LEGUME,
    dureeConservation: 8,
    conseils: 'Se conserve mieux entier'
  },

  // Fruits
  {
    id: 6,
    nom: 'Pomme',
    emoji: '🍎',
    type: TYPES_ALIMENTS.FRUIT,
    dureeConservation: 21,
    conseils: 'Séparer des autres fruits'
  },
  {
    id: 7,
    nom: 'Banane',
    emoji: '🍌',
    type: TYPES_ALIMENTS.FRUIT,
    dureeConservation: 6,
    conseils: 'Ne pas mettre au frigo'
  },
  {
    id: 8,
    nom: 'Orange',
    emoji: '🍊',
    type: TYPES_ALIMENTS.FRUIT,
    dureeConservation: 14,
    conseils: 'Conserver à température ambiante'
  },
  {
    id: 9,
    nom: 'Fraises',
    emoji: '🍓',
    type: TYPES_ALIMENTS.FRUIT,
    dureeConservation: 3,
    conseils: 'Ne pas laver avant conservation'
  },

  // Produits laitiers
  {
    id: 10,
    nom: 'Lait',
    emoji: '🥛',
    type: TYPES_ALIMENTS.PRODUIT_LAITIER,
    dureeConservation: 4,
    conseils: 'Vérifier la date de péremption'
  },
  {
    id: 11,
    nom: 'Yaourt',
    emoji: '🧈',
    type: TYPES_ALIMENTS.PRODUIT_LAITIER,
    dureeConservation: 7,
    conseils: 'Peut se consommer quelques jours après DLC'
  },
  {
    id: 12,
    nom: 'Fromage',
    emoji: '🧀',
    type: TYPES_ALIMENTS.PRODUIT_LAITIER,
    dureeConservation: 12,
    conseils: 'Retirer la partie moisie si nécessaire'
  },

  // Viandes
  {
    id: 13,
    nom: 'Poulet',
    emoji: '🍗',
    type: TYPES_ALIMENTS.VIANDE,
    dureeConservation: 2,
    conseils: 'Bien cuire, conserver au froid'
  },
  {
    id: 14,
    nom: 'Poisson',
    emoji: '🐟',
    type: TYPES_ALIMENTS.VIANDE,
    dureeConservation: 1,
    conseils: 'Consommer rapidement'
  },

  // Féculents
  {
    id: 15,
    nom: 'Pain',
    emoji: '🍞',
    type: TYPES_ALIMENTS.FECULENT,
    dureeConservation: 3,
    conseils: 'Peut être grillé si un peu dur'
  },
  {
    id: 16,
    nom: 'Pâtes',
    emoji: '🍝',
    type: TYPES_ALIMENTS.FECULENT,
    dureeConservation: 3,
    conseils: 'Réchauffer avec un peu d\'eau'
  }
];

// Fonctions utilitaires
export const getAlimentById = (id) => {
  return BASE_ALIMENTS.find(aliment => aliment.id === id);
};

export const getAlimentsByType = (type) => {
  return BASE_ALIMENTS.filter(aliment => aliment.type === type);
};

export const getRandomAliments = (count = 5) => {
  const shuffled = [...BASE_ALIMENTS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Fonction pour calculer le statut de fraîcheur
export const calculerStatutFraicheur = (joursRestants) => {
  if (joursRestants <= 0) return STATUTS_FRAICHEUR.EXPIRE;
  if (joursRestants <= 2) return STATUTS_FRAICHEUR.ATTENTION;
  return STATUTS_FRAICHEUR.FRAIS;
};

// Fonction pour calculer les jours restants
export const calculerJoursRestants = (dateAjout, dureeConservation) => {
  const maintenant = new Date();
  const dateExpiration = new Date(dateAjout);
  dateExpiration.setDate(dateExpiration.getDate() + dureeConservation);
  
  const diffTime = dateExpiration - maintenant;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}; 
import { useState, useEffect } from 'react';

// Système de niveaux
const NIVEAUX = [
  { nom: 'Novice', seuil: 0, emoji: '🌱' },
  { nom: 'Éco-Apprenti', seuil: 100, emoji: '🌿' },
  { nom: 'Éco-Citoyen', seuil: 300, emoji: '🍃' },
  { nom: 'Éco-Expert', seuil: 600, emoji: '🌳' },
  { nom: 'Éco-Héros', seuil: 1000, emoji: '🏆' }
];

// Points pour les actions
const POINTS = {
  ALIMENT_SAUVE: 15,
  ALIMENT_CONSOMME: 10,
  ALIMENT_GASPILLE: -25,
  RECETTE_UTILISEE: 20,
  DEFI_COMPLETE: 30,
  STREAK_BONUS: 5
};

export const useScore = (initialScore = 0) => {
  const [score, setScore] = useState(initialScore);
  const [statistiques, setStatistiques] = useState({
    alimentsSauves: 0,
    alimentsConsommes: 0,
    alimentsGaspilles: 0,
    recettesUtilisees: 0,
    defisCompletes: 0,
    streakActuel: 0,
    meilleurStreak: 0,
    joursConsecutifs: 0
  });

  // Calcul du niveau actuel
  const getNiveauActuel = () => {
    const niveauxInverses = [...NIVEAUX].reverse();
    return niveauxInverses.find(niveau => score >= niveau.seuil) || NIVEAUX[0];
  };

  // Calcul du prochain niveau
  const getProchainNiveau = () => {
    const niveauActuel = getNiveauActuel();
    const indexActuel = NIVEAUX.findIndex(n => n.nom === niveauActuel.nom);
    return NIVEAUX[indexActuel + 1] || niveauActuel;
  };

  // Calcul du pourcentage vers le prochain niveau
  const getPourcentageProchainNiveau = () => {
    const niveauActuel = getNiveauActuel();
    const prochainNiveau = getProchainNiveau();
    
    if (niveauActuel === prochainNiveau) return 100; // Niveau max atteint
    
    const pointsNecessaires = prochainNiveau.seuil - niveauActuel.seuil;
    const pointsObtenus = score - niveauActuel.seuil;
    
    return Math.min(100, (pointsObtenus / pointsNecessaires) * 100);
  };

  // Actions pour modifier le score
  const actions = {
    alimentSauve: () => {
      const points = POINTS.ALIMENT_SAUVE + (statistiques.streakActuel * POINTS.STREAK_BONUS);
      setScore(prev => prev + points);
      setStatistiques(prev => ({
        ...prev,
        alimentsSauves: prev.alimentsSauves + 1,
        streakActuel: prev.streakActuel + 1,
        meilleurStreak: Math.max(prev.meilleurStreak, prev.streakActuel + 1)
      }));
      return points;
    },

    alimentConsomme: () => {
      const points = POINTS.ALIMENT_CONSOMME;
      setScore(prev => prev + points);
      setStatistiques(prev => ({
        ...prev,
        alimentsConsommes: prev.alimentsConsommes + 1
      }));
      return points;
    },

    alimentGaspille: () => {
      const points = POINTS.ALIMENT_GASPILLE;
      setScore(prev => Math.max(0, prev + points)); // Le score ne peut pas être négatif
      setStatistiques(prev => ({
        ...prev,
        alimentsGaspilles: prev.alimentsGaspilles + 1,
        streakActuel: 0 // Reset du streak
      }));
      return points;
    },

    recetteUtilisee: () => {
      const points = POINTS.RECETTE_UTILISEE;
      setScore(prev => prev + points);
      setStatistiques(prev => ({
        ...prev,
        recettesUtilisees: prev.recettesUtilisees + 1
      }));
      return points;
    },

    defiComplete: () => {
      const points = POINTS.DEFI_COMPLETE;
      setScore(prev => prev + points);
      setStatistiques(prev => ({
        ...prev,
        defisCompletes: prev.defisCompletes + 1
      }));
      return points;
    }
  };

  // Calcul des équivalences écologiques
  const getEquivalencesEcologiques = () => {
    const kg_co2_par_point = 0.5; // Approximation : 1 point = 0.5 kg CO2 économisé
    const euros_par_point = 2; // Approximation : 1 point = 2€ économisé
    
    return {
      co2Economise: Math.round(score * kg_co2_par_point * 100) / 100,
      euroEconomise: Math.round(score * euros_par_point),
      repasPreserves: Math.round(score / 10) // 10 points = 1 repas préservé
    };
  };

  // Persistance dans localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('ecofrigo-score');
    if (savedData) {
      const { score: savedScore, stats } = JSON.parse(savedData);
      setScore(savedScore);
      setStatistiques(stats);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ecofrigo-score', JSON.stringify({
      score,
      stats: statistiques
    }));
  }, [score, statistiques]);

  return {
    score,
    statistiques,
    niveauActuel: getNiveauActuel(),
    prochainNiveau: getProchainNiveau(),
    pourcentageProchainNiveau: getPourcentageProchainNiveau(),
    equivalencesEcologiques: getEquivalencesEcologiques(),
    actions,
    POINTS
  };
};

// Hook pour les badges et achievements
export const useBadges = (statistiques) => {
  const [badges, setBadges] = useState([]);

  const BADGES_DISPONIBLES = [
    {
      id: 'premier_sauve',
      nom: 'Premier Sauvetage',
      description: 'Sauver votre premier aliment',
      emoji: '🥇',
      condition: (stats) => stats.alimentsSauves >= 1
    },
    {
      id: 'econome',
      nom: 'Économe',
      description: 'Sauver 10 aliments',
      emoji: '💚',
      condition: (stats) => stats.alimentsSauves >= 10
    },
    {
      id: 'chef_anti_gaspi',
      nom: 'Chef Anti-Gaspi',
      description: 'Utiliser 5 recettes',
      emoji: '👨‍🍳',
      condition: (stats) => stats.recettesUtilisees >= 5
    },
    {
      id: 'streak_master',
      nom: 'Streak Master',
      description: 'Atteindre un streak de 10',
      emoji: '🔥',
      condition: (stats) => stats.meilleurStreak >= 10
    },
    {
      id: 'eco_hero',
      nom: 'Éco-Héros',
      description: 'Atteindre le niveau Éco-Héros',
      emoji: '🦸',
      condition: (stats) => false // sera calculé ailleurs
    }
  ];

  useEffect(() => {
    const badgesObtenus = BADGES_DISPONIBLES.filter(badge => 
      badge.condition(statistiques)
    );
    setBadges(badgesObtenus);
  }, [statistiques]);

  return badges;
}; 
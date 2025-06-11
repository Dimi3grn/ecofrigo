import { useState, useEffect } from 'react';
import { calculerJoursRestants, calculerStatutFraicheur } from '../data/aliments';

// Constantes pour le système accéléré
const DUREE_JOUR_MS = 15000; // 15 secondes = 1 jour
const INTERVAL_UPDATE_MS = 100; // Mise à jour toutes les 100ms pour la fluidité de la barre

// Hook personnalisé pour gérer les timers de péremption accélérés
export const useTimer = (dateAjout, dureeConservation) => {
  const [joursRestants, setJoursRestants] = useState(dureeConservation);
  const [progressionJour, setProgressionJour] = useState(100); // Pourcentage du jour actuel (100% = début du jour)
  const [statutFraicheur, setStatutFraicheur] = useState('frais');

  useEffect(() => {
    // Calculer le temps écoulé depuis l'ajout
    const maintenant = Date.now();
    const dateAjoutMs = new Date(dateAjout).getTime();
    const tempsEcoule = maintenant - dateAjoutMs;
    
    // Calculer combien de "jours" complets se sont écoulés
    const joursEcoules = Math.floor(tempsEcoule / DUREE_JOUR_MS);
    const tempsRestantDansJourActuel = tempsEcoule % DUREE_JOUR_MS;
    
    // Calculer les jours restants
    const joursRestantsCalcules = Math.max(0, dureeConservation - joursEcoules);
    
    // Calculer la progression du jour actuel (en pourcentage)
    const progressionCalculee = joursRestantsCalcules > 0 
      ? 100 - (tempsRestantDansJourActuel / DUREE_JOUR_MS * 100)
      : 0;

    // Mettre à jour les états initiaux
    setJoursRestants(joursRestantsCalcules);
    setProgressionJour(Math.max(0, progressionCalculee));
    setStatutFraicheur(calculerStatutFraicheur(joursRestantsCalcules));

    // Fonction pour mettre à jour le timer
    const updateTimer = () => {
      const maintenant = Date.now();
      const tempsEcoule = maintenant - dateAjoutMs;
      
      const joursEcoules = Math.floor(tempsEcoule / DUREE_JOUR_MS);
      const tempsRestantDansJourActuel = tempsEcoule % DUREE_JOUR_MS;
      
      const nouveauxJoursRestants = Math.max(0, dureeConservation - joursEcoules);
      const nouvelleProgression = nouveauxJoursRestants > 0 
        ? 100 - (tempsRestantDansJourActuel / DUREE_JOUR_MS * 100)
        : 0;
      
      setJoursRestants(nouveauxJoursRestants);
      setProgressionJour(Math.max(0, nouvelleProgression));
      setStatutFraicheur(calculerStatutFraicheur(nouveauxJoursRestants));
    };

    // Mise à jour toutes les 100ms pour une animation fluide
    const interval = setInterval(updateTimer, INTERVAL_UPDATE_MS);

    return () => clearInterval(interval);
  }, [dateAjout, dureeConservation]);

  return { 
    joursRestants, 
    progressionJour: Math.round(progressionJour), 
    statutFraicheur 
  };
};

// Hook pour gérer un frigo complet avec plusieurs aliments
export const useFrigoTimer = (aliments) => {
  const [alimentsAvecTimer, setAlimentsAvecTimer] = useState([]);

  useEffect(() => {
    const updateAllTimers = () => {
      const maintenant = Date.now();
      
      const alimentsMisAJour = aliments.map(aliment => {
        const dateAjoutMs = new Date(aliment.dateAjout).getTime();
        const tempsEcoule = maintenant - dateAjoutMs;
        
        const joursEcoules = Math.floor(tempsEcoule / DUREE_JOUR_MS);
        const tempsRestantDansJourActuel = tempsEcoule % DUREE_JOUR_MS;
        
        const joursRestants = Math.max(0, aliment.dureeConservation - joursEcoules);
        const progressionJour = joursRestants > 0 
          ? 100 - (tempsRestantDansJourActuel / DUREE_JOUR_MS * 100)
          : 0;
        
        return {
          ...aliment,
          joursRestants,
          progressionJour: Math.round(Math.max(0, progressionJour)),
          statutFraicheur: calculerStatutFraicheur(joursRestants)
        };
      });
      
      setAlimentsAvecTimer(alimentsMisAJour);
    };

    updateAllTimers();
    
    // Mise à jour toutes les 100ms
    const interval = setInterval(updateAllTimers, INTERVAL_UPDATE_MS);
    
    return () => clearInterval(interval);
  }, [aliments]);

  return alimentsAvecTimer;
};

// Hook pour détecter les aliments qui vont expirer
export const useAlertesPeremption = (aliments) => {
  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    const maintenant = Date.now();
    
    const alimentsEnAlerte = aliments.filter(aliment => {
      const dateAjoutMs = new Date(aliment.dateAjout).getTime();
      const tempsEcoule = maintenant - dateAjoutMs;
      const joursEcoules = Math.floor(tempsEcoule / DUREE_JOUR_MS);
      const joursRestants = Math.max(0, aliment.dureeConservation - joursEcoules);
      
      return joursRestants <= 2 && joursRestants > 0; // Alerte si expire dans 2 jours ou moins
    });

    setAlertes(alimentsEnAlerte);
  }, [aliments]);

  return alertes;
}; 
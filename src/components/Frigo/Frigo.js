import React, { useState, useEffect } from 'react';
import AlimentCard from '../Aliment/AlimentCard';
import PointsDisplay from '../PointsDisplay/PointsDisplay';
import { getRandomAliments } from '../../data/aliments';
import { useScoreContext } from '../../contexts/ScoreContext';
import './Frigo.css';

const Frigo = ({ onScoreChange, onAlimentsChange, alimentsExterieurs }) => {
  const [alimentsDisponibles, setAlimentsDisponibles] = useState([]);
  const [pointsFlottants, setPointsFlottants] = useState([]);
  const { actions } = useScoreContext();

  // Utiliser les aliments du parent au lieu d'un état local
  const alimentsDansFrigo = alimentsExterieurs || [];

  // Initialisation des aliments disponibles
  useEffect(() => {
    setAlimentsDisponibles(getRandomAliments(8));
  }, []);

  // Afficher les points flottants
  const showPointsFlottants = (points, alimentNom) => {
    const nouvelAffichage = {
      id: Date.now() + Math.random(),
      points,
      alimentNom,
      timestamp: Date.now()
    };

    setPointsFlottants(prev => [...prev, nouvelAffichage]);

    // Retirer l'affichage après 3 secondes
    setTimeout(() => {
      setPointsFlottants(prev => prev.filter(p => p.id !== nouvelAffichage.id));
    }, 3000);
  };

  // Fonction showNotification supprimée - on utilise seulement les points flottants

  // Fonction pour vérifier et retirer automatiquement les aliments expirés
  const checkExpiredAliments = () => {
    const alimentsExpires = [];
    const alimentsRestants = [];
    const DUREE_JOUR_MS = 15000; // 15 secondes = 1 jour (même système que useTimer)

    alimentsDansFrigo.forEach(aliment => {
      const dateAjoutMs = new Date(aliment.dateAjout).getTime();
      const maintenant = Date.now();
      const tempsEcoule = maintenant - dateAjoutMs;
      const joursEcoules = Math.floor(tempsEcoule / DUREE_JOUR_MS);
      
      if (joursEcoules >= aliment.dureeConservation) {
        alimentsExpires.push(aliment);
      } else {
        alimentsRestants.push(aliment);
      }
    });

    if (alimentsExpires.length > 0) {
      // Notifier le parent pour retirer les aliments expirés
      if (onAlimentsChange) {
        onAlimentsChange(alimentsRestants);
      }
      
      // Faire perdre des points pour chaque aliment expiré
      alimentsExpires.forEach(aliment => {
        const pointsPerdus = actions.alimentGaspille();
        // Afficher les points flottants (seule notification visuelle)
        showPointsFlottants(pointsPerdus, aliment.nom);
      });
    }
  };

  // Vérification périodique des aliments expirés
  useEffect(() => {
    if (alimentsDansFrigo.length === 0) return;
    
    const interval = setInterval(() => {
      checkExpiredAliments();
    }, 1000); // Vérifie toutes les 1 seconde pour plus de réactivité

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alimentsDansFrigo]);

  // Ajouter un aliment au frigo
  const ajouterAuFrigo = (aliment) => {
    const nouvelAliment = {
      ...aliment,
      id: Date.now() + Math.random(), // ID unique pour chaque instance
      dateAjout: new Date().toISOString()
    };

    // Notifier le parent pour ajouter l'aliment
    if (onAlimentsChange) {
      onAlimentsChange([...alimentsDansFrigo, nouvelAliment]);
    }
    
    // Retirer seulement l'aliment des disponibles (pas de respawn automatique)
    setAlimentsDisponibles(prev => prev.filter(a => a.id !== aliment.id));
  };

  // Consommer un aliment
  const consommerAliment = (aliment) => {
    // Notifier le parent pour retirer l'aliment
    if (onAlimentsChange) {
      onAlimentsChange(alimentsDansFrigo.filter(a => a.id !== aliment.id));
    }
    
    const pointsGagnes = actions.alimentConsomme();
    
    // Afficher les points flottants (seule notification visuelle)
    showPointsFlottants(pointsGagnes, aliment.nom);
    
    if (onScoreChange) {
      onScoreChange(pointsGagnes);
    }
  };

  // Jeter un aliment
  const jeterAliment = (aliment) => {
    // Notifier le parent pour retirer l'aliment
    if (onAlimentsChange) {
      onAlimentsChange(alimentsDansFrigo.filter(a => a.id !== aliment.id));
    }
    
    const pointsPerdus = actions.alimentGaspille();
    
    // Afficher les points flottants (seule notification visuelle)
    showPointsFlottants(pointsPerdus, aliment.nom);
    
    if (onScoreChange) {
      onScoreChange(pointsPerdus);
    }
  };

  // Réorganiser les aliments dans le frigo (simulation drag & drop simplifié)
  const deplacerAliment = (index, direction) => {
    const nouveauxAliments = [...alimentsDansFrigo];
    const nouvelIndex = direction === 'gauche' ? index - 1 : index + 1;
    
    if (nouvelIndex >= 0 && nouvelIndex < nouveauxAliments.length) {
      [nouveauxAliments[index], nouveauxAliments[nouvelIndex]] = 
      [nouveauxAliments[nouvelIndex], nouveauxAliments[index]];
      
      // Notifier le parent
      if (onAlimentsChange) {
        onAlimentsChange(nouveauxAliments);
      }
    }
  };

  return (
    <div className="frigo-container">
      <div className="frigo-header">
        <h2>🧊 Mon Frigo Virtuel</h2>
        <div className="frigo-stats">
          <span className="stat">
            {alimentsDansFrigo.length} aliment{alimentsDansFrigo.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="frigo-main">
        {/* Frigo virtuel */}
        <div className="frigo-interieur">
          <div className="frigo-grid">
            {alimentsDansFrigo.length === 0 ? (
              <div className="frigo-vide">
                <p>🍽️ Votre frigo est vide</p>
                <p className="sous-texte">Ajoutez des aliments ci-dessous !</p>
              </div>
            ) : (
              alimentsDansFrigo.map((aliment, index) => (
                <div key={aliment.id} className="frigo-slot">
                  <AlimentCard
                    aliment={aliment}
                    onConsommer={consommerAliment}
                    onJeter={jeterAliment}
                    className="in-frigo"
                  />
                  
                  {/* Contrôles de déplacement (simplifiés) */}
                  <div className="move-controls">
                    {index > 0 && (
                      <button 
                        className="move-btn"
                        onClick={() => deplacerAliment(index, 'gauche')}
                        title="Déplacer à gauche"
                      >
                        ←
                      </button>
                    )}
                    {index < alimentsDansFrigo.length - 1 && (
                      <button 
                        className="move-btn"
                        onClick={() => deplacerAliment(index, 'droite')}
                        title="Déplacer à droite"
                      >
                        →
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Aliments disponibles à ajouter */}
        <div className="aliments-disponibles">
          <h3>🛒 Aliments disponibles</h3>
          <div className="stock-info">
            <span className="stock-count">
              {alimentsDisponibles.length} aliment{alimentsDisponibles.length !== 1 ? 's' : ''} en stock
            </span>
          </div>
          
          {alimentsDisponibles.length > 0 ? (
            <>
              <p className="instructions">Cliquez sur un aliment pour l'ajouter à votre frigo</p>
              
              <div className="aliments-grid">
                {alimentsDisponibles.map(aliment => (
                  <div 
                    key={aliment.id} 
                    className="aliment-disponible"
                    onClick={() => ajouterAuFrigo(aliment)}
                  >
                    <div className="aliment-emoji-large">{aliment.emoji}</div>
                    <div className="aliment-nom">{aliment.nom}</div>
                    <div className="aliment-duree">
                      {aliment.dureeConservation} jours
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="stock-vide">
              <div className="stock-vide-icon">📦</div>
              <p className="stock-vide-message">Stock épuisé !</p>
              <p className="stock-vide-description">
                Vous avez utilisé tous les aliments disponibles.
              </p>
            </div>
          )}
          
          <button 
            className="btn btn-secondary renouveler-btn"
            onClick={() => setAlimentsDisponibles(getRandomAliments(8))}
          >
            {alimentsDisponibles.length > 0 ? '🔄 Renouveler le stock' : '🛒 Faire les courses'}
          </button>
        </div>
      </div>

      {/* Affichage des points flottants */}
      <PointsDisplay pointsFlottants={pointsFlottants} />
    </div>
  );
};

export default Frigo; 
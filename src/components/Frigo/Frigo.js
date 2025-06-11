import React, { useState, useEffect } from 'react';
import AlimentCard from '../Aliment/AlimentCard';
import PointsDisplay from '../PointsDisplay/PointsDisplay';
import { getRandomAliments } from '../../data/aliments';
import { useScore } from '../../hooks/useScore';
import { STATUTS_FRAICHEUR } from '../../data/aliments';
import { useTimer } from '../../hooks/useTimer';
import './Frigo.css';

const Frigo = ({ onScoreChange }) => {
  const [alimentsDansFrigo, setAlimentsDansFrigo] = useState([]);
  const [alimentsDisponibles, setAlimentsDisponibles] = useState([]);
  const [pointsFlottants, setPointsFlottants] = useState([]);
  const { actions } = useScore();

  // Initialisation des aliments disponibles
  useEffect(() => {
    setAlimentsDisponibles(getRandomAliments(8));
  }, []);

  // Vérification périodique des aliments expirés
  useEffect(() => {
    const interval = setInterval(() => {
      checkExpiredAliments();
    }, 1000); // Vérifie toutes les 1 seconde pour plus de réactivité

    return () => clearInterval(interval);
  }, [alimentsDansFrigo]);

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
      setAlimentsDansFrigo(alimentsRestants);
      
      // Faire perdre des points pour chaque aliment expiré
      alimentsExpires.forEach(aliment => {
        const pointsPerdus = actions.alimentGaspille();
        showPointsFlottants(pointsPerdus, aliment.nom);
        showNotification(`${aliment.nom} a expiré ! ${pointsPerdus} points perdus 😔`, 'error');
      });
    }
  };

  // Ajouter un aliment au frigo
  const ajouterAuFrigo = (aliment) => {
    const nouvelAliment = {
      ...aliment,
      id: Date.now() + Math.random(), // ID unique pour chaque instance
      dateAjout: new Date().toISOString()
    };

    setAlimentsDansFrigo(prev => [...prev, nouvelAliment]);
    
    // Retirer seulement l'aliment des disponibles (pas de respawn automatique)
    setAlimentsDisponibles(prev => prev.filter(a => a.id !== aliment.id));
  };

  // Consommer un aliment
  const consommerAliment = (aliment) => {
    setAlimentsDansFrigo(prev => prev.filter(a => a.id !== aliment.id));
    
    const pointsGagnes = actions.alimentConsomme();
    
    // Afficher les points flottants
    showPointsFlottants(pointsGagnes, aliment.nom);
    
    // Notification de points gagnés
    showNotification(`+${pointsGagnes} points ! ${aliment.nom} consommé ! 👍`, 'success');
    
    if (onScoreChange) {
      onScoreChange(pointsGagnes);
    }
  };

  // Jeter un aliment
  const jeterAliment = (aliment) => {
    setAlimentsDansFrigo(prev => prev.filter(a => a.id !== aliment.id));
    
    const pointsPerdus = actions.alimentGaspille();
    
    // Afficher les points flottants
    showPointsFlottants(pointsPerdus, aliment.nom);
    
    // Notification de gaspillage
    showNotification(`${pointsPerdus} points... ${aliment.nom} gaspillé ! 😔`, 'error');
    
    if (onScoreChange) {
      onScoreChange(pointsPerdus);
    }
  };

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

  // Système de notification simple
  const showNotification = (message, type) => {
    // Pour le moment, on utilise une méthode simple
    // En production, on pourrait utiliser un système de toast plus sophistiqué
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--success-green)' : 'var(--alert-red)'};
      color: white;
      padding: 1rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-medium);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Réorganiser les aliments dans le frigo (simulation drag & drop simplifié)
  const deplacerAliment = (index, direction) => {
    const nouveauxAliments = [...alimentsDansFrigo];
    const nouvelIndex = direction === 'gauche' ? index - 1 : index + 1;
    
    if (nouvelIndex >= 0 && nouvelIndex < nouveauxAliments.length) {
      [nouveauxAliments[index], nouveauxAliments[nouvelIndex]] = 
      [nouveauxAliments[nouvelIndex], nouveauxAliments[index]];
      setAlimentsDansFrigo(nouveauxAliments);
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
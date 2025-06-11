import React from 'react';
import { useBadges } from '../../hooks/useScore';
import { useScoreContext } from '../../contexts/ScoreContext';
import './ScoreBoard.css';

const ScoreBoard = () => {
  const { 
    score, 
    statistiques, 
    niveauActuel, 
    prochainNiveau, 
    pourcentageProchainNiveau,
    equivalencesEcologiques,
    actions
  } = useScoreContext();



  const badges = useBadges(statistiques);

  return (
    <div className="scoreboard">
      <div className="scoreboard-header">
        <h2>📊 Votre Performance</h2>
      </div>



      {/* Score et niveau */}
      <div className="score-section">
        <div className="score-display">
          <div className="score-value">{score}</div>
          <div className="score-label">Points Totaux</div>
        </div>
        
        <div className="level-info">
          <div className="current-level">
            <span className="level-emoji">{niveauActuel.emoji}</span>
            <span className="level-name">{niveauActuel.nom}</span>
          </div>
          
          {niveauActuel !== prochainNiveau && (
            <div className="level-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${pourcentageProchainNiveau}%` }}
                />
              </div>
              <div className="next-level">
                Prochain: {prochainNiveau.emoji} {prochainNiveau.nom}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Points Collectés */}
      <div className="points-collected-section">
        <h3>🎯 Points Collectés</h3>
        <div className="points-breakdown">
          <div className="points-item positive">
            <div className="points-icon">✅</div>
            <div className="points-detail">
              <div className="points-number">+{statistiques.alimentsConsommes * 10}</div>
              <div className="points-label">Aliments consommés</div>
            </div>
          </div>
          
          <div className="points-item negative">
            <div className="points-icon">❌</div>
            <div className="points-detail">
              <div className="points-number">{statistiques.alimentsGaspilles * -25}</div>
              <div className="points-label">Aliments gaspillés</div>
            </div>
          </div>
          
          <div className="points-item total">
            <div className="points-icon">🏆</div>
            <div className="points-detail">
              <div className="points-number">{score}</div>
              <div className="points-label">Total des points</div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-section">
        <h3>Vos Statistiques</h3>
        <div className="stats-grid">
          <div className="stat-item success">
            <div className="stat-icon">✅</div>
            <div className="stat-number">{statistiques.alimentsSauves}</div>
            <div className="stat-label">Aliments sauvés</div>
          </div>
          
          <div className="stat-item consumed">
            <div className="stat-icon">😋</div>
            <div className="stat-number">{statistiques.alimentsConsommes}</div>
            <div className="stat-label">Aliments consommés</div>
          </div>
          
          <div className="stat-item warning">
            <div className="stat-icon">🗑️</div>
            <div className="stat-number">{statistiques.alimentsGaspilles}</div>
            <div className="stat-label">Gaspillés</div>
          </div>
          
          <div className="stat-item streak">
            <div className="stat-icon">🔥</div>
            <div className="stat-number">{statistiques.streakActuel}</div>
            <div className="stat-label">Streak actuel</div>
          </div>
        </div>
      </div>

      {/* Impact écologique */}
      <div className="impact-section">
        <h3>Votre Impact Écologique</h3>
        <div className="impact-grid">
          <div className="impact-item">
            <div className="impact-icon">🌱</div>
            <div className="impact-value">{equivalencesEcologiques.co2Economise}kg</div>
            <div className="impact-label">CO2 économisé</div>
          </div>
          
          <div className="impact-item">
            <div className="impact-icon">💰</div>
            <div className="impact-value">{equivalencesEcologiques.euroEconomise}€</div>
            <div className="impact-label">Argent économisé</div>
          </div>
          
          <div className="impact-item">
            <div className="impact-icon">🍽️</div>
            <div className="impact-value">{equivalencesEcologiques.repasPreserves}</div>
            <div className="impact-label">Repas préservés</div>
          </div>
        </div>
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="badges-section">
          <h3>Vos Badges</h3>
          <div className="badges-grid">
            {badges.map(badge => (
              <div key={badge.id} className="badge-item" title={badge.description}>
                <div className="badge-emoji">{badge.emoji}</div>
                <div className="badge-name">{badge.nom}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages encourageants */}
      <div className="encouragement-section">
        {statistiques.alimentsGaspilles === 0 && statistiques.alimentsSauves > 0 && (
          <div className="encouragement success">
            🎉 Parfait ! Aucun gaspillage pour l'instant !
          </div>
        )}
        
        {statistiques.streakActuel >= 5 && (
          <div className="encouragement streak">
            🔥 Incroyable streak ! Continuez comme ça !
          </div>
        )}
        
        {score >= 100 && (
          <div className="encouragement milestone">
            🏆 Félicitations ! Vous avez dépassé les 100 points !
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreBoard; 
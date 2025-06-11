import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import { STATUTS_FRAICHEUR } from '../../data/aliments';
import './AlimentCard.css';

const AlimentCard = ({ 
  aliment, 
  onConsommer, 
  onJeter, 
  onClick,
  className = '',
  showActions = true 
}) => {
  const { joursRestants, progressionJour, statutFraicheur } = useTimer(
    aliment.dateAjout, 
    aliment.dureeConservation
  );

  const getStatusColor = () => {
    switch (statutFraicheur) {
      case STATUTS_FRAICHEUR.FRAIS:
        return 'var(--success-green)';
      case STATUTS_FRAICHEUR.ATTENTION:
        return 'var(--warning-orange)';
      case STATUTS_FRAICHEUR.EXPIRE:
        return 'var(--alert-red)';
      default:
        return 'var(--text-light)';
    }
  };

  const getStatusText = () => {
    if (joursRestants <= 0) {
      return 'Expiré !';
    } else if (joursRestants === 1) {
      return '1 jour restant';
    } else {
      return `${joursRestants} jours restants`;
    }
  };

  const getStatusIcon = () => {
    switch (statutFraicheur) {
      case STATUTS_FRAICHEUR.FRAIS:
        return '✨';
      case STATUTS_FRAICHEUR.ATTENTION:
        return '⚠️';
      case STATUTS_FRAICHEUR.EXPIRE:
        return '❌';
      default:
        return '';
    }
  };

  const handleConsommer = (e) => {
    e.stopPropagation();
    if (onConsommer) {
      onConsommer(aliment);
    }
  };

  const handleJeter = (e) => {
    e.stopPropagation();
    if (onJeter) {
      onJeter(aliment);
    }
  };

  return (
    <div 
      className={`aliment-card ${statutFraicheur} ${className}`}
      onClick={onClick}
      style={{ borderColor: getStatusColor() }}
    >
      <div className="aliment-emoji">
        {aliment.emoji}
      </div>
      
      <div className="aliment-info">
        <h3 className="aliment-nom">{aliment.nom}</h3>
        <div className="aliment-status">
          <span className="status-icon">{getStatusIcon()}</span>
          <span className="status-text" style={{ color: getStatusColor() }}>
            {getStatusText()}
          </span>
        </div>
        <div className="aliment-type">
          {aliment.type}
        </div>
      </div>

      {showActions && (
        <div className="aliment-actions">
          {statutFraicheur !== STATUTS_FRAICHEUR.EXPIRE ? (
            <button 
              className="btn-consommer"
              onClick={handleConsommer}
              title="Consommer cet aliment"
            >
              👍
            </button>
          ) : null}
          
          <button 
            className="btn-jeter"
            onClick={handleJeter}
            title="Jeter cet aliment"
          >
            🗑️
          </button>
        </div>
      )}

      {/* Indicateur de fraîcheur visuel */}
      <div 
        className="freshness-indicator" 
        style={{ backgroundColor: getStatusColor() }}
      />
      
      {/* Barre de progression du jour */}
      {joursRestants > 0 && (
        <div className="day-progress-container">
          <div 
            className="day-progress-bar"
            style={{ 
              width: `${progressionJour}%`,
              backgroundColor: getStatusColor()
            }}
          />
          <div className="day-progress-text">
            {Math.round(progressionJour)}%
          </div>
        </div>
      )}

      {/* Animation pour les aliments qui expirent */}
      {statutFraicheur === STATUTS_FRAICHEUR.ATTENTION && (
        <div className="expiring-pulse" />
      )}
    </div>
  );
};

export default AlimentCard; 
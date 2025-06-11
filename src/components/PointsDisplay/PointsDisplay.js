import React from 'react';
import './PointsDisplay.css';

const PointsDisplay = ({ pointsFlottants }) => {
  return (
    <div className="points-display-container">
      {pointsFlottants.map((pointItem, index) => (
        <div 
          key={pointItem.id}
          className={`points-flottant ${pointItem.points > 0 ? 'positif' : 'negatif'}`}
          style={{ 
            animationDelay: `${index * 0.1}s`,
            top: `${20 + index * 60}px`
          }}
        >
          <div className="points-value">
            {pointItem.points > 0 ? '+' : ''}{pointItem.points}
          </div>
          <div className="points-aliment">
            {pointItem.alimentNom}
          </div>
          <div className="points-icon">
            {pointItem.points > 0 ? '🎉' : '😔'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PointsDisplay; 
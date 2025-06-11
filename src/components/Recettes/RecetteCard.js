import React from 'react';
import { calculerScoreRecette } from '../../data/recettes';
import './RecetteCard.css';

const RecetteCard = ({ recette, alimentsDansFrigo, onCuisiner, peutCuisiner = true }) => {
  const pointsTotal = calculerScoreRecette(recette);

  const getDifficulteColor = () => {
    switch (recette.difficulte) {
      case 'Très facile':
        return 'var(--success-green)';
      case 'Facile':
        return 'var(--primary-green)';
      case 'Moyen':
        return 'var(--warning-orange)';
      case 'Difficile':
        return 'var(--alert-red)';
      default:
        return 'var(--text-light)';
    }
  };

  const getCategorieColor = () => {
    switch (recette.categorie) {
      case 'salade':
        return '#4CAF50';
      case 'soupe':
        return '#FF9800';
      case 'plat':
        return '#F44336';
      case 'smoothie':
        return '#9C27B0';
      case 'dessert':
        return '#E91E63';
      default:
        return 'var(--primary-green)';
    }
  };

  return (
    <div className={`recette-card ${peutCuisiner ? 'disponible' : 'indisponible'}`}>
      <div className="recette-header">
        <div className="recette-emoji">{recette.emoji}</div>
        <div className="recette-info">
          <h3 className="recette-nom">{recette.nom}</h3>
          <div className="recette-meta">
            <span 
              className="recette-categorie"
              style={{ color: getCategorieColor() }}
            >
              {recette.categorie}
            </span>
            <span className="recette-temps">⏱️ {recette.temps}</span>
          </div>
        </div>
        <div className="recette-points">
          <div className="points-value">+{pointsTotal}</div>
          <div className="points-label">points</div>
        </div>
      </div>

      <div className="recette-description">
        {recette.description}
      </div>

      <div className="recette-ingredients">
        <h4>Ingrédients nécessaires :</h4>
        <div className="ingredients-list">
          {recette.ingredients.map((ingredient, index) => {
            const aIngredient = alimentsDansFrigo.some(aliment => aliment.nom === ingredient);
            return (
              <span 
                key={index}
                className={`ingredient ${aIngredient ? 'disponible' : 'manquant'}`}
              >
                {ingredient}
                {aIngredient ? ' ✅' : ' ❌'}
              </span>
            );
          })}
        </div>
      </div>

      <div className="recette-footer">
        <div className="recette-difficulte">
          <span 
            className="difficulte-badge"
            style={{ 
              backgroundColor: getDifficulteColor(),
              color: 'white'
            }}
          >
            {recette.difficulte}
          </span>
        </div>

        {peutCuisiner ? (
          <button 
            className="btn-cuisiner"
            onClick={() => onCuisiner(recette)}
          >
            👨‍🍳 Cuisiner !
          </button>
        ) : (
          <div className="ingredients-manquants">
            <span>Ingrédients manquants</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecetteCard; 
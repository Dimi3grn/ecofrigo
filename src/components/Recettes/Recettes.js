import React, { useState, useEffect } from 'react';
import RecetteCard from './RecetteCard';
import { useScoreContext } from '../../contexts/ScoreContext';
import { 
  RECETTES, 
  CATEGORIES_RECETTES,
  getRecettesPossibles, 
  peutFaireRecette,
  getAlimentsNecessaires,
  calculerScoreRecette 
} from '../../data/recettes';
import './Recettes.css';

const Recettes = ({ alimentsDansFrigo, onUtiliserAliments }) => {
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('toutes');
  const [recettesPossibles, setRecettesPossibles] = useState([]);
  const [recettesDisponibles, setRecettesDisponibles] = useState([]);
  const { actions } = useScoreContext();

  // Mettre à jour les recettes disponibles quand le frigo change
  useEffect(() => {
    const possibles = getRecettesPossibles(alimentsDansFrigo);
    const toutes = RECETTES.map(recette => ({
      ...recette,
      peutCuisiner: peutFaireRecette(recette, alimentsDansFrigo)
    }));

    setRecettesPossibles(possibles);
    setRecettesDisponibles(toutes);
  }, [alimentsDansFrigo]);

  // Filtrer par catégorie
  const recettesFiltrees = categorieSelectionnee === 'toutes' 
    ? recettesDisponibles
    : recettesDisponibles.filter(recette => recette.categorie === categorieSelectionnee);

  // Fonction pour cuisiner une recette
  const cuisinerRecette = (recette) => {
    if (!peutFaireRecette(recette, alimentsDansFrigo)) {
      return;
    }

    // Obtenir les aliments à utiliser
    const alimentsUtilises = getAlimentsNecessaires(recette, alimentsDansFrigo);
    
    // Calculer les points bonus
    const pointsBonus = calculerScoreRecette(recette);
    
    // Utiliser la fonction recetteUtilisee du hook useScore
    const pointsRecette = actions.recetteUtilisee();
    const pointsTotal = pointsBonus; // On peut ajuster pour utiliser pointsRecette aussi
    
    // Notifier le parent pour retirer les aliments du frigo
    if (onUtiliserAliments) {
      onUtiliserAliments(alimentsUtilises, recette, pointsTotal);
    }

    // Affichage de succès (peut être amélioré avec une notification)
    console.log(`🍳 Recette "${recette.nom}" cuisinée ! +${pointsTotal} points`);
  };

  // Compter les recettes par catégorie
  const compterRecettesParCategorie = (categorie) => {
    if (categorie === 'toutes') {
      return recettesPossibles.length;
    }
    return recettesPossibles.filter(r => r.categorie === categorie).length;
  };

  return (
    <div className="recettes-container">
      <div className="recettes-header">
        <h2>👨‍🍳 Recettes Anti-Gaspillage</h2>
        <p className="recettes-description">
          Combinez vos aliments pour créer de délicieuses recettes et gagner des points bonus !
        </p>
        
        <div className="recettes-stats">
          <div className="stat-item">
            <span className="stat-number">{recettesPossibles.length}</span>
            <span className="stat-label">recettes disponibles</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{alimentsDansFrigo.length}</span>
            <span className="stat-label">ingrédients au frigo</span>
          </div>
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="recettes-filtres">
        <button 
          className={`filtre-btn ${categorieSelectionnee === 'toutes' ? 'active' : ''}`}
          onClick={() => setCategorieSelectionnee('toutes')}
        >
          Toutes ({compterRecettesParCategorie('toutes')})
        </button>
        
        {Object.values(CATEGORIES_RECETTES).map(categorie => (
          <button 
            key={categorie}
            className={`filtre-btn ${categorieSelectionnee === categorie ? 'active' : ''}`}
            onClick={() => setCategorieSelectionnee(categorie)}
          >
            {categorie} ({compterRecettesParCategorie(categorie)})
          </button>
        ))}
      </div>

      {/* Liste des recettes */}
      <div className="recettes-liste">
        {recettesFiltrees.length === 0 ? (
          <div className="recettes-vide">
            {alimentsDansFrigo.length === 0 ? (
              <>
                <div className="vide-icon">🥘</div>
                <h3>Votre frigo est vide</h3>
                <p>Ajoutez des aliments à votre frigo pour découvrir les recettes possibles !</p>
              </>
            ) : (
              <>
                <div className="vide-icon">🔍</div>
                <h3>Aucune recette {categorieSelectionnee !== 'toutes' ? `de ${categorieSelectionnee}` : ''} disponible</h3>
                <p>Essayez d'ajouter plus d'ingrédients ou changez de catégorie.</p>
              </>
            )}
          </div>
        ) : (
          <div className="recettes-grid">
            {recettesFiltrees.map(recette => (
              <RecetteCard
                key={recette.id}
                recette={recette}
                alimentsDansFrigo={alimentsDansFrigo}
                onCuisiner={cuisinerRecette}
                peutCuisiner={recette.peutCuisiner}
              />
            ))}
          </div>
        )}
      </div>

      {/* Section d'aide */}
      {alimentsDansFrigo.length > 0 && recettesPossibles.length === 0 && (
        <div className="recettes-aide">
          <h3>💡 Conseils pour débloquer plus de recettes</h3>
          <div className="conseils-liste">
            <div className="conseil">
              <span className="conseil-icon">🥬</span>
              <span>Ajoutez des légumes de base comme tomate, oignon, carotte</span>
            </div>
            <div className="conseil">
              <span className="conseil-icon">🍎</span>
              <span>Les fruits se combinent bien : pomme, banane, orange</span>
            </div>
            <div className="conseil">
              <span className="conseil-icon">🥗</span>
              <span>Une salade simple ne nécessite que 2-3 ingrédients</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recettes; 
import React, { useState } from 'react';
import Frigo from './components/Frigo/Frigo';
import ScoreBoard from './components/Dashboard/ScoreBoard';
import Recettes from './components/Recettes/Recettes';
import { ScoreProvider, useScoreContext } from './contexts/ScoreContext';
import './App.css';

function AppContent() {
  const { score, niveauActuel } = useScoreContext();
  const [showTutorial, setShowTutorial] = useState(false);
  const [alimentsDansFrigo, setAlimentsDansFrigo] = useState([]);

  // Fonction pour recevoir les aliments du frigo (depuis le composant Frigo)
  const recevoirAlimentsDuFrigo = (aliments) => {
    setAlimentsDansFrigo(aliments);
  };

  // Fonction pour utiliser des aliments dans une recette
  const utiliserAlimentsDansRecette = (alimentsUtilises, recette, pointsBonus) => {
    // Retirer les aliments utilisés du frigo
    setAlimentsDansFrigo(prev => {
      const idsARetirer = alimentsUtilises.map(a => a.id);
      const nouveauxAliments = prev.filter(aliment => !idsARetirer.includes(aliment.id));
      console.log('🔄 Aliments retirés:', alimentsUtilises.map(a => a.nom));
      console.log('🔄 Aliments restants:', nouveauxAliments.length);
      return nouveauxAliments;
    });

    console.log(`✨ Recette "${recette.nom}" réalisée ! +${pointsBonus} points bonus`);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">
            🥬 EcoFrigo
          </h1>
          <p className="app-subtitle">
            Chaque aliment sauvé compte - Ensemble, réduisons le gaspillage alimentaire de 30%
          </p>
          <div className="score-display">
            <span className="score">Score: {score}</span>
            <span className="level">
              {niveauActuel.emoji} {niveauActuel.nom}
            </span>
          </div>
          
          {/* Bouton d'aide */}
          <button 
            className="btn btn-secondary tutorial-btn"
            onClick={() => setShowTutorial(!showTutorial)}
          >
            {showTutorial ? '❌ Fermer l\'aide' : '❓ Comment jouer ?'}
          </button>
        </div>
      </header>

      {/* Tutoriel */}
      {showTutorial && (
        <div className="tutorial-overlay" onClick={() => setShowTutorial(false)}>
          <div className="tutorial-content" onClick={(e) => e.stopPropagation()}>
            <div className="tutorial-header">
              <h3>🎮 Comment jouer à EcoFrigo ?</h3>
              <button 
                className="close-tutorial-btn"
                onClick={() => setShowTutorial(false)}
              >
                ❌
              </button>
            </div>
            <ol>
              <li>
                <strong>➕ Ajoutez des aliments :</strong> Cliquez sur les aliments disponibles pour les ajouter à votre frigo
              </li>
              <li>
                <strong>👍 Consommez à temps :</strong> Utilisez les aliments avant qu'ils expirent pour gagner des points
              </li>
              <li>
                <strong>⚠️ Attention aux dates :</strong> Les aliments changent de couleur selon leur fraîcheur
              </li>
              <li>
                <strong>🗑️ Évitez le gaspillage :</strong> Jeter un aliment vous fait perdre des points
              </li>
              <li>
                <strong>🏆 Progressez :</strong> Montez de niveau et débloquez des badges !
              </li>
            </ol>
            
            <div className="tutorial-legend">
              <h4>Légende des couleurs :</h4>
              <div className="legend-items">
                <div className="legend-item">
                  <div className="legend-color frais"></div>
                  <span>✨ Frais (plus de 2 jours)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color attention"></div>
                  <span>⚠️ Attention (1-2 jours restants)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color expire"></div>
                  <span>❌ Expiré (0 jour ou moins)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="app-main">
        <div className="container">
          <div className="game-area">
            {/* Le frigo virtuel fonctionnel */}
            <section className="frigo-section">
              <Frigo 
                onAlimentsChange={recevoirAlimentsDuFrigo} 
                alimentsExterieurs={alimentsDansFrigo}
              />
            </section>

            {/* Section recettes fonctionnelle */}
            <section className="recettes-section">
              <Recettes 
                alimentsDansFrigo={alimentsDansFrigo}
                onUtiliserAliments={utiliserAlimentsDansRecette}
              />
            </section>
          </div>

          {/* Dashboard des statistiques fonctionnel */}
          <aside className="dashboard-section">
            <ScoreBoard />
          </aside>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>💚 EcoFrigo - Hackathon IA For Good</p>
          <p className="footer-stats">
            🌍 Ensemble, luttons contre le gaspillage alimentaire !
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ScoreProvider>
      <AppContent />
    </ScoreProvider>
  );
}

export default App;

import React from 'react';
import './InfoPage.css';

const InfoPage = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <div className="info-header">
          <h1>🌍 Gaspillage alimentaire : panorama complet France-Monde</h1>
          <div className="highlight-stat">
            <strong>63 kg</strong> de nourriture comestible gaspillés par Français chaque année
          </div>
          <p className="intro-text">
            Soit l'équivalent de <strong>100 euros perdus</strong> et <strong>15,3 millions de tonnes de CO2</strong> émises nationalement. 
            Ces chiffres révèlent l'ampleur d'un fléau qui touche tous les secteurs de la chaîne alimentaire française.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">4,3</div>
            <div className="stat-unit">millions de tonnes</div>
            <div className="stat-label">de gaspillage alimentaire pur annuel</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">42%</div>
            <div className="stat-unit">des ménages</div>
            <div className="stat-label">provient du gaspillage domestique</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">16</div>
            <div className="stat-unit">milliards d'euros</div>
            <div className="stat-label">de valeur économique perdue</div>
          </div>
        </div>

        <section className="info-section">
          <h2>🇫🇷 La France face au défi du gaspillage alimentaire</h2>
          <p>
            <strong>9,4 millions de tonnes de déchets alimentaires</strong> sont générés annuellement en France, 
            dont 4,3 millions de tonnes constituent du gaspillage alimentaire pur (partie comestible). 
            Ces volumes représentent <strong>16 milliards d'euros de valeur économique perdue</strong> chaque année, 
            soit 238 euros par Français.
          </p>
          
          <div className="breakdown">
            <h3>Répartition par secteur :</h3>
            <ul>
              <li><strong>42% - Ménages</strong> : 3,95 millions de tonnes</li>
              <li><strong>25% - Industries agroalimentaires</strong> : 2,35 millions de tonnes</li>
              <li><strong>33% - Production, restauration, distribution</strong></li>
            </ul>
          </div>

          <div className="comparison">
            <h3>🇪🇺 Position européenne :</h3>
            <p>
              La France maintient une position honorable avec <strong>129 kg de déchets alimentaires par habitant</strong> 
              contre 131 kg pour la moyenne européenne. La Belgique détient le record avec 250 kg par habitant, 
              tandis que la Slovénie se distingue avec seulement 68 kg.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2>🥬 Types d'aliments les plus touchés</h2>
          
          <div className="food-waste-breakdown">
            <div className="food-category">
              <h3>🍎 Fruits et légumes - 42% du gaspillage mondial</h3>
              <p>644 millions de tonnes annuellement. <strong>Une salade sur deux finit à la poubelle</strong> en France.</p>
            </div>
            
            <div className="food-category">
              <h3>🍽️ Restes de repas - 25% du gaspillage ménager</h3>
              <p>Plats cuisinés non terminés représentent le deuxième poste de gaspillage.</p>
            </div>
            
            <div className="food-category">
              <h3>🍞 Pain et céréales - 14% du gaspillage</h3>
              <p>Troisième catégorie la plus gaspillée dans les foyers français.</p>
            </div>
          </div>

          <div className="restaurant-stats">
            <h3>🍽️ Restauration collective :</h3>
            <p>
              <strong>100 grammes gaspillés par repas et par convive</strong> en moyenne, 
              générant une perte de 68 centimes par plateau sur 3,4 milliards de repas servis annuellement.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2>🌡️ Impact environnemental : un enjeu climatique majeur</h2>
          
          <div className="environmental-impact">
            <div className="impact-stat">
              <div className="impact-number">15,3</div>
              <div className="impact-unit">millions de tonnes CO2</div>
              <div className="impact-description">3% des émissions nationales françaises</div>
            </div>
            
            <div className="impact-comparison">
              <h3>Équivalences frappantes :</h3>
              <ul>
                <li>5 fois les émissions du trafic aérien intérieur français</li>
                <li>Le tiers des émissions de toutes les voitures françaises</li>
                <li><strong>317 kg de nourriture jetés chaque seconde</strong> en France</li>
                <li>1000 fois le poids de la Tour Eiffel annuellement</li>
              </ul>
            </div>
          </div>

          <div className="global-impact">
            <h3>🌍 Impact mondial :</h3>
            <p>
              <strong>9,3 gigatonnes de CO2 équivalent</strong> - soit 8 à 10% des émissions mondiales de gaz à effet de serre.
              <strong>250 km³ d'eau douce gaspillés</strong> annuellement (équivalent au débit de la Volga).
              <strong>1,4 milliard d'hectares de terres agricoles</strong> mobilisés pour une production finalement gaspillée.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2>📱 Solutions efficaces et innovations</h2>
          
          <div className="solutions-grid">
            <div className="solution-card">
              <h3>🏛️ Cadre législatif</h3>
              <p>
                <strong>Loi Garot 2016</strong> : +28% de collecte des banques alimentaires, 
                95% des magasins respectent l'obligation de don.
              </p>
            </div>
            
            <div className="solution-card">
              <h3>📱 Applications anti-gaspillage</h3>
              <p>
                <strong>Too Good To Go</strong> : 100 millions de repas sauvés en 2023, 
                15 millions d'utilisateurs français.
              </p>
            </div>
            
            <div className="solution-card">
              <h3>🤖 Intelligence artificielle</h3>
              <p>
                <strong>Winnow & SmartWay</strong> : réduction de 80% du gaspillage en magasin, 
                +51% de résultat net pour les enseignes.
              </p>
            </div>
            
            <div className="solution-card">
              <h3>👥 Sensibilisation</h3>
              <p>
                <strong>Opération Zéro Gâchis ADEME</strong> : -59% de gaspillage chez 243 foyers accompagnés, 
                de 25,5 kg à 10,4 kg par personne/an.
              </p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>🎯 Objectifs et perspectives</h2>
          
          <div className="objectives">
            <div className="objective-card france">
              <h3>🇫🇷 Objectifs France</h3>
              <ul>
                <li><strong>-50% d'ici 2025</strong> pour la distribution et restauration collective</li>
                <li><strong>-50% d'ici 2030</strong> pour les autres secteurs</li>
                <li>Leadership européen dans la lutte anti-gaspillage</li>
              </ul>
            </div>
            
            <div className="objective-card global">
              <h3>🌍 Enjeux mondiaux</h3>
              <ul>
                <li><strong>1,05 milliard de tonnes</strong> gaspillées annuellement</li>
                <li><strong>1 milliard de repas</strong> gaspillés quotidiennement</li>
                <li>783 millions de personnes souffrent de la faim</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="info-section call-to-action">
          <h2>💚 Agissons ensemble !</h2>
          <p>
            Le gaspillage alimentaire constitue un défi majeur, mais les solutions existent et font leurs preuves. 
            <strong>Chaque geste compte</strong> : planifier ses repas, bien conserver ses aliments, 
            cuisiner les restes et utiliser des applications comme EcoFrigo pour optimiser sa consommation.
          </p>
          
          <div className="action-tips">
            <h3>🎮 Avec EcoFrigo, vous pouvez :</h3>
            <ul>
              <li>Suivre la fraîcheur de vos aliments en temps réel</li>
              <li>Découvrir des recettes anti-gaspillage</li>
              <li>Mesurer votre impact écologique et économique</li>
              <li>Rejoindre une communauté engagée contre le gaspillage</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InfoPage; 
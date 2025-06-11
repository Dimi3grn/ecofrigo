# 🧪 Test du Système de Points

## ✅ Corrections Appliquées

1. **Contexte React partagé** : Tous les composants utilisent maintenant le même état de score
2. **ScoreContext** : Centralise la gestion des points entre Frigo et ScoreBoard
3. **Debug logs** : Ajout de console.log pour diagnostic

## 🎯 Comment Tester

### Test 1: Boutons Debug (devrait fonctionner)
1. Ouvrir l'application
2. Aller dans "Votre Performance" à droite
3. Cliquer sur "Test +10 points" → Score augmente de 10
4. Cliquer sur "Test -25 points" → Score diminue de 25

### Test 2: Consommation d'aliments (devrait maintenant fonctionner)
1. Ajouter un aliment au frigo (clic sur aliment disponible)
2. Cliquer sur 👍 pour consommer l'aliment
3. ✅ Vérifier que les points augmentent de +10 dans "Votre Performance"
4. ✅ Vérifier que "Aliments consommés" augmente de +1

### Test 3: Expiration automatique (devrait maintenant fonctionner)
1. Ajouter un aliment au frigo
2. Attendre 15 secondes × durée de conservation
3. ✅ Vérifier que les points diminuent de -25 dans "Votre Performance"
4. ✅ Vérifier que "Gaspillés" augmente de +1

## 🔍 Logs de Debug

Ouvrir la console du navigateur (F12) pour voir :
- 🔵 Logs bleus : Consommation d'aliments
- 🔴 Logs rouges : Expiration d'aliments
- 📊 Logs du ScoreBoard : État du score

## 🎮 Temps de Test

- **1 jour = 15 secondes** (temps accéléré)
- Aliments courts : 1-2 jours = 15-30 secondes
- Aliments longs : 5-7 jours = 75-105 secondes 
# Site surprise d'anniversaire — 3D

Site une page, en 3D (Three.js), pensé comme un parcours en 8 scènes :
coffret cadeau → hall glamour → galerie de souvenirs → salle des vœux
(ballons) → miroir du temps (compte à rebours) → porte du seuil →
scène finale (confettis) → **lettre d'amour**.

## 1. Ouvrir le site

Le plus simple est de lancer un petit serveur local (nécessaire pour que
les photos/vidéos se chargent correctement dans tous les navigateurs) :

**Avec Python (déjà installé sur Mac/Linux) :**
```
cd site-anniversaire-3d
python3 -m http.server 8000
```
Puis ouvrez `http://localhost:8000` dans votre navigateur.

**Ou plus simple :** double-cliquez sur `index.html` — cela fonctionne
dans la plupart des navigateurs, sauf pour certaines vidéos locales sur
Chrome (dans ce cas, utilisez la méthode du serveur local ci-dessus).

## 2. Personnaliser le contenu

Tout se modifie dans **`config.js`** — aucune autre ligne de code n'est
nécessaire :

- `name` : le prénom affiché sur le site
- `mirrorWords` : les mots doux qui défilent dans le miroir enchanté (scène 5)
- `memories` : les souvenirs de la galerie (scène 3) — pour chaque
  souvenir, ajoutez soit `image`, soit `video` (voir ci-dessous)
- `wishes` : les vœux cachés dans les ballons (scène 4)
- `finalMessage` : le message de la scène 7 (juste avant la lettre)
- `loveLetter` : la lettre d'amour de la toute dernière page — `heading`
  (titre), `paragraphs` (un tableau, chaque élément = un paragraphe
  qui apparaît progressivement au scroll), `signature`
- `audioSrc` : le chemin vers votre musique de fond

## 3. Ajouter vos photos et vidéos

1. Déposez vos fichiers dans `assets/photos/` ou `assets/videos/`
   (créez ces dossiers s'ils n'existent pas)
2. Dans `config.js`, remplissez le champ `image` ou `video` du souvenir
   correspondant, par exemple :
   ```js
   { title: "Notre voyage", text: "...", image: "assets/photos/voyage.jpg", video: "" }
   ```
3. Les vidéos sont automatiquement lues en boucle, sans son
   (format recommandé : `.mp4`, courtes, moins de 10 Mo pour un
   chargement rapide)
4. Si un souvenir n'a ni photo ni vidéo, un cadre doré décoratif
   s'affiche à sa place — vous pouvez donc tester la structure avant
   d'avoir tous les médias.

## 4. Ajouter votre musique

Déposez votre fichier dans `assets/musique.mp3` (ou changez le nom dans
`audioSrc` dans `config.js`). Le volume monte doucement à mesure que le
site avance dans les scènes.

## 5. Structure des fichiers

```
site-anniversaire-3d/
├── index.html      → structure des 7 scènes
├── style.css        → palette glamour (bordeaux / or / noir / rose)
├── config.js         → TOUT LE CONTENU À PERSONNALISER
├── scene3d.js         → moteur 3D (Three.js) : coffret, porte, miroir, confettis, particules
├── main.js             → logique d'interface : scroll, miroir enchanté, ballons, audio
└── assets/
    ├── musique.mp3       → votre musique de fond (à ajouter)
    ├── photos/               → vos photos de souvenirs (à ajouter)
    └── videos/                → vos vidéos de souvenirs (à ajouter)
```

## 6. Déployer le site en ligne (optionnel)

Pour partager le lien avec la personne surprise, vous pouvez déposer
gratuitement le dossier sur :
- **Netlify Drop** (netlify.com/drop) : glissez-déposez le dossier, lien
  généré en quelques secondes
- **GitHub Pages** ou **Vercel** si vous préférez

Aucune étape de build n'est nécessaire : c'est du HTML/CSS/JS pur, prêt
à l'emploi.

## 7. Compatibilité

- Fonctionne sur mobile et desktop, navigateurs modernes (Chrome,
  Safari, Firefox, Edge)
- Respecte le réglage "réduire les animations" des systèmes qui l'ont activé
- Le nombre de particules 3D est volontairement limité pour rester
  fluide sur téléphone

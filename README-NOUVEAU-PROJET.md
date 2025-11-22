# Designal - Système de gestion de projets

## 🎯 Fonctionnalités implémentées

### ✅ Gestion des projets avec catégories et sous-catégories
- **Catégories principales** : Résidentiel, Studio, Boutique, Commercial, Bureau, Restaurant, Autre
- **Sous-catégories dynamiques** selon la catégorie choisie
- **Styles** : Moderne, Casual, Tradi-moderne, Artistique, Gaming & Tech, Hypebeast & Streetwear, Autre

### ✅ Dashboard administrateur
- Création de nouveaux projets
- Gestion du statut (brouillon/publié)
- Projets mis en avant
- Interface avec design #022B31 et blanc

### ✅ Affichage automatique sur la page d'accueil
- Seuls les projets **publiés** apparaissent sur la page d'accueil
- Affichage des catégories et sous-catégories
- Design moderne et responsive

### ✅ Design #022B31 et blanc
- Header avec navigation #022B31
- Footer #022B31
- Boutons et éléments d'action en #022B31
- Fond blanc et cartes blanches
- Contrastes optimisés

## 🚀 Comment utiliser

### 1. Démarrer le backend
```bash
cd backend
npm install
npm start
```

### 2. Démarrer le frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Accéder à l'administration
1. Aller sur `http://localhost:3000/auth/login`
2. Se connecter avec : `admin@designal.com` / `admin123`
3. Aller sur "Gérer les projets" dans le dashboard
4. Créer des projets avec catégories et sous-catégories

### 4. Voir les projets sur la page d'accueil
- Les projets avec statut "Publié" apparaissent automatiquement
- Section Portfolio de la page d'accueil
- Filtrage par catégorie et style possible

## 📁 Structure des catégories

### Résidentiel
- Chambre parentale, Salon contemporain, Cuisine moderne, Salle de bain, Dressing sur mesure

### Studio
- Studio photo, Espace mannequinat, Plateau influenceur, Setup podcast, Setup gaming

### Boutique
- Prêt-à-porter, Accessoires & maroquinerie, Parfumerie, Merchandising visuel

### Commercial
- Parcours d'exposition, Éclairage muséal, Scénographie, Signalétique

### Bureau
- Open space, Salle de réunion, Phone booth, Espace détente

### Restaurant
- Fast-food, Café, Lounge, Comptoir & flux

### Autre
- Comptoir & parcours client, Rayonnage & vitrines, Espace d'attente, Back-office

## 🎨 Couleurs du design

- **Couleur principale** : #022B31 (bleu-vert foncé)
- **Couleur secondaire** : #FFFFFF (blanc)
- **Hover** : #033d45 (version plus claire de #022B31)

## 📱 Responsive
- Design adaptatif mobile/desktop
- Navigation mobile optimisée
- Grilles responsives pour les projets

## 🔧 API Endpoints

- `GET /api/projects` - Projets publiés (page d'accueil)
- `GET /api/projects/admin/all` - Tous les projets (admin)
- `POST /api/projects` - Créer un projet (admin)
- `PUT /api/projects/:id/status` - Changer le statut (admin)

## 💡 Prochaines étapes possibles

1. Upload d'images via interface
2. Système de tags avancé
3. Filtres par catégorie sur la page d'accueil
4. Galerie d'images pour chaque projet
5. SEO et métadonnées
6. Système de commentaires clients
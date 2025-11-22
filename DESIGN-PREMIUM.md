# Design Premium Designal

## 🎨 Palette de couleurs

### Couleurs principales
- **#022B31** - Bleu-vert profond (navigation, titres, CTA principaux)
- **#F2F7F7** - Fond clair élégant (arrière-plan général)
- **#0A4950** - Accent sombre (hover, éléments secondaires)
- **#D6E7E8** - Accent clair (séparateurs, bordures, zones subtiles)

### Utilisation des couleurs
- **Header/Navigation** : #022B31 avec texte blanc
- **Fond général** : #F2F7F7 (évite le blanc pur)
- **Cartes** : Blanc avec bordures #D6E7E8
- **Boutons principaux** : #022B31 avec hover #0A4950
- **Boutons secondaires** : #D6E7E8 avec texte #022B31
- **Texte principal** : #022B31
- **Texte secondaire** : #0A4950

## 🔤 Typographie

### Polices Google Fonts
- **Titres** : Poppins (300, 400, 500, 600, 700)
- **Corps de texte** : Inter (300, 400, 500, 600, 700)

### Hiérarchie typographique
- **H1** : 4xl-6xl, font-semibold, Poppins
- **H2** : 3xl-5xl, font-semibold, Poppins
- **H3** : 2xl-3xl, font-semibold, Poppins
- **Corps** : text-lg-xl, Inter
- **Sous-texte** : text-sm-base, Inter

## 🎯 Composants de design

### Boutons
- **Primaire** : bg-[#022B31] hover:bg-[#0A4950] text-white
- **Secondaire** : bg-[#D6E7E8] hover:bg-white text-[#022B31]
- **Outline** : border-[#022B31] text-[#022B31] hover:bg-[#022B31] hover:text-white

### Cartes
- Bordures : border-[#D6E7E8]
- Ombres : shadow-lg hover:shadow-xl
- Coins arrondis : rounded-2xl
- Transition : transition-all duration-300

### Formulaires
- Champs : bg-white border-[#D6E7E8] rounded-xl
- Focus : focus:border-[#022B31]
- Padding : p-4
- Transition : transition-colors

## 📱 Responsive Design

### Breakpoints
- **Mobile** : < 768px
- **Tablet** : 768px - 1024px
- **Desktop** : > 1024px

### Espacements
- **Sections** : py-32 (desktop), py-24 (mobile)
- **Conteneurs** : px-4 (mobile), px-8 (desktop)
- **Grilles** : gap-8 (desktop), gap-6 (mobile)

## 🏗️ Structure des sections

### Hero Section
- Fond : #F2F7F7 avec image overlay
- Titre : text-6xl font-semibold text-[#022B31]
- Boutons : CTA primaire + secondaire
- Espacement : py-32

### Services
- Fond : #D6E7E8/20 (très subtil)
- Cartes : bg-white avec hover effects
- Icônes : bg-[#D6E7E8] text-[#022B31]

### Portfolio
- Fond : #D6E7E8/20
- Images : rounded-2xl avec overlay #022B31/80
- Hover : scale-110 avec informations

### Contact
- Fond : white
- Formulaire : bg-[#D6E7E8]/10 avec champs blancs
- Validation : focus:border-[#022B31]

## ✨ Effets et animations

### Transitions
- **Durée** : 300ms (standard), 500ms (images)
- **Easing** : ease-in-out
- **Hover** : scale, shadow, color changes

### Ombres
- **Cartes** : shadow-lg hover:shadow-xl
- **Boutons** : shadow-lg
- **Formulaires** : shadow-sm focus:shadow-md

### États interactifs
- **Hover** : Changement de couleur + ombre
- **Focus** : Bordure accentuée
- **Active** : Légère compression (scale-95)

## 🎪 Éléments premium

### Séparateurs visuels
- Lignes : w-24 h-1 bg-[#0A4950]
- Position : mx-auto (centré)

### Badges et étiquettes
- Fond : bg-[#D6E7E8]/20
- Texte : text-[#022B31]
- Coins : rounded-full

### Statistiques
- Fond : bg-[#D6E7E8]/30
- Coins : rounded-xl
- Texte : font-bold text-[#022B31]

## 🔧 Classes utilitaires personnalisées

```css
/* Couleurs principales */
.text-primary { color: #022B31; }
.bg-primary { background-color: #022B31; }
.text-accent-dark { color: #0A4950; }
.bg-accent-light { background-color: #D6E7E8; }
.bg-soft { background-color: #F2F7F7; }

/* Effets premium */
.card-premium {
  @apply border-[#D6E7E8] shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl;
}

.button-primary {
  @apply bg-[#022B31] hover:bg-[#0A4950] text-white font-medium px-6 py-3 rounded-xl shadow-lg;
}

.input-premium {
  @apply p-4 border border-[#D6E7E8] rounded-xl bg-white focus:border-[#022B31] focus:outline-none transition-colors;
}
```

## 📊 Contraste et accessibilité

### Ratios de contraste
- #022B31 sur #F2F7F7 : 12.5:1 (AAA)
- #0A4950 sur #F2F7F7 : 8.2:1 (AAA)
- Blanc sur #022B31 : 15.8:1 (AAA)

### Accessibilité
- Focus visible sur tous les éléments interactifs
- Tailles de texte minimales respectées
- Contrastes conformes WCAG 2.1 AA/AAA
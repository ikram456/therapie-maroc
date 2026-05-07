# 🕌 Thérapie Maroc

Une plateforme de télémédecine psychologique inspirée des traditions marocaines, conçue pour connecter les patients avec des thérapeutes certifiés au Maroc.

## ✨ Fonctionnalités

### 👤 Espace Patient
- **Inscription & Connexion** sécurisées
- **Questionnaire** d'évaluation personnalisé
- **Dashboard** avec suivi des séances
- **Recherche de thérapeutes** avec filtres (spécialité, langue, ville)
- **Messagerie** sécurisée avec les thérapeutes
- **Réservation de séances** vidéo

### 👨‍⚕️ Espace Thérapeute
- **Inscription professionnelle** avec vérification des diplômes
- **Dashboard** avec gestion des patients
- **Gestion des demandes** de consultation
- **Messagerie** avec les patients
- **Suivi des séances** et notes cliniques

### 🛡️ Espace Administrateur
- **Tableau de bord** avec statistiques globales
- **Gestion des patients** et thérapeutes
- **Vérification** des profils thérapeutes
- **Modération** et supervision

## 🎨 Design Marocain
- **Palette de couleurs** : Bleu Majorelle, Terre cuite, Or/Safran, Blanc cassé
- **Motifs zellige** en arrière-plan
- **Typographie** Amiri pour les titres (style calligraphie marocaine)
- **Formes** : Coins arrondis avec arches marocaines

## 🚀 Installation

### Prérequis
- Node.js (v18+)
- npm ou yarn

### Étapes

1. **Cloner le projet**
```bash
cd therapie-maroc
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📁 Structure du Projet

```
therapie-maroc/
├── src/
│   ├── components/
│   │   ├── common/          # Layout, Navbar, Footer
│   │   ├── patient/         # Composants Patient
│   │   ├── therapist/       # Composants Thérapeute
│   │   └── admin/           # Composants Admin
│   ├── pages/
│   │   ├── patient/         # Pages Patient
│   │   ├── therapist/       # Pages Thérapeute
│   │   └── admin/           # Pages Admin
│   ├── context/             # Context API (Auth)
│   ├── hooks/               # Custom hooks
│   ├── services/            # API calls
│   ├── styles/              # Design system & CSS
│   └── utils/               # Fonctions utilitaires
├── public/                  # Assets statiques
└── package.json
```

## 🛣️ Routes

### Patient
- `/` - Accueil
- `/patient/register` - Inscription
- `/patient/login` - Connexion
- `/patient/questionnaire` - Questionnaire
- `/patient/dashboard` - Tableau de bord
- `/patient/therapists` - Liste des thérapeutes
- `/patient/chat/:therapistId` - Chat
- `/patient/booking/:therapistId` - Réservation

### Thérapeute
- `/therapist/register` - Inscription
- `/therapist/login` - Connexion
- `/therapist/dashboard` - Tableau de bord
- `/therapist/requests` - Demandes patients
- `/therapist/chat/:patientId` - Chat

### Admin
- `/admin/dashboard` - Tableau de bord
- `/admin/users` - Gestion patients
- `/admin/therapists` - Gestion thérapeutes

## 🛠️ Technologies

- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Lucide React** - Icônes
- **Context API** - State management

## 🔮 Prochaines Étapes

- [ ] Intégration backend (Node.js/Express + MongoDB)
- [ ] Système de paiement (CMI, Stripe)
- [ ] Visioconférence (WebRTC)
- [ ] Notifications push
- [ ] Application mobile (React Native)
- [ ] Tests unitaires et E2E

## 📄 Licence

MIT License - Projet open source

---

**Fait avec ❤️ au Maroc 🇲🇦**

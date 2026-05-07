# 🚀 Guide de Déploiement - Thérapie Maroc

## Option 1 : Vercel (Recommandé - Gratuit)

### Prérequis
- Compte GitHub
- Compte Vercel (gratuit sur vercel.com)
- Node.js installé sur ton PC

### Étapes

#### 1. Créer un repository GitHub
```bash
cd therapie-maroc
git init
git add .
git commit -m "Initial commit - Thérapie Maroc"
```

Puis crée un nouveau repository sur GitHub et pousse le code :
```bash
git remote add origin https://github.com/TON-USERNAME/therapie-maroc.git
git branch -M main
git push -u origin main
```

#### 2. Connecter à Vercel
1. Va sur [vercel.com](https://vercel.com)
2. Connecte-toi avec ton compte GitHub
3. Clique sur "New Project"
4. Sélectionne le repository `therapie-maroc`
5. Laisse les paramètres par défaut
6. Clique sur "Deploy"

#### 3. Ton lien sera prêt !
Vercel te donnera un lien du type :
`https://therapie-maroc.vercel.app`

---

## Option 2 : Netlify (Alternative)

### Étapes
1. Va sur [netlify.com](https://netlify.com)
2. Glisse-dépose le dossier `dist` (après avoir build)
3. Ou connecte ton repo GitHub

---

## Option 3 : Build Local + Hébergement

### Build le projet
```bash
cd therapie-maroc
npm install
npm run build
```

Le dossier `dist/` contient les fichiers statiques prêts à être hébergés.

---

## 🔗 URLs de l'application

Une fois déployée, voici les pages accessibles :

| Page | Chemin |
|------|--------|
| Accueil | `/` |
| Inscription Patient | `/patient/register` |
| Connexion Patient | `/patient/login` |
| Dashboard Patient | `/patient/dashboard` |
| Questionnaire | `/patient/questionnaire` |
| Liste Thérapeutes | `/patient/therapists` |
| Chat Patient | `/patient/chat/:id` |
| Réservation | `/patient/booking/:id` |
| Inscription Thérapeute | `/therapist/register` |
| Connexion Thérapeute | `/therapist/login` |
| Dashboard Thérapeute | `/therapist/dashboard` |
| Demandes | `/therapist/requests` |
| Chat Thérapeute | `/therapist/chat/:id` |
| Dashboard Admin | `/admin/dashboard` |
| Gestion Patients | `/admin/users` |
| Gestion Thérapeutes | `/admin/therapists` |

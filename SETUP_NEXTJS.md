# 🎯 REPÈRE ÉCOLE - Next.js Frontend

Tableau de bord de pilotage pour directeurs d'école. Application full-stack prête à évoluer.

## 🚀 Quick Start

```bash
cd web
npm install
npm run dev
```

Ouvrez `http://localhost:3000` dans votre navigateur.

## 📋 Structure

```
web/
├── src/
│   ├── app/                     # Pages Next.js (App Router)
│   │   ├── dashboard/           # 📊 Tableau de bord principal
│   │   ├── agenda/              # 📅 Calendrier
│   │   ├── attendance/          # ✓ Assiduité
│   │   ├── students/            # 👥 Suivi élèves
│   │   ├── resources/           # 📚 Ressources
│   │   ├── contacts/            # 📞 Contacts
│   │   ├── settings/            # ⚙️ Paramètres
│   │   ├── layout.tsx           # Layout racine
│   │   ├── page.tsx             # Redirect vers dashboard
│   │   └── globals.css          # Design system & Tailwind
│   │
│   ├── components/
│   │   ├── Sidebar.tsx          # Navigation responsif
│   │   ├── Header.tsx           # En-tête avec infos
│   │   ├── Modal.tsx            # Modal générique
│   │   ├── DashboardLayout.tsx   # Layout partagé
│   │   ├── dashboard/           # Composants métier
│   │   │   ├── KPICard.tsx
│   │   │   ├── Filters.tsx
│   │   │   ├── TaskList.tsx
│   │   │   ├── TeamWidget.tsx
│   │   │   └── AttendanceWidget.tsx
│   │   └── modals/
│   │       └── NewItemModal.tsx
│   │
│   ├── lib/
│   │   └── mock-data.ts         # 📊 Données mockées
│   │
│   └── types/
│       └── index.ts             # Types TypeScript
│
├── public/                      # Assets statiques
├── package.json
├── next.config.ts
├── tsconfig.json
└── tailwind.config.ts
```

## 🎨 Design System

**Couleurs** (définies dans `globals.css`)
- Primaire: `#137a63` (vert)
- Urgent: `#d95b57` (rouge)
- Retard: `#d89235` (orange)
- Info: `#4e7bb8` (bleu)

**Composants Tailwind + CSS Variables** pour la flexibilité.

## ✨ Fonctionnalités implémentées

✅ **Navigation responsive**
- Sidebar persistant sur desktop
- Menu hamburger sur mobile
- Active state sur la page courante

✅ **Modales interactives**
- Créer nouveaux éléments (type, titre, date, priorité)
- Voir détails des tâches
- Fermeture ESC, clic extérieur, ou boutons

✅ **Filtres & Recherche**
- Filtrer par priorité (Urgent, En retard, Fait, Tous)
- Recherche en temps réel par titre/description

✅ **Données mockées**
- 4 tâches avec priorités variées
- 4 événements du jour
- 3 étudiants en ligne
- Facilement remplaçable par une vraie API

✅ **Dashboard complet**
- 4 KPI cards (Urgent, En retard, Aujourd'hui, Épinglés)
- 3 colonnes de panneaux (Aujourd'hui, À traiter, À venir)
- 3 widgets (Équipe, Assiduité, Suivi élèves)

✅ **Pages de navigation**
- Toutes les pages utilisent `DashboardLayout` pour cohérence
- Stub pages prêtes à développer

## 🔧 Scripts disponibles

```bash
npm run dev      # Démarrer le serveur de dev
npm run build    # Compiler pour production
npm run start    # Lancer l'app compilée
npm run lint     # Vérifier le code
```

## 📦 Dépendances

- **next** 16.3.8 - Framework React
- **react** 19.2.8 - Library UI
- **tailwindcss** 4 - Styling utilitaire
- **typescript** 5 - Type safety

## 🔄 Évolution vers le backend

### Phase 1: API Routes (déjà intégré dans Next.js)
```
web/src/app/api/
├── tasks/
│   ├── route.ts           # GET /api/tasks, POST
│   └── [id]/route.ts      # GET/PUT/DELETE
├── events/route.ts
└── students/route.ts
```

### Phase 2: Database
```bash
npm install @prisma/client prisma
npx prisma init
```

### Phase 3: Authentification
```bash
npm install next-auth
```

## 🎯 Prochaines étapes recommandées

1. **Remplacer les mock-data**
   - Créer `/api/tasks`, `/api/events`, etc.
   - Utiliser `fetch` ou React Query

2. **Ajouter des charts**
   ```bash
   npm install recharts
   ```

3. **Export données**
   ```bash
   npm install pdfkit xlsx
   ```

4. **Notifications temps réel**
   ```bash
   npm install socket.io-client
   ```

5. **Upload fichiers**
   ```bash
   npm install next-cloudinary
   ```

## 📱 Responsive

- **Desktop (1100px+)** : Layout 3 col + sidebar 244px
- **Tablet (800-1100px)** : Layout 2 col + sidebar réduit
- **Mobile (<800px)** : 1 col, hamburger nav
- **Petit écran (<480px)** : Optimisé avec padding compact

## 🐛 Troubleshooting

**Port 3000 déjà utilisé?**
```bash
npm run dev -- -p 3001
```

**Erreur de type TypeScript?**
```bash
npm run lint
```

**Nettoyer les cache?**
```bash
rm -rf .next node_modules
npm install
```

## 📚 Ressources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [React Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)

---

**Status**: ✅ Frontend complet et fonctionnel
**Next**: Connecter une vraie API backend

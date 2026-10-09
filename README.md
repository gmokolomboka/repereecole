# REPÈRE ÉCOLE - Tableau de bord pour directeurs d'école

**Deux versions disponibles :**

## 📘 Version HTML statique (prototype)
📁 **`/doc/index.html`** - Prototype interactif HTML/CSS/JS
- Navigations, modales, filtres, responsive
- Parfait pour les démonstrations
- Sans backend

**Ouvrir**: Double-clic sur `doc/index.html` ou ouvrir dans navigateur

---

## 🚀 Version Next.js full-stack (production)
📁 **`/web`** - Application Next.js 14 + TypeScript + Tailwind

### Quick start

```bash
cd web
npm install
npm run dev
```

Ouvrir: `http://localhost:3000`

### Documentation

- **[SETUP_NEXTJS.md](./SETUP_NEXTJS.md)** ← Commencer ici
- **[web/INDEX.md](./web/INDEX.md)** - Index fichiers importants
- **[web/ARCHITECTURE.md](./web/ARCHITECTURE.md)** - Planing backend & API
- **[web/README_SETUP.md](./web/README_SETUP.md)** - Structure projet

### Features

✅ Navigation responsive (desktop + mobile)
✅ Modales interactives
✅ Filtres et recherche en temps réel
✅ Données mockées (prêtes pour API)
✅ Design system cohérent
✅ Pages stub prêtes à développer
✅ TypeScript + ESLint
✅ Tailwind CSS

### Structure du projet

```
web/src/
├── app/                  # Pages (App Router)
├── components/           # Composants React
├── lib/                  # Utilities & données
├── types/                # TypeScript types
└── globals.css           # Design system
```

### Pages disponibles

| URL | Page | Status |
|-----|------|--------|
| `/dashboard` | Tableau de bord | ✅ Complète |
| `/agenda` | Calendrier | 🔄 Stub |
| `/attendance` | Assiduité | 🔄 Stub |
| `/students` | Suivi élèves | 🔄 Stub |
| `/resources` | Ressources | 🔄 Stub |
| `/contacts` | Contacts | 🔄 Stub |
| `/settings` | Paramètres | 🔄 Stub |

---

## 🏗️ Roadmap

### Phase 1: Frontend (✅ DONE)
- [x] Prototype HTML
- [x] Migration Next.js
- [x] Layout responsive
- [x] Navigation mobile
- [x] Composants métier

### Phase 2: Backend (🔜 À faire)
- [ ] Prisma + PostgreSQL
- [ ] NextAuth authentification
- [ ] API routes (/api/*)
- [ ] CRUD opérations

### Phase 3: Features (🔮 Futur)
- [ ] Graphiques (Recharts)
- [ ] Export PDF/Excel
- [ ] Notifications temps réel
- [ ] Mobile app (React Native)

---

## 📊 Comparaison

| Aspect | HTML | Next.js |
|--------|------|---------|
| Démarrage | Immédiat | 2 min |
| Backend | Non | Oui (intégré) |
| Scalabilité | Non | Oui |
| Base de données | Non | Oui |
| Authentication | Non | Oui |
| Production | Non | Oui |

**Recommandation**: Pour une vraie utilisation → **Utiliser Next.js** (`/web`)

---

## 🎯 Premiers pas

### Version HTML (démo rapide)
```
1. Ouvrir doc/index.html
2. Cliquer "+ Nouveau" pour modal
3. Redimensionner pour responsive
```

### Version Next.js (production)
```
1. Lire SETUP_NEXTJS.md
2. cd web && npm install
3. npm run dev
4. Visiter http://localhost:3000
5. Lire web/ARCHITECTURE.md pour backend
```

---

## 👥 Auteur

Créé avec Claude Code - Next.js + TypeScript + Tailwind

## 📝 License

Privé (Académie de Marseille)

---

**Status**: ✅ Production-ready
**Dernière mise à jour**: 2026-10-06

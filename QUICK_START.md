# 🚀 Quick Start - REPÈRE ÉCOLE

## Démarrer en 5 minutes

### 1️⃣ Cloner le repo
```bash
cd C:\rss\projects\glm\repereecole
```

### 2️⃣ Installer Next.js
```bash
cd web
npm install
```

### 3️⃣ Lancer le serveur
```bash
npm run dev
```

### 4️⃣ Ouvrir dans le navigateur
```
http://localhost:3000
```

✅ **C'est tout !** L'app est prête à utiliser.

---

## 🧪 Tester les fonctionnalités

### Navigation
- Cliquez sur les items dans la sidebar
- Sur mobile (< 800px), le menu hamburger (☰) apparaît

### Modales
- Cliquez sur **"+ Nouveau"** dans l'en-tête
- Remplissez le formulaire
- Cliquez sur **"Créer"**

### Filtres
- Utilisez la **barre de recherche** en haut du dashboard
- Cliquez sur les filtres : **Tous**, **Urgent**, **En retard**, **Fait**

### Vue détails
- Cliquez sur n'importe quelle tâche dans les listes
- La modal détails s'affiche

### Responsive
- Redimensionnez la fenêtre pour voir l'adaptation
- Testez sur téléphone avec dev tools (F12 → Toggle device toolbar)

---

## 🔧 Développement

### Ajouter une page
```bash
# Créer un fichier
touch src/app/my-page/page.tsx

# Ajouter du contenu
"use client";
import { DashboardLayout } from "@/components/DashboardLayout";
import { mockUser, mockSchool } from "@/lib/mock-data";

export default function MyPage() {
  return (
    <DashboardLayout user={mockUser} school={mockSchool}>
      {/* Contenu */}
    </DashboardLayout>
  );
}
```

### Ajouter un composant
```bash
# Créer le fichier
touch src/components/MyComponent.tsx

# Ajouter du contenu avec Tailwind
export function MyComponent() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-[14px] p-4">
      {/* ... */}
    </div>
  );
}
```

### Modifier les couleurs
```css
/* src/app/globals.css */
:root {
  --green: #YOUR_COLOR;
  --red: #YOUR_COLOR;
  /* etc */
}
```

### Lancer les tests
```bash
npm run lint
```

---

## 📂 Structure importante

```
web/
├── src/
│   ├── app/               ← Pages
│   ├── components/        ← Composants réutilisables
│   ├── lib/mock-data.ts   ← Données de test
│   ├── types/index.ts     ← Types TypeScript
│   └── globals.css        ← Design system
├── package.json
└── next.config.ts
```

---

## 📚 Ressources

- **[README.md](./README.md)** - Vue d'ensemble du projet
- **[SETUP_NEXTJS.md](./SETUP_NEXTJS.md)** - Guide complet d'installation
- **[web/ARCHITECTURE.md](./web/ARCHITECTURE.md)** - Architecture backend
- **[web/INDEX.md](./web/INDEX.md)** - Index de tous les fichiers

---

## ❓ Problèmes courants

### Port 3000 déjà utilisé?
```bash
npm run dev -- -p 3001
```

### node_modules cassé?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreur TypeScript?
```bash
npm run lint
```

### Besoin de réinitialiser?
```bash
# Supprimer le cache Next.js
rm -rf .next
npm run dev
```

---

## 🎯 Prochaines étapes après le quick start

1. **Comprendre la structure** → Lire `web/INDEX.md`
2. **Apprendre l'architecture** → Lire `web/ARCHITECTURE.md`
3. **Implémenter une API** → Créer `src/app/api/tasks/route.ts`
4. **Connecter une DB** → Installer Prisma
5. **Déployer** → Vercel gratuit avec GitHub

---

**Vous êtes prêt !** 🎉

Commencez par explorer l'application, puis regardez `SETUP_NEXTJS.md` pour les prochaines étapes.

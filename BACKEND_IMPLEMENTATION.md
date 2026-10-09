# 🚀 Backend Implementation - REPÈRE ÉCOLE

## ✅ Status - Ce qui a été fait

### 1. Schema Prisma complet ✅
- **Fichier**: `web/prisma/schema.prisma`
- **Entités**: 20+ entités avec relations
- **Multi-tenant**: Architecture prête
- **Audit & Logs**: Implémentés

### 2. API Routes skeleton ✅
```
web/src/app/api/v1/
├── tasks/              (GET, POST)
├── tasks/[id]/         (GET, PATCH, DELETE)
└── dashboard/          (GET)
```

### 3. Prisma Setup ✅
- `web/src/lib/prisma.ts` - Singleton client
- `web/prisma/seed.ts` - Données initiales
- Schema migré vers SQLite (dev) / PostgreSQL (prod)

### 4. TaskService ✅
- `web/src/server/services/TaskService.ts`
- CRUD complet + KPIs

---

## 🔄 Prochaines étapes - À faire maintenant

### Étape 1: Setup Prisma (5 minutes)

```bash
cd web

# Sur Windows, utiliser npm:
npm exec prisma -- generate

# Ou installer CLI globalement:
npm install -g prisma

# Puis:
prisma generate
prisma migrate dev --name init
```

**Résultat**:
- ✓ `node_modules/.prisma/client/` créé
- ✓ `web/prisma/migrations/` créé
- ✓ `web/prisma/dev.db` créé (SQLite)

### Étape 2: Seed la base de données (2 minutes)

```bash
# Ajouter script seed dans package.json:
npm pkg set scripts.seed="prisma db seed"

# Puis exécuter:
npm run seed
```

**Résultat**:
- 1 Tenant
- 1 School (École Jean Moulin)
- 3 Users (Josiane + 2 enseignantes)
- 2 Classes
- 2 Students
- 2 Tasks
- 2 Events
- 1 Attendance

### Étape 3: Implémenter les autres Services (30 minutes)

Créer les fichiers:

```typescript
// web/src/server/services/

EventService.ts
├── createEvent()
├── getEventsBySchool()
├── getEventById()
├── updateEvent()
├── deleteEvent()
└── getUpcomingEvents()

StudentService.ts
├── getStudentsBySchool()
├── getStudentById()
├── getStudentAttendance()
└── createStudentFollowUp()

AttendanceService.ts
├── recordAttendance()
├── getAttendanceByDate()
├── calculateAttendanceRate()
└── getAbsentStudents()

DashboardService.ts
├── calculateKPIs()
├── getTodayItems()
├── getOverdueTasks()
└── getUpcomingEvents()
```

### Étape 4: Compléter les API Routes (45 minutes)

```typescript
// web/src/app/api/v1/

events/             (GET, POST)
events/[id]/        (GET, PATCH, DELETE)

students/           (GET)
students/[id]/      (GET)

attendance/         (GET, POST)
attendance/stats/   (GET)

student-follow-ups/ (GET, POST, PATCH)

resources/          (GET, POST, DELETE)

contacts/           (GET, POST)

auth/               (POST login, POST logout)
```

### Étape 5: Connecter le frontend à l'API (2 heures)

Créer un API client:
```typescript
// web/src/lib/api-client.ts
export async function fetchTasks(filters) {
  const res = await fetch('/api/v1/tasks', { ... });
  return res.json();
}
```

Mettre à jour les composants:
```typescript
// web/src/components/dashboard/TaskList.tsx
import { fetchTasks } from '@/lib/api-client';

export function TaskList() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    fetchTasks({ status: 'TODO' }).then(setTasks);
  }, []);
  
  return <div>{tasks.map(t => ...)}</div>;
}
```

---

## 📋 Checklist implémentation

### Jour 1 (Aujourd'hui)
- [ ] `prisma generate`
- [ ] `prisma migrate dev --name init`
- [ ] `npm run seed`
- [ ] Tester avec Prisma Studio: `prisma studio`

### Jour 2
- [ ] EventService
- [ ] StudentService
- [ ] AttendanceService
- [ ] Tester les services

### Jour 3
- [ ] API routes complètes
- [ ] Tester avec Postman/Insomnia

### Jour 4-5
- [ ] API client frontend
- [ ] Connecter frontend à l'API
- [ ] Tester end-to-end

---

## 🧪 Tester l'API

### Avec Postman/Insomnia

```
GET http://localhost:3000/api/v1/tasks
GET http://localhost:3000/api/v1/tasks?priority=URGENT
GET http://localhost:3000/api/v1/dashboard
POST http://localhost:3000/api/v1/tasks
{
  "title": "Ma tâche",
  "priority": "HIGH",
  "dueAt": "2026-10-15"
}
```

### Avec curl

```bash
curl http://localhost:3000/api/v1/tasks
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","priority":"NORMAL"}'
```

### Avec Prisma Studio

```bash
npx prisma studio
# Ouvre http://localhost:5555
# Interface GUI pour explorer la DB
```

---

## 🔗 Fichiers de référence

### Structure créée

```
web/
├── prisma/
│   ├── schema.prisma           ✓ Complet
│   ├── seed.ts                 ✓ Données initiales
│   ├── migrations/             (auto-créé)
│   └── dev.db                  (auto-créé)
│
├── src/
│   ├── app/api/v1/
│   │   ├── tasks/              ✓ Skeleton
│   │   ├── tasks/[id]/         ✓ Skeleton
│   │   └── dashboard/          ✓ Mock
│   │
│   ├── server/services/
│   │   ├── TaskService.ts      ✓ Implémenté
│   │   ├── EventService.ts     (À faire)
│   │   ├── StudentService.ts   (À faire)
│   │   ├── AttendanceService.ts (À faire)
│   │   └── DashboardService.ts (À faire)
│   │
│   ├── lib/
│   │   ├── prisma.ts           ✓ Singleton
│   │   └── api-client.ts       (À faire)
│   │
│   └── config/
│       └── app.config.ts       ✓ Existant
│
└── BACKEND_SETUP.md            ✓ Documentation
```

---

## 📚 Architecture finale

```
Utilisateur
     ↓
Next.js Frontend (React)
     ↓
API Routes (/api/v1/*)
     ↓
Services Métier (TaskService, etc.)
     ↓
Prisma ORM
     ↓
SQLite (dev) / PostgreSQL (prod)
```

---

## 🎯 Points clés

✅ **Multi-tenant**: Données isolées par tenant
✅ **Audit complet**: AuditLog pour chaque action
✅ **Permissions**: Rôles et droits d'accès
✅ **Données sensibles**: Isolées (HEALTH_ADMINISTRATIVE)
✅ **Soft delete**: Données archivées, non supprimées
✅ **Indices**: Optimisés pour performance

---

## 🚀 Commandes importantes

```bash
# Development
npm run dev              # Démarrer app + API

# Prisma
npx prisma generate     # Générer client
npx prisma migrate dev  # Migration dev
npx prisma migrate deploy # Migration prod
npx prisma db push     # Syncer sans migration
npx prisma studio      # GUI pour DB

# Seed
npm run seed            # Remplir DB de données

# Testing
npm run lint            # ESLint
npm run build          # Production build
npm run start          # Production server
```

---

## 📞 Support

- **Prisma Docs**: https://www.prisma.io/docs
- **Functional Doc**: `doc/repere_ecole_mitosis.md`
- **API Design**: Sections 46-53 du document fonctionnel

---

## ✨ Résultat attendu V2.2

À la fin de cette phase:

✅ API REST complète et documentée
✅ Base de données relationnelle cohérente
✅ Services métier isolés et testables
✅ Frontend connecté au backend en temps réel
✅ Architecture prête pour scale
✅ Audit & compliance

---

**C'est parti!** 🚀

Commencez par: `npx prisma generate && npx prisma migrate dev --name init`

# REPÈRE ÉCOLE

## Documentation fonctionnelle & modèle de données — V2.2

**Produit :** REPÈRE ÉCOLE
**Version :** V2.2
**Positionnement :** Cockpit de pilotage et de gestion quotidienne d'une école
**Architecture frontend :** Mitosis + Next.js/React comme première cible
**Backend cible :** API REST TypeScript
**Base de données cible :** PostgreSQL
**Statut :** Référentiel fonctionnel V2.2

---

# 1. Vision du produit

REPÈRE ÉCOLE est une solution de pilotage destinée aux directions d'école.

Elle permet au directeur ou à une personne habilitée de :

* voir immédiatement les informations importantes ;
* identifier ce qui nécessite une action ;
* suivre les échéances ;
* gérer les événements et rendez-vous ;
* suivre les élèves nécessitant une attention particulière ;
* suivre l'assiduité ;
* coordonner l'équipe ;
* centraliser les ressources et documents ;
* conserver un historique des actions importantes.

### Promesse

> **Tout ce que le directeur doit savoir, décider et faire, au même endroit.**

### Principe UX

> **Voir clair. Prioriser. Agir. Anticiper.**

---

# 2. Objectifs fonctionnels

## OF-001 — Donner une vision immédiate de l'école

Au chargement du tableau de bord, l'utilisateur doit pouvoir identifier :

* les urgences ;
* les tâches en retard ;
* les événements du jour ;
* les éléments épinglés ;
* les prochaines échéances ;
* les situations élèves à surveiller.

## OF-002 — Réduire la charge cognitive

Le produit doit privilégier :

1. l'information importante ;
2. l'action attendue ;
3. l'échéance ;
4. le contexte.

Les informations secondaires ne doivent pas prendre le dessus sur les informations opérationnelles.

## OF-003 — Centraliser le pilotage

REPÈRE ÉCOLE doit éviter que le directeur ait besoin de consulter plusieurs outils pour connaître la situation de son école.

## OF-004 — Préparer l'intégration au SI existant

L'application doit pouvoir ultérieurement intégrer :

* systèmes académiques ;
* annuaires ;
* messagerie ;
* outils d'assiduité ;
* calendriers ;
* stockage documentaire ;
* SSO institutionnel.

---

# 3. Utilisateurs

## 3.1 Directeur

Rôle principal.

Droits :

* accès complet à son établissement ;
* création/modification/suppression des données ;
* consultation des élèves ;
* suivi de l'équipe ;
* gestion des tâches ;
* gestion des événements ;
* gestion des ressources ;
* consultation de l'historique.

## 3.2 Personnel habilité

Exemple :

* directeur adjoint ;
* personnel administratif ;
* personnel disposant d'une délégation.

Droits configurables par établissement.

## 3.3 Enseignant

Accès limité aux fonctionnalités qui lui sont destinées.

Exemples :

* consultation de son agenda ;
* consultation de certaines tâches ;
* suivi des élèves autorisés ;
* consultation de ressources.

## 3.4 Administrateur plateforme

Administrateur technique ou fonctionnel de la plateforme.

Il peut gérer :

* établissements ;
* comptes ;
* paramètres globaux ;
* droits ;
* configuration ;
* supervision.

Il ne doit pas disposer automatiquement d'un accès fonctionnel aux données sensibles des élèves.

---

# 4. Organisation fonctionnelle

La navigation principale comprend :

1. Pilotage
2. Agenda
3. Assiduité
4. Suivi des élèves
5. Ressources
6. Contacts
7. Paramètres

---

# 5. Module Pilotage

Le Pilotage constitue la page d'accueil principale.

## 5.1 En-tête

L'en-tête affiche :

* date ;
* utilisateur connecté ;
* établissement ;
* message d'accueil ;
* raccourci `+ Nouveau`.

## 5.2 KPI

Quatre indicateurs principaux sont affichés :

| KPI         | Description                                       |
| ----------- | ------------------------------------------------- |
| Urgent      | éléments nécessitant une action prioritaire       |
| En retard   | tâches dont l'échéance est dépassée               |
| Aujourd'hui | éléments prévus aujourd'hui                       |
| Épinglés    | éléments volontairement conservés dans le cockpit |

Chaque KPI doit être cliquable.

Exemple :

`Urgent = 4`

ouvre la liste filtrée :

`priority = URGENT`

---

# 6. Éléments épinglés

Un utilisateur peut épingler :

* tâche ;
* événement ;
* suivi élève ;
* ressource ;
* contact.

L'épingle est personnelle.

Un élément épinglé par Claire n'est donc pas automatiquement épinglé pour Sophie.

## Règles

**RB-PIN-001**

Un élément peut être épinglé ou désépinglé.

**RB-PIN-002**

Un utilisateur ne peut voir que ses propres épingles.

**RB-PIN-003**

La suppression de l'épingle ne supprime pas l'objet métier.

---

# 7. Module Agenda

L'agenda permet de gérer :

* rendez-vous ;
* réunions ;
* conseils ;
* sorties ;
* événements ;
* échéances.

## 7.1 Événement

Un événement contient :

* titre ;
* description ;
* date de début ;
* date de fin ;
* lieu ;
* créateur ;
* participants ;
* statut ;
* couleur/type ;
* établissement.

## 7.2 Types

```text
MEETING
APPOINTMENT
SCHOOL_EVENT
OUTING
COUNCIL
DEADLINE
OTHER
```

## 7.3 Statuts

```text
PLANNED
CONFIRMED
CANCELLED
COMPLETED
```

---

# 8. Module Tâches

Une tâche représente une action à réaliser.

Exemples :

* appeler une famille ;
* envoyer un document ;
* signer un dossier ;
* relancer la mairie ;
* préparer une réunion.

## 8.1 Attributs

* titre ;
* description ;
* priorité ;
* statut ;
* échéance ;
* responsable ;
* créateur ;
* date de création ;
* date de réalisation.

## 8.2 Priorités

```text
LOW
NORMAL
HIGH
URGENT
```

## 8.3 Statuts

```text
TODO
IN_PROGRESS
DONE
CANCELLED
```

## 8.4 Règles

Une tâche devient `OVERDUE` fonctionnellement lorsque :

```text
status != DONE
AND due_at < now
```

Le statut `OVERDUE` peut être calculé plutôt que stocké.

Cela évite les incohérences entre l'état réel et une valeur persistée.

---

# 9. Module Assiduité

Le module permet de suivre :

* absences ;
* retards ;
* présences ;
* motifs ;
* justificatifs.

## 9.1 Présence

Pour chaque élève et chaque date :

```text
PRESENT
ABSENT
LATE
EXCUSED
UNKNOWN
```

## 9.2 Absence

Une absence contient :

* élève ;
* date ;
* heure éventuelle ;
* durée ;
* motif ;
* justificatif ;
* commentaire ;
* statut de validation.

## 9.3 Indicateurs

Le tableau de bord peut calculer :

* taux de présence ;
* nombre d'absences ;
* nombre de retards ;
* élèves avec répétition d'absences ;
* absences non justifiées.

---

# 10. Module Suivi des élèves

Le suivi élève constitue un module distinct de l'assiduité.

Il permet de documenter une situation nécessitant une attention particulière.

Exemples :

* difficulté scolaire ;
* situation familiale ;
* comportement ;
* accompagnement ;
* entretien ;
* dossier administratif ;
* dispositif particulier.

## 10.1 Dossier élève

Un élève possède :

* identité ;
* date de naissance ;
* niveau ;
* classe ;
* responsables légaux ;
* coordonnées ;
* statut ;
* informations administratives nécessaires.

## 10.2 Suivi

Un suivi possède :

* élève concerné ;
* catégorie ;
* titre ;
* description ;
* niveau de priorité ;
* statut ;
* responsable ;
* date de création ;
* date de prochaine action ;
* date de clôture.

## 10.3 Catégories

```text
ACADEMIC
BEHAVIOR
FAMILY
HEALTH_ADMINISTRATIVE
INCLUSION
ADMINISTRATIVE
OTHER
```

La catégorie `HEALTH_ADMINISTRATIVE` doit être traitée avec une politique d'accès renforcée lorsque des données sensibles sont concernées.

---

# 11. Module Équipe

Le module permet de connaître :

* les membres de l'équipe ;
* leur fonction ;
* leur statut ;
* leurs coordonnées professionnelles ;
* leurs affectations.

## Statuts

```text
ACTIVE
INACTIVE
ABSENT
ON_LEAVE
```

## Affectation

Une personne peut être affectée à :

* une école ;
* une classe ;
* une fonction.

Une même personne peut avoir plusieurs affectations dans le temps.

---

# 12. Module Ressources

Une ressource représente un document ou contenu partagé.

Types :

```text
DOCUMENT
FORM
TEMPLATE
GUIDE
LINK
OTHER
```

Attributs :

* titre ;
* description ;
* type ;
* emplacement ;
* propriétaire ;
* date de création ;
* date de modification ;
* visibilité.

Le fichier physique ne doit pas être stocké directement dans PostgreSQL.

Le modèle conserve plutôt :

* identifiant du fichier ;
* nom ;
* type MIME ;
* taille ;
* emplacement de stockage.

Le stockage peut être S3-compatible ou MinIO.

---

# 13. Module Contacts

Les contacts permettent de retrouver rapidement :

* membres de l'équipe ;
* familles ;
* partenaires ;
* administration ;
* collectivités ;
* prestataires.

Un contact peut être interne ou externe.

---

# 14. Notifications

Le système peut générer des notifications concernant :

* nouvelle tâche ;
* tâche assignée ;
* tâche en retard ;
* événement proche ;
* suivi élève à revoir ;
* absence à contrôler ;
* document nécessitant une action.

## Canaux

V2.2 :

```text
IN_APP
```

Évolutions :

```text
EMAIL
PUSH
SMS
```

---

# 15. Recherche

La recherche globale doit pouvoir retrouver :

* élèves ;
* personnes ;
* tâches ;
* événements ;
* ressources ;
* suivis.

Les résultats doivent être filtrables par type.

---

# 16. Modèle de données conceptuel

Le modèle central est organisé autour de :

```text
TENANT
  │
  ├── SCHOOL
  │      │
  │      ├── USER
  │      ├── CLASS
  │      │     └── STUDENT
  │      │
  │      ├── EVENT
  │      ├── TASK
  │      ├── ATTENDANCE
  │      ├── STUDENT_FOLLOW_UP
  │      ├── RESOURCE
  │      └── CONTACT
  │
  └── ROLES / PERMISSIONS
```

---

# 17. Entité Tenant

Le `Tenant` représente l'organisation cliente.

Exemple :

```text
tenant_id
name
slug
status
created_at
updated_at
```

## Statuts

```text
ACTIVE
SUSPENDED
ARCHIVED
```

Toutes les données fonctionnelles doivent être rattachées à un tenant.

---

# 18. Entité School

Une école appartient à un tenant.

```text
School
---------
id
tenant_id
name
code
address
postal_code
city
phone
email
timezone
status
created_at
updated_at
```

Relation :

```text
Tenant 1 ─── N School
```

---

# 19. Entité User

```text
User
---------
id
tenant_id
external_id
first_name
last_name
email
phone
status
last_login_at
created_at
updated_at
```

L'authentification n'est pas nécessairement gérée directement par cette table.

Le système peut utiliser Keycloak/OIDC.

`external_id` contient alors l'identifiant du fournisseur d'identité.

---

# 20. Entité Role

```text
Role
---------
id
tenant_id
code
name
description
```

Exemples :

```text
PLATFORM_ADMIN
SCHOOL_ADMIN
DIRECTOR
STAFF
TEACHER
```

---

# 21. Entité UserRole

Relation N:N entre utilisateurs et rôles.

```text
UserRole
---------
user_id
role_id
school_id
created_at
```

Le `school_id` permet d'avoir un rôle limité à un établissement.

---

# 22. Entité Class

```text
Class
---------
id
school_id
name
level
academic_year
created_at
updated_at
```

Exemples :

```text
CP A
CE1 B
CM2 A
```

---

# 23. Entité Student

```text
Student
---------
id
school_id
student_number
first_name
last_name
birth_date
gender
status
created_at
updated_at
```

## Statuts

```text
ACTIVE
INACTIVE
TRANSFERRED
GRADUATED
```

---

# 24. Entité StudentClass

Un élève peut changer de classe au cours du temps.

Il est donc préférable de ne pas simplement stocker `class_id` dans `Student`.

```text
StudentClass
---------
id
student_id
class_id
start_date
end_date
```

Cela permet de conserver l'historique.

Relation :

```text
Student N ─── N Class
```

via `StudentClass`.

---

# 25. Entité LegalGuardian

```text
LegalGuardian
---------
id
first_name
last_name
email
phone
address
created_at
updated_at
```

---

# 26. Entité StudentGuardian

Relation entre élève et responsable légal.

```text
StudentGuardian
---------
student_id
guardian_id
relationship
is_primary
has_pickup_authorization
```

Exemples de relation :

```text
PARENT
MOTHER
FATHER
LEGAL_GUARDIAN
OTHER
```

---

# 27. Entité StaffAssignment

Permet de gérer l'affectation des membres de l'équipe.

```text
StaffAssignment
---------
id
user_id
school_id
role
class_id
start_date
end_date
```

Exemple :

```text
Claire Martin
→ École Jean Moulin
→ Directrice
```

ou :

```text
Sophie Martin
→ École Jean Moulin
→ Enseignante
→ CE1 A
```

---

# 28. Entité Task

```text
Task
---------
id
tenant_id
school_id
created_by
assigned_to
title
description
priority
status
due_at
completed_at
created_at
updated_at
```

---

# 29. Entité Event

```text
Event
---------
id
tenant_id
school_id
created_by
title
description
type
status
starts_at
ends_at
location
created_at
updated_at
```

---

# 30. Entité EventParticipant

```text
EventParticipant
---------
event_id
user_id
status
```

Statut :

```text
INVITED
ACCEPTED
DECLINED
TENTATIVE
```

---

# 31. Entité Attendance

```text
Attendance
---------
id
school_id
student_id
date
status
arrival_time
departure_time
reason
justification_status
comment
recorded_by
created_at
updated_at
```

Une contrainte unique doit empêcher plusieurs enregistrements contradictoires pour le même élève et la même période.

PostgreSQL fournit les contraintes `PRIMARY KEY`, `UNIQUE`, `CHECK`, `FOREIGN KEY`, etc., qui permettent de faire respecter ce type d'intégrité au niveau de la base.

---

# 32. Entité StudentFollowUp

```text
StudentFollowUp
---------
id
school_id
student_id
created_by
assigned_to
category
title
description
priority
status
next_action_at
closed_at
created_at
updated_at
```

## Statuts

```text
OPEN
IN_PROGRESS
WAITING
CLOSED
CANCELLED
```

---

# 33. Entité FollowUpAction

Un suivi peut comporter plusieurs actions.

```text
FollowUpAction
---------
id
follow_up_id
created_by
title
description
due_at
completed_at
status
created_at
```

Cela permet d'avoir :

```text
Suivi élève
   │
   ├── Appeler la famille
   ├── Organiser un entretien
   ├── Contacter l'équipe
   └── Vérifier le dossier
```

---

# 34. Entité Resource

```text
Resource
---------
id
school_id
created_by
title
description
type
storage_key
file_name
mime_type
file_size
visibility
created_at
updated_at
```

---

# 35. Entité Contact

```text
Contact
---------
id
school_id
type
first_name
last_name
organization
email
phone
address
notes
created_at
updated_at
```

---

# 36. Entité Pin

Les épingles sont personnelles.

```text
UserPin
---------
id
user_id
entity_type
entity_id
created_at
```

Exemples :

```text
TASK / 123
EVENT / 456
STUDENT_FOLLOW_UP / 789
RESOURCE / 321
```

---

# 37. Entité Notification

```text
Notification
---------
id
user_id
type
title
message
entity_type
entity_id
read_at
created_at
```

---

# 38. Entité AuditLog

L'audit est particulièrement important pour les actions sensibles.

```text
AuditLog
---------
id
tenant_id
user_id
action
entity_type
entity_id
old_value
new_value
ip_address
user_agent
created_at
```

Exemples :

```text
CREATE TASK
UPDATE TASK
DELETE TASK
UPDATE STUDENT_FOLLOW_UP
VIEW_STUDENT
```

Pour les données sensibles, l'audit doit être pensé comme un mécanisme fonctionnel et de sécurité, pas simplement comme du logging technique.

---

# 39. Relations principales

```text
Tenant
 │
 ├────< School
 │         │
 │         ├────< Class
 │         │        │
 │         │        └────< StudentClass >──── Student
 │         │                                      │
 │         │                                      └────< StudentGuardian >──── Guardian
 │         │
 │         ├────< Attendance >──── Student
 │         │
 │         ├────< StudentFollowUp >──── Student
 │         │             │
 │         │             └────< FollowUpAction
 │         │
 │         ├────< Event
 │         │       │
 │         │       └────< EventParticipant >──── User
 │         │
 │         ├────< Task
 │         │
 │         ├────< Resource
 │         │
 │         └────< Contact
 │
 └────< User
          │
          ├────< UserRole >──── Role
          │
          └────< UserPin
```

Les clés étrangères seront utilisées pour préserver l'intégrité référentielle entre ces entités. PostgreSQL prévoit nativement ce mécanisme.

---

# 40. Modèle simplifié des données

```text
                         ┌──────────────┐
                         │    TENANT    │
                         └──────┬───────┘
                                │
                       ┌────────┴────────┐
                       ▼                 ▼
                 ┌──────────┐      ┌──────────┐
                 │  SCHOOL  │      │   USER   │
                 └────┬─────┘      └────┬─────┘
                      │                 │
          ┌───────────┼─────────┐       │
          ▼           ▼         ▼       ▼
       CLASS       EVENT      TASK    USER_ROLE
          │
          ▼
      STUDENT
       │    │
       │    └───────────────┐
       ▼                    ▼
 ATTENDANCE          STUDENT_FOLLOW_UP
                            │
                            ▼
                     FOLLOW_UP_ACTION
```

---

# 41. Règles de multi-tenant

Toutes les données métier doivent être isolées par tenant.

## RB-TENANT-001

Un utilisateur ne peut accéder qu'aux données des tenants auxquels il est autorisé.

## RB-TENANT-002

Une requête API ne doit jamais accepter aveuglément un `tenant_id` fourni par le client.

Le tenant doit être déterminé à partir du contexte d'authentification et des droits.

## RB-TENANT-003

Les identifiants métier ne doivent pas permettre de contourner l'isolation.

Exemple interdit :

```text
GET /students/123
```

qui retournerait l'élève 123 même si celui-ci appartient à un autre tenant.

---

# 42. Identifiants

Pour les entités exposées par API, l'utilisation d'UUID est recommandée.

Exemple :

```text
01J...
```

ou UUID v4/v7 selon le choix technique final.

Objectifs :

* éviter les identifiants séquentiels facilement devinables ;
* faciliter les imports ;
* faciliter les systèmes distribués ;
* limiter les collisions.

---

# 43. Dates et temps

Toutes les dates persistées doivent être stockées avec une référence temporelle explicite.

Recommandation :

```text
timestamp with time zone
```

Les dates métier doivent être interprétées dans le fuseau horaire de l'établissement.

Exemple :

```text
school.timezone = Europe/Paris
```

---

# 44. Soft delete

Les données métier importantes ne doivent généralement pas être supprimées physiquement.

Exemple :

```text
deleted_at
```

peut être ajouté aux entités concernées.

Cependant, le soft delete ne doit pas remplacer :

* l'archivage ;
* les règles de conservation ;
* les procédures RGPD.

---

# 45. Données sensibles

Les informations concernant les élèves doivent être considérées comme sensibles.

L'application doit appliquer :

* principe du moindre privilège ;
* séparation des rôles ;
* journalisation des accès sensibles ;
* chiffrement en transit ;
* chiffrement des sauvegardes ;
* politique de conservation ;
* suppression/archivage conforme aux règles applicables.

Les données médicales ou assimilées ne doivent pas être stockées dans des champs génériques sans nécessité fonctionnelle.

---

# 46. API fonctionnelle cible

Le frontend Mitosis/Next.js ne doit pas accéder directement à PostgreSQL.

Architecture :

```text
Mitosis UI
     │
     ▼
Next.js
     │
     ▼
API Client
     │
     ▼
REST API
     │
     ▼
Services métier
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
```

---

# 47. Principales routes API

## Pilotage

```http
GET /api/v1/dashboard
```

Retourne :

```json
{
  "kpis": {},
  "pinned": [],
  "today": [],
  "todo": [],
  "upcoming": [],
  "team": {},
  "attendance": {},
  "studentFollowUp": {}
}
```

## Tâches

```http
GET    /api/v1/tasks
POST   /api/v1/tasks
GET    /api/v1/tasks/{id}
PATCH  /api/v1/tasks/{id}
DELETE /api/v1/tasks/{id}
```

## Agenda

```http
GET    /api/v1/events
POST   /api/v1/events
GET    /api/v1/events/{id}
PATCH  /api/v1/events/{id}
DELETE /api/v1/events/{id}
```

## Élèves

```http
GET /api/v1/students
GET /api/v1/students/{id}
```

## Suivis

```http
GET    /api/v1/student-follow-ups
POST   /api/v1/student-follow-ups
GET    /api/v1/student-follow-ups/{id}
PATCH  /api/v1/student-follow-ups/{id}
```

## Assiduité

```http
GET   /api/v1/attendance
POST  /api/v1/attendance
PATCH /api/v1/attendance/{id}
```

## Ressources

```http
GET    /api/v1/resources
POST   /api/v1/resources
DELETE /api/v1/resources/{id}
```

---

# 48. Dashboard API

Le dashboard ne doit pas reconstruire toute la base côté frontend.

L'API peut fournir une vue agrégée :

```text
GET /api/v1/dashboard
```

Elle calcule notamment :

```text
urgent_count
overdue_count
today_count
pinned_count
```

ainsi que les listes :

```text
today
todo
upcoming
```

Cette approche permet de faire évoluer le calcul des KPI côté backend sans modifier les composants Mitosis.

---

# 49. Contrats frontend

Les composants Mitosis doivent recevoir des données sous forme de props.

Exemple conceptuel :

```tsx
<KpiCard
  title="Urgent"
  value={4}
  tone="red"
/>
```

Le composant ne doit pas connaître :

* PostgreSQL ;
* Prisma ;
* REST ;
* Next.js ;
* Keycloak.

C'est cohérent avec le rôle de Mitosis : le composant partagé doit rester indépendant du framework cible.

---

# 50. Architecture Mitosis

```text
packages/
│
├── ui/
│   ├── src/
│   │   ├── Button/
│   │   │   └── Button.lite.tsx
│   │   ├── Card/
│   │   │   └── Card.lite.tsx
│   │   ├── Badge/
│   │   │   └── Badge.lite.tsx
│   │   ├── KpiCard/
│   │   │   └── KpiCard.lite.tsx
│   │   ├── Sidebar/
│   │   │   └── Sidebar.lite.tsx
│   │   └── StudentCard/
│   │       └── StudentCard.lite.tsx
│   │
│   └── mitosis.config.js
│
├── types/
│
└── api-client/
```

Mitosis travaille à partir de composants `.lite.tsx` et peut compiler un projet vers plusieurs targets. La CLI `mitosis build` permet de générer plusieurs cibles à partir de la même source.

---

# 51. Frontend Next.js

```text
apps/
└── web/
    ├── app/
    │   ├── dashboard/
    │   ├── agenda/
    │   ├── assiduite/
    │   ├── eleves/
    │   ├── ressources/
    │   └── contacts/
    │
    ├── features/
    │   ├── dashboard/
    │   ├── tasks/
    │   ├── students/
    │   └── attendance/
    │
    └── services/
        └── api/
```

Next.js constitue ici l'application web de référence, tandis que Mitosis constitue la couche de composants partageables.

---

# 52. Modèle Prisma cible — extrait

```prisma
model School {
  id          String   @id @default(uuid())
  tenantId    String
  name        String
  code        String?
  city        String?
  timezone    String   @default("Europe/Paris")

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  tenant      Tenant   @relation(fields: [tenantId], references: [id])
  classes     Class[]
  students    Student[]
  tasks       Task[]
  events      Event[]

  @@index([tenantId])
}

model Student {
  id            String   @id @default(uuid())
  schoolId      String
  firstName     String
  lastName      String
  birthDate     DateTime?
  status        StudentStatus @default(ACTIVE)

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  school        School @relation(fields: [schoolId], references: [id])
  attendances   Attendance[]
  followUps     StudentFollowUp[]

  @@index([schoolId])
  @@index([schoolId, lastName])
}

model Task {
  id            String   @id @default(uuid())
  tenantId      String
  schoolId      String
  createdById   String
  assignedToId  String?

  title         String
  description   String?
  priority      TaskPriority @default(NORMAL)
  status        TaskStatus @default(TODO)
  dueAt         DateTime?
  completedAt   DateTime?

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  school        School @relation(fields: [schoolId], references: [id])

  @@index([schoolId, status])
  @@index([assignedToId, status])
  @@index([schoolId, dueAt])
}
```

Les contraintes relationnelles doivent également être présentes au niveau PostgreSQL et pas seulement dans l'ORM. PostgreSQL fournit nativement les clés primaires, clés étrangères, contraintes d'unicité et contraintes de vérification.

---

# 53. Indices principaux

Les tables les plus sollicitées doivent disposer d'index adaptés.

Exemples :

```text
Task
  school_id + status
  school_id + due_at
  assigned_to_id + status

Student
  school_id + last_name

Attendance
  school_id + date
  student_id + date

Event
  school_id + starts_at

StudentFollowUp
  school_id + status
  student_id + status
```

L'objectif est d'optimiser les requêtes du dashboard et des listes.

---

# 54. Transactions

Les opérations métier nécessitant plusieurs modifications doivent être réalisées dans une transaction.

Exemple :

```text
Créer un suivi
+
Créer sa première action
+
Créer une notification
+
Créer l'audit
```

Ces opérations doivent réussir ou échouer ensemble.

PostgreSQL fournit un modèle transactionnel permettant de regrouper plusieurs opérations dans une unité cohérente.

---

# 55. Règles métier essentielles

| ID     | Règle                                                                                         |
| ------ | --------------------------------------------------------------------------------------------- |
| RB-001 | Un utilisateur ne voit que les établissements auxquels il est autorisé                        |
| RB-002 | Une tâche peut être assignée à un utilisateur                                                 |
| RB-003 | Une tâche non terminée dont l'échéance est dépassée est considérée en retard                  |
| RB-004 | Une épingle est personnelle                                                                   |
| RB-005 | Un élève peut changer de classe sans perdre son historique                                    |
| RB-006 | Un suivi élève possède un responsable                                                         |
| RB-007 | Une présence est rattachée à un élève et une date                                             |
| RB-008 | Les accès aux données sensibles sont contrôlés                                                |
| RB-009 | Les actions sensibles sont auditées                                                           |
| RB-010 | Une donnée supprimée fonctionnellement ne doit pas nécessairement être physiquement supprimée |
| RB-011 | Toutes les données métier sont isolées par tenant                                             |
| RB-012 | Le frontend ne communique jamais directement avec PostgreSQL                                  |

---

# 56. Dashboard — critères d'acceptation

### AC-DASH-001

À l'ouverture, l'utilisateur voit les quatre KPI.

### AC-DASH-002

Les KPI reflètent les données de l'établissement sélectionné.

### AC-DASH-003

La liste "Aujourd'hui" affiche les éléments du jour.

### AC-DASH-004

Les tâches en retard apparaissent dans "À traiter".

### AC-DASH-005

L'utilisateur peut épingler un élément.

### AC-DASH-006

L'utilisateur peut retirer une épingle.

### AC-DASH-007

Le bouton `+ Nouveau` permet de démarrer la création d'un objet métier.

### AC-DASH-008

Le dashboard est utilisable sur desktop et mobile.

---

# 57. Critères UX

Le produit doit respecter :

* hiérarchie visuelle claire ;
* contrastes suffisants ;
* navigation clavier ;
* états de focus visibles ;
* libellés explicites ;
* feedback après action ;
* confirmation pour les suppressions importantes ;
* affichage cohérent des erreurs ;
* responsive design.

---

# 58. V2.2 — périmètre de livraison

## Inclus

### Dashboard

* KPI ;
* épingles ;
* aujourd'hui ;
* à traiter ;
* à venir ;
* équipe ;
* assiduité ;
* suivi élèves.

### Navigation

* Pilotage ;
* Agenda ;
* Assiduité ;
* Élèves ;
* Ressources ;
* Contacts ;
* Paramètres.

### Actions

* création ;
* modification ;
* suppression ;
* épinglage ;
* désépinglage ;
* changement de statut.

### Données

* tenants ;
* écoles ;
* utilisateurs ;
* rôles ;
* classes ;
* élèves ;
* responsables légaux ;
* tâches ;
* événements ;
* assiduité ;
* suivis ;
* ressources ;
* contacts ;
* notifications ;
* audit.

---

# 59. Hors périmètre V2.2

Ne pas implémenter immédiatement :

* facturation ;
* gestion RH complète ;
* paie ;
* comptabilité ;
* LMS ;
* gestion pédagogique complète ;
* messagerie instantanée complexe ;
* application mobile native ;
* moteur documentaire avancé ;
* BI avancée.

Ces fonctionnalités pourront faire partie d'une roadmap ultérieure.

---

# 60. Roadmap fonctionnelle

## V2.2

**Cockpit fonctionnel**

* dashboard ;
* tâches ;
* agenda ;
* élèves ;
* assiduité ;
* suivi ;
* ressources ;
* contacts.

## V2.3

**Collaboration**

* notifications ;
* commentaires ;
* partage ;
* affectation ;
* workflow.

## V2.4

**Intégrations**

* SSO ;
* annuaire ;
* calendrier ;
* import élèves ;
* export.

## V3

**Pilotage avancé**

* statistiques ;
* tendances ;
* indicateurs ;
* alertes ;
* tableaux de bord personnalisables.

---

# 61. Architecture cible globale

```text
                         ┌──────────────────────┐
                         │      Utilisateur     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Next.js         │
                         │      / React         │
                         └──────────┬───────────┘
                                    │
                         composants générés
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Mitosis        │
                         │     Design System     │
                         └──────────────────────┘

                                    │
                                    ▼

                         ┌──────────────────────┐
                         │       REST API       │
                         └──────────┬───────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
                 Tâches          Élèves          Agenda
                    │               │               │
                    └───────────────┼───────────────┘
                                    ▼
                         ┌──────────────────────┐
                         │    Services métier   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Prisma         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     PostgreSQL       │
                         └──────────────────────┘
```

---

# 62. Principe d'architecture

La séparation fondamentale est :

```text
UI
↓
Application
↓
Domaine
↓
Infrastructure
```

### UI

Mitosis / Next.js.

### Application

Cas d'utilisation :

```text
CreateTask
CompleteTask
CreateEvent
RecordAttendance
CreateStudentFollowUp
PinEntity
```

### Domaine

Règles métier.

### Infrastructure

```text
PostgreSQL
Prisma
Object Storage
Keycloak
Email
```

---

# 63. Décision structurante

Mitosis ne doit pas devenir le lieu où sont implémentées les règles métier.

Le composant :

```text
KpiCard
```

connaît :

```text
value
title
tone
```

mais ne connaît pas :

```text
PostgreSQL
tenant_id
Prisma
permissions
```

Le composant :

```text
StudentFollowUpCard
```

affiche une situation.

Le service métier décide :

```text
qui peut la voir
qui peut la modifier
si elle est sensible
si elle doit générer une notification
```

Cette séparation permettra de conserver un design system multi-framework sans dupliquer la logique métier. Mitosis est justement basé sur une représentation intermédiaire de composants permettant leur génération vers différents frameworks.

---

# 64. Résultat attendu

À terme, REPÈRE ÉCOLE doit permettre au directeur d'ouvrir l'application et de répondre immédiatement à cinq questions :

### 1. Qu'est-ce qui est urgent ?

→ KPI Urgent

### 2. Qu'est-ce qui est en retard ?

→ KPI En retard

### 3. Que dois-je faire aujourd'hui ?

→ Aujourd'hui / À traiter

### 4. Que dois-je anticiper ?

→ À venir

### 5. Quelles situations nécessitent mon attention ?

→ Suivi des élèves / Assiduité / Épinglés

C'est cette logique qui doit rester au centre du produit.

---

# 65. Synthèse

REPÈRE ÉCOLE V2.2 est conçu comme un **cockpit de direction**, et non comme un simple logiciel administratif.

Le modèle de données est organisé autour de :

```text
Tenant
 └── School
      ├── Users / Roles
      ├── Classes
      ├── Students
      ├── Attendance
      ├── Student Follow-ups
      ├── Tasks
      ├── Events
      ├── Resources
      └── Contacts
```

La couche UI est indépendante grâce à Mitosis :

```text
Mitosis
   ↓
React / Next.js
Vue
Svelte
...
```

La logique métier reste indépendante :

```text
Frontend
   ↓
API
   ↓
Services métier
   ↓
PostgreSQL
```

Cette architecture permet de commencer avec une application web unique tout en conservant la possibilité d'étendre REPÈRE ÉCOLE vers d'autres frameworks ou interfaces sans réécrire le design system.

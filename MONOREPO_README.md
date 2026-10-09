# REPÈRE ÉCOLE - School Management Dashboard

Complete school management system with frontend and backend.

## 📁 Project Structure

```
repereecole/
├── web/                    # Next.js 14 Frontend
│   ├── src/app/            # Pages (dashboard, students, agenda, etc)
│   ├── src/components/     # React components
│   ├── src/server/         # Backend-like services (pre-backend)
│   ├── package.json
│   └── ...
├── backend/                # Express.js Backend
│   ├── src/routes/         # API endpoints (/api/v1/*)
│   ├── src/services/       # Business logic
│   ├── prisma/             # Database schema
│   ├── package.json
│   ├── docker-compose.yml  # PostgreSQL setup
│   └── ...
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL (or Docker)

### 1️⃣ Start Backend

```bash
cd backend

# Setup PostgreSQL (with Docker)
docker-compose up -d

# Install dependencies
npm install

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start server (port 3001)
npm run dev
```

Backend will be at: **http://localhost:3001**

### 2️⃣ Start Frontend

```bash
cd web

# Install dependencies
npm install

# Start dev server (port 3000)
npm run dev
```

Frontend will be at: **http://localhost:3000**

## 📊 Features

### Dashboard
- 📈 KPI metrics (tasks, events, students)
- ✅ Task management with priorities
- 📅 Event calendar
- 👥 Team overview

### Students
- 📋 Student list with IDs (S001-S008)
- 🔍 Filter by status (ok, warning, danger)
- 👤 Student detail modals
- 📊 Statistics

### Attendance
- 📊 Attendance stats by class (CE1, CE2, CM1, CM2, CP)
- 📈 Weekly trends
- 👥 Absent students list

### Agenda
- 📅 Event management
- 🏷️ Filter by event type
- ✏️ Create/edit/delete events

### Settings
- ⚙️ School configuration
- 👤 User preferences

## 🔌 API Endpoints

All endpoints require `X-Tenant-ID` header for multi-tenancy.

### Tasks
- `GET /api/v1/tasks` - List all tasks
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks/:id` - Get task details
- `PATCH /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task

### Events
- `GET /api/v1/events` - List all events
- `POST /api/v1/events` - Create event
- `GET /api/v1/events/:id` - Get event details
- `PATCH /api/v1/events/:id` - Update event
- `DELETE /api/v1/events/:id` - Delete event

### Students
- `GET /api/v1/students` - List all students
- `POST /api/v1/students` - Create student
- `GET /api/v1/students/:id` - Get student details
- `PATCH /api/v1/students/:id` - Update student
- `DELETE /api/v1/students/:id` - Delete student

### Attendance
- `GET /api/v1/attendance?class=CM1` - Get attendance stats for class
- `GET /api/v1/attendance/weekly?class=CM1` - Get weekly trend
- `GET /api/v1/attendance/absent?class=CM1` - Get absent students

## 🗄️ Database

PostgreSQL with Prisma ORM.

### Models
- **Task** - Task management with priorities
- **Event** - Event/reunion management
- **Student** - Student information
- **Attendance** - Attendance records per class
- **Tenant** - Multi-tenant support

### Initial Data
- 8 Students (S001-S008)
- 4 Sample Tasks
- 4 Sample Events
- Attendance records per class

## 👤 User

Default configuration:
- **Name**: Josiane
- **School**: REPÈRE ÉCOLE
- **Location**: Paris, France

## 🔒 Multi-Tenancy

Both frontend and backend support multi-tenancy via `X-Tenant-ID` header.

Default tenant: `default`

## 📚 Documentation

- `web/README.md` - Frontend documentation
- `backend/README.md` - Backend documentation
- `ARCHITECTURE.md` - System architecture

## 🛠️ Development

### Frontend
- Next.js 14 with App Router
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Express.js
- Prisma ORM
- TypeScript
- PostgreSQL

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd web
vercel deploy
```

### Backend (Railway/Render)
```bash
cd backend
# Push to deployment platform
```

## 📝 Notes

- Frontend can work offline with JSON persistence (web/src/server/db/local-db-v2.ts)
- Backend uses PostgreSQL for production
- All API responses follow RESTful conventions
- TypeScript strict mode enabled

---

**Built with Next.js + Express + PostgreSQL + Prisma**

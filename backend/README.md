# REPÈRE ÉCOLE Backend

Express.js backend for the REPÈRE ÉCOLE school management dashboard.

## Features

- Multi-tenant support with X-Tenant-ID header
- Task management (create, read, update, delete)
- Event management
- Student management
- Attendance tracking
- PostgreSQL with Prisma ORM
- TypeScript support
- CORS enabled for frontend integration

## Project Structure

```
backend/
├── src/
│   ├── server.ts                 # Main entry point
│   ├── middleware/
│   │   └── tenant.ts             # Tenant extraction middleware
│   ├── routes/
│   │   ├── tasks.ts              # Task routes
│   │   ├── events.ts             # Event routes
│   │   ├── students.ts           # Student routes
│   │   ├── attendance.ts         # Attendance routes
│   │   └── index.ts              # Route aggregation
│   ├── services/
│   │   ├── TaskService.ts        # Task business logic
│   │   ├── EventService.ts       # Event business logic
│   │   ├── StudentService.ts     # Student business logic
│   │   └── AttendanceService.ts  # Attendance business logic
│   ├── db/
│   │   └── prisma.ts             # Prisma client singleton
│   ├── types/
│   │   └── index.ts              # Shared TypeScript types
│   └── utils/
│       └── response.ts           # Response helper functions
├── prisma/
│   ├── schema.prisma             # Prisma schema
│   └── seed.ts                   # Database seeding script
├── docker-compose.yml            # PostgreSQL + PgAdmin setup
├── package.json
├── tsconfig.json
└── .env.example
```

## Prerequisites

- Node.js 18+
- Docker & Docker Compose (for PostgreSQL)
- npm or yarn

## Installation

1. Copy environment file:
```bash
cp .env.example .env
```

2. Install dependencies:
```bash
npm install
```

3. Start PostgreSQL with Docker:
```bash
docker-compose up -d
```

## Database Setup

1. Create and push schema:
```bash
npm run db:push
```

2. Seed database with sample data:
```bash
npm run db:seed
```

## Running the Backend

Development mode with auto-reload:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## API Endpoints

All endpoints require the `X-Tenant-ID` header.

### Tasks
- `GET /api/v1/tasks` - List all tasks
- `POST /api/v1/tasks` - Create task
- `GET /api/v1/tasks/:id` - Get task detail
- `PATCH /api/v1/tasks/:id` - Update task
- `DELETE /api/v1/tasks/:id` - Delete task
- `GET /api/v1/tasks/stats/kpi` - Get task KPIs

### Events
- `GET /api/v1/events` - List all events
- `POST /api/v1/events` - Create event
- `GET /api/v1/events/:id` - Get event detail
- `PATCH /api/v1/events/:id` - Update event
- `DELETE /api/v1/events/:id` - Delete event
- `GET /api/v1/events/stats/summary` - Get event statistics

### Students
- `GET /api/v1/students` - List all students
- `POST /api/v1/students` - Create student
- `GET /api/v1/students/:id` - Get student detail
- `PATCH /api/v1/students/:id` - Update student
- `DELETE /api/v1/students/:id` - Delete student
- `GET /api/v1/students/stats/summary` - Get student statistics

### Attendance
- `GET /api/v1/attendance?classId=CLASS_ID` - Get attendance stats
- `GET /api/v1/attendance/weekly?classId=CLASS_ID` - Get weekly trend
- `GET /api/v1/attendance/absent?classId=CLASS_ID` - Get absent students
- `GET /api/v1/attendance/classes` - List all classes

## Headers

All requests to `/api/v1/*` must include:
```
X-Tenant-ID: your-tenant-id
X-School-ID: your-school-id (optional, defaults to school-1)
```

## Database Access

PgAdmin is available at: http://localhost:5050

Default credentials:
- Email: admin@repereecole.local
- Password: admin

## Environment Variables

```
DATABASE_URL=postgresql://repereecole:password123@localhost:5432/repereecole
NODE_ENV=development
PORT=3001
```

## Response Format

All successful responses follow this format:
```json
{
  "success": true,
  "data": {...}
}
```

Error responses:
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human readable message"
}
```

## Development

The backend uses:
- **Express.js** - Web framework
- **Prisma** - ORM
- **PostgreSQL** - Database
- **TypeScript** - Type safety
- **CORS** - Cross-origin support

## License

Private

# Architecture Diagram - Task Management System

## 1. High-Level Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    Nuxt 4 Application                     │   │
│  │                                                          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐   │   │
│  │  │  Pages/  │  │  Layouts │  │     Components        │   │   │
│  │  │  Views   │  │          │  │  (Kanban, Drawer,     │   │   │
│  │  │          │  │          │  │   Cards, SubtaskList) │   │   │
│  │  └─────┬────┘  └──────────┘  └──────────┬───────────┘   │   │
│  │        │                                 │               │   │
│  │  ┌─────┴─────────────────────────────────┴───────────┐   │   │
│  │  │               Pinia Stores                        │   │   │
│  │  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │   │   │
│  │  │  │ authStore│  │taskStore │  │ subtaskStore    │  │   │   │
│  │  │  └──────────┘  └──────────┘  └────────────────┘  │   │   │
│  │  └─────────────────────┬────────────────────────────┘   │   │
│  │                        │ $fetch()                       │   │
│  └────────────────────────┼────────────────────────────────┘   │
└───────────────────────────┼────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │    Nuxt API Routes         │
              │    (server/api/)           │
              │                           │
              │  POST /api/auth/login      │
              │  GET  /api/tasks           │
              │  POST /api/tasks           │
              │  PUT  /api/tasks/[id]      │
              │  DELETE /api/tasks/[id]    │
              │  POST /api/subtasks        │
              │  PATCH /api/subtasks/[id]  │
              │  GET  /api/tasks/[id]/sub  │
              │                           │
              │  (Prisma queries direto    │
              │   nos handlers)            │
              └─────────────┬──────────────┘
                            │
              ┌─────────────┴──────────────┐
              │     Prisma ORM             │
              │  (prisma.task.findMany()   │
              │   prisma.subtask.create()  │
              │   prisma.task.update()     │
              │   prisma.task.delete())    │
              └─────────────┬──────────────┘
                            │
              ┌─────────────┴──────────────┐
              │    Neon (PostgreSQL)        │
              │    Serverless DB            │
              │                             │
              │  Tables:                    │
              │  ┌──────────┐              │
              │  │  tasks   │              │
              │  ├──────────┤              │
              │  │ id (UUID)│              │
              │  │ title    │              │
              │  │ publishedAt             │
              │  │ status   │              │
              │  │ createdAt│              │
              │  │ updatedAt│              │
              │  └────┬─────┘              │
              │       │ 1:N                │
              │  ┌────┴──────┐             │
              │  │ subtasks  │             │
              │  ├───────────┤             │
              │  │ id (UUID) │             │
              │  │ taskId    │             │
              │  │ description             │
              │  │ completed  │            │
              │  │ createdAt  │            │
              │  │ updatedAt  │            │
              │  └───────────┘             │
              └────────────────────────────┘
```

---

## 2. Component Architecture (Frontend)

```
App.vue
└── AppLayout.vue
    ├── AppHeader.vue
    │   ├── Logo
    │   ├── SearchBar
    │   └── UserAvatar
    ├── NuxtPage (router)
    │   ├── pages/login.vue
    │   │   └── LoginForm.vue
    │   └── pages/index.vue (Dashboard)
    │       └── KanbanBoard.vue
    │           ├── KanbanColumn.vue (todo)
    │           │   └── TaskCard.vue (×N)
    │           ├── KanbanColumn.vue (doing)
    │           │   └── TaskCard.vue (×N)
    │           └── KanbanColumn.vue (done)
    │               └── TaskCard.vue (×N)
    ├── TaskDrawer.vue
    │   ├── TaskForm.vue
    │   │   └── DatePicker.vue
    │   └── SubtaskList.vue
    │       ├── SubtaskItem.vue (×N)
    │       └── AddSubtaskInput.vue
    └── ConfirmModal.vue
```

---

## 3. Data Flow

### 3.1 Create Task Flow

```
User clicks "+ Nova Tarefa"
       │
       ▼
TaskDrawer opens (right-to-left animation)
       │
       ▼
User fills title + date + optional subtasks
       │
       ▼
User clicks "Salvar"
       │
       ▼
taskStore.createTask(data)
       │
       ▼
$fetch('/api/tasks', { method: 'POST', body: data })
       │
       ▼
server/api/tasks/index.post.ts
  ├── readBody(event)
  ├── zod schema validation
  ├── prisma.task.create({ data })
  └── return task
       │
       ▼
taskStore updates local state
  └── new card appears in "A Fazer" column
       │
       ▼
Drawer closes with success toast
```

### 3.2 Mark Subtask Complete Flow

```
User clicks checkbox on SubtaskItem
       │
       ▼
subtaskStore.toggleComplete(subtaskId)
       │
       ▼
$fetch(`/api/subtasks/${id}`, { method: 'PATCH', body: { completed: true } })
       │
       ▼
server/api/subtasks/[id].patch.ts
  ├── readBody(event)
  ├── zod schema validation
  ├── prisma.subtask.update({ where: { id }, data: { completed: true } })
  └── return subtask
       │
       ▼
subtaskStore updates local state
  └── checkbox fills with checkmark animation
       │
       ▼
taskStore.recalculateStatus(taskId)
  ├── fetch subtasks count: prisma.subtask.count({ where: { taskId, completed: true } })
  ├── compare total vs completed
  ├── determine status: todo | doing | done
  └── update task status in list
       │
       ▼
KanbanBoard reacts to status change
  └── card animates to new column if status changed
```

### 3.3 Login Flow

```
User submits credentials
       │
       ▼
authStore.login(username, password)
       │
       ▼
$fetch('/api/auth/login', { method: 'POST', body: { username, password } })
       │
       ▼
server/api/auth/login.post.ts
  ├── readBody(event)
  ├── zod validation
  ├── compare with process.env (hardcoded credentials)
  ├── generate JWT token
  └── return { token }
       │
       ▼
authStore stores token (localStorage/pinia)
  └── redirect to dashboard
       │
       ▼
Subsequent requests include Authorization: Bearer <token>
```

---

## 4. Route Design (API)

| Method | Route | Handler | Description |
|--------|-------|---------|-------------|
| POST | `/api/auth/login` | `server/api/auth/login.post.ts` | Validate credentials, return JWT |
| GET | `/api/tasks` | `server/api/tasks/index.get.ts` | List all tasks |
| POST | `/api/tasks` | `server/api/tasks/index.post.ts` | Create task |
| GET | `/api/tasks/[id]` | `server/api/tasks/[id].get.ts` | Get single task |
| PUT | `/api/tasks/[id]` | `server/api/tasks/[id].put.ts` | Update task |
| DELETE | `/api/tasks/[id]` | `server/api/tasks/[id].delete.ts` | Delete task + subtasks cascade |
| GET | `/api/tasks/[id]/subtasks` | `server/api/tasks/[id]/subtasks.get.ts` | List subtasks of a task |
| POST | `/api/subtasks` | `server/api/subtasks/index.post.ts` | Create subtask |
| PATCH | `/api/subtasks/[id]` | `server/api/subtasks/[id].patch.ts` | Toggle subtask completed |
| DELETE | `/api/subtasks/[id]` | `server/api/subtasks/[id].delete.ts` | Delete subtask |

---

## 5. Security Architecture

```
┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
│   Browser    │ ──────> │  API Route       │ ──────> │   Prisma     │
│  (Nuxt App)  │         │  (server/api/)   │         │   (Neon)     │
└──────────────┘         └──────────────────┘         └──────────────┘
       │                        │
       │ JWT in                 │ JWT verification
       │ Authorization          │ via middleware
       │ header                 │ (server/middleware/auth.ts)
       │                        │
       ▼                        ▼
  localStorage            route guard checks
  (authStore)             token before handler
```

### Authentication Middleware

```typescript
// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
  // Skip auth check for login route
  if (getRequestURL(event).pathname === '/api/auth/login') return

  const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
  if (!token) throw createError({ statusCode: 401, message: 'Unauthorized' })

  try {
    const payload = verifyJwt(token, process.env.JWT_SECRET!)
    event.context.auth = { userId: payload.sub }
  } catch {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }
})
```

---

## 6. Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
}

model Task {
  id          String     @id @default(uuid()) @db.Uuid
  title       String     @db.VarChar(200)
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  subtasks    Subtask[]
}

model Subtask {
  id          String   @id @default(uuid()) @db.Uuid
  taskId      String   @db.Uuid
  description String   @db.VarChar(500)
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  task        Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
}
```

### Indexes

```prisma
model Task {
  // Prisma auto-indexes @id fields
  @@index([createdAt])
}

model Subtask {
  @@index([taskId])
  @@index([taskId, completed])  // Composite for status calculation queries
}
```

---

## 7. Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│                  Vercel / Netlify                │
│                                                  │
│  ┌──────────────────────────────────────────┐   │
│  │          Nuxt 4 (SSR/Static)              │   │
│  │                                           │   │
│  │  ┌────────────────┐  ┌────────────────┐  │   │
│  │  │  Frontend      │  │  API Routes    │  │   │
│  │  │  (pages,       │  │  (server/api/) │  │   │
│  │  │   components)  │  │                │  │   │
│  │  └────────────────┘  └────────┬───────┘  │   │
│  └────────────────────────────────┼──────────┘   │
└───────────────────────────────────┼──────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │         Neon (Serverless)      │
                    │         PostgreSQL              │
                    └───────────────────────────────┘
```

### Infrastructure as Code (Terraform / Neon Console)

- **Hosting:** Vercel (deploy via Git, zero config for Nuxt)
- **Database:** Neon (serverless PostgreSQL, connection pooling via Prisma)
- **Environment Variables:**
  - `DATABASE_URL` — Neon connection string with pooler
  - `JWT_SECRET` — Secret for JWT signing
  - `CREDENTIALS_USERNAME` — From .env for login
  - `CREDENTIALS_PASSWORD` — From .env for login
  - `NUXT_SESSION_TIMEOUT` — Session TTL in minutes

---

## 8. Monitoring & Observability

| Layer | Tool / Strategy |
|-------|----------------|
| Client errors | Vue error handler + console.error |
| API errors | Nuxt `onError` hook, 4xx/5xx responses |
| Database | Neon Console (CPU, connections, queries) |
| Performance | Nuxt performance hooks + Lighthouse CI |
| Logs | `console.log` structured in JSON format for Vercel logs |

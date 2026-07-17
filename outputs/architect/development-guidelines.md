# Development Guidelines - Task Management System

## 1. Project Structure

```
task-manager/
├── .env                        # Environment variables (credentials, DB URL, JWT secret)
├── .env.example                # Template for .env (committed to git)
├── nuxt.config.ts              # Nuxt 4 configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── prisma/
│   ├── schema.prisma           # Database schema (Task, Subtask models)
│   └── seed.ts                 # Optional seed script
├── server/
│   ├── middleware/
│   │   └── auth.ts             # JWT verification middleware
│   ├── utils/
│   │   ├── prisma.ts           # Shared Prisma client singleton
│   │   ├── status.ts           # Status calculation logic (todo/doing/done)
│   │   └── jwt.ts              # JWT sign/verify helpers
│   └── api/
│       ├── auth/
│       │   └── login.post.ts   # POST /api/auth/login
│       └── tasks/
│           ├── index.get.ts    # GET /api/tasks
│           ├── index.post.ts   # POST /api/tasks
│           ├── [id].get.ts     # GET /api/tasks/:id
│           ├── [id].put.ts     # PUT /api/tasks/:id
│           ├── [id].delete.ts  # DELETE /api/tasks/:id
│           └── [id]/
│               └── subtasks.get.ts  # GET /api/tasks/:id/subtasks
│       └── subtasks/
│           ├── index.post.ts   # POST /api/subtasks
│           ├── [id].patch.ts   # PATCH /api/subtasks/:id
│           └── [id].delete.ts  # DELETE /api/subtasks/:id
├── app.vue                     # Root component
├── layouts/
│   └── default.vue             # App layout (header, main slot)
├── pages/
│   ├── login.vue               # Login page
│   └── index.vue               # Dashboard (Kanban view)
├── components/
│   ├── AppHeader.vue           # Top navigation bar
│   ├── KanbanBoard.vue         # Kanban board (3 columns)
│   ├── KanbanColumn.vue        # Single Kanban column
│   ├── TaskCard.vue            # Task card in Kanban
│   ├── TaskDrawer.vue          # Right-side drawer
│   ├── TaskForm.vue            # Task create/edit form
│   ├── SubtaskList.vue         # List of subtasks within drawer
│   ├── SubtaskItem.vue         # Single subtask with checkbox
│   ├── AddSubtaskInput.vue     # Inline input to add subtask
│   ├── ConfirmModal.vue        # Confirmation dialog
│   └── EmptyState.vue          # Empty state placeholder
├── stores/
│   ├── authStore.ts            # Authentication state & actions
│   ├── taskStore.ts            # Tasks CRUD state & actions
│   └── subtaskStore.ts         # Subtasks state & actions
├── types/
│   └── index.ts                # Shared TypeScript types/interfaces
├── utils/
│   └── formatters.ts           # Date formatters, string utils
└── tests/
    ├── unit/
    │   ├── stores/
    │   └── utils/
    └── integration/
        └── api/
```

---

## 2. Naming Conventions

### 2.1 Files

| Type | Convention | Example |
|------|-----------|---------|
| Vue components | `PascalCase.vue` | `KanbanBoard.vue` |
| API routes | Nuxt convention: `[param].[method].ts` | `[id].put.ts` |
| Stores | `camelCase.ts` with `use` prefix | `useTaskStore` → `taskStore.ts` |
| Utils | `camelCase.ts` | `formatters.ts` |
| Types | `kebab-case.ts` | `api-types.ts` |
| Prisma schema | `schema.prisma` (fixed) | — |

### 2.2 Code

| Element | Convention | Example |
|---------|-----------|---------|
| Components | PascalCase | `<TaskCard />` |
| Composables | `use` prefix | `useAuth()` |
| Pinia stores | `use` prefix + `Store` suffix | `useTaskStore` |
| Handlers | `defineEventHandler` (Nuxt standard) | `defineEventHandler(async (event) => ...)` |
| Variables | camelCase | `taskList`, `subtaskCount` |
| Constants | UPPER_SNAKE_CASE | `JWT_EXPIRATION = '24h'` |
| Types/interfaces | PascalCase | `TaskResponse`, `CreateTaskInput` |
| Prisma models | PascalCase (auto-generated) | `prisma.task`, `prisma.subtask` |
| Directory names | kebab-case | `server/api/tasks/` |

---

## 3. Coding Standards

### 3.1 TypeScript

- **Strict mode** enabled in `tsconfig.json`
- Prefer `interface` over `type` for object shapes
- Use `as const` for literal types
- Avoid `any` — use `unknown` and narrow with guards
- Leverage Prisma-generated types (`Prisma.TaskCreateInput`, `Task`)

### 3.2 Vue Components

- **Composition API** with `<script setup lang="ts">`
- Use `defineProps` and `defineEmits` with typed interfaces
- Avoid `this` — no Options API
- Component template order: `<template>` → `<script setup>` → `<style>`
- Scoped styles with Tailwind utilities; avoid `<style scoped>` unless necessary

### 3.3 API Routes

```typescript
// Template for all API route handlers
import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  publishedAt: z.string().datetime().optional(),
})

export default defineEventHandler(async (event) => {
  // 1. Only parse body for POST/PUT/PATCH
  const body = await readBody(event)
  
  // 2. Validate
  const data = schema.parse(body)
  
  // 3. Execute Prisma query
  const result = await prisma.task.create({ data })
  
  // 4. Return response
  return result
})
```

### 3.4 Error Handling

```typescript
// Consistent error response format
export default defineEventHandler(async (event) => {
  try {
    // handler logic
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: error.errors,
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
```

### 3.5 Pinia Stores

```typescript
// stores/taskStore.ts
export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  async function fetchTasks() {
    tasks.value = await $fetch('/api/tasks')
  }

  async function createTask(data: CreateTaskInput) {
    const task = await $fetch('/api/tasks', { method: 'POST', body: data })
    tasks.value.unshift(task)
  }

  return { tasks, fetchTasks, createTask }
})
```

---

## 4. Prisma Patterns

### 4.1 Shared Client

```typescript
// server/utils/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 4.2 Status Calculation

```typescript
// server/utils/status.ts
export async function calculateTaskStatus(taskId: string) {
  const [total, completed] = await Promise.all([
    prisma.subtask.count({ where: { taskId } }),
    prisma.subtask.count({ where: { taskId, completed: true } }),
  ])

  if (total === 0) return null
  if (completed === 0) return 'todo'
  if (completed === total) return 'done'
  return 'doing'
}
```

### 4.3 Cascade Delete

```prisma
model Subtask {
  task   Task   @relation(fields: [taskId], references: [id], onDelete: Cascade)
}
```

Prisma handles cascade deletion automatically at the database level.

---

## 5. Git Workflow

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `develop` | Integration branch |
| `feature/*` | New features (branch from `develop`) |
| `fix/*` | Bug fixes (branch from `develop`) |
| `release/*` | Release preparation |

### Commit Convention

```
feat: add task creation with drawer form
fix: correct status calculation when all subtasks are completed
refactor: extract shared Prisma client to server/utils
docs: add ADR for JWT authentication
style: adjust Kanban column spacing
chore: update Prisma to v5.20
```

### PR Checklist

- [ ] PR approved by at least 1 reviewer
- [ ] Typescript compiles without errors (`npx nuxi typecheck`)
- [ ] Lint passes (`npm run lint`)
- [ ] All new handlers have proper error handling (Zod + try/catch)
- [ ] Prisma schema changes are reviewed
- [ ] API routes follow the documented structure

---

## 6. Performance Guidelines

| Concern | Guideline |
|---------|-----------|
| **Prisma queries** | Use `select` to fetch only needed fields; avoid `include: { subtasks: true }` — prefer separate `count()` calls |
| **API responses** | Return minimal payload (no full task object if only status needed) |
| **Vue reactivity** | Avoid deeply nested reactive objects; use `shallowRef` for large lists |
| **Tailwind** | Use JIT mode (default in v4) — no unused CSS |
| **Images** | No images in this project; if needed, use Nuxt's `<NuxtImg>` with optimization |
| **Bundle** | Use dynamic imports for components not needed above-the-fold: `defineAsyncComponent` |
| **Database calls** | Minimize per-request queries; batch with `Promise.all()` when possible |

---

## 7. Testing Strategy

| Layer | Tool | Scope |
|-------|------|-------|
| **Unit (stores/utils)** | Vitest | Pinia stores actions, formatters, status calculation |
| **Integration (API routes)** | Vitest + `$fetch` mock | Each route handler with mocked Prisma |
| **Component (Vue)** | Vitest + VTU | Component rendering, props, events |
| **E2E** | Playwright (future) | Full user flow: login → create task → add subtasks → Kanban |

### Example Test

```typescript
// tests/unit/utils/status.test.ts
import { describe, it, expect } from 'vitest'

describe('calculateTaskStatus', () => {
  it('returns null when task has no subtasks', () => {
    expect(calculateTaskStatus(0, 0)).toBeNull()
  })

  it('returns "todo" when no subtasks are completed', () => {
    expect(calculateTaskStatus(3, 0)).toBe('todo')
  })

  it('returns "doing" when some subtasks are completed', () => {
    expect(calculateTaskStatus(3, 1)).toBe('doing')
    expect(calculateTaskStatus(3, 2)).toBe('doing')
  })

  it('returns "done" when all subtasks are completed', () => {
    expect(calculateTaskStatus(3, 3)).toBe('done')
  })
})
```

# Architecture Decision Records (ADRs)

---

## ADR-001: Prisma Queries Directly in API Routes

### Status
**Accepted**

### Context
The Product Owner specified that Prisma queries should be executed directly in the Nuxt API Routes, without intermediate layers (controller, service, repository).

### Decision
Each API route handler in `server/api/` will:
1. Read the request body with `readBody(event)`
2. Validate with Zod
3. Execute Prisma queries directly
4. Return the response

No service, repository, or controller layers will be created.

### Consequences
- **Positive:** Reduced boilerplate (1 file per endpoint instead of 5)
- **Positive:** Faster development velocity
- **Positive:** Lower learning curve for new developers
- **Negative:** Logic reuse between routes requires utility functions or composition
- **Negative:** Testing requires mocking Prisma at the integration level rather than unit level
- **Mitigation:** Shared Prisma client instance via `server/utils/prisma.ts` to avoid connection leaks

---

## ADR-002: Neon (PostgreSQL Serverless) as Database

### Status
**Accepted**

### Context
The Product Owner specified Neon as the database. The system is a task management application with small data volume (single user context).

### Decision
Use Neon PostgreSQL with serverless connection pooling via `@neondatabase/serverless` and `@prisma/adapter-neon`.

### Consequences
- **Positive:** No database server management (auto-scaling, backups)
- **Positive:** Free tier sufficient for expected usage
- **Positive:** Branching enables preview deploys with isolated databases
- **Negative:** Cold start latency (~500ms on first query after idle)
- **Negative:** Connection pooling adds slight overhead
- **Mitigation:** Use Prisma's DataProxy or keep a warm connection via Neon's pooler

---

## ADR-003: JWT-Based Authentication (stateless)

### Status
**Accepted**

### Context
The system requires login with credentials stored in `.env`. No multi-user registration, no OAuth, no roles.

### Decision
Implement stateless JWT authentication:
1. `POST /api/auth/login` validates credentials against `process.env`
2. Returns signed JWT with 24h expiration
3. Middleware `server/middleware/auth.ts` verifies JWT on protected routes
4. Client stores token in `localStorage` and sends as `Authorization: Bearer <token>`

### Consequences
- **Positive:** No session storage needed (database or Redis)
- **Positive:** Simple implementation — single route, single middleware
- **Positive:** Token can be inspected client-side for expiration
- **Negative:** Token revocation not possible (short-lived tokens mitigate this)
- **Negative:** Credentials stored in `.env` require manual rotation
- **Mitigation:** Token expiration of 24h + `JWT_SECRET` rotation in env

---

## ADR-004: Task Status Calculated at Runtime (not persisted)

### Status
**Accepted**

### Context
Task status (todo/doing/done) depends on its subtasks' completion state. The PO requires real-time recalculation when any subtask changes.

### Decision
Status will be **calculated at query time** rather than persisted as a column:
```
status = 
  - no subtasks → null (no classification)
  - 0 completed → "todo"
  - some completed → "doing"
  - all completed → "done"
```

The calculation logic lives in a shared utility `server/utils/status.ts` and is called:
1. In the `GET /api/tasks` handler (to populate status for Kanban)
2. In the `PATCH /api/subtasks/[id]` handler (to return updated status)

### Consequences
- **Positive:** No data inconsistency (status is always derived from actual data)
- **Positive:** No need to update task table when subtask changes
- **Negative:** Slightly more complex query (requires `include: { subtasks: true }` or a count subquery)
- **Negative:** Cannot sort/filter by status at database level efficiently
- **Mitigation:** Use Prisma `count()` on subtasks with `where: { taskId, completed: true }` — single query, no JOIN needed

---

## ADR-005: Drawer Component Instead of Modal for Task Form

### Status
**Accepted**

### Context
The UX designer specified a drawer (slides from right) for creating/editing tasks instead of a traditional modal.

### Decision
Implement a `TaskDrawer.vue` component that:
- Slides from right-to-left with 300ms CSS transition
- Has a dark backdrop (`bg-black/40`)
- Contains inline form for task title, date, and embedded subtask list
- Emits events on save/cancel
- Uses Vue 3 `<Transition>` for enter/leave animations

### Consequences
- **Positive:** User doesn't lose context of the Kanban view behind the drawer
- **Positive:** More space for form content compared to a modal
- **Positive:** Modern UX pattern that feels more integrated
- **Negative:** More complex responsive behavior (full-width on mobile)
- **Negative:** Requires state management for open/close + form state
- **Mitigation:** Use Pinia `useTaskDrawerStore()` for drawer visibility and edit context

---

## ADR-006: Single Shared Prisma Client Instance

### Status
**Accepted**

### Context
Each API route originally instantiates `new PrismaClient()`. In serverless environments, this causes connection leaks and cold starts.

### Decision
Create a single shared Prisma client instance in `server/utils/prisma.ts`:

```typescript
// server/utils/prisma.ts
import { PrismaClient } from '@prisma/client'
import { neonConfig } from '@neondatabase/serverless'

// Global singleton pattern for serverless
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: neonConfig })
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Consequences
- **Positive:** Prevents connection pool exhaustion in serverless
- **Positive:** Consistent instance across all routes
- **Positive:** Follows Prisma's recommended practice for serverless
- **Negative:** Global singleton in development can cause issues if schema changes (fixed with `prisma generate --force`)
- **Mitigation:** Restart dev server after schema changes

---

## ADR-007: File-Based Routing with Nuxt Convention

### Status
**Accepted**

### Context
Nuxt 4 uses file-based routing for both pages and API routes. The backend is organized under `server/api/`.

### Decision
Follow Nuxt 4 conventions strictly:

| Pattern | Example | Route |
|---------|---------|-------|
| `index.get.ts` | `server/api/tasks/index.get.ts` | `GET /api/tasks` |
| `index.post.ts` | `server/api/tasks/index.post.ts` | `POST /api/tasks` |
| `[id].put.ts` | `server/api/tasks/[id].put.ts` | `PUT /api/tasks/:id` |
| `[id].delete.ts` | `server/api/tasks/[id].delete.ts` | `DELETE /api/tasks/:id` |
| `[id].patch.ts` | `server/api/subtasks/[id].patch.ts` | `PATCH /api/subtasks/:id` |

### Consequences
- **Positive:** Zero configuration routing — file path = URL path
- **Positive:** Nuxt handles method-based routing (same file, different methods)
- **Positive:** Consistent with Nuxt ecosystem conventions
- **Negative:** File names encode both route params and HTTP methods (can be verbose)
- **Mitigation:** Use clear directory grouping (auth/, tasks/, subtasks/) to keep structure organized

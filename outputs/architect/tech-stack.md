# Tech Stack - Task Management System

## 1. Technology Overview

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Nuxt | 4.x | Full-stack framework (SSR/SPA/hybrid) |
| **UI Library** | Vue | 3.x | Reactive component library |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework |
| **State Management** | Pinia | 2.x | Reactive store for global state |
| **Database ORM** | Prisma | 5.x | Type-safe database client |
| **Database** | Neon (PostgreSQL) | 16.x | Serverless PostgreSQL |
| **Validation** | Zod | 3.x | Runtime schema validation |
| **Auth** | JWT (jsonwebtoken) | 9.x | Stateless authentication tokens |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **Runtime** | Node.js | 20.x LTS | JavaScript runtime |
| **Package Manager** | npm / pnpm | latest | Dependency management |

---

## 2. Technology Justification

### 2.1 Nuxt 4

| Criteria | Assessment |
|----------|-----------|
| **Alignment** | The project heavily relies on Nuxt's file-based routing. API Routes live in `server/api/`, pages in `pages/` — both Nuxt conventions |
| **Performance** | Nuxt 4 provides hybrid rendering (SSR + static + SPA per page). Login page can be SPA, dashboard can be SSR for SEO if needed |
| **Developer Experience** | Auto-imports, HMR, Nitro engine for API routes — reduces boilerplate significantly |
| **Ecosystem** | First-class Prisma integration via `nuxt-prisma` module or manual setup, Pinia module available |
| **Decision** | ✅ **Selected** — aligns perfectly with the "API Routes with Prisma" architectural decision |

### 2.2 Tailwind CSS

| Criteria | Assessment |
|----------|-----------|
| **Alignment** | Required by Product Owner for "beautiful, elegant, professional" UI |
| **Speed** | Utility classes enable rapid prototyping without writing custom CSS |
| **Consistency** | Design tokens (colors, spacing, typography) are enforced via config |
| **Bundle Size** | JIT compiler in v4 produces minimal CSS (only used utilities) |
| **Decision** | ✅ **Selected** — mandatory requirement, best choice for rapid UI development |

### 2.3 Pinia

| Criteria | Assessment |
|----------|-----------|
| **Alignment** | Required by Product Owner, native Nuxt module (`@pinia/nuxt`) |
| **Simplicity** | Minimal boilerplate vs Vuex, full TypeScript support |
| **DevTools** | Vue DevTools integration for debugging stores |
| **Decision** | ✅ **Selected** — mandatory requirement, best Vue state management |

### 2.4 Prisma ORM

| Criteria | Assessment |
|----------|-----------|
| **Alignment** | Required by Product Owner, direct queries in API routes |
| **Type Safety** | Generated types from schema — `Prisma.TaskCreateInput` ensures compile-time safety |
| **Serverless** | Works with Neon via connection pooling (`@prisma/adapter-neon`) |
| **Performance** | Batched queries, lazy loading, efficient `count()` for status calculation |
| **Decision** | ✅ **Selected** — mandatory requirement, excellent Neon compatibility |

### 2.5 Neon (PostgreSQL)

| Criteria | Assessment |
|----------|-----------|
| **Alignment** | Required by Product Owner, serverless PostgreSQL |
| **Scalability** | Auto-scaling, connection pooling, branching for preview deploys |
| **Cost** | Generous free tier (0.5 GB storage, 100h compute/month) |
| **Performance** | Cold start ~500ms, warm queries sub-10ms |
| **Decision** | ✅ **Selected** — mandatory requirement, ideal for serverless Nuxt |

### 2.6 Zod

| Criteria | Assessment |
|----------|-----------|
| **Alignment** | Inline validation in API routes as per architecture |
| **Bundle Size** | Tree-shakeable, ~8KB gzipped |
| **DX** | Type inference with `z.infer<typeof schema>` — single source of truth |
| **Decision** | ✅ **Selected** — perfect for schema validation in route handlers |

### 2.7 JWT (jsonwebtoken)

| Criteria | Assessment |
|----------|-----------|
| **Alignment** | Stateless auth for API routes, no session DB needed |
| **Alternatives** | Nuxt Auth module (overkill for simple credential check) |
| **Implementation** | Single `POST /api/auth/login` route validates against `.env`, returns JWT |
| **Decision** | ✅ **Selected** — lightweight, sufficient for single-user credential auth |

---

## 3. Dependencies Summary

### Production Dependencies

```json
{
  "dependencies": {
    "nuxt": "^4.0.0",
    "vue": "^3.5.0",
    "pinia": "^2.2.0",
    "@pinia/nuxt": "^0.8.0",
    "@prisma/client": "^5.20.0",
    "@prisma/adapter-neon": "^5.20.0",
    "zod": "^3.23.0",
    "jsonwebtoken": "^9.0.0",
    "@neondatabase/serverless": "^0.10.0"
  }
}
```

### Dev Dependencies

```json
{
  "devDependencies": {
    "prisma": "^5.20.0",
    "typescript": "^5.6.0",
    "tailwindcss": "^4.0.0",
    "@types/jsonwebtoken": "^9.0.0",
    "vitest": "^2.0.0",
    "@vue/test-utils": "^2.4.0"
  }
}
```

---

## 4. Version Compatibility Matrix

| Package | Nuxt 4 | Vue 3.5 | Node 20 |
|---------|:------:|:-------:|:-------:|
| Prisma 5 | ✅ | ✅ | ✅ |
| Pinia 2 | ✅ | ✅ | ✅ |
| Tailwind 4 | ✅ | ✅ | ✅ |
| Zod 3 | ✅ | ✅ | ✅ |
| jsonwebtoken 9 | ✅ | ✅ | ✅ |

---

## 5. Alternatives Considered

| Technology | Considered | Rejected Because |
|------------|------------|------------------|
| **tRPC** | API type safety | Overkill for simple CRUD + 1 auth route; Nuxt API Routes + Prisma types sufficient |
| **Supabase** | Database + Auth | Not required; PO specified Neon + manual auth with .env credentials |
| **Drizzle ORM** | Alternative to Prisma | Prisma was already specified by PO; better DX with generated client |
| **H3** | API framework | Already included in Nuxt via Nitro — no separate install needed |
| **Nuxt Auth Module** | Auth handling | Too opinionated for single-credential auth; manual JWT is simpler |

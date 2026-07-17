# Backlog Priorizado - Sistema de Gerenciamento de Tarefas

## Matriz de Priorização

| ID | Feature | Valor Negócio | Esforço | Dependências | Risco | Prioridade |
|----|---------|:------------:|:-------:|:------------:|:----:|:----------:|
| F1 | Autenticação | Alto | Médio | Nenhuma | Médio | P0 - Crítico |
| F2 | CRUD de Tarefas | Alto | Médio | F1 | Baixo | P0 - Crítico |
| F3 | CRUD de Subtarefas | Alto | Médio | F2 | Baixo | P0 - Crítico |
| F4 | Conclusão de Subtarefas | Alto | Baixo | F3 | Baixo | P0 - Crítico |
| F5 | Status Automático | Alto | Médio | F3, F4 | Médio | P0 - Crítico |
| F6 | Visão Kanban | Alto | Alto | F2, F5 | Médio | P1 - Importante |
| F7 | Drawer Formulário | Médio | Médio | F2 | Baixo | P1 - Importante |

## Sprint 1 — Fundação (P0)

### Objetivo
Estabelecer a base do sistema com autenticação e CRUDs completos.

| Ordem | Feature | US Relacionadas | Story Points |
|:-----:|---------|:---------------:|:------------:|
| 1 | F1 — Autenticação | US-01 | 2 |
| 2 | F2 — CRUD de Tarefas | US-02, US-03, US-04, US-05 | 8 |
| 3 | F3 — CRUD de Subtarefas | US-06, US-07 | 5 |
| 4 | F4 — Conclusão de Subtarefas | US-08 | 2 |
| 5 | F5 — Status Automático | US-09 | 3 |

**Total Sprint 1:** 20 story points

### Análise de Dependências
- F1 (Autenticação) não depende de nenhuma outra feature — deve ser implementada primeiro
- F2 (CRUD Tarefas) depende de F1 — implementar logo após autenticação
- F3 (CRUD Subtarefas) depende de F2 — subtarefas precisam de tarefas existentes
- F4 (Conclusão) depende de F3 — precisa de subtarefas para marcar/desmarcar
- F5 (Status) depende de F3 e F4 — o cálculo usa o estado das subtarefas

### Análise de Riscos
| Feature | Risco | Mitigação |
|---------|:-----:|-----------|
| F1 | Médio | Configuração do Neon + Prisma podem ter issues iniciais; usar variáveis .env com fallback |
| F5 | Médio | Lógica de cálculo de status precisa estar correta para todos os cenários; criar testes unitários |

---

## Sprint 2 — Experiência Visual (P1)

### Objetivo
Aprimorar a experiência do usuário com interface Kanban e formulário em drawer.

| Ordem | Feature | US Relacionadas | Story Points |
|:-----:|---------|:---------------:|:------------:|
| 6 | F6 — Visão Kanban | US-10 | 6 |
| 7 | F7 — Drawer Formulário | US-11 | 3 |

**Total Sprint 2:** 9 story points

### Análise de Dependências
- F6 (Kanban) depende de F2 (tarefas existirem) e F5 (status calculado)
- F7 (Drawer) depende de F2 (formulário de criar/editar tarefa)

### Análise de Riscos
| Feature | Risco | Mitigação |
|---------|:-----:|-----------|
| F6 | Médio | Componente Kanban pode ser complexo em mobile; validar responsividade cedo |
| F7 | Baixo | Drawer é um padrão conhecido; implementar com transições CSS |

---

## Total Geral

| Sprint | Features | Story Points |
|:------:|:--------:|:------------:|
| Sprint 1 — Fundação | F1, F2, F3, F4, F5 | 20 |
| Sprint 2 — Experiência | F6, F7 | 9 |
| **Total** | **7 features** | **29** |

---

## Organização do Backend (API Routes com Prisma Direto)

As queries Prisma são executadas diretamente nas rotas da API Routes do Nuxt, sem camadas intermediárias. Cada arquivo em `./server/api/` lida com a requisição, valida os dados e executa o Prisma:

```
server/
└── api/
    ├── auth/
    │   └── login.post.ts          # Valida credenciais + consulta Prisma direto
    ├── tasks/
    │   ├── index.get.ts           # Listar tarefas
    │   ├── index.post.ts          # Criar tarefa
    │   └── [id].delete.ts         # Excluir tarefa
    ├── subtasks/
    │   ├── index.get.ts           # Listar subtarefas
    │   ├── index.post.ts          # Criar subtarefa
    │   └── [id].patch.ts          # Marcar/desmarcar concluída
    └── tasks-subtasks/
        └── [taskId].get.ts        # Subtarefas por tarefa
```

### Estrutura de Cada Rota

Cada arquivo de rota segue este padrão:

```typescript
// server/api/tasks/index.post.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // validação inline com Zod
  const schema = z.object({
    title: z.string().min(1).max(200),
    publishedAt: z.string().datetime().optional(),
  })
  const data = schema.parse(body)

  // query Prisma direto na rota
  const task = await prisma.task.create({ data })
  return task
})
```

### Validação com Schemas

- Usar **Zod** para validar o body da requisição dentro do próprio handler
- Schemas podem ficar em um arquivo compartilhado `./server/utils/schemas.ts` ou inline na rota
- Tipos TypeScript podem ser inferidos diretamente do Prisma (`Prisma.TaskCreateInput`)

### Story Points Ajustados

A eliminação das camadas reduz a complexidade e o esforço estimado:

| Feature | Antes (story points) | Agora (story points) |
|---------|:--------------------:|:--------------------:|
| F1 | 3 | 2 |
| F2 | 13 | 8 |
| F3 | 7 | 5 |
| F4 | 3 | 2 |
| F5 | 5 | 3 |
| F6 | 8 | 6 |
| F7 | 5 | 3 |
| **Total** | **44** | **29** |

### Impacto nos Riscos

| Risco | Antes | Agora |
|-------|-------|-------|
| Complexidade de manutenção | Médio (5 arquivos por módulo) | Baixo (1 arquivo por rota) |
| Acoplamento | Controller → Service → Repository | Zero (rota autônoma) |
| Testabilidade | Alta (camadas separadas) | Média (lógica inline) |
| Curva de aprendizado | Média | Baixa |

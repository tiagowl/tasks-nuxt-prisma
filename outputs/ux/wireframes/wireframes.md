# Wireframes - Sistema de Gerenciamento de Tarefas

## W-01: Tela de Login

```
┌─────────────────────────────────────────────┐
│                                             │
│              ┌─────────────────┐            │
│              │     LOGO        │            │
│              └─────────────────┘            │
│                                             │
│         ┌─────────────────────────┐         │
│         │  E-mail ou usuário      │         │
│         ├─────────────────────────┤         │
│         │  [____________________] │         │
│         │                         │         │
│         │  Senha                  │         │
│         │  [____________________] │         │
│         │                         │         │
│         │  ┌───────────────────┐  │         │
│         │  │   Entrar          │  │         │
│         │  └───────────────────┘  │         │
│         └─────────────────────────┘         │
│                                             │
│              ┌──────────────┐               │
│              │  Lembrar-me  │               │
│              └──────────────┘               │
│                                             │
└─────────────────────────────────────────────┘
```

**Estados:**
- Padrão: campos vazios, botão desabilitado
- Preenchido: botão habilitado
- Erro: mensagem "Credenciais inválidas" em vermelho acima do botão
- Carregando: spinner no botão durante requisição

---

## W-02: Dashboard / Kanban View (Tela Principal)

```
┌──────────────────────────────────────────────────┐
│  ◐ TaskFlow          ← Buscar tarefa...  ┤  👤  │
├──────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────┐ │
│  │  A FAZER     │ │  FAZENDO     │ │ FEITO    │ │
│  │  (todo)      │ │  (doing)     │ │ (done)   │ │
│  ├──────────────┤ ├──────────────┤ ├──────────┤ │
│  │              │ │              │ │          │ │
│  │ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────┐ │ │
│  │ │Implementa│ │ │ │Revisão   │ │ │ │Tarefa │ │ │
│  │ │r API     │ │ │ │código    │ │ │ │X      │ │ │
│  │ │12/07     │ │ │ │15/07     │ │ │ │10/07  │ │ │
│  │ └──────────┘ │ │ └──────────┘ │ │ └──────┘ │ │
│  │              │ │              │ │          │ │
│  │ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────┐ │ │
│  │ │Criar     │ │ │ │Testes    │ │ │ │Tarefa │ │ │
│  │ │layout    │ │ │ │unitários │ │ │ │Y      │ │ │
│  │ │18/07     │ │ │ │18/07     │ │ │ │08/07  │ │ │
│  │ └──────────┘ │ │ └──────────┘ │ │ └──────┘ │ │
│  │              │ │              │ │          │ │
│  └──────────────┘ └──────────────┘ └──────────┘ │
│                                                  │
│            [+ Nova Tarefa]                       │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Componentes:**
- Header: logo, busca global, avatar do usuário
- Kanban: 3 colunas com scroll horizontal se necessário
- Cada card: título, data, badge de prioridade
- Botão flutuante "Nova Tarefa" no canto inferior direito

---

## W-03: Drawer de Criar/Editar Tarefa

```
              ┌────────────────────────────────┐
              │  Nova Tarefa              ✕    │
              ├────────────────────────────────┤
              │                                │
              │  Título                        │
              │  ┌──────────────────────────┐  │
              │  │  Ex: Implementar login   │  │
              │  └──────────────────────────┘  │
              │                                │
              │  Data de Publicação            │
              │  ┌──────────────────────────┐  │
              │  │  17/07/2026          📅  │  │
              │  └──────────────────────────┘  │
              │                                │
              │  ┌──────────────────────────┐  │
              │  │  Subtarefas (opcional)   │  │
              │  ├──────────────────────────┤  │
              │  │  ☐ Definir endpoint     ✕ │  │
              │  │  ☐ Criar componente     ✕ │  │
              │  │  ┌──────────────────┐    │  │
              │  │  │ + Adicionar item │    │  │
              │  │  └──────────────────┘    │  │
              │  └──────────────────────────┘  │
              │                                │
              │  ┌──────────┐  ┌──────────┐   │
              │  │ Cancelar │  │   Salvar  │   │
              │  └──────────┘  └──────────┘   │
              └────────────────────────────────┘
```

**Anatomia:**
- Header: título "Nova Tarefa" / "Editar Tarefa" + botão fechar (✕)
- Formulário: título (input), data (date picker)
- Seção de subtarefas expansível inline
- Footer: actions (Cancelar + Salvar)
- Backdrop escuro atrás

---

## W-04: Lista de Subtarefas (Expandida)

```
┌──────────────────────────────────────────┐
│  Tarefa: Implementar sistema de login    │
├──────────────────────────────────────────┤
│  Data: 17/07/2026     Status: Doing      │
├──────────────────────────────────────────┤
│                                          │
│  Subtarefas (3/5 concluídas)             │
│                                          │
│  ☑ Definir schema do banco          🕐   │
│  ☑ Criar endpoint POST /auth/login  🕐   │
│  ☐ Criar página de login            ⬜   │
│  ☐ Implementar validação JWT        ⬜   │
│  ☐ Testar fluxo completo            ⬜   │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │  + Adicionar subtarefa...        │    │
│  └──────────────────────────────────┘    │
│                                          │
│  [✕ Excluir tarefa]   [✎ Editar]        │
│                                          │
└──────────────────────────────────────────┘
```

---

## W-05: Estado Vazio (Sem Tarefas)

```
┌──────────────────────────────────────────┐
│  ◐ TaskFlow                    ┤  👤     │
├──────────────────────────────────────────┤
│                                          │
│                                          │
│              📋                          │
│                                          │
│       Nenhuma tarefa encontrada          │
│                                          │
│    Crie sua primeira tarefa para         │
│    começar a organizar seu dia.          │
│                                          │
│       ┌─────────────────────┐            │
│       │  + Criar Tarefa     │            │
│       └─────────────────────┘            │
│                                          │
└──────────────────────────────────────────┘
```

---

## W-06: Mobile - Kanban (Tabs)

```
┌──────────────────┐
│  ◐ TaskFlow   ≡  │
├──────────────────┤
│                  │
│ [A Fazer] [Fazendo] [Feito]   ← Tabs
│                  │
│  ┌────────────┐ │
│  │ Implementar│ │
│  │ API        │ │
│  │ 12/07      │ │
│  └────────────┘ │
│                  │
│  ┌────────────┐ │
│  │ Criar      │ │
│  │ layout     │ │
│  │ 18/07      │ │
│  └────────────┘ │
│                  │
│            [+]   │
└──────────────────┘
```

---

## Árvore de Navegação

```
Login
 └── Dashboard (Kanban) ─── Drawer Criar Tarefa
      ├── Coluna "A Fazer"      └── Salvar → volta ao Kanban
      ├── Coluna "Fazendo"
      └── Coluna "Feito"
           └── Clique no card → Drawer Detalhes da Tarefa
                ├── Seção Subtarefas
                └── Botões Editar / Excluir / Voltar
```

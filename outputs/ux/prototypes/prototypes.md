# Protótipos Interativos - Especificação de Fluxos e Estados

## 1. Fluxo de Autenticação

### Diagrama de Fluxo

```
[Tela de Login] ──(credenciais válidas)──> [Dashboard Kanban]
       │
       └──(credenciais inválidas)──> [Mensagem de erro + Mantém na tela]
       │
       └──(token expirado)──> [Redireciona para Login + Toast "Sessão expirada"]
```

### Estados da Tela de Login

| Estado | Descrição | Elementos Visíveis |
|--------|-----------|-------------------|
| **Inicial** | Campos vazios, botão desabilitado | Logo, inputs vazios, checkbox "Lembrar-me", botão desabilitado (opacity 50%) |
| **Preenchimento** | Usuário digita | Placeholder sobe (floating label), botão fica habilitado se ambos campos preenchidos |
| **Submissão** | Requisição em andamento | Botão mostra spinner, inputs disabled, "Verificando credenciais..." |
| **Erro** | Credenciais inválidas | Input de senha com borda vermelha, mensagem "Credenciais inválidas" com ícone ⚠, shake animation nos campos |
| **Sucesso** | Login válido | Transição fade-out da tela de login, fade-in do dashboard |

### Toast de Sessão Expirada
- Aparece no topo direito
- Ícone de relógio
- Texto: "Sua sessão expirou. Faça login novamente."
- Auto-dismiss em 5s

---

## 2. Fluxo de Criação de Tarefa

### Diagrama de Fluxo

```
[Dashboard] ──(clica "+ Nova Tarefa")──> [Drawer abre da direita]
       │                                         │
       │                                    Preenche formulário
       │                                         │
       │                                    [Salvar]
       │                                         │
       │                              ┌──────────┴──────────┐
       │                              │                     │
       │                         [Sucesso]              [Erro validação]
       │                              │                     │
       │                              ▼                     ▼
       │                         Drawer fecha       Campos com erro
       │                         Card aparece no    Mensagem no toast
       │                         Kanban (A Fazer)
       │
       └──(clica backdrop)──> [Confirma descarte?] ──(Sim)──> [Drawer fecha sem salvar]
                                                          └──(Não)──> [Drawer permanece]
```

### Transição do Drawer

```
Estado inicial:   [Conteúdo da página] |← drawer translateX(100%) ←|
Abrindo:          [Conteúdo da página] |← drawer translateX(0)    ←|  (300ms ease-in-out)
Aberto:           [Conteúdo escurecido] |← formulário visível     ←|
Fechando:         [Conteúdo escurecido] |← drawer translateX(100%) ←|  (300ms)
Fechado:          [Conteúdo normal]                                   |
```

### Estados do Formulário

| Estado | Ação | Feedback |
|--------|------|----------|
| **Campos válidos** | Todos preenchidos corretamente | Botão "Salvar" habilitado, bordas neutras |
| **Campo inválido** | Título vazio ao salvar | Input com borda vermelha, mensagem "Título é obrigatório" abaixo do campo |
| **Submissão** | Clicou Salvar | Botão desabilitado com spinner, campos read-only |
| **Sucesso** | Tarefa criada | Drawer fecha, toast verde "Tarefa criada com sucesso!", card aparece no Kanban |
| **Erro servidor** | Falha na API | Toast vermelho "Erro ao criar tarefa. Tente novamente." |

---

## 3. Fluxo de Subtarefas

### Marcar/Desmarcar Subtarefa como Concluída

```
[Subtarefa não concluída] ──(clica checkbox)──> [Spinner no checkbox]
       │                                                  │
       │                                                  ▼
       │                                     [Requisição PATCH /subtasks/:id]
       │                                                  │
       │                                    ┌─────────────┴─────────────┐
       │                                    │                           │
       │                               [Sucesso]                  [Erro]
       │                                    │                           │
       │                                    ▼                           ▼
       │                              Checkbox preenchido        Checkbox volta ao estado
       │                              Tarefa pai recalculada     Toast "Erro ao atualizar"
       │                              Card pode mudar de coluna
       │
       └───────────────────────────────────────────────────────────────────
                              (mesmo fluxo reverso para desmarcar)
```

### Animação do Checkbox

- **Marcar:** checkbox scale de 0 → 1 com cor success, checkmark aparece com stroke-dashoffset animation (150ms)
- **Desmarcar:** checkbox fade de 1 → 0, volta ao neutro (150ms)

### Reação em Cadeia (Status da Tarefa Pai)

```
Marcar subtarefa → recalcula status da tarefa pai:

  Nenhuma concluída → [todo]    Badge cinza
  Algumas concluídas → [doing]  Badge amarelo + ícone de meia-lua
  Todas concluídas → [done]     Badge verde + ícone de check + strike-through no título
```

### Se esse card estiver no Kanban:
- Se status muda de "todo" → "doing": card se move visualmente da coluna 1 para coluna 2 (com animação de saída/entrada)
- Se status muda de "doing" → "done": card se move da coluna 2 para coluna 3

---

## 4. Fluxo de Edição e Exclusão

### Editar Tarefa

```
[Card no Kanban] ──(clica no card)──> [Drawer de detalhes]
       │                                         │
       │                                    [✎ Editar]
       │                                         │
       │                              Drawer se transforma em modo edição
       │                              (animação de campos preenchidos)
       │                                         │
       │                              [Salvar alterações]
       │                                         │
       │                              ┌──────────┴──────────┐
       │                              │                     │
       │                         [Sucesso]              [Erro]
       │                              │                     │
       │                              ▼                     ▼
       │                         Drawer fecha        Toast de erro
       │                         Card atualizado
       │
       └──(clica "✕")──> [Fechar drawer] (sem confirmação se não houve alteração)
```

### Excluir Tarefa

```
[Drawer de detalhes] ──(clica "Excluir")──> [Modal de confirmação]
                                                     │
                                           ┌─────────┴─────────┐
                                           │                   │
                                      [Confirmar]         [Cancelar]
                                           │                   │
                                           ▼                   ▼
                                     Tarefa + subtarefas    Modal fecha
                                     deletadas              nada acontece
                                     Card some do Kanban
                                     Toast "Tarefa excluída"
```

---

## 5. Estado de Carregamento (Skeleton)

### Skeleton do Kanban (enquanto carrega dados)

```
┌──────────────────────────────────────────┐
│  ┌──────────────┐ ┌──────────────┐ ┌───┐ │
│  │ ████████     │ │ ████████     │ │██ │ │
│  ├──────────────┤ ├──────────────┤ ├───┤ │
│  │ ┌──────────┐ │ │ ┌──────────┐ │ │   │ │
│  │ │ ████     │ │ │ │ ████     │ │ │   │ │
│  │ │ ███      │ │ │ │ ████     │ │ │   │ │
│  │ └──────────┘ │ │ └──────────┘ │ │   │ │
│  │              │ │              │ │   │ │
│  │ ┌──────────┐ │ │ ┌──────────┐ │ │   │ │
│  │ │ ████     │ │ │ │ ████     │ │ │   │ │
│  │ │ ███      │ │ │ │ ███      │ │ │   │ │
│  │ └──────────┘ │ │ └──────────┘ │ │   │ │
│  └──────────────┘ └──────────────┘ └───┘ │
└──────────────────────────────────────────┘
```

- Gradiente animado (shimmer): fundo cinza claro → cinza médio → cinza claro
- 3 colunas skeleton com 2-3 cards falsos cada
- Anima até o dado carregar

---

## 6. Micro-Interações

| Ação | Micro-Interação |
|------|----------------|
| Hover em card Kanban | Card levanta (translateY(-2px)) + sombra aumenta (shadow-md → shadow-lg) |
| Clique em botão | Scale 0.97 no clique, volta para 1 no release |
| Marcar subtarefa | Checkbox com bounce + linha no texto |
| Drawer abrindo | Backdrop fade 0→0.4 (200ms), drawer slide right-to-left (300ms) |
| Toast aparecendo | Slide down do topo (200ms ease-out) |
| Toast saindo | Slide up + fade out (300ms ease-in) |
| Erro em campo | Input shake horizontal (300ms, 3 oscilações) |

---

## 7. Responsividade - Adaptações por Breakpoint

| Componente | Desktop (≥1024px) | Tablet (768-1023px) | Mobile (<768px) |
|------------|------------------|---------------------|-----------------|
| **Kanban** | 3 colunas lado a lado | 3 colunas com scroll horizontal | Abas horizontais (1 coluna por vez) |
| **Drawer** | max-w-md (480px) | max-w-md (480px) | 100% largura, 100% altura |
| **Header** | Logo + busca + avatar | Logo + busca + avatar | Logo + ícone de busca + hamburger |
| **Navegação** | Sidebar (se houver) | Top nav | Bottom nav |
| **Modal de confirmação** | Centralizado, max-w-sm | Centralizado, max-w-sm | Bottom sheet |

---

## 8. Diagrama de Telas (Sitemap)

```
┌──────────────┐
│   Tela de    │
│    Login     │
└──────┬───────┘
       │ (autenticado)
       ▼
┌──────────────────────────────────────┐
│          Dashboard / Kanban          │
├──────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐│
│ │A Fazer  │ │Fazendo  │ │ Feito   ││
│ │ (todo)  │ │ (doing) │ │ (done)  ││
│ └─────────┘ └─────────┘ └─────────┘│
└────────┬────────────────────────────┘
         │
         ├──(clica "+")──> ┌─────────────────┐
         │                 │ Drawer Nova     │
         │                 │ Tarefa          │
         │                 └─────────────────┘
         │
         └──(clica card)──> ┌─────────────────────┐
                            │ Drawer Detalhes da  │
                            │ Tarefa + Subtarefas │
                            └─────────────────────┘
```

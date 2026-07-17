# User Stories - Sistema de Gerenciamento de Tarefas

## US-01: Autenticação

> **Como** usuário do sistema
> **Eu quero** fazer login com minhas credenciais
> **Para que** eu possa acessar minhas tarefas de forma segura

### Story Points: 2
### Prioridade: Alta

---

## US-02: Criar Tarefa

> **Como** usuário logado
> **Eu quero** criar uma nova tarefa informando título e data de publicação
> **Para que** eu possa registrar minhas atividades pendentes

### Story Points: 3
### Prioridade: Alta

---

## US-03: Listar Tarefas

> **Como** usuário logado
> **Eu quero** visualizar a lista de todas as minhas tarefas
> **Para que** eu tenha uma visão geral do que precisa ser feito

### Story Points: 2
### Prioridade: Alta

---

## US-04: Editar Tarefa

> **Como** usuário logado
> **Eu quero** editar o título e a data de publicação de uma tarefa existente
> **Para que** eu possa manter minhas informações atualizadas

### Story Points: 2
### Prioridade: Alta

---

## US-05: Excluir Tarefa

> **Como** usuário logado
> **Eu quero** excluir uma tarefa que não é mais necessária
> **Para que** eu mantenha meu gerenciamento organizado

### Story Points: 1
### Prioridade: Alta

---

## US-06: Criar Subtarefa

> **Como** usuário logado
> **Eu quero** adicionar subtarefas a uma tarefa existente
> **Para que** eu possa detalhar os passos necessários para concluir a tarefa principal

### Story Points: 3
### Prioridade: Alta

---

## US-07: Listar Subtarefas

> **Como** usuário logado
> **Eu quero** visualizar todas as subtarefas vinculadas a uma tarefa
> **Para que** eu entenda o detalhamento de cada atividade

### Story Points: 2
### Prioridade: Alta

---

## US-08: Marcar/Desmarcar Subtarefa como Concluída

> **Como** usuário logado
> **Eu quero** marcar ou desmarcar uma subtarefa como concluída
> **Para que** eu possa acompanhar meu progresso em tempo real

### Story Points: 2
### Prioridade: Alta

---

## US-09: Status Automático da Tarefa

> **Como** usuário logado
> **Eu quero** que o status da tarefa seja calculado automaticamente com base nas subtarefas
> **Para que** eu veja se a tarefa está "todo", "doing" ou "done" sem esforço manual

### Regras de Status:
- **todo**: tarefa possui subtarefas, mas nenhuma está concluída
- **doing**: tarefa possui subtarefas e algumas estão concluídas
- **done**: todas as subtarefas da tarefa estão concluídas

### Story Points: 3
### Prioridade: Alta

---

## US-10: Visão Kanban

> **Como** usuário logado
> **Eu quero** visualizar minhas tarefas em um quadro Kanban separadas por status
> **Para que** eu possa gerenciar meu fluxo de trabalho de forma visual e intuitiva

### Story Points: 6
### Prioridade: Alta

---

## US-11: Drawer para Formulário de Tarefa

> **Como** usuário logado
> **Eu quero** que o formulário de criar/editar tarefa apareça em um drawer vindo da direita para esquerda
> **Para que** eu não perca o contexto da tela atual enquanto preencho os dados

### Story Points: 3
### Prioridade: Média

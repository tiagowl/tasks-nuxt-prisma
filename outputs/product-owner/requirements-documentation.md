# Documentação de Requisitos - Sistema de Gerenciamento de Tarefas

## 1. Objetivos de Negócio

| Objetivo | Descrição | Indicador de Sucesso |
|----------|-----------|---------------------|
| Produtividade | Permitir que usuários organizem e acompanhem suas tarefas diárias | Usuário consegue criar e gerenciar tarefas em < 30s |
| Visibilidade | Oferecer visão clara do progresso das tarefas e subtarefas | Status refletem corretamente o progresso em tempo real |
| Organização Visual | Facilitar o gerenciamento visual através de quadro Kanban | Usuário consegue visualizar todas as tarefas por status em 1 tela |
| Controle de Acesso | Garantir que apenas usuários autorizados acessem o sistema | Login funcional bloqueia acesso não autenticado |

## 2. Usuários-Alvo

| Persona | Descrição | Necessidades Principais |
|---------|-----------|------------------------|
| Usuário Comum | Profissional que precisa gerenciar tarefas pessoais ou do trabalho | CRUD de tarefas, subtarefas, acompanhamento de progresso |
| Usuário Logado | Usuário autenticado no sistema | Acesso seguro às suas tarefas, sessão persistente |

## 3. Funcionalidades Principais

| ID | Funcionalidade | Descrição | Prioridade |
|----|---------------|-----------|------------|
| F1 | Autenticação | Login com credenciais configuradas no .env | Alta |
| F2 | CRUD de Tarefas | Criar, listar, editar e excluir tarefas com título e data de publicação | Alta |
| F3 | CRUD de Subtarefas | Criar, listar, editar e excluir subtarefas vinculadas a uma tarefa | Alta |
| F4 | Conclusão de Subtarefas | Marcar/desmarcar subtarefa como concluída | Alta |
| F5 | Status Automático de Tarefas | Cálculo automático do status (todo/doing/done) baseado nas subtarefas | Alta |
| F6 | Visão Kanban | Quadro Kanban separando tarefas por status | Alta |
| F7 | Drawer de Formulário | Drawer da direita para esquerda para criar/editar tarefas | Média |

## 4. Restrições e Limitações

| Tipo | Restrição |
|------|-----------|
| Frontend | Nuxt 4 com Tailwind CSS |
| Estado | Pinia para gerenciamento de estado |
| Backend | API Routes do Nuxt com Prisma ORM |
| Organização | Backend em `./server/api/` — cada rota da API Routes executa as queries Prisma diretamente, sem camadas intermediárias |
| Banco de Dados | Neon (PostgreSQL serverless) |
| Autenticação | Login com credenciais fixas no .env |
| UI/UX | Visual bonito, elegante e profissional com boas práticas de UX/UI |

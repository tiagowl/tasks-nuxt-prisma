# Pesquisa de Usuário - Sistema de Gerenciamento de Tarefas

## 1. Personas

### Persona 1 — Carlos Menezes (Profissional de TI)

| Atributo | Detalhe |
|----------|---------|
| **Idade** | 34 anos |
| **Ocupação** | Analista de Sistemas |
| **Perfil Tecnológico** | Avançado — usa ferramentas digitais diariamente |
| **Contexto** | Gerencia múltiplos projetos e tarefas simultaneamente |
| **Objetivo** | Organizar demandas do dia a dia com agilidade |

**Dores:**
- Perde tempo alternando entre planilhas e ferramentas complexas
- Dificuldade em visualizar o progresso geral das atividades
- Ferramentas existentes são muito pesadas ou muito simples

**Necessidades:**
- Criar tarefas rapidamente, sem burocracia
- Detalhar tarefas com subtarefas sem perder a visão geral
- Saber de forma instantânea o que está pendente, em andamento e concluído

**Citação:** *"Eu só quero uma ferramenta simples que me mostre claramente o que já fiz e o que ainda falta fazer."*

---

### Persona 2 — Juliana Almeida (Gestora de Projetos)

| Atributo | Detalhe |
|----------|---------|
| **Idade** | 41 anos |
| **Ocupação** | Gerente de Projetos |
| **Perfil Tecnológico** | Intermediário — usa ferramentas de produtividade |
| **Contexto** | Coordena equipes e precisa delegar e acompanhar entregas |
| **Objetivo** | Ter visão macro do andamento das tarefas da equipe |

**Dores:**
- Ferramentas complexas demais para o time adotar
- Falta de uma visão Kanban clara para reuniões diárias
- Dificuldade em comunicar status para stakeholders

**Necessidades:**
- Quadro Kanban intuitivo para reuniões de acompanhamento
- Status automático que dispare atualizações sem intervenção manual
- Interface limpa e profissional para apresentar em reuniões

**Citação:** *"Preciso de algo que minha equipe inteira consiga usar sem treinamento."*

---

### Persona 3 — Rafael Oliveira (Freelancer / Profissional Criativo)

| Atributo | Detalhe |
|----------|---------|
| **Idade** | 28 anos |
| **Ocupação** | Designer Freelancer |
| **Perfil Tecnológico** | Intermediário |
| **Contexto** | Gerencia projetos de clientes com prazos variados |
| **Objetivo** | Separar tarefas por projeto e evitar esquecimentos |

**Dores:**
- Mistura tarefas de diferentes clientes
- Esquece prazos e subtarefas importantes
- Ferramentas existentes são genéricas demais

**Necessidades:**
- Criação rápida de tarefas pelo celular (responsivo)
- Subtarefas para checklist de entregas
- Data de publicação clara para não perder prazos

**Citação:** *"Preciso ver de um jeito visual o que já entreguei e o que ainda falta para cada cliente."*

---

## 2. Mapa da Jornada do Usuário

### Fluxo Principal: Gerenciamento de Tarefas

| Fase | Ações | Pensamentos | Dores | Oportunidade |
|------|-------|-------------|-------|--------------|
| **1. Acesso** | Abre o sistema, faz login | "Preciso acessar minhas tarefas rápido" | Esquecer senha, tela de login confusa | Login simples com lembrar credenciais |
| **2. Visão Geral** | Visualiza lista de tarefas ou Kanban | "O que preciso fazer hoje?" | Muitas tarefas poluindo a tela | Filtros por status e busca |
| **3. Criar Tarefa** | Clica em "Nova Tarefa", preenche dados | "Vou registrar essa demanda antes de esquecer" | Formulário grande e lento | Drawer rápido com poucos campos |
| **4. Detalhar** | Adiciona subtarefas | "Quais passos preciso seguir?" | Campos escondidos, difícil de encontrar | Subtarefas visíveis sem navegação extra |
| **5. Acompanhar** | Marca subtarefas como concluídas | "Já fiz isso, deixa eu marcar" | Precisar navegar para marcar | Checkbox direto na lista |
| **6. Revisar** | Visualiza Kanban com status atualizado | "O progresso está claro" | Status desatualizado | Status automático em tempo real |
| **7. Manutenção** | Edita ou exclui tarefas obsoletas | "Isso já não faz mais sentido" | Exclusão complexa | Diálogo de confirmação simples |

---

## 3. Matriz de Oportunidades

| Oportunidade | Personas Impactadas | Impacto | Esforço | Prioridade UX |
|-------------|:-------------------:|:-------:|:-------:|:-------------:|
| Dashboard Kanban como tela principal | Carlos, Juliana | Alto | Médio | P0 |
| Criação de tarefa em drawer sem refresh | Carlos, Rafael | Alto | Médio | P0 |
| Checkbox de subtarefa na própria lista | Carlos, Juliana, Rafael | Alto | Baixo | P0 |
| Status automático refletido visualmente | Juliana, Carlos | Alto | Médio | P0 |
| Login simples com lembrar sessão | Rafael | Médio | Baixo | P1 |
| Filtros e busca de tarefas | Carlos, Juliana | Médio | Médio | P1 |
| Feedback visual ao marcar subtarefa | Carlos, Juliana, Rafael | Médio | Baixo | P1 |

---

## 4. Testes de Hipóteses

| Hipótese | Método de Validação | Critério de Sucesso |
|----------|---------------------|---------------------|
| Usuários preferem drawer ao modal | Teste A/B com 5 usuários | >70% preferem drawer |
| Status automático elimina confusão | Teste de usabilidade | Usuário entende o status em <5s |
| Kanban é a visão principal desejada | Entrevista qualitativa | >80% dos usuários escolhem Kanban como tela padrão |

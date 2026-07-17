# Relatório de Usabilidade - Sistema de Gerenciamento de Tarefas

## 1. Plano de Testes de Usabilidade

### Objetivo
Validar se o sistema de gerenciamento de tarefas é intuitivo, eficiente e agradável para os usuários-alvo.

### Metodologia
- **Tipo:** Teste moderado remoto (via videoconferência)
- **Participantes:** 6 usuários (2 por persona)
- **Duração por sessão:** 25-30 minutos
- **Ferramentas:** Screen sharing + gravação de tela
- **Métricas coletadas:** Taxa de sucesso, tempo na tarefa, erros, satisfação (SUS)

### Perfil dos Participantes

| ID | Persona Base | Perfil Tecnológico | Idade |
|:--:|:------------:|:------------------:|:----:|
| P1 | Carlos (TI) | Avançado | 32 |
| P2 | Carlos (TI) | Avançado | 36 |
| P3 | Juliana (Gestão) | Intermediário | 40 |
| P4 | Juliana (Gestão) | Intermediário | 43 |
| P5 | Rafael (Freela) | Intermediário | 27 |
| P6 | Rafael (Freela) | Intermediário | 30 |

---

## 2. Cenários de Teste

### Cenário 1: Primeiro Acesso e Login
**Instrução:** "Você acabou de receber acesso ao sistema. Faça login com as credenciais fornecidas."

| Métrica | Alvo | Resultado |
|---------|:----:|:---------:|
| Taxa de sucesso | 100% | |
| Tempo médio | < 20s | |
| Erros por usuário | 0 | |

**Observações:** \_________________________________________________

---

### Cenário 2: Criar uma Nova Tarefa
**Instrução:** "Você precisa registrar uma nova tarefa chamada 'Revisar relatório mensal' com data de amanhã."

| Métrica | Alvo | Resultado |
|---------|:----:|:---------:|
| Taxa de sucesso | 100% | |
| Tempo médio | < 30s | |
| Cliques até o objetivo | ≤ 3 | |

**Observações:** \_________________________________________________

---

### Cenário 3: Adicionar Subtarefas
**Instrução:** "Na tarefa que você criou, adicione 3 subtarefas: 'Baixar dados', 'Analisar números', 'Escrever conclusão'."

| Métrica | Alvo | Resultado |
|---------|:----:|:---------:|
| Taxa de sucesso | 100% | |
| Tempo médio | < 45s | |
| Usuários que encontram sem ajuda | 100% | |

**Observações:** \_________________________________________________

---

### Cenário 4: Marcar Subtarefa como Concluída
**Instrução:** "Você terminou de 'Baixar dados'. Marque essa subtarefa como concluída."

| Métrica | Alvo | Resultado |
|---------|:----:|:---------:|
| Taxa de sucesso | 100% | |
| Tempo médio | < 10s | |
| Usuários que percebem mudança de status | >80% | |

**Observações:** \_________________________________________________

---

### Cenário 5: Visualizar Kanban
**Instrução:** "Olhe para o quadro Kanban e me diga quantas tarefas estão em cada status."

| Métrica | Alvo | Resultado |
|---------|:----:|:---------:|
| Taxa de sucesso | 100% | |
| Tempo para responder | < 10s | |
| Entendimento correto dos status | 100% | |

**Observações:** \_________________________________________________

---

### Cenário 6: Editar uma Tarefa
**Instrução:** "Altere o título da tarefa 'Revisar relatório mensal' para 'Revisar relatório trimestral'."

| Métrica | Alvo | Resultado |
|---------|:----:|:---------:|
| Taxa de sucesso | 100% | |
| Tempo médio | < 25s | |
| Usuários que usam o drawer sem confusão | 100% | |

**Observações:** \_________________________________________________

---

### Cenário 7: Excluir uma Tarefa
**Instrução:** "A tarefa não é mais necessária. Exclua ela."

| Métrica | Alvo | Resultado |
|---------|:----:|:---------:|
| Taxa de sucesso | 100% | |
| Usuários que leem o diálogo de confirmação | 100% | |
| Cliques até o objetivo | ≤ 3 | |

**Observações:** \_________________________________________________

---

### Cenário 8: Teste de Erro (Campos Obrigatórios)
**Instrução:** "Tente criar uma tarefa sem preencher o título."

| Métrica | Alvo | Resultado |
|---------|:----:|:---------:|
| Sistema impede salvamento | Sim | |
| Mensagem de erro visível | Sim | |
| Usuário entende o erro | >80% | |

**Observações:** \_________________________________________________

---

## 3. Métricas de Usabilidade

### System Usability Scale (SUS)

Após completar todos os cenários, cada participante responde:

| # | Pergunta | Discordo Totalmente (1) | (2) | (3) | (4) | Concordo Totalmente (5) |
|:-:|----------|:----------------------:|:---:|:---:|:---:|:----------------------:|
| 1 | Acho que gostaria de usar este sistema com frequência | | | | | |
| 2 | Achei o sistema desnecessariamente complexo | | | | | |
| 3 | Achei o sistema fácil de usar | | | | | |
| 4 | Acho que precisaria de suporte técnico para usar | | | | | |
| 5 | Achei as funções bem integradas | | | | | |
| 6 | Achei inconsistências no sistema | | | | | |
| 7 | A maioria das pessoas aprenderia rápido | | | | | |
| 8 | Achei o sistema complicado de usar | | | | | |
| 9 | Me senti confiante usando o sistema | | | | | |
| 10 | Precisaria aprender muito antes de usar | | | | | |

**Cálculo SUS:**
- Soma das pontuações ímpares (1,3,5,7,9) - 5
- 25 - soma das pontuações pares (2,4,6,8,10)
- Soma total × 2.5 = Score SUS (0-100)

**Alvo:** Score SUS ≥ 80 (Excelente)

---

### Métricas de Performance

| Métrica | Alvo | Fórmula |
|---------|:----:|---------|
| Taxa de sucesso | ≥ 95% | (tarefas concluídas / tarefas totais) × 100 |
| Tempo médio por tarefa | < 30s | Soma dos tempos / número de tarefas |
| Taxa de erros | < 5% | (tarefas com erro / tarefas totais) × 100 |
| Satisfação (SUS) | ≥ 80 | Cálculo SUS padrão |

---

## 4. Problemas Potenciais e Recomendações

### Problema 1: Drawer pode não ser óbvio em mobile
- **Severidade:** Média
- **Contexto:** Usuários mobile podem não perceber que o drawer deslizou
- **Recomendação:** Adicionar um indicativo visual (ex: borda do drawer levemente visível antes de abrir)

### Problema 2: Status "todo" vs "sem status" pode confundir
- **Severidade:** Média
- **Contexto:** Tarefa sem subtarefas não tem status calculado
- **Recomendação:** Exibir badge "Sem status" ou tratar como "todo" por padrão

### Problema 3: Confirmação de exclusão pode ser ignorada
- **Severidade:** Baixa
- **Contexto:** Usuários avançados podem clicar rapidamente sem ler
- **Recomendação:** Usar botão destrutivo (vermelho) no modal com texto explícito

### Problema 4: Kanban com muitas tarefas pode ficar poluído
- **Severidade:** Média
- **Contexto:** Usuário com 20+ tarefas em uma coluna
- **Recomendação:** Adicionar scroll individual por coluna + limite de altura + busca/filtro

### Problema 5: Feedback de recalculo de status pode não ser percebido
- **Severidade:** Baixa
- **Contexto:** Ao marcar a última subtarefa, o card pode mudar de coluna sem animação clara
- **Recomendação:** Animação de saída da coluna atual + entrada na coluna "done" com destaque (glow)

---

## 5. Checklist de Acessibilidade (WCAG 2.1)

| Critério | Nível | Status | Notas |
|----------|:-----:|:------:|-------|
| Contraste de cores (texto normal) | AA | | |
| Contraste de cores (texto grande) | AA | | |
| Navegação por teclado (Tab) | A | | |
| Foco visível em todos os elementos | AA | | |
| Labels associados a inputs | A | | |
| Mensagens de erro anunciadas | AA | | |
| Texto alternativo em ícones | A | | |
| Animações respeitam `prefers-reduced-motion` | AA | | |
| Toques alvo ≥ 44×44px (mobile) | AA | | |

---

## 6. Recomendações Finais

### Antes do Desenvolvimento
1. Validar wireframes com 3 usuários (teste de papel)
2. Definir variantes de cor para daltonismo (status todo/doing/done)
3. Preparar ambiente de teste para protótipo interativo

### Durante o Desenvolvimento
1. Testar cada funcionalidade com 2 usuários assim que pronta
2. Coletar feedback qualitativo semanalmente
3. Aplicar correções rápidas antes de acumular débito de UX

### Pós-Lançamento
1. Monitorar taxa de abandono na tela de login
2. Coletar feedback via NPS (Net Promoter Score) in-app
3. Iterar com base em dados reais de uso (analytics)

# Critérios de Aceitação - Sistema de Gerenciamento de Tarefas

## US-01: Autenticação

### Cenário de Sucesso
- Dado que o usuário acessa o sistema
- Quando ele informa credenciais válidas (configuradas no .env)
- Então o sistema permite o acesso à tela principal de tarefas

### Casos Extremos
- Dado que o usuário informa credenciais inválidas
- Quando ele tenta fazer login
- Então o sistema exibe mensagem de erro "Credenciais inválidas" e não permite o acesso

### Validações
- O formulário de login deve validar que os campos não estão vazios
- A senha não deve ser exibida em texto plano no frontend
- Sessão deve expirar após período de inatividade (definido no .env)

---

## US-02: Criar Tarefa

### Cenário de Sucesso
- Dado que o usuário está logado
- Quando ele clica em "Nova Tarefa" e preenche título e data de publicação
- Então a tarefa é criada com sucesso e exibida na lista com status "todo"

### Casos Extremos
- Dado que o usuário tenta criar uma tarefa sem título
- Quando ele submete o formulário
- Então o sistema exibe erro "Título é obrigatório"
- Dado que o usuário tenta criar uma tarefa com título muito longo (> 200 caracteres)
- Quando ele submete o formulário
- Então o sistema exibe erro "Título deve ter no máximo 200 caracteres"

### Validações
- Título obrigatório (max 200 caracteres)
- Data de publicação opcional, mas deve ser uma data válida se preenchida
- Usuário deve estar autenticado para criar tarefa

---

## US-03: Listar Tarefas

### Cenário de Sucesso
- Dado que o usuário está logado e possui tarefas cadastradas
- Quando ele acessa a tela principal
- Então todas as tarefas são exibidas em ordem de data de publicação (mais recentes primeiro)

### Casos Extremos
- Dado que o usuário não possui nenhuma tarefa cadastrada
- Quando ele acessa a tela principal
- Então o sistema exibe mensagem "Nenhuma tarefa encontrada" com um botão para criar a primeira tarefa

### Validações
- A listagem deve refletir o estado atual do banco de dados
- Paginação ou scroll infinito para muitas tarefas

---

## US-04: Editar Tarefa

### Cenário de Sucesso
- Dado que o usuário está visualizando uma tarefa
- Quando ele clica em "Editar" e altera o título e/ou data
- Então as alterações são salvas e a lista é atualizada

### Casos Extremos
- Dado que o usuário edita uma tarefa e remove o título
- Quando ele tenta salvar
- Então o sistema exibe erro "Título é obrigatório"
- Dado que o usuário tenta editar uma tarefa que foi excluída por outro contexto
- Quando ele salva
- Então o sistema exibe erro "Tarefa não encontrada"

### Validações
- Mesmas validações da criação (título obrigatório)
- A tarefa deve existir no banco de dados

---

## US-05: Excluir Tarefa

### Cenário de Sucesso
- Dado que o usuário está visualizando uma tarefa
- Quando ele clica em "Excluir" e confirma a ação
- Então a tarefa e todas as suas subtarefas são removidas

### Casos Extremos
- Dado que o usuário clica em "Excluir"
- Quando o sistema exibe a confirmação e o usuário cancela
- Então a tarefa não é removida
- Dado que a tarefa possui subtarefas vinculadas
- Quando o usuário confirma a exclusão
- Então tanto a tarefa quanto as subtarefas são removidas em cascata

### Validações
- Exibir diálogo de confirmação antes de excluir
- A exclusão deve ser em cascata (subtarefas também removidas)

---

## US-06: Criar Subtarefa

### Cenário de Sucesso
- Dado que o usuário está visualizando os detalhes de uma tarefa
- Quando ele adiciona uma nova subtarefa com descrição
- Então a subtarefa é criada vinculada à tarefa com status "não concluída"

### Casos Extremos
- Dado que o usuário tenta criar uma subtarefa sem descrição
- Quando ele submete
- Então o sistema exibe erro "Descrição é obrigatória"
- Dado que o usuário tenta adicionar subtarefa a uma tarefa inexistente
- Quando ele submete
- Então o sistema exibe erro "Tarefa não encontrada"

### Validações
- Descrição obrigatória (max 500 caracteres)
- Subtarefa deve estar vinculada a uma tarefa existente

---

## US-07: Listar Subtarefas

### Cenário de Sucesso
- Dado que o usuário está visualizando uma tarefa com subtarefas
- Quando ele expande ou acessa os detalhes da tarefa
- Então todas as subtarefas são exibidas com seus respectivos status

### Casos Extremos
- Dado que a tarefa não possui subtarefas vinculadas
- Quando o usuário visualiza os detalhes
- Então o sistema exibe "Nenhuma subtarefa cadastrada"

### Validações
- Listar apenas subtarefas da tarefa atual
- Ordenar por data de criação (mais antigas primeiro)

---

## US-08: Marcar/Desmarcar Subtarefa como Concluída

### Cenário de Sucesso
- Dado que o usuário está visualizando uma subtarefa não concluída
- Quando ele clica no checkbox para marcá-la como concluída
- Então o status da subtarefa é alterado para "concluída" e o status da tarefa pai é recalculado

### Caso: Desmarcar
- Dado que o usuário está visualizando uma subtarefa concluída
- Quando ele clica no checkbox para desmarcá-la
- Então o status da subtarefa volta para "não concluída" e o status da tarefa pai é recalculado

### Casos Extremos
- Dado que o usuário marca/desmarca múltiplas subtarefas rapidamente
- Quando as requisições são feitas em sequência
- Então o sistema deve processar corretamente todas as alterações sem conflitos

### Validações
- A subtarefa deve existir
- O status da tarefa pai deve ser recalculado a cada alteração

---

## US-09: Status Automático da Tarefa

### Cenário: Status "todo"
- Dado que uma tarefa possui subtarefas vinculadas
- Quando nenhuma subtarefa está marcada como concluída
- Então a tarefa exibe o status "todo"

### Cenário: Status "doing"
- Dado que uma tarefa possui subtarefas vinculadas
- Quando pelo menos uma subtarefa está concluída mas não todas
- Então a tarefa exibe o status "doing"

### Cenário: Status "done"
- Dado que uma tarefa possui subtarefas vinculadas
- Quando todas as subtarefas estão concluídas
- Então a tarefa exibe o status "done"

### Casos Extremos
- Dado que uma tarefa não possui subtarefas vinculadas
- Quando o status é calculado
- Então a tarefa não exibe status automático (permanece sem classificação)
- Dado que uma tarefa tem todas as subtarefas excluídas
- Quando o status é recalculado
- Então a tarefa não exibe status (volta ao estado sem classificação)

### Validações
- O recálculo deve ocorrer em tempo real após qualquer alteração nas subtarefas
- O status deve ser persistido ou calculado em tempo real via backend

---

## US-10: Visão Kanban

### Cenário de Sucesso
- Dado que o usuário está logado e possui tarefas em diferentes status
- Quando ele acessa a visão Kanban
- Então as tarefas são organizadas em colunas "A Fazer (todo)", "Fazendo (doing)" e "Concluído (done)"

### Caso: Tarefa sem classificação
- Dado que uma tarefa não possui subtarefas
- Quando a visão Kanban é renderizada
- Então essa tarefa aparece em uma coluna "Sem Status" ou na coluna "A Fazer"

### Casos Extremos
- Dado que o usuário não possui tarefas em um determinado status
- Quando a visão Kanban é exibida
- Então a coluna correspondente aparece vazia com a mensagem "Nenhuma tarefa aqui"
- Dado que existem muitas tarefas em uma coluna
- Quando o Kanban é renderizado
- Então deve ser possível scrollar verticalmente dentro da coluna

### Validações
- Atualizar Kanban em tempo real quando uma subtarefa é marcada/desmarcada
- Layout responsivo para diferentes tamanhos de tela
- Arrastar e soltar entre colunas (se implementado) deve atualizar o status

---

## US-11: Drawer para Formulário de Tarefa

### Cenário de Sucesso
- Dado que o usuário está na tela principal
- Quando ele clica em "Nova Tarefa" ou "Editar"
- Então um drawer desliza da direita para esquerda com o formulário correspondente

### Caso: Fechar Drawer
- Dado que o drawer está aberto
- Quando o usuário clica no botão de fechar ou no backdrop
- Então o drawer fecha sem salvar as alterações
- Dado que o formulário está preenchido com dados não salvos
- Quando o usuário tenta fechar o drawer
- Então o sistema exibe confirmação "Descartar alterações?"

### Casos Extremos
- Dado que o drawer está aberto em um dispositivo mobile
- Quando o formulário é exibido
- Então o drawer deve ocupar 100% da largura da tela
- Dado que o drawer está aberto em desktop
- Quando o formulário é exibido
- Então o drawer deve ocupar no máximo 480px de largura

### Validações
- Drawer deve ter animação suave (transição CSS)
- Backdrop escuro semi-transparente atrás do drawer
- Conteúdo da tela principal deve permanecer visível atrás do backdrop
- Formulário dentro do drawer deve ter as mesmas validações dos CRUDs

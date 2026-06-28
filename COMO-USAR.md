# 🚀 Como Usar o Molde de Agentes

## ⚡ Início Rápido (5 minutos)

### 1. Configuração Inicial
```powershell
# Execute o script de configuração
./scripts/setup.ps1 -ProjectName "MeuProjeto"
```

### 2. Ver Agentes Disponíveis
```powershell
# Liste todos os agentes
./scripts/list-agents.ps1
```

### 3. Ativar seu Primeiro Agente
```powershell
# Ative o Product Owner para começar
./scripts/activate-agent.ps1 product-owner
```

### 4. Ver Ajuda Completa
```powershell
# Acesse a ajuda completa
./scripts/help.ps1
```

## 🎯 Cenários de Uso

### 🆕 Novo Projeto
```powershell
# 1. Configurar projeto
./scripts/setup.ps1 -ProjectName "MeuApp"

# 2. Iniciar desenvolvimento completo
./scripts/start-workflow.ps1 complete-development

# 3. Começar com Product Owner
./scripts/activate-agent.ps1 product-owner
```

### ✨ Nova Feature
```powershell
# 1. Iniciar workflow de feature
./scripts/start-workflow.ps1 feature-development

# 2. Ativar Feature Suggester para ideação (opcional, mas recomendado)
./scripts/activate-agent.ps1 feature-suggester

# 3. Ativar Product Owner para definir requisitos
./scripts/activate-agent.ps1 product-owner
```

### 🐛 Correção de Bug
```powershell
# 1. Iniciar workflow de bug fixing
./scripts/start-workflow.ps1 bug-fixing

# 2. Ativar Tester para analisar
./scripts/activate-agent.ps1 tester
```

### 🔍 Code Review
```powershell
# 1. Iniciar workflow de code review
./scripts/start-workflow.ps1 code-review

# 2. Ativar Arquiteto para revisar
./scripts/activate-agent.ps1 architect
```

## 🤖 Agentes Disponíveis

| Agente | Chave | Quando Usar |
|--------|-------|-------------|
| **Feature Suggester** | `feature-suggester` | Sugerir features inovadoras, análise de mercado, recomendar tecnologias |
| **Product Owner** | `product-owner` | Definir requisitos, user stories, priorizar |
| **Arquiteto** | `architect` | Projetar arquitetura, escolher tecnologias |
| **Arquiteto de DDD** | `ddd-architect` | Modelar domínio, Bounded Contexts, Linguagem Ubíqua |
| **Frontend Dev** | `frontend-dev` | Implementar interface, componentes |
| **Backend Dev** | `backend-dev` | Desenvolver APIs, lógica de negócio |
| **DevOps** | `devops` | Configurar infraestrutura, deploy |
| **Tester** | `tester` | Executar testes, garantir qualidade |
| **UX Designer** | `ux` | Pesquisar usuário, criar wireframes |
| **UI Designer** | `ui-designer` | Design visual, design systems |
| **Fullstack Dev** | `fullstack-dev` | Desenvolvimento frontend e backend integrado |
| **Mobile Dev** | `mobile-dev` | Apps iOS e Android |

## 🔄 Workflows Disponíveis

| Workflow | Chave | Duração | Quando Usar |
|----------|-------|---------|-------------|
| **Desenvolvimento Completo** | `complete-development` | 6-8 semanas | Projetos novos |
| **Desenvolvimento de Feature** | `feature-development` | 1-2 semanas | Novas funcionalidades |
| **Correção de Bugs** | `bug-fixing` | 1-2 dias | Bugs urgentes |
| **Code Review** | `code-review` | 1-2 horas | Revisão de código |

## 📝 Como Usar os Templates

### 1. Ative um Agente
```powershell
./scripts/activate-agent.ps1 product-owner
```

### 2. Use o Template de Prompt
- Vá para `templates/product-owner-prompt.md`
- Copie o template base
- Adapte para sua necessidade específica

### 3. Exemplo de Prompt Adaptado
```
Como Product Owner, preciso que você analise os requisitos para um sistema de gestão de estoque:

1. Identifique os usuários principais (gerente, vendedor, cliente)
2. Crie user stories para:
   - Cadastro de produtos
   - Controle de estoque
   - Relatórios de vendas
   - Alertas de estoque baixo
3. Priorize as funcionalidades considerando o MVP
4. Defina critérios de aceitação para cada user story
```

## 🔄 Fluxo Típico de Desenvolvimento

### 0. **Feature Suggester** → Sugere features inovadoras baseadas nas diretrizes
```powershell
./scripts/activate-agent.ps1 feature-suggester
```
*Forneça: tipo de sistema, público-alvo, objetivos de negócio*
*Gera também: `tech-stack-suggestions.md` com recomendações de tecnologias*

### 1. **Product Owner** → Define requisitos e user stories
```powershell
./scripts/activate-agent.ps1 product-owner
```

### 2. **UX Designer** → Cria wireframes e protótipos
```powershell
./scripts/activate-agent.ps1 ux
```

### 3. **Arquiteto de DDD** → Modela domínio e Bounded Contexts
```powershell
./scripts/activate-agent.ps1 ddd-architect
```

### 4. **Arquiteto** → Projeta arquitetura e escolhe tecnologias
```powershell
./scripts/activate-agent.ps1 architect
```

### 5. **Desenvolvedores** → Implementam frontend e backend
```powershell
./scripts/activate-agent.ps1 frontend-dev
./scripts/activate-agent.ps1 backend-dev
```

### 6. **Tester** → Executa testes e valida qualidade
```powershell
./scripts/activate-agent.ps1 tester
```

### 7. **DevOps** → Configura deploy e monitoramento
```powershell
./scripts/activate-agent.ps1 devops
```

## 💡 Dicas Importantes

### ✅ Faça
- **Use workflows** para processos estruturados
- **Ative agentes** conforme a necessidade
- **Siga os templates** para prompts eficazes
- **Colabore** entre agentes nos workflows
- **Documente** decisões e outputs

### ❌ Evite
- Pular etapas importantes
- Usar agentes fora de contexto
- Ignorar feedback entre agentes
- Não documentar decisões
- Misturar responsabilidades

## 🛠️ Comandos Úteis

### Ver Status Atual
```powershell
# Ver agente ativo
Get-Content .active-agent

# Ver workflow ativo
Get-Content .active-workflow

# Listar agentes
./scripts/list-agents.ps1
```

### Gerenciar Contexto
```powershell
# Ativar agente
./scripts/activate-agent.ps1 [agent-name]

# Iniciar workflow
./scripts/start-workflow.ps1 [workflow-name]

# Ver ajuda
./scripts/help.ps1
```

## 📚 Documentação Adicional

- **README.md**: Visão geral completa
- **docs/quick-start.md**: Guia de início rápido
- **docs/agent-guide.md**: Guia detalhado dos agentes
- **docs/examples.md**: Exemplos práticos
- **templates/**: Templates de prompts para cada agente
- **workflows/**: Configurações dos workflows

## 🆘 Precisa de Ajuda?

### Comandos de Ajuda
```powershell
# Ajuda completa
./scripts/help.ps1

# Listar agentes
./scripts/list-agents.ps1

# Ver configuração do projeto
Get-Content agent-project.json
```

### Recursos
- **Templates**: Use os templates em `templates/` para prompts específicos
- **Workflows**: Siga os workflows em `workflows/` para processos estruturados
- **Exemplos**: Consulte `docs/examples.md` para casos práticos
- **Configurações**: Ajuste as configurações em `agents/` conforme necessário

## 🎉 Pronto para Começar!

1. **Execute**: `./scripts/setup.ps1 -ProjectName "SeuProjeto"`
2. **Escolha**: Um workflow apropriado
3. **Ative**: O agente necessário
4. **Use**: Os templates de prompt
5. **Colabore**: Entre agentes conforme o workflow

**Boa sorte com seu projeto! 🚀**

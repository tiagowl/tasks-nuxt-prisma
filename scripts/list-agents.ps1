# Script para Listar Agentes Disponiveis
# Mostra todos os agentes disponiveis e suas informacoes

param(
    [string]$ProjectPath = "."
)

Write-Host "Agentes Disponiveis no Molde" -ForegroundColor Green
Write-Host "=" * 50 -ForegroundColor Green

# Lista de agentes com suas informacoes
$agents = @(
    @{
        key = "product-owner"
        name = "Product Owner"
        description = "Define requisitos e prioridades do produto"
        expertise = @("Analise de requisitos", "Gestao de backlog", "User stories")
    },
    @{
        key = "architect"
        name = "Arquiteto de Software"
        description = "Projeta arquitetura e estrutura do sistema"
        expertise = @("Design de arquitetura", "Padroes de design", "Escalabilidade")
    },
    @{
        key = "ddd-architect"
        name = "Arquiteto de DDD"
        description = "Modela o dominio de negocio com Domain-Driven Design (opcional)"
        expertise = @("Bounded Contexts", "Agregados e Entidades", "Linguagem Ubiqua", "Domain Events")
        optional = $true
    },
    @{
        key = "solution-architect"
        name = "Arquiteto de Solucoes"
        description = "Define visao de solucao, integracoes e buy vs build (opcional)"
        expertise = @("Visao de solucao", "Integracao com legado", "NFRs", "Buy vs build")
        optional = $true
    },
    @{
        key = "frontend-dev"
        name = "Desenvolvedor Frontend"
        description = "Implementa interface do usuario"
        expertise = @("React/Vue/Angular", "HTML/CSS/JS", "Responsive design")
    },
    @{
        key = "backend-dev"
        name = "Desenvolvedor Backend"
        description = "Desenvolve APIs e logica de negocio"
        expertise = @("API development", "Database design", "Business logic")
    },
    @{
        key = "devops"
        name = "Profissional DevOps"
        description = "Gerencia infraestrutura e deploy"
        expertise = @("CI/CD", "Docker/Kubernetes", "Cloud platforms")
    },
    @{
        key = "tester"
        name = "Tester"
        description = "Executa testes e garante qualidade"
        expertise = @("Testes unitarios", "Testes de integracao", "Automacao")
    },
    @{
        key = "ux"
        name = "UX Designer"
        description = "Foca na experiencia do usuario"
        expertise = @("User research", "Wireframing", "Usability testing")
    },
    @{
        key = "fullstack-dev"
        name = "Desenvolvedor Fullstack"
        description = "Desenvolve frontend e backend de forma integrada"
        expertise = @("React/Vue + Node/Python", "APIs", "Integracao front-back")
    },
    @{
        key = "ui-designer"
        name = "UI Designer"
        description = "Design visual, design systems e componentes de UI"
        expertise = @("Design systems", "Componentes UI", "Figma/Sketch", "Style guide")
    },
    @{
        key = "mobile-dev"
        name = "Desenvolvedor Mobile"
        description = "Apps iOS e Android (React Native/Flutter ou nativo)"
        expertise = @("React Native/Flutter", "Swift/Kotlin", "APIs mobile", "Store deploy")
    },
    @{
        key = "feature-suggester"
        name = "Feature Suggester"
        description = "Sugere features atraentes e inovadoras baseadas nas diretrizes do usuario"
        expertise = @("Analise de mercado", "Ideacao de features", "Analise competitiva", "Inovacao")
    }
)

foreach ($agent in $agents) {
    $optionalLabel = if ($agent.optional) { " (opcional)" } else { "" }
    Write-Host "`n$($agent.name)$optionalLabel" -ForegroundColor Yellow
    Write-Host "   Chave: $($agent.key)" -ForegroundColor Cyan
    Write-Host "   Descricao: $($agent.description)" -ForegroundColor White
    Write-Host "   Expertise: $($agent.expertise -join ', ')" -ForegroundColor Gray
    Write-Host "   Comando: ./scripts/activate-agent.ps1 $($agent.key)" -ForegroundColor Green
}

Write-Host "`nWorkflows Disponiveis:" -ForegroundColor Cyan
$workflows = @(
    @{ key = "complete-development"; name = "Desenvolvimento Completo" },
    @{ key = "feature-development"; name = "Desenvolvimento de Feature" },
    @{ key = "bug-fixing"; name = "Correcao de Bugs" },
    @{ key = "code-review"; name = "Code Review" }
)

foreach ($workflow in $workflows) {
    Write-Host "  - $($workflow.key): $($workflow.name)" -ForegroundColor White
}

Write-Host "`nComo Usar:" -ForegroundColor Cyan
Write-Host "1. Ativar um agente: ./scripts/activate-agent.ps1 [agent-name]" -ForegroundColor White
Write-Host "2. Iniciar workflow: ./scripts/start-workflow.ps1 [workflow-name]" -ForegroundColor White
Write-Host "3. Ver ajuda: ./scripts/help.ps1" -ForegroundColor White

# Verificar se ha agente ativo
$activeAgentPath = Join-Path $ProjectPath ".active-agent"
if (Test-Path $activeAgentPath) {
    try {
        $activeAgent = Get-Content $activeAgentPath -Encoding UTF8 | ConvertFrom-Json
        Write-Host "`nAgente Ativo: $($activeAgent.name)" -ForegroundColor Green
        Write-Host "   Ativado em: $($activeAgent.activated_at)" -ForegroundColor Gray
    } catch {
        Write-Host "`nErro ao ler agente ativo: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Verificar se ha workflow ativo
$activeWorkflowPath = Join-Path $ProjectPath ".active-workflow"
if (Test-Path $activeWorkflowPath) {
    try {
        $activeWorkflow = Get-Content $activeWorkflowPath -Encoding UTF8 | ConvertFrom-Json
        Write-Host "`nWorkflow Ativo: $($activeWorkflow.name)" -ForegroundColor Green
        Write-Host "   Iniciado em: $($activeWorkflow.started_at)" -ForegroundColor Gray
        Write-Host "   Fase atual: $($activeWorkflow.current_phase + 1)/$($activeWorkflow.total_phases)" -ForegroundColor Gray
    } catch {
        Write-Host "`nErro ao ler workflow ativo: $($_.Exception.Message)" -ForegroundColor Red
    }
}

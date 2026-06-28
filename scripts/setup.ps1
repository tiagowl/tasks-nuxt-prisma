# Script de Configuracao do Molde de Agentes
# Configura o ambiente para usar o molde de agentes

param(
    [string]$ProjectName = "MeuProjeto",
    [string]$ProjectPath = "."
)

Write-Host "Configurando Molde de Agentes para: $ProjectName" -ForegroundColor Green

# Criar estrutura de diretorios do projeto
$projectDirs = @(
    "docs",
    "src/frontend",
    "src/backend", 
    "tests",
    "deploy",
    "monitoring"
)

foreach ($dir in $projectDirs) {
    $fullPath = Join-Path $ProjectPath $dir
    if (!(Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "Criado diretorio: $dir" -ForegroundColor Yellow
    }
}

# Copiar arquivos de configuracao
$configFiles = @(
    "agents/product-owner/config.json",
    "agents/architect/config.json",
    "agents/ddd-architect/config.json",
    "agents/solution-architect/config.json",
    "agents/frontend-dev/config.json",
    "agents/backend-dev/config.json",
    "agents/devops/config.json",
    "agents/tester/config.json",
    "agents/ux/config.json",
    "agents/fullstack-dev/config.json",
    "agents/ui-designer/config.json",
    "agents/mobile-dev/config.json",
    "agents/feature-suggester/config.json"
)

foreach ($configFile in $configFiles) {
    $sourcePath = Join-Path $PSScriptRoot "..\$configFile"
    $destPath = Join-Path $ProjectPath "agent-configs"
    
    if (!(Test-Path $destPath)) {
        New-Item -ItemType Directory -Path $destPath -Force | Out-Null
    }
    
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $destPath -Force
        Write-Host "Copiado: $configFile" -ForegroundColor Yellow
    }
}

# Criar arquivo de configuracao do projeto
$projectConfig = @{
    project = @{
        name = $ProjectName
        created = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        agents = @(
            "product-owner",
            "architect",
            "ddd-architect",
            "solution-architect",
            "frontend-dev",
            "backend-dev",
            "devops",
            "tester",
            "ux",
            "fullstack-dev",
            "ui-designer",
            "mobile-dev",
            "feature-suggester"
        )
        workflows = @(
            "complete-development",
            "feature-development", 
            "bug-fixing",
            "code-review"
        )
    }
} | ConvertTo-Json -Depth 3

$projectConfigPath = Join-Path $ProjectPath "agent-project.json"
$projectConfig | Out-File -FilePath $projectConfigPath -Encoding UTF8

Write-Host "Configuracao do projeto criada: agent-project.json" -ForegroundColor Yellow

# Criar arquivo .cursorrules
$cursorRules = @"
# Configuracao do Molde de Agentes

## Agentes Disponiveis
- Product Owner: Define requisitos e prioridades
- Arquiteto: Projeta arquitetura do sistema
- Arquiteto de DDD: Modela dominio com Domain-Driven Design (opcional)
- Arquiteto de Solucoes: Visao de solucao e integracoes (opcional)
- Frontend Dev: Implementa interface do usuario
- Backend Dev: Desenvolve APIs e logica de negocio
- DevOps: Gerencia infraestrutura e deploy
- Tester: Executa testes e garante qualidade
- UX: Foca na experiencia do usuario
- Fullstack Dev: Desenvolve frontend e backend integrados
- UI Designer: Design visual e design systems
- Mobile Dev: Apps iOS e Android

## Como Usar
1. Use o comando: ./scripts/activate-agent.ps1 [agent-name]
2. Siga os templates em templates/
3. Use os workflows em workflows/

## Comandos Disponiveis
- setup.ps1: Configuracao inicial
- activate-agent.ps1: Ativar um agente especifico
- start-workflow.ps1: Iniciar um workflow
- list-agents.ps1: Listar agentes disponiveis
"@

$cursorRulesPath = Join-Path $ProjectPath ".cursorrules"
$cursorRules | Out-File -FilePath $cursorRulesPath -Encoding UTF8

Write-Host "Arquivo .cursorrules criado" -ForegroundColor Yellow

Write-Host "`nConfiguracao concluida!" -ForegroundColor Green
Write-Host "Para comecar, use: ./scripts/activate-agent.ps1 [agent-name]" -ForegroundColor Cyan

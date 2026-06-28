# Script Simples para Salvar Outputs dos Agentes
# Salva outputs de forma organizada na pasta outputs/

param(
    [Parameter(Mandatory=$true)]
    [string]$AgentName,
    [Parameter(Mandatory=$true)]
    [string]$OutputContent,
    [string]$FileName = "output.md",
    [string]$ProjectPath = "."
)

# Verificar se o agente existe
$availableAgents = @{
    "product-owner" = "Product Owner"
    "architect" = "Arquiteto de Software"
    "ddd-architect" = "Arquiteto de DDD"
    "solution-architect" = "Arquiteto de Solucoes"
    "frontend-dev" = "Desenvolvedor Frontend"
    "backend-dev" = "Desenvolvedor Backend"
    "devops" = "Profissional DevOps"
    "tester" = "Tester"
    "ux" = "UX Designer"
    "fullstack-dev" = "Desenvolvedor Fullstack"
    "ui-designer" = "UI Designer"
    "mobile-dev" = "Desenvolvedor Mobile"
    "feature-suggester" = "Feature Suggester"
}

if (!$availableAgents.ContainsKey($AgentName)) {
    Write-Host "Agente '$AgentName' nao encontrado!" -ForegroundColor Red
    Write-Host "Agentes disponiveis: $($availableAgents.Keys -join ', ')" -ForegroundColor Yellow
    exit 1
}

# Criar diretorio do agente se nao existir
$agentOutputPath = Join-Path $ProjectPath "outputs\$AgentName"
if (!(Test-Path $agentOutputPath)) {
    New-Item -ItemType Directory -Path $agentOutputPath -Force | Out-Null
    Write-Host "Criado diretorio: outputs\$AgentName" -ForegroundColor Green
}

# Salvar output com timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$outputFile = Join-Path $agentOutputPath "$timestamp-$FileName"

# Adicionar cabecalho ao output
$header = @"
# Output do $($availableAgents[$AgentName])
**Data/Hora:** $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
**Arquivo:** $FileName

---

"@

$fullContent = $header + $OutputContent
$fullContent | Out-File -FilePath $outputFile -Encoding UTF8

# Criar arquivo de output mais recente
$latestFile = Join-Path $agentOutputPath "latest-$FileName"
$fullContent | Out-File -FilePath $latestFile -Encoding UTF8

Write-Host "Output salvo com sucesso!" -ForegroundColor Green
Write-Host "Arquivo: $outputFile" -ForegroundColor Yellow
Write-Host "Latest: $latestFile" -ForegroundColor Yellow
Write-Host "`nPara visualizar: Get-Content '$latestFile'" -ForegroundColor Cyan

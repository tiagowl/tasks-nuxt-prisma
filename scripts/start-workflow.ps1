# Script para Iniciar um Workflow
# Inicia um workflow especifico com os agentes necessarios

param(
    [Parameter(Mandatory=$true)]
    [string]$WorkflowName,
    [string]$ProjectPath = "."
)

# Lista de workflows disponiveis
$availableWorkflows = @{
    "complete-development" = "Desenvolvimento Completo"
    "feature-development" = "Desenvolvimento de Feature"
    "bug-fixing" = "Correcao de Bugs"
    "code-review" = "Code Review"
}

# Verificar se o workflow existe
if (!$availableWorkflows.ContainsKey($WorkflowName)) {
    Write-Host "Workflow '$WorkflowName' nao encontrado!" -ForegroundColor Red
    Write-Host "Workflows disponiveis:" -ForegroundColor Yellow
    foreach ($workflow in $availableWorkflows.GetEnumerator()) {
        Write-Host "  - $($workflow.Key): $($workflow.Value)" -ForegroundColor Cyan
    }
    exit 1
}

Write-Host "Iniciando workflow: $($availableWorkflows[$WorkflowName])" -ForegroundColor Green

# Carregar configuracao do workflow
$workflowPath = Join-Path $PSScriptRoot "..\workflows\$WorkflowName.json"
if (Test-Path $workflowPath) {
    try {
        $workflow = Get-Content $workflowPath -Encoding UTF8 | ConvertFrom-Json
        Write-Host "Configuracao do workflow carregada" -ForegroundColor Yellow
    } catch {
        Write-Host "Erro ao carregar workflow: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
    
    # Exibir informacoes do workflow
    Write-Host "`nInformacoes do Workflow:" -ForegroundColor Cyan
    Write-Host "Nome: $($workflow.workflow.name)" -ForegroundColor White
    Write-Host "Descricao: $($workflow.workflow.description)" -ForegroundColor White
    
    # Exibir fases do workflow
    Write-Host "`nFases do Workflow:" -ForegroundColor Cyan
    foreach ($phase in $workflow.workflow.phases) {
        Write-Host "`n$($phase.phase)" -ForegroundColor Yellow
        Write-Host "   Agentes: $($phase.agents -join ', ')" -ForegroundColor White
        if ($phase.optional_agents -and $phase.optional_agents.Count -gt 0) {
            Write-Host "   Agentes opcionais: $($phase.optional_agents -join ', ')" -ForegroundColor DarkYellow
        }
        Write-Host "   Duracao: $($phase.duration)" -ForegroundColor White
        Write-Host "   Atividades:" -ForegroundColor White
        foreach ($activity in $phase.activities) {
            Write-Host "     - $activity" -ForegroundColor Gray
        }
        if ($phase.optional_activities) {
            foreach ($optAgent in $phase.optional_activities.PSObject.Properties) {
                Write-Host "   Atividades opcionais ($($optAgent.Name)):" -ForegroundColor DarkYellow
                foreach ($optActivity in $optAgent.Value) {
                    Write-Host "     - $optActivity" -ForegroundColor DarkGray
                }
            }
        }
        Write-Host "   Outputs:" -ForegroundColor White
        foreach ($output in $phase.outputs) {
            Write-Host "     - $output" -ForegroundColor Gray
        }
        if ($phase.optional_outputs) {
            foreach ($optAgent in $phase.optional_outputs.PSObject.Properties) {
                Write-Host "   Outputs opcionais ($($optAgent.Name)):" -ForegroundColor DarkYellow
                foreach ($optOutput in $optAgent.Value) {
                    Write-Host "     - $optOutput" -ForegroundColor DarkGray
                }
            }
        }
    }

    # Exibir agentes opcionais do workflow
    if ($workflow.workflow.optional_agents) {
        Write-Host "`nAgentes Opcionais do Workflow:" -ForegroundColor Cyan
        foreach ($optAgent in $workflow.workflow.optional_agents) {
            Write-Host "`n  $($optAgent.name) ($($optAgent.role))" -ForegroundColor DarkYellow
            Write-Host "   Fases recomendadas: $($optAgent.recommended_phases -join ', ')" -ForegroundColor White
            Write-Host "   Quando usar:" -ForegroundColor White
            foreach ($when in $optAgent.when_to_use) {
                Write-Host "     - $when" -ForegroundColor Gray
            }
            Write-Host "   Ativar: ./scripts/activate-agent.ps1 $($optAgent.role)" -ForegroundColor Green
        }
    }
    
    # Exibir matriz de colaboracao
    if ($workflow.workflow.collaboration_matrix) {
        Write-Host "`nMatriz de Colaboracao:" -ForegroundColor Cyan
        foreach ($agent in $workflow.workflow.collaboration_matrix.PSObject.Properties) {
            Write-Host "  $($agent.Name): $($agent.Value -join ', ')" -ForegroundColor White
        }
    }
    
    # Criar arquivo de contexto do workflow ativo
    $activeWorkflowPath = Join-Path $ProjectPath ".active-workflow"
    $activeWorkflowInfo = @{
        workflow = $WorkflowName
        name = $workflow.workflow.name
        started_at = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
        current_phase = 0
        total_phases = $workflow.workflow.phases.Count
        workflow_path = $workflowPath
    } | ConvertTo-Json -Depth 2
    
    $activeWorkflowInfo | Out-File -FilePath $activeWorkflowPath -Encoding UTF8
    
    Write-Host "`nWorkflow iniciado com sucesso!" -ForegroundColor Green
    Write-Host "Contexto salvo em: .active-workflow" -ForegroundColor Yellow
    
    # Sugerir proximos passos
    $firstPhase = $workflow.workflow.phases[0]
    Write-Host "`nProximos Passos:" -ForegroundColor Cyan
    Write-Host "1. Ative os agentes da primeira fase: $($firstPhase.agents -join ', ')" -ForegroundColor White
    Write-Host "2. Use: ./scripts/activate-agent.ps1 [agent-name]" -ForegroundColor White
    Write-Host "3. Siga as atividades da fase: $($firstPhase.phase)" -ForegroundColor White
    
} else {
    Write-Host "Arquivo de workflow nao encontrado: $workflowPath" -ForegroundColor Red
    exit 1
}

## Purpose

Tornar qualidade, segurança, cobertura e entrega propriedades verificáveis do repositório, com feedback reproduzível localmente e no CI.

## ADDED Requirements

### Requirement: Tipagem e análise estática estritas
O sistema SHALL passar TypeScript estrito, lint de código, React, hooks, acessibilidade, imports e segurança, além de formatter determinístico, sem `any` explícito não justificado.

#### Scenario: Violação estática
- **WHEN** código novo introduzir erro de tipo, lint, acessibilidade ou formatação
- **THEN** o check local e o CI falham com diagnóstico acionável

### Requirement: Cobertura integral do código autoral
O sistema SHALL manter 100% de statements, branches, functions e lines sobre código autoral incluído no escopo publicado, com exclusões somente para arquivos gerados ou declarativos documentadas.

#### Scenario: Linha ou branch não coberto
- **WHEN** a cobertura cair abaixo de 100% em qualquer dimensão configurada
- **THEN** o pipeline falha

#### Scenario: Exclusão de cobertura adicionada
- **WHEN** um arquivo autoral for excluído da medição
- **THEN** a alteração exige justificativa documentada e revisão explícita

### Requirement: Pirâmide de testes completa
O sistema SHALL verificar domínio, aplicação, componentes, contratos HTTP, banco real isolado, integrações mockadas, jornadas E2E, acessibilidade, regressão visual, performance e resiliência.

#### Scenario: Pull request
- **WHEN** um pull request for aberto ou atualizado
- **THEN** testes unitários, componente, contrato, integração, E2E críticos, axe, coverage, build e security gates são executados

#### Scenario: Falha de provider simulada
- **WHEN** testes injetarem timeout, rate limit, resposta inválida ou indisponibilidade
- **THEN** retry, circuit breaker, fallback, error envelope e telemetria são validados

### Requirement: Pipeline de entrega reproduzível
O sistema SHALL instalar dependências de lockfile, gerar artefato correspondente ao runtime real e promover o mesmo artefato entre ambientes com rollback documentado.

#### Scenario: Build em ambiente limpo
- **WHEN** o pipeline executar a partir de checkout limpo
- **THEN** instalação, geração de tipos, migrações verificadas, testes e build concluem sem arquivos locais implícitos

#### Scenario: Artefato incorreto
- **WHEN** o script tentar empacotar arquivo inexistente ou diferente do build produzido
- **THEN** o pipeline falha antes do deploy

### Requirement: Segurança de código e dependências
O sistema SHALL bloquear vulnerabilidades altas/críticas conhecidas, segredos versionados, permissões excessivas e dependências sem uso, mantendo atualização automatizada revisável.

#### Scenario: Vulnerabilidade bloqueante
- **WHEN** o scan detectar vulnerabilidade alta ou crítica aplicável
- **THEN** o pipeline bloqueia a entrega ou exige exceção temporária documentada com prazo

#### Scenario: Segredo em commit
- **WHEN** um scanner detectar token, chave ou credencial
- **THEN** o commit ou pipeline falha sem imprimir o segredo completo

### Requirement: Conventional Commits e versionamento semântico
O sistema SHALL validar mensagens e títulos de mudança segundo Conventional Commits e derivar changelog/versionamento de forma semântica.

#### Scenario: Commit não convencional
- **WHEN** uma mensagem não seguir o formato configurado
- **THEN** o gate local ou de pull request informa os tipos e escopos aceitos

### Requirement: Documentação operacional completa
O sistema SHALL documentar setup, env, arquitetura, decisões, API, observabilidade, privacidade, execução de testes, coverage, migração, deploy, rollback e troubleshooting.

#### Scenario: Setup por novo colaborador
- **WHEN** o repositório for clonado em ambiente suportado
- **THEN** a documentação permite subir aplicação, banco e collector sem conhecimento tácito

### Requirement: Limpeza segura de tooling legado
O sistema SHALL remover arquivos específicos de Claude Code/Anthropic somente após inventário e SHALL preservar tooling compartilhado necessário ao OpenSpec.

#### Scenario: Alvo Claude-specific encontrado
- **WHEN** `.claude`, `CLAUDE.md`, `.claude-plugin`, configuração Anthropic ou equivalente for identificado
- **THEN** o alvo é removido e referências quebradas são eliminadas

#### Scenario: Diretório compartilhado de agents
- **WHEN** um diretório contiver skills OpenSpec usadas pelo fluxo SDD e nenhuma configuração Claude-specific
- **THEN** o diretório é preservado

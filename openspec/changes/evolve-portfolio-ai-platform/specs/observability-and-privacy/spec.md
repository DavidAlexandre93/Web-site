## Purpose

Permitir diagnóstico operacional por logs, métricas e traces correlacionados, mantendo dados pessoais, segredos e conteúdo sensível fora da telemetria e das respostas públicas.

## ADDED Requirements

### Requirement: Logs estruturados em JSON
O sistema SHALL emitir um objeto JSON por evento server-side com timestamp ISO, severity, service, environment, event, source, correlation ID e trace/span IDs quando disponíveis.

#### Scenario: Evento operacional normal
- **WHEN** uma operação relevante iniciar ou concluir
- **THEN** um log estruturado registra resultado e duração sem payload sensível

#### Scenario: Log inválido
- **WHEN** um teste detectar linha não JSON ou campo obrigatório ausente no logger de produção
- **THEN** o gate de observabilidade falha

### Requirement: Diagnóstico interno completo de exceptions
O sistema SHALL registrar internamente tipo da exception, mensagem sanitizada, módulo/classe ou função, arquivo, linha, coluna, causa e stack completa, preservando source maps seguros.

#### Scenario: Exception encadeada
- **WHEN** uma exception possuir `cause`
- **THEN** o log interno preserva a cadeia completa e os atributos de correlação

#### Scenario: Resposta ao visitante
- **WHEN** a mesma exception gerar resposta HTTP ou fallback visual
- **THEN** stack, caminhos, linha, classe, provider e detalhes internos não são expostos

### Requirement: Telemetria OpenTelemetry correlacionada
O sistema SHALL produzir traces e métricas OTEL para HTTP, banco, cache e providers, exportáveis por OTLP e correlacionadas aos logs.

#### Scenario: Jornada do concierge de IA
- **WHEN** uma pergunta passar por API, recuperação, provider e persistência
- **THEN** spans filhos representam as etapas, com duração, status e atributos sem prompt bruto

#### Scenario: Exportador indisponível
- **WHEN** o collector OTLP falhar
- **THEN** a requisição do visitante não falha e a telemetria é descartada ou armazenada dentro de limites seguros

### Requirement: Redaction de PII e segredos
O sistema SHALL redigir por denylist e allowlist headers de autenticação, cookies, IP, e-mail, telefone, mensagens de contato, prompts, tokens, chaves e credenciais antes de logar ou exportar.

#### Scenario: PII em erro de provider
- **WHEN** a exception de um provider incluir PII no corpo ou na URL
- **THEN** o valor é substituído antes de chegar ao log, trace ou métrica

#### Scenario: Teste de vazamento
- **WHEN** valores-canário sensíveis percorrerem fluxos de sucesso e falha
- **THEN** nenhum canário aparece na telemetria, resposta pública ou snapshot de teste

### Requirement: Política de dados públicos e privados
O sistema SHALL expor apenas campos de perfil explicitamente allowlisted e SHALL proteger dados de contato por consentimento, finalidade e retenção definida.

#### Scenario: Renderização do contato
- **WHEN** a página pública for carregada
- **THEN** e-mail e telefone brutos não aparecem no HTML, JSON, metadata ou bundle

#### Scenario: Expiração de dado de contato
- **WHEN** o prazo de retenção for atingido
- **THEN** o dado é removido ou anonimizado por processo auditável

### Requirement: Métricas operacionais úteis
O sistema SHALL medir latência, taxa de erro, disponibilidade, retries, circuit breaker, tokens/custo de IA, cache hit ratio e Web Vitals sem usar PII como dimensão.

#### Scenario: Dimensão de alta cardinalidade
- **WHEN** uma métrica tentar usar correlation ID, prompt, URL livre ou identificador de visitante como label
- **THEN** a instrumentação rejeita ou normaliza a dimensão


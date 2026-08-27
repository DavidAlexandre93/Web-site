## Purpose

Garantir que falhas de rede, dependências e renderização sejam detectadas, isoladas e apresentadas ao visitante sem interromper toda a experiência.

## ADDED Requirements

### Requirement: Liveness e readiness separados
O sistema SHALL expor checks distintos de liveness e readiness, com respostas rápidas, tipadas e sem detalhes sensíveis.

#### Scenario: Processo saudável
- **WHEN** o endpoint de liveness for consultado e o processo puder atender requisições
- **THEN** retorna sucesso independentemente de dependências opcionais

#### Scenario: Dependência crítica indisponível
- **WHEN** banco ou configuração crítica falhar
- **THEN** readiness retorna indisponibilidade e correlation ID, enquanto liveness continua refletindo apenas o processo

### Requirement: Dependências externas isoladas
O sistema SHALL aplicar timeout, retry exponencial com jitter apenas em operações seguras, circuit breaker e fallback para integrações externas.

#### Scenario: Falha transitória em leitura
- **WHEN** GitHub ou provedor de conteúdo responder com falha transitória
- **THEN** o sistema tenta novamente dentro do orçamento e usa cache quando o orçamento se esgotar

#### Scenario: Comando não idempotente falha
- **WHEN** uma operação mutável falhar sem confirmação de resultado
- **THEN** o sistema não a repete automaticamente fora do protocolo de idempotência

### Requirement: Estados de erro recuperáveis na interface
O sistema SHALL conter error boundaries globais e por feature, com tela ou card visualmente coerente, mensagem localizada, correlation ID e ação de tentar novamente.

#### Scenario: Erro ao clicar em uma feature
- **WHEN** uma interação provocar erro de renderização ou de API
- **THEN** somente a região afetada é substituída por fallback amigável sempre que possível

#### Scenario: Erro global irrecuperável
- **WHEN** a aplicação não puder renderizar a rota
- **THEN** uma página acessível informa indisponibilidade temporária e oferece recarregar ou voltar ao início

### Requirement: Degradação parcial
O sistema SHALL preservar conteúdo estático e navegação quando projetos dinâmicos, IA, telemetria ou entrega de contato estiverem indisponíveis.

#### Scenario: Múltiplas integrações opcionais falham
- **WHEN** IA e GitHub estiverem simultaneamente indisponíveis
- **THEN** identidade, resumo, competências, projetos curados e navegação continuam utilizáveis

### Requirement: Correlação ponta a ponta
O sistema SHALL propagar ou gerar correlation ID para requisições e exibi-lo em erros recuperáveis sem expor o trace completo ao visitante.

#### Scenario: Falha investigável
- **WHEN** uma operação falhar entre navegador, servidor e provider
- **THEN** o mesmo correlation ID permite localizar logs e traces relacionados


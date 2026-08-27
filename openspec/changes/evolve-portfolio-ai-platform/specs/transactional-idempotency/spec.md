## Purpose

Definir garantias ACID e de idempotência para comandos mutáveis, evitando efeitos duplicados em concorrência, retry de rede ou repetição do visitante.

## ADDED Requirements

### Requirement: Transações ACID para comandos
O sistema SHALL executar alteração de domínio, registro de idempotência e eventos persistidos da mesma operação em uma transação atômica com constraints de integridade.

#### Scenario: Falha antes do commit
- **WHEN** qualquer etapa obrigatória do comando falhar antes do commit
- **THEN** nenhuma alteração parcial permanece visível

#### Scenario: Violação de integridade
- **WHEN** uma constraint de domínio ou banco for violada
- **THEN** a transação é revertida e um erro tipado é retornado

### Requirement: Idempotency-Key em operações mutáveis
O sistema SHALL exigir `Idempotency-Key` válida nos comandos publicados como idempotentes e associá-la ao escopo, versão e hash canônico da requisição.

#### Scenario: Repetição idêntica concluída
- **WHEN** a mesma chave e o mesmo payload forem reenviados após sucesso
- **THEN** o sistema retorna o status e a resposta originais sem repetir efeitos

#### Scenario: Reuso com payload diferente
- **WHEN** a mesma chave for usada com hash de payload diferente
- **THEN** o sistema retorna conflito e não executa o novo comando

### Requirement: Concorrência segura
O sistema SHALL serializar ou arbitrar comandos concorrentes com a mesma chave por constraint transacional, sem condição de corrida.

#### Scenario: Duplicatas simultâneas
- **WHEN** duas requisições equivalentes com a mesma chave chegarem simultaneamente
- **THEN** somente uma executa o efeito e ambas convergem para uma resposta consistente

#### Scenario: Operação ainda em andamento
- **WHEN** uma duplicata chegar antes da conclusão da primeira
- **THEN** recebe estado documentado para aguardar ou consultar o resultado, sem iniciar outra execução

### Requirement: Turnos de IA retomáveis
O sistema SHALL identificar cada turno por ID único e persistir estado suficiente para impedir cobrança ou resposta duplicada após reconexão.

#### Scenario: Streaming interrompido
- **WHEN** o cliente perder a conexão após a geração iniciar
- **THEN** uma repetição idempotente recupera ou consulta o turno existente em vez de criar outro

### Requirement: Contato entregue no máximo uma vez
O sistema SHALL impedir duplicação de solicitações de contato e registrar transições de estado de entrega de forma transacional.

#### Scenario: Retry após timeout de entrega
- **WHEN** o cliente repetir uma solicitação cujo resultado externo é incerto
- **THEN** o sistema reconcilia o estado pela chave antes de decidir qualquer nova entrega

### Requirement: Ciclo de vida da idempotência
O sistema SHALL aplicar expiração documentada aos registros sem invalidar retries dentro da janela garantida.

#### Scenario: Chave expirada
- **WHEN** uma chave for reutilizada após a janela de retenção
- **THEN** a API aplica o comportamento documentado e não o apresenta como replay garantido


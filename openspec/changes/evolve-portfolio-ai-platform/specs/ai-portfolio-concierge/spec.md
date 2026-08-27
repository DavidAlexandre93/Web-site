## Purpose

Oferecer assistência de IA útil e segura para explorar projetos e competências, sempre fundamentada no conteúdo aprovado do portfólio e degradável sem comprometer o site.

## ADDED Requirements

### Requirement: Respostas fundamentadas e transparentes
O sistema SHALL responder perguntas sobre o profissional, projetos e competências usando somente fontes aprovadas do portfólio e SHALL indicar os projetos ou seções usados como fundamento.

#### Scenario: Pergunta coberta pelo portfólio
- **WHEN** o visitante perguntar por uma competência, experiência ou projeto documentado
- **THEN** a resposta referencia o conteúdo relevante e oferece links internos ou de projeto válidos

#### Scenario: Informação não comprovada
- **WHEN** a resposta exigir fato não presente nas fontes aprovadas
- **THEN** o assistente declara a limitação e não inventa experiência, métrica, cliente ou credencial

### Requirement: Descoberta e recomendação estratégica
O sistema SHALL permitir busca semântica, comparação de projetos e recomendações por objetivo do visitante, incluindo perspectivas de recrutador, cliente e profissional técnico.

#### Scenario: Recomendação por objetivo
- **WHEN** o visitante informar uma necessidade técnica ou de negócio
- **THEN** o sistema retorna projetos e competências ordenados com justificativa verificável

#### Scenario: Comparação de projetos
- **WHEN** o visitante selecionar dois ou mais projetos
- **THEN** o sistema apresenta uma comparação estruturada de contexto, stack, capacidades e links sem inferir dados ausentes

### Requirement: Experiência multilíngue com streaming
O sistema SHALL responder na locale ativa, transmitir incrementos de resposta e permitir cancelar uma geração sem congelar a interface.

#### Scenario: Resposta transmitida
- **WHEN** uma solicitação válida for aceita
- **THEN** o visitante recebe estado de progresso e conteúdo incremental até conclusão, cancelamento ou erro tipado

#### Scenario: Cancelamento pelo visitante
- **WHEN** o visitante cancelar uma resposta em andamento
- **THEN** a geração é interrompida, o estado visual é finalizado e uma nova pergunta pode ser enviada

### Requirement: Segurança, moderação e limites
O sistema SHALL moderar entradas aplicáveis, limitar tamanho e frequência, resistir a prompt injection e impedir que o modelo execute ações externas ou revele instruções, segredos ou dados internos.

#### Scenario: Entrada abusiva ou maliciosa
- **WHEN** uma entrada violar políticas, tentar extrair segredo ou exceder limites
- **THEN** o sistema recusa de forma segura, registra apenas metadados redigidos e não chama ferramentas privilegiadas

#### Scenario: Limite de uso excedido
- **WHEN** a cota por sessão ou origem for excedida
- **THEN** a API retorna erro tipado e retry-after sem expor identificadores pessoais

### Requirement: Privacidade e controle do visitante
O sistema SHALL informar que a resposta é gerada por IA, solicitar consentimento antes de enviar texto livre a provedor externo e SHALL evitar armazenar ou registrar prompts brutos por padrão.

#### Scenario: Consentimento ausente
- **WHEN** o visitante ainda não consentiu com o processamento por IA
- **THEN** nenhuma entrada é transmitida ao provedor e alternativas estáticas de navegação são oferecidas

#### Scenario: Entrada contém PII aparente
- **WHEN** a entrada contiver e-mail, telefone, segredo ou outro padrão sensível detectável
- **THEN** o sistema alerta, redige quando possível e não inclui o valor em logs ou telemetria

### Requirement: Operação degradada e provider-agnostic
O sistema SHALL manter a navegação e a descoberta básica de projetos disponíveis quando o provedor de IA estiver desabilitado, indisponível ou sem credenciais.

#### Scenario: Provedor de IA indisponível
- **WHEN** ocorrer timeout, circuit breaker aberto ou configuração ausente
- **THEN** a interface oferece busca determinística, perguntas sugeridas e mensagem amigável para tentar mais tarde

#### Scenario: Troca de provedor compatível
- **WHEN** um adapter alternativo implementar o contrato suportado
- **THEN** o comportamento público e os DTOs permanecem inalterados

### Requirement: Enriquecimento controlado de conteúdo
O sistema SHALL permitir gerar resumos de projetos por audiência em processo controlado, versionado e revisável, sem substituir automaticamente a fonte factual.

#### Scenario: Resumo gerado com sucesso
- **WHEN** um projeto elegível for sincronizado e a IA estiver habilitada
- **THEN** um resumo estruturado é associado à versão da fonte e marcado como gerado por IA

#### Scenario: Fonte de projeto alterada
- **WHEN** o conteúdo factual usado no resumo mudar
- **THEN** o resumo anterior é invalidado até nova geração ou aprovação


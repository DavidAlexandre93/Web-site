## Purpose

Estabelecer uma API pública previsível, validada e documentada para que frontend, integrações e testes compartilhem contratos explícitos e seguros.

## ADDED Requirements

### Requirement: API versionada e tipada
O sistema SHALL expor endpoints sob `/api/v1`, com DTOs de entrada e saída validados em runtime e tipos derivados de uma única fonte de contrato.

#### Scenario: Requisição válida
- **WHEN** o cliente enviar payload conforme o DTO publicado
- **THEN** a API retorna status, headers e corpo compatíveis com o contrato versionado

#### Scenario: Payload inválido
- **WHEN** o payload possuir campo ausente, desconhecido, fora de limite ou com tipo inválido
- **THEN** a API retorna `400` com erro estável e detalhes de validação não sensíveis

### Requirement: Envelope uniforme de sucesso e erro
O sistema SHALL usar respostas discriminadas e um envelope de erro com `code`, `message`, `correlationId`, `retryable` e detalhes sanitizados quando aplicável.

#### Scenario: Exceção interna
- **WHEN** uma exceção não mapeada alcançar a borda HTTP
- **THEN** o cliente recebe mensagem genérica e correlation ID, sem stack, caminho local, segredo ou PII

#### Scenario: Erro conhecido de domínio
- **WHEN** uma regra de negócio impedir a operação
- **THEN** a API mapeia a falha para código e status documentados sem depender do texto da exception

### Requirement: OpenAPI navegável e sincronizado
O sistema SHALL publicar OpenAPI 3.1 em JSON e documentação interativa compatível com Swagger em rota conhecida.

#### Scenario: Consulta da documentação
- **WHEN** um desenvolvedor acessar a rota de documentação
- **THEN** visualiza endpoints, schemas, enums, headers, respostas, exemplos e requisitos de idempotência atuais

#### Scenario: Divergência entre código e contrato
- **WHEN** uma mudança de DTO ou endpoint não atualizar o documento gerado
- **THEN** testes de contrato ou o pipeline falham

### Requirement: Configuração validada por ambiente
O sistema SHALL ler configuração por variáveis de ambiente tipadas, distinguir configuração pública de segredo server-side e falhar cedo para valores obrigatórios inválidos.

#### Scenario: Segredo ausente em produção
- **WHEN** uma capability habilitada depender de segredo não configurado
- **THEN** readiness indica indisponibilidade sem revelar o nome ou valor ao cliente público

#### Scenario: Bundle do navegador inspecionado
- **WHEN** o artefato cliente for analisado
- **THEN** não contém chaves de IA, banco, e-mail, OTLP privado ou tokens de terceiros

### Requirement: Compatibilidade HTTP e segurança de borda
O sistema SHALL aplicar métodos, content types, limites de corpo, timeouts, headers de segurança, CORS e cache coerentes com cada endpoint.

#### Scenario: Método não suportado
- **WHEN** o cliente usar método não documentado
- **THEN** a API retorna `405` e informa métodos permitidos sem executar a operação

#### Scenario: Conteúdo excessivo
- **WHEN** uma requisição exceder o limite documentado
- **THEN** a API interrompe o processamento e retorna `413` sem registrar o corpo


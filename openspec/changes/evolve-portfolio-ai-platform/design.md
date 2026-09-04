## Context

## Implemented slice

Esta primeira fatia mantém o runtime Vite operacional enquanto prepara a migração: o shell recebeu tokens semânticos dark/light, conteúdo inicial visível sem observer, hero editorial responsivo, reduced motion, foco visível e copy completa nas quatro locales. O concierge usa o port `AssistantProvider` e um adapter local fundamentado em fatos allowlisted, com consentimento explícito, sugestões, fontes e fallback determinístico; não há chave ou provider externo no bundle. A descoberta de projetos ganhou busca lexical, filtros de objetivo, estado vazio e imagem local de fallback. Streaming server-side, moderação remota, persistência, idempotência e providers externos permanecem tarefas posteriores da mesma change.

Ver `proposal.md` para a motivação e `specs/*/spec.md` para os contratos observáveis.

O repositório tem cerca de 2,4 mil linhas TypeScript/TSX, React 18 e styled-components, mas está dividido entre vestígios de Next.js e uma SPA Vite. `src/pages` é excluído do typecheck, imports de Next passam por 11 shims, o middleware não roda no runtime Vite, o CI ainda empacota `.next`, animações são carregadas por três scripts CDN e tipos críticos usam `any`. O audit confirmou formatter e lint inoperantes, três erros TypeScript, cobertura que compila somente dois módulos e quatro vulnerabilidades altas. A inspeção visual confirmou conteúdo inicialmente invisível por CSS/observer, baixa legibilidade em regiões, imagens remotas de 16 px ampliadas, traduções incompletas, links sem protocolo e estados mobile frágeis.

O produto continua sendo um portfólio de uma pessoa, portanto o desenho precisa entregar frontend sofisticado, API, IA, persistência e observabilidade sem criar uma topologia de microserviços. Credenciais externas ainda não foram fornecidas; integrações devem ser opcionais, configuráveis e substituíveis.

## Goals / Non-Goals

**Goals:**

- Convergir para um único runtime full-stack com SSR/SSG, APIs server-side e excelente SEO.
- Aplicar arquitetura hexagonal proporcional, por feature, com dependências apontando para domínio/aplicação.
- Criar uma linguagem visual premium e acessível, mantendo progressive enhancement e orçamento de performance.
- Entregar IA fundamentada e mensurável em pontos úteis, com segurança, fallback e custo controlável.
- Tornar contratos, erros, idempotência, ACID, privacidade, telemetria e qualidade verificáveis por testes.
- Fazer a migração em slices reversíveis, preservando o site público utilizável durante o trabalho.

**Non-Goals:**

- Dividir a aplicação em microserviços, event bus externo ou Kubernetes para o volume atual.
- Criar CMS, autenticação pública, área administrativa completa ou rede social.
- Permitir que a IA navegue, envie mensagens, altere conteúdo publicado ou execute ações externas autonomamente.
- Persistir prompts brutos ou dados de contato indefinidamente.
- Introduzir abstrações genéricas, base repositories ou patterns sem um problema concreto.

## Decisions

### 1. Runtime: Next.js App Router como modular monolith

A aplicação será migrada para a release estável corrente do Next.js App Router e React, executada em Node LTS. UI, route handlers, metadata, sitemap, robots, error boundaries e instrumentação residirão no mesmo deploy, sem shims. Server Components serão o padrão; componentes client-side existirão somente para interatividade, motion e chat.

Razões:

- SSR/SSG e metadata resolvem a fragilidade de SEO da SPA sem um segundo servidor.
- Route Handlers oferecem uma borda HTTP server-side para proteger chaves e publicar `/api/v1`.
- `instrumentation.ts` e `onRequestError` fornecem pontos oficiais para OTEL e captura de erros.
- Um único artefato reduz custo operacional e mantém ACID local à aplicação.

Alternativas consideradas:

- **Vite + Fastify**: contratos e Swagger seriam excelentes, mas exigiriam dois runtimes/deploys, CORS e propagação adicional de contexto para um produto pequeno.
- **Astro + API separada**: ótimo para conteúdo estático, porém adicionaria outra composição para chat streaming, banco e idempotência.
- **Manter a SPA**: menor diff inicial, mas preserva limitações de SEO, configuração duplicada e necessidade de BFF separado.

Referências: [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers) e [instrumentation](https://nextjs.org/docs/app/guides/instrumentation).

### 2. Arquitetura hexagonal pragmática por feature

O código será organizado por módulos de negócio, não por pastas globais de controllers/services/repositories:

```text
src/
  app/                         # rotas, layouts, metadata e adapters HTTP/UI
  modules/
    portfolio/
      domain/                  # entidades, value objects e regras puras
      application/             # use cases e ports
      infrastructure/          # GitHub, cache e persistência
      ui/                      # componentes específicos
    assistant/                 # consulta, retrieval, safety e providers de IA
    contact/                   # submissão, consentimento e entrega
  platform/
    api/                       # DTOs, error mapper, OpenAPI e idempotency middleware
    config/                    # env schema e factories
    database/                  # schema, migrations e unit of work
    observability/             # logger, OTEL, métricas e redaction
    resilience/                # timeout, retry e circuit breaker
  design-system/               # tokens, primitives e patterns visuais
  content/                     # conteúdo curado e dicionários tipados
```

Dependências de domínio não importam Next.js, banco, OpenAI, GitHub ou logger. Ports serão interfaces específicas como `ProjectCatalog`, `AIResponder`, `ContactDelivery`, `IdempotencyStore` e `UnitOfWork`; adapters implementam essas interfaces. Use cases recebem dependências por factory explícita no composition root.

Patterns escolhidos, conforme o problema real do catálogo indicado pelo usuário:

- **Adapter** para GitHub, OpenAI, entrega de contato e OTLP.
- **Strategy** para provider de IA, retrieval e fallback determinístico.
- **Repository + Unit of Work** para persistência transacional de agregados e idempotência.
- **Circuit Breaker** e Retry para dependências externas, aplicados como decorators do port.
- **Command** para submissão de contato e turno de IA idempotentes.
- **Factory Method** somente no composition root para montar adapters por env.
- **Observer** apenas onde o stream de tokens/eventos realmente exigir publicação incremental.

Não serão criados Singleton global mutável, service locator, generic repository ou hierarquias por herança. Isso mantém KISS/YAGNI e usa patterns como vocabulário de solução, não como objetivo. Referência: [catálogo de Design Patterns](https://refactoring.guru/design-patterns).

### 3. Design system e experiência visual

O frontend usará CSS custom properties como tokens semânticos, Tailwind CSS para composição, Radix Primitives para comportamentos acessíveis, `class-variance-authority` para variants e Motion instalado como módulo para animações locais. Scripts CDN, styled-components e manipulação imperativa global de DOM serão removidos.

Direção visual:

- estética dark editorial com superfícies grafite, azul elétrico e violeta como acentos, contraste AA e modo claro opcional;
- hero assimétrico com prova de valor, disponibilidade e CTAs claros;
- grid/bento de projetos e competências com filtros, busca e detalhes progressivos;
- concierge de IA como painel contextual, não modal intrusivo;
- tipografia fluida, grid de 12 colunas, container queries e densidade adaptativa;
- motion curta e funcional, com CSS como estado final visível e animação como enhancement;
- skeletons, empty states, toasts acessíveis e fallbacks com a mesma linguagem visual.

Next Image ou imagens locais otimizadas substituirão favicons remotos ampliados. Assets terão dimensões, alt text e política de origem. View Transitions poderão ser usadas como progressive enhancement após feature detection, sem requisito para navegadores que não as suportam.

### 4. Conteúdo, i18n e SEO

Conteúdo factual curado ficará em schemas TypeScript/JSON validados; projetos dinâmicos serão normalizados pelo adapter GitHub e combinados com snapshot local versionado. `next-intl` (ou equivalente estável no momento da implementação) fornecerá rotas e dicionários tipados para `pt-BR`, `en-US`, `fr` e `ja`. Um teste compara todas as locales ao schema-base.

Metadata, `hreflang`, JSON-LD, Open Graph, sitemap e robots serão gerados server-side. Links externos passarão por normalização HTTPS e receberão atributos de segurança. O HTML inicial conterá todo conteúdo essencial; nenhum elemento começará invisível por depender de JavaScript.

### 5. IA em três pontos estratégicos

**Concierge fundamentado:** conversa sobre competências e projetos, com respostas na locale ativa, sugestões de perguntas, streaming e links para fontes internas.

**Descoberta semântica:** busca híbrida lexical/vetorial sobre documentos pequenos e versionados do portfólio. PostgreSQL full-text é o fallback; pgvector e embeddings são habilitados por configuração. O ranking sempre retorna evidência factual associada.

**Enriquecimento controlado:** um comando de sincronização pode gerar resumos estruturados por audiência (recrutador, cliente, técnico). O resultado é versionado pela hash da fonte, marcado como gerado por IA e nunca substitui a fonte curada sem revisão.

Pipeline do concierge:

```text
UI -> DTO/limites -> consentimento/moderação -> retrieval -> montagem de contexto
   -> AIResponder port -> stream sanitizado -> persistência do turno -> métricas
                         \-> fallback determinístico em qualquer falha
```

O primeiro adapter usará o SDK oficial server-side e Responses API com streaming. Entradas passam por limite, detecção básica de PII, moderação e instrução anti-injection. Structured Outputs serão usados para recomendações/comparações; texto livre ficará restrito ao chat. Nenhuma chave será pública e nenhum tool call com efeito externo será disponibilizado ao modelo. Modelo, limites, timeout e orçamento serão envs, evitando hardcode de uma versão que pode mudar.

O prompt contém apenas conteúdo allowlisted. Prompt e resposta integrais não entram em logs; telemetria registra hash, tamanhos, tokens, latência, resultado, modelo lógico e custo estimado. O consentimento da sessão precede transmissão a terceiros. A documentação oficial confirma uso server-side do SDK/Responses API e streaming; moderação será aplicada onde apropriado: [OpenAI API quickstart](https://developers.openai.com/api/docs/quickstart), [streaming](https://developers.openai.com/api/docs/guides/streaming-responses), [safety](https://developers.openai.com/api/docs/guides/safety-best-practices) e [moderations](https://developers.openai.com/api/reference/resources/moderations).

### 6. Contratos HTTP, DTOs e OpenAPI

Zod será a fonte única de schemas runtime e tipos TypeScript. Cada route handler delega a um use case e não contém regra de negócio. A geração OpenAPI 3.1 deriva dos mesmos schemas; `/api/openapi.json` publica o documento e `/docs` apresenta UI Swagger-compatible/Scalar protegível por env em produção.

Endpoints iniciais:

| Método | Rota | Finalidade |
|---|---|---|
| `GET` | `/api/v1/projects` | catálogo normalizado, filtros e fallback cacheado |
| `POST` | `/api/v1/assistant/turns` | cria/reexecuta turno idempotente e inicia stream |
| `GET` | `/api/v1/assistant/turns/{id}` | consulta/reconecta ao resultado do turno |
| `POST` | `/api/v1/contact-requests` | contato consentido e idempotente |
| `GET` | `/api/v1/health/live` | liveness do processo |
| `GET` | `/api/v1/health/ready` | readiness de dependências críticas |

Resposta de erro pública:

```json
{
  "error": {
    "code": "DEPENDENCY_UNAVAILABLE",
    "message": "Serviço temporariamente indisponível. Tente novamente mais tarde.",
    "correlationId": "01...",
    "retryable": true
  }
}
```

Erros serão uma union discriminada com catálogo enum-like (`as const` + schema) para manter exhaustiveness. Exceptions desconhecidas são capturadas apenas na borda e mapeadas para `INTERNAL_ERROR`; o stack completo permanece interno.

### 7. Persistência ACID e idempotência

PostgreSQL será o único banco transacional e Drizzle ORM/migrations fornecerá schema tipado sem esconder SQL. Tabelas principais:

- `contact_requests`: status, consentimento, payload criptografado ou minimizado e prazo de retenção;
- `ai_conversations` e `ai_turns`: estado, locale, hashes, métricas e resposta final sanitizada;
- `portfolio_documents`: fonte, versão, conteúdo allowlisted, embedding opcional e status de revisão;
- `idempotency_records`: escopo, chave, request hash, estado, status HTTP, resposta serializada e expiração;
- `outbox_events`: entrega/reconciliação de efeitos externos quando necessária.

Algoritmo de comando idempotente:

1. Validar header, payload e hash canônico.
2. Abrir transação e tentar inserir `(scope, key)` com constraint única.
3. Se já concluído e hash igual, devolver a resposta persistida; se hash divergir, `409`.
4. Se estiver em andamento, devolver estado documentado sem executar novamente.
5. Executar alteração local, persistir outbox/resultado e concluir o registro na mesma transação.
6. Efeitos externos incertos são reconciliados por identificador próprio antes de retry.

O streaming não mantém uma transação aberta durante a chamada de IA. O turno é reservado atomicamente, a chamada ocorre fora da transação e a conclusão é persistida em nova transação com compare-and-set. Isso evita locks longos sem perder deduplicação.

SQLite em memória não substituirá PostgreSQL nos testes de integração; Testcontainers validará constraints, isolamento e concorrência reais.

### 8. Resiliência e UX de erro

Adapters externos recebem timeout por operação, retry exponencial com jitter apenas para leituras/idempotent operations e circuit breaker com métricas. Cache `stale-if-error` sustenta catálogo. IA e contato possuem bulkheads/rate limits para não consumir todo o runtime.

`error.tsx`, `global-error.tsx`, `not-found.tsx` e boundaries por feature usarão um componente de problema consistente. A mensagem mostra ação de retry e correlation ID copiável, nunca stack. Falha do concierge rebaixa para busca determinística; falha de projetos usa snapshot curado; falha de telemetria nunca derruba a requisição.

Readiness testa configuração e banco com timeout curto. GitHub, IA e entrega de contato são dependências opcionais reportadas em estado resumido, mas não tornam a página estática indisponível. Detalhes completos ficam em endpoint interno/autenticado ou telemetria.

### 9. Observabilidade e privacidade

Pino produzirá JSON em stdout com serializer de erro próprio. Campos mínimos: `timestamp`, `level`, `service`, `environment`, `event`, `source.module`, `source.function|class`, `source.file`, `source.line`, `correlationId`, `traceId`, `spanId`, `durationMs`, `outcome`. `Error.cause` e stack são preservados internamente com source maps privados.

OpenTelemetry instrumentará traces e métricas de servidor, HTTP, banco e providers, exportando OTLP em batch para collector. A decisão separa Pino e OTEL porque, na documentação atual, traces/métricas JS estão estáveis, mas logs e instrumentação browser ainda têm maturidade inferior. Browser envia somente Web Vitals e erros sanitizados a endpoint first-party com sampling; não expõe collector privado. Referências: [OpenTelemetry JavaScript status](https://opentelemetry.io/docs/languages/js/) e [OTLP exporters/Collector](https://opentelemetry.io/docs/languages/js/exporters/).

Redaction ocorre antes de qualquer sink, com paths conhecidos e detector de canários para `authorization`, cookies, tokens, e-mail, telefone, IP, query strings livres, mensagens de contato, prompts e respostas. Métricas não usam labels de alta cardinalidade. O conteúdo público vem de allowlist; e-mail e telefone saem do HTML e são substituídos pelo formulário protegido.

### 10. Segurança da borda

- CSP com nonce/hash, HSTS, `frame-ancestors`, `nosniff`, Referrer-Policy e Permissions-Policy.
- Rate limit por bucket não identificável e limites separados para IA/contato; Turnstile ou adapter anti-bot opcional.
- CSRF/origin check em mutações browser, limite de body, content type estrito e URLs externas allowlisted.
- Segredos somente server-side, env validada e scanner de bundle/segredos no CI.
- Dependências sem uso e scripts CDN são removidos; lockfile e provenance são verificados.
- Dados de contato têm consentimento, minimização, criptografia compatível com o provedor e job de retenção.

### 11. Qualidade e test plan

Ferramentas propostas: Vitest + Testing Library + MSW, Playwright, axe-core, Testcontainers, Lighthouse CI, scanner de dependências/segredos e Stryker nos módulos de domínio críticos. ESLint flat config com TypeScript, React Hooks, jsx-a11y, imports, segurança e complexidade; Prettier e lint-staged/commitlint completam o feedback local.

Matriz de testes:

| Camada | Escopo | Critérios principais |
|---|---|---|
| Unitário | domínio, DTOs, mappers, redaction, ranking, retry/idempotência | 100% statements/branches/functions/lines |
| Componente | design system, formulário, chat, estados e boundaries | teclado, ARIA, locale, loading/empty/error |
| Contrato | todos endpoints contra OpenAPI | request/response/status/header/examples sem drift |
| Integração | PostgreSQL real e adapters mockados | rollback, unique constraints, concorrência, outbox |
| E2E | jornadas desktop/mobile e locales | navegação, IA mockada, contato, retry, reconexão |
| Acessibilidade | axe + teclado/leitor semântico | zero violações sérias/críticas e WCAG 2.2 AA |
| Visual | snapshots em breakpoints/temas | sem regressão não aprovada |
| Performance | Lighthouse/Web Vitals e bundle | budgets definidos e bloqueantes |
| Resiliência | fault injection em GitHub/IA/DB/OTLP | timeout, fallback, circuit breaker e correlação |
| Segurança | SAST, dependency/secret scan e casos abusivos | zero high/critical sem exceção temporária |
| Mutação | regras de idempotência, redaction e grounding | mutation score mínimo alto e sobreviventes revisados |

Cobertura 100% se aplica a código autoral executável. Arquivos gerados (OpenAPI, migrations compiladas, tipos gerados), declarações e composition roots declarativos podem ser excluídos somente por lista explícita documentada. E2E não será usado para maquiar lacunas unitárias.

### 12. CI/CD e governança

O pipeline usará instalação imutável, cache seguro, checks paralelos, build único e promoção do mesmo artefato. Ordem mínima: format/lint/typecheck, unit/coverage, contract/integration, build, E2E/a11y/visual críticos, security e artifact. Actions terão permissões mínimas e versões pinadas; deploys mantêm ambientes e rollback.

Conventional Commits será validado em commit e título de PR; changelog/versionamento semântico será automatizado. Dependabot/Renovate manterá lotes revisáveis. README, ADRs, `.env.example`, OpenAPI, runbook e threat model serão atualizados junto ao código.

### 13. Estratégia para a estrutura Claude Code

Antes de remover, o apply repetirá uma busca exata por `.claude`, `CLAUDE.md`, `.claude-plugin`, `.mcp.json`, comandos Anthropic e referências equivalentes. A auditoria desta proposta encontrou zero alvos. Portanto não há remoção material planejada hoje. `.agents/skills/openspec-*` não é Claude-specific e será preservado; apagar essa pasta quebraria o SDD solicitado.

## Risks / Trade-offs

- [Migração full-stack ampla pode gerar regressões] → migrar por slices, criar characterization tests antes de excluir legado e manter rollback por commit/artefato.
- [Next.js aumenta dependência de framework] → domínio e application permanecem independentes; adapters concentram APIs do framework.
- [100% coverage pode incentivar testes superficiais] → combinar cobertura com mutation testing, contract, E2E e revisão de exclusões.
- [IA pode alucinar, custar mais ou ficar indisponível] → grounding obrigatório, structured outputs, budgets, cache, rate limit, evals e fallback determinístico.
- [pgvector adiciona operação] → manter full-text fallback e ativar vector search por capability flag.
- [Logs com stack podem capturar dados sensíveis] → serialização allowlisted, redaction antes do sink, canary leak tests e acesso restrito ao backend de observabilidade.
- [PII no contato é inevitável para retorno] → consentimento, minimização, criptografia, retenção curta e ausência total em logs/telemetria.
- [Browser OTEL ainda é experimental] → coletar apenas sinais first-party mínimos; OTEL completo fica no servidor.
- [Providers externos podem impor diferenças] → ports estreitos, contract tests por adapter e configuração por env.

## Migration Plan

1. Congelar baseline com screenshots, contratos de conteúdo e characterization tests; corrigir gates sem apagar legado.
2. Criar shell Next App Router, env schema, design tokens, i18n e páginas server-rendered em paralelo ao código atual.
3. Migrar seções para o design system, garantir conteúdo visível sem JavaScript e validar desktop/mobile/a11y/SEO.
4. Introduzir contratos `/api/v1`, OpenAPI, error mapper, correlation ID, Pino e OTEL.
5. Adicionar PostgreSQL, migrations, idempotency store e testes de concorrência/rollback.
6. Migrar catálogo GitHub para adapter server-side com snapshot/cache e remover Axios/CDNs.
7. Entregar contato protegido e retirar e-mail/telefone brutos do HTML.
8. Entregar busca semântica, concierge, streaming, safety, consentimento, evals e fallback.
9. Corrigir CI/CD, coverage 100%, security gates, Conventional Commits, documentação e runbooks.
10. Revalidar inventário Claude-specific; remover somente alvos confirmados. Excluir Vite, shims, pages legadas e build artifacts apenas após equivalência funcional e green build.

Rollback: cada slice será commitável e testável; o deploy mantém o último artefato saudável. Migrações de banco começam aditivas e backward-compatible; remoções ocorrem somente após código novo estabilizar. Feature flags desabilitam IA, vector search e contato sem retirar o portfólio estático.

## Open Questions

- O backend OTLP final (Grafana Cloud, Datadog, Honeycomb ou outro) pode ser escolhido na configuração de ambiente; OTLP/Collector mantém o código neutro.
- O provider de entrega de contato pode ser Resend, SES ou SMTP; o port e os testes permanecem os mesmos.
- Modelo e limites de IA serão escolhidos por custo/latência na implantação e ficam fora do contrato público.

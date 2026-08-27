## 1. Baseline e proteção da migração

- [ ] 1.1 Registrar em `docs/audit/baseline.md` os achados reproduzíveis de format, lint, typecheck, cobertura, build, audit, bundle e inspeção visual.
- [ ] 1.2 Criar characterization tests para conteúdo, navegação, locales, catálogo de projetos e estados atualmente públicos antes de substituir o runtime.
- [ ] 1.3 Salvar baselines Playwright desktop/mobile e inventário de acessibilidade para comparação durante a migração.
- [ ] 1.4 Repetir a descoberta de `.claude`, `CLAUDE.md`, `.claude-plugin`, `.mcp.json` e referências Claude/Anthropic; remover somente alvos confirmados e documentar que `.agents/skills/openspec-*` deve permanecer.
- [ ] 1.5 Remover `.DS_Store` e artefatos compilados versionados, adicionar `.test-dist`, caches e outputs reais ao `.gitignore` e preservar mudanças do usuário não relacionadas.
- [ ] 1.6 Criar um checklist de equivalência e rollback por slice para impedir exclusão prematura do código legado.

## 2. Fundação full-stack e arquitetura

- [ ] 2.1 Migrar dependências e scripts para Next.js App Router, React e Node LTS estáveis, removendo Vite, Axios, styled-components e pacotes obsoletos somente após substituição funcional.
- [ ] 2.2 Criar configuração Next.js, TypeScript estrita (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `useUnknownInCatchVariables`) e aliases coerentes.
- [ ] 2.3 Criar o shell `src/app/[locale]` com layout, página, metadata, fontes locais, providers mínimos e rotas de erro/not-found.
- [ ] 2.4 Criar `src/modules`, `src/platform`, `src/design-system` e `src/content` com regras automáticas de fronteira entre domínio, aplicação, infraestrutura e UI.
- [ ] 2.5 Implementar composition root com factories explícitas e feature flags para IA, vector search, contato e documentação pública.
- [ ] 2.6 Implementar schema de env server/public, `.env.example`, validação fail-fast e testes que impedem segredo no bundle cliente.
- [ ] 2.7 Fazer o novo shell passar build e typecheck em ambiente limpo antes de migrar features.

## 3. Design system e experiência visual

- [ ] 3.1 Configurar Tailwind CSS, tokens semânticos CSS e temas dark/light com contraste WCAG 2.2 AA validado.
- [ ] 3.2 Criar primitives tipados de Button, Link, IconButton, Card, Badge, Field, Dialog/Drawer, Toast, Skeleton, Spinner e ProblemState usando Radix onde houver comportamento complexo.
- [ ] 3.3 Implementar variants com `class-variance-authority`, helpers de classes e documentação dos estados hover, focus-visible, active, disabled, loading, success e error.
- [ ] 3.4 Redesenhar header responsivo, navegação por âncoras, seletor de locale e menu mobile com focus trap, Escape, restauração de foco e scroll lock seguro.
- [ ] 3.5 Redesenhar hero editorial com proposta de valor, CTAs, disponibilidade, prova de competência e compartilhamento acessível.
- [ ] 3.6 Redesenhar About, Stats, Skills, Portfolio e Contact em grid/bento responsivo, com densidade e hierarquia consistentes.
- [ ] 3.7 Instalar Motion como módulo, substituir GSAP/Motion via CDN e garantir que o estado CSS inicial seja sempre visível e funcional sem JavaScript.
- [ ] 3.8 Implementar reduced motion, container queries e validação sem overflow entre 320 px e 2560 px.
- [ ] 3.9 Criar skeletons, empty states, fallbacks parciais, toasts e tela global de indisponibilidade com correlation ID copiável.
- [ ] 3.10 Validar visualmente todos os breakpoints, temas, zoom 200% e interação por teclado antes de remover estilos antigos.

## 4. Conteúdo, internacionalização e SEO

- [ ] 4.1 Definir schemas tipados para perfil, competências, projetos curados, links públicos e fontes permitidas do assistente.
- [ ] 4.2 Migrar conteúdo factual hardcoded para `src/content`, corrigindo categorias técnicas, datas, textos e links inválidos.
- [ ] 4.3 Implementar roteamento e preferência de locale para `pt-BR`, `en-US`, `fr` e `ja` sem depender do middleware Vite incompatível.
- [ ] 4.4 Completar traduções francesas e japonesas e adicionar teste de paridade de chaves, placeholders, labels ARIA e metadata.
- [ ] 4.5 Gerar metadata localizada, canonical, `hreflang`, JSON-LD, Open Graph, sitemap e robots pelo App Router.
- [ ] 4.6 Substituir favicons remotos ampliados por imagens locais/otimizadas com dimensões, alt text, fallback e política de origem.
- [ ] 4.7 Normalizar links externos para HTTPS, aplicar allowlist e `rel`/target seguros, cobrindo URLs sem protocolo por testes.
- [ ] 4.8 Criar teste de renderização sem JavaScript que comprove conteúdo essencial indexável e visível.

## 5. Catálogo de portfólio e integração GitHub

- [ ] 5.1 Modelar entidades/value objects de projeto, URL segura, tecnologia e fonte no módulo `portfolio/domain` sem dependências de framework.
- [ ] 5.2 Definir ports `ProjectCatalog`, `ProjectSnapshot` e use cases de listagem, filtro, busca e sincronização.
- [ ] 5.3 Implementar adapter GitHub server-side tipado com paginação, timeout, ETag, normalização e limite de campos allowlisted.
- [ ] 5.4 Decorar o adapter com retry exponencial+jitter, circuit breaker, cache e stale-if-error, com testes de cada transição.
- [ ] 5.5 Criar snapshot curado/versionado que mantenha projetos disponíveis sem GitHub ou credencial.
- [ ] 5.6 Implementar `GET /api/v1/projects` com filtros, paginação/cursor, DTOs e cache headers documentados.
- [ ] 5.7 Implementar UI de projetos com busca, filtros, detalhes, estados loading/empty/partial/error e retry acessível.
- [ ] 5.8 Cobrir domínio, adapter, cache, rota e UI do catálogo com unit, contract, integration e component tests.

## 6. Contratos HTTP, DTOs e documentação OpenAPI

- [ ] 6.1 Criar schemas Zod compartilhados de locale, paginação, IDs, `Idempotency-Key`, success e error envelopes.
- [ ] 6.2 Criar catálogo enum-like de códigos/status de erro e mapper exaustivo de domínio, validação, dependência, rate limit e exception desconhecida.
- [ ] 6.3 Implementar middleware/helper de correlation ID com propagação segura e headers de resposta.
- [ ] 6.4 Implementar parser de request com content type, limite de body, unknown-field policy e erros de validação sanitizados.
- [ ] 6.5 Gerar OpenAPI 3.1 a partir dos schemas e publicar `/api/openapi.json` com exemplos e security/idempotency headers.
- [ ] 6.6 Publicar `/docs` com UI Swagger-compatible/Scalar e feature flag para restringir a rota em produção.
- [ ] 6.7 Adicionar testes que validam todas as respostas reais contra OpenAPI e detectam endpoint/schema sem documentação.
- [ ] 6.8 Configurar CORS, CSP, HSTS, frame-ancestors, nosniff, Referrer-Policy, Permissions-Policy e método `405` de forma testável.

## 7. Observabilidade, logging e privacidade

- [ ] 7.1 Criar logger Pino JSON com schema estável, serializers e bindings de service/environment/source/correlation/trace.
- [ ] 7.2 Implementar serializer de `Error`/`cause` que capture função ou classe, módulo, arquivo, linha, coluna e stack completa internamente.
- [ ] 7.3 Implementar redaction allowlist/denylist para auth, cookies, tokens, IP, e-mail, telefone, contato, prompt, resposta e query livre antes de qualquer sink.
- [ ] 7.4 Configurar `instrumentation.ts`, `onRequestError`, OpenTelemetry traces/metrics e exportadores OTLP em batch sem tornar o request dependente do collector.
- [ ] 7.5 Instrumentar HTTP, PostgreSQL, cache, GitHub, IA, contato, idempotência, retry e circuit breaker com spans e métricas sem labels de alta cardinalidade.
- [ ] 7.6 Implementar coleta first-party e amostrada de Web Vitals/erros de browser, sem stack pública, PII ou endpoint OTLP privado no cliente.
- [ ] 7.7 Criar canary leak tests que atravessam sucesso, validação, exception, provider e telemetry e falham se qualquer segredo/PII aparecer.
- [ ] 7.8 Criar testes de JSON por linha, campos obrigatórios, correlação log-trace e degradação quando o exporter estiver offline.

## 8. PostgreSQL, ACID e idempotência

- [ ] 8.1 Adicionar PostgreSQL/pgvector local via Compose, Drizzle config e scripts de migration/seed/check compatíveis com CI.
- [ ] 8.2 Modelar e migrar `contact_requests`, `ai_conversations`, `ai_turns`, `portfolio_documents`, `idempotency_records` e `outbox_events` com constraints e índices.
- [ ] 8.3 Implementar port/adapter de `UnitOfWork` e repositories específicos, sem generic repository.
- [ ] 8.4 Implementar canonical request hashing e serviço idempotente para reservar, concluir, falhar, replay e conflito de chave/payload.
- [ ] 8.5 Integrar idempotência à borda HTTP sem manter transação aberta durante chamadas externas ou streaming.
- [ ] 8.6 Implementar outbox/reconciliação para efeitos externos incertos e job seguro de reprocessamento.
- [ ] 8.7 Implementar expiração de idempotency records e retenção/anonymization de contato por job auditável.
- [ ] 8.8 Criar integration tests com PostgreSQL real para rollback, atomicidade, concorrência simultânea, unique constraints, compare-and-set e replay.

## 9. Health checks, resiliência e tratamento de erros

- [ ] 9.1 Implementar `GET /api/v1/health/live` com contrato mínimo e sem depender de integrações opcionais.
- [ ] 9.2 Implementar `GET /api/v1/health/ready` com timeout curto para env/banco e estado resumido de dependências sem dados sensíveis.
- [ ] 9.3 Criar decorators reutilizáveis de timeout, retry seguro, circuit breaker e bulkhead aplicáveis aos ports externos.
- [ ] 9.4 Implementar `error.tsx`, `global-error.tsx`, `not-found.tsx` e boundaries por Portfolio, Assistant e Contact.
- [ ] 9.5 Exibir mensagens localizadas, retry e correlation ID sem stack, caminho, provider, classe ou PII.
- [ ] 9.6 Criar fault-injection tests para timeout, rate limit, schema externo inválido, banco indisponível, collector offline e múltiplas falhas opcionais.
- [ ] 9.7 Validar que o conteúdo estático continua utilizável com GitHub, IA, contato e OTLP desabilitados simultaneamente.

## 10. Contato protegido

- [ ] 10.1 Modelar comando, consentimento, validação, limites e estados do contact request no módulo `contact`.
- [ ] 10.2 Criar DTOs e `POST /api/v1/contact-requests` com origin/CSRF check, anti-spam, rate limit e idempotência.
- [ ] 10.3 Criar formulário acessível e localizado com consentimento explícito, mensagens de sucesso/erro e prevenção de envio duplicado.
- [ ] 10.4 Implementar `ContactDelivery` port, adapter mock/noop para desenvolvimento e adapter configurável de e-mail sem logar conteúdo.
- [ ] 10.5 Integrar entrega ao outbox e reconciliar timeout/resultado incerto sem duplicar mensagem.
- [ ] 10.6 Remover e-mail e telefone brutos do HTML, JSON, metadata, bundle, textos e links públicos, mantendo somente canais allowlisted.
- [ ] 10.7 Cobrir validação, consentimento, idempotência, rate limit, redaction, retenção, entrega e UI com testes.

## 11. Concierge e recursos de IA

- [ ] 11.1 Criar documentos allowlisted e versionados do portfólio, chunking determinístico e comando de sincronização com hash da fonte.
- [ ] 11.2 Implementar retrieval lexical no PostgreSQL e ranking determinístico com evidências e links válidos.
- [ ] 11.3 Implementar embeddings/pgvector sob feature flag, busca híbrida e fallback lexical quando vector search estiver indisponível.
- [ ] 11.4 Definir ports `AIResponder`, `Moderator`, `Retriever` e `AssistantTurnRepository`, além dos DTOs de pergunta, evidência, evento e resultado.
- [ ] 11.5 Implementar adapter OpenAI server-side com Responses API, streaming, structured outputs, timeout, cancelamento e métricas de tokens/custo.
- [ ] 11.6 Implementar adapter de moderação, detector/redactor de PII, limites de entrada e defesa de prompt injection sem tool calls de efeito externo.
- [ ] 11.7 Implementar use case de turno fundamentado que monta contexto allowlisted, responde na locale e recusa fatos não comprovados.
- [ ] 11.8 Implementar criação/consulta/reconexão idempotente de turnos em `/api/v1/assistant/turns` sem duplicar geração ou cobrança.
- [ ] 11.9 Implementar rate limit, quotas/budgets, cache de respostas elegíveis e circuit breaker independente do restante do site.
- [ ] 11.10 Criar painel de concierge acessível com consentimento, perguntas sugeridas, streaming, cancelar, retry, fontes e transparência de IA.
- [ ] 11.11 Criar busca/recomendação por audiência e comparação estruturada de projetos com justificativas rastreáveis.
- [ ] 11.12 Criar enriquecimento controlado de resumos por audiência, versionamento, marca de IA, invalidação por mudança de fonte e revisão antes de publicação.
- [ ] 11.13 Implementar fallback determinístico completo para ausência de chave, recusa, timeout, quota, circuit breaker e erro do provider.
- [ ] 11.14 Criar eval dataset factual/multilíngue e testes de grounding, recusa, prompt injection, PII, moderação, streaming, cancelamento e custo.

## 12. Testes, coverage e budgets

- [ ] 12.1 Configurar Vitest projects para unit, component, contract e integration com coverage real de todo código autoral executável.
- [ ] 12.2 Fixar thresholds globais e por arquivo em 100% de statements, branches, functions e lines, documentando somente exclusões geradas/declarativas.
- [ ] 12.3 Configurar Testing Library, user-event, MSW e fixtures/builders tipados sem snapshots frágeis de implementação.
- [ ] 12.4 Configurar Testcontainers PostgreSQL/pgvector e isolamento de dados por suíte no ambiente local e CI.
- [ ] 12.5 Configurar Playwright para Chromium, Firefox, WebKit e viewports mobile/desktop, cobrindo quatro locales e jornadas críticas.
- [ ] 12.6 Adicionar axe automatizado e roteiros manuais de teclado, foco, zoom, reduced motion e leitor de tela.
- [ ] 12.7 Adicionar visual regression para temas, breakpoints, loading/empty/error e páginas 404/500, com processo explícito de aprovação.
- [ ] 12.8 Configurar Lighthouse CI e budgets de LCP, INP, CLS, acessibilidade, SEO, bundle e requests de terceiros.
- [ ] 12.9 Criar testes de carga para health, projects, contato e turnos de IA mockados, validando rate limit e degradação.
- [ ] 12.10 Configurar mutation testing nos módulos de grounding, redaction, idempotência e error mapping e revisar mutantes sobreviventes.
- [ ] 12.11 Executar o test plan completo e preencher matriz de rastreabilidade requirement → scenario → teste.

## 13. Linters, Conventional Commits, segurança e CI/CD

- [ ] 13.1 Substituir `.eslintrc` quebrado por ESLint flat config com TypeScript, React Hooks, jsx-a11y, imports, segurança, complexidade e boundaries.
- [ ] 13.2 Configurar Prettier, Stylelint para CSS autoral, EditorConfig e scripts `format`, `format:check`, `lint`, `lint:styles` executáveis no Windows/Linux.
- [ ] 13.3 Configurar lint-staged, Husky e commitlint para Conventional Commits sem impedir uso em CI/ambientes sem Git hooks.
- [ ] 13.4 Criar scripts agregados `check`, `test`, `test:coverage`, `test:e2e`, `test:a11y`, `test:contract`, `test:integration` e `security`.
- [ ] 13.5 Reescrever GitHub Actions para o artefato Next real, checks paralelos, PostgreSQL de teste, instalação imutável e promoção do mesmo build.
- [ ] 13.6 Corrigir deploy development/staging/production, environments, concurrency, rollback e retenção de artefato sem referências a `.next` inexistente na etapa errada.
- [ ] 13.7 Adicionar dependency audit/OSV, CodeQL/SAST, secret scan, licença e detecção de dependências não usadas com bloqueio high/critical.
- [ ] 13.8 Pinçar permissões mínimas e versões/SHA de actions e configurar Dependabot/Renovate com atualizações agrupadas e revisáveis.
- [ ] 13.9 Configurar changelog e versionamento semântico automatizados a partir de Conventional Commits.

## 14. Documentação, limpeza final e aceite

- [ ] 14.1 Reescrever README com arquitetura, setup, env, banco, collector, feature flags, scripts e fluxo SDD/OpenSpec.
- [ ] 14.2 Criar ADRs das decisões de runtime, arquitetura hexagonal, IA, PostgreSQL/idempotência, Pino+OTEL e tratamento de PII.
- [ ] 14.3 Documentar API/Swagger, contratos de erro, health, logs JSON, métricas, traces, dashboards/alertas e runbooks de incidentes.
- [ ] 14.4 Criar threat model, política de privacidade/retenção, guia de segurança de IA e procedimento de rotação de segredos.
- [ ] 14.5 Documentar test plan, escopo de coverage, budgets, matriz de rastreabilidade e como aprovar visual regressions.
- [ ] 14.6 Após equivalência e gates verdes, remover `src/shims`, `src/pages` legado, `src/main.tsx`, `vite.config.ts`, middleware incompatível, scripts CDN, estilos antigos e código morto.
- [ ] 14.7 Repetir a busca Claude-specific e confirmar em relatório quais alvos foram removidos ou que nenhum alvo existia, preservando `.agents` OpenSpec.
- [ ] 14.8 Executar format, lint, stylelint, typecheck, coverage 100%, mutation, contract, integration, E2E, axe, visual, Lighthouse, security audit e production build sem falhas.
- [ ] 14.9 Fazer inspeção visual final desktop/mobile/ultrawide, validar modo degradado e comparar contra baseline.
- [ ] 14.10 Atualizar a matriz de aceite de todas as specs, registrar riscos residuais e preparar a change para archive somente quando 100% das tarefas estiverem concluídas.

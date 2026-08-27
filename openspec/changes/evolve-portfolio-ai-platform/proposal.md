## Why

O portfólio está em uma migração incompleta entre Next.js e Vite: mantém páginas e imports de Next por meio de shims, possui gates de lint e tipagem quebrados, cobertura que não mede a aplicação real, pipeline de deploy incompatível com o build e dependências com vulnerabilidades altas. A experiência visual atual também perde conteúdo até ocorrer scroll, contém inconsistências responsivas, de acessibilidade, internacionalização e links, e não dispõe da API, resiliência, observabilidade, privacidade ou base transacional necessárias para oferecer recursos de IA com segurança.

## What Changes

- **BREAKING**: substituir a SPA Vite com shims de Next por um modular monolith full-stack em Next.js App Router, preservando as URLs públicas relevantes e removendo código morto/duplicado da migração anterior.
- **BREAKING**: retirar e-mail e telefone brutos do DOM e substituir os contatos diretos por um fluxo de contato protegido, consentido, idempotente e sem PII em logs ou respostas de erro.
- Redesenhar a interface com um design system moderno, elegante, responsivo e acessível, com progressive enhancement, motion respeitando preferências do usuário, estados de loading/empty/error e conteúdo integral em todos os idiomas suportados.
- Adicionar um concierge de IA multilíngue e fundamentado nos dados reais do portfólio, com streaming, busca e recomendação de projetos, respostas adaptadas ao perfil do visitante, moderação, limites de uso, transparência e fallback sem IA.
- Criar uma camada server-side para GitHub, IA e contato, protegendo credenciais, normalizando falhas externas e isolando provedores por portas e adapters.
- Publicar uma API versionada com DTOs validados em runtime, respostas tipadas, envelope de erro estável, OpenAPI 3.1 e documentação Swagger/Scalar navegável.
- Implementar persistência PostgreSQL transacional para operações mutáveis, idempotência por chave e hash da requisição, constraints de unicidade e reexecução segura da resposta original.
- Implementar health/readiness checks, error boundaries e fallbacks visuais que exibem mensagem amigável e correlation ID sem vazar detalhes internos.
- Implementar logs estruturados JSON com stack completa, módulo/classe, arquivo e linha no ambiente interno, correlação com traces, métricas e exportação OTLP; aplicar redaction de PII, segredos, prompts, cookies, headers e dados de contato.
- Corrigir a cadeia de qualidade e entrega com TypeScript estrito, ESLint flat config, formatter, lint de estilos/segurança/acessibilidade, Conventional Commits, CI coerente, auditoria de dependências e documentação operacional.
- Criar e executar um plano de testes com cobertura de 100% de statements, branches, functions e lines sobre código autoral, complementado por testes de componente, contrato, integração, E2E, acessibilidade, regressão visual, performance, resiliência e segurança.
- Remover somente arquivos e configurações específicos de Claude Code/Anthropic após descoberta verificável. A auditoria atual não encontrou `.claude`, `CLAUDE.md`, `.claude-plugin`, `.mcp.json` ou referências a Claude/Anthropic; `.agents` será preservado por conter as skills OpenSpec necessárias ao SDD.

## Capabilities

### New Capabilities

- `portfolio-experience`: experiência visual, design system, responsividade, acessibilidade, internacionalização, SEO e apresentação confiável do conteúdo.
- `ai-portfolio-concierge`: concierge de IA fundamentado, multilíngue, seguro, observável e resiliente para descoberta e comparação de projetos e competências.
- `platform-api-contracts`: API HTTP versionada com DTOs validados, contratos OpenAPI e respostas/erros uniformes e tipados.
- `resilience-and-health`: health/readiness checks, tolerância a falhas de dependências e estados de erro recuperáveis na interface.
- `observability-and-privacy`: logs JSON, traces e métricas OTEL correlacionados com redaction e política de não exposição de PII.
- `transactional-idempotency`: persistência ACID e execução idempotente de comandos mutáveis, inclusive contato e turnos de IA.
- `quality-and-delivery`: estratégia de testes, cobertura integral, análise estática, segurança de dependências, Conventional Commits e CI/CD reproduzível.

### Modified Capabilities

- Nenhuma. O diretório principal `openspec/specs` ainda não contém capabilities existentes.

## Impact

- Frontend, runtime e roteamento serão reorganizados; `src/shims`, `src/pages` legado, `middleware.ts` incompatível e o entrypoint Vite deixarão de existir após a migração validada.
- Serão afetados `package.json`, lockfile, TypeScript, estilos, i18n, testes, GitHub Actions, scripts de deploy, documentação, assets e variáveis de ambiente.
- Novos sistemas externos opcionais: OpenAI Responses/Moderations por adapter, GitHub API por adapter, PostgreSQL, OpenTelemetry Collector e provedor de entrega de contato. O site continuará funcional em modo degradado quando IA ou integrações opcionais estiverem indisponíveis.
- A configuração de produção exigirá segredos exclusivamente server-side e endpoints OTLP/DB; nenhum segredo será enviado ao bundle do navegador.
- A mudança elimina dívida técnica observada: três erros TypeScript, lint não executável, formatter falhando, cobertura ilusória de 87,71%, CI empacotando artefatos inexistentes e quatro vulnerabilidades altas no audit atual.

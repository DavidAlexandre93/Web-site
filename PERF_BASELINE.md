# Performance Baseline e Melhorias Aplicadas

## 1) Baseline (antes de novas otimizações)

Métricas coletadas no ambiente local/CI container:

- **Build time (next build):** `real 0m17.423s`
- **First Load JS (rota `/`):** `153 kB`
- **First Load JS compartilhado:** `131 kB`
- **Lint:** sem erros

Comandos usados:

```bash
npm run lint
time npm run build
```

> Observação: houve warning de rede no build para download de font/CSS e patch de lockfile do Next (ENETUNREACH), mas o build concluiu com sucesso.

## 2) Instrumentação e observabilidade aplicáveis ao projeto

Este projeto é majoritariamente frontend estático consumindo API externa (GitHub), sem banco de dados próprio. Por isso, a instrumentação foi focada em:

- **Métricas de Web Vitals** no cliente (`reportWebVitals`).
- **Métricas de chamadas HTTP externas** (tempo, status, sucesso/erro) no client Axios.
- **Logs estruturados em pontos críticos** com payload consistente.

## 3) Melhorias implementadas

### API externa (GitHub)

- Timeout reduzido de **8000ms para 4000ms** para falhar rápido.
- Retry com **exponential backoff + jitter** para erros transitórios.
- Classificação explícita de erros transitórios (408/425/429/5xx e erros de rede/timeout).
- Métricas de sucesso/erro por request com `durationMs`.

### Fluxo de carregamento de repositórios

- Paginação real por página (`page + per_page`) em vez de sempre refazer fetch cumulativo.
- Evita duplicidade de itens ao agregar páginas.
- Evita refetch desnecessário do endpoint de usuário em toda paginação (busca 1x, salvo retry).
- Exposição de `hasMoreRepositories` para controle robusto do botão “ver mais”.

### Cache HTTP / Runtime

- Header `Cache-Control: public, max-age=31536000, immutable` para `/_next/static/*`.
- `poweredByHeader: false` para reduzir superfície de fingerprinting.

### Web Vitals

- Coleta via `reportWebVitals` (LCP/CLS/INP/FCP/TTFB) com log estruturado.

## 4) Itens da sua lista: aplicabilidade neste repositório

- **Banco de dados (N+1, índices, EXPLAIN, pool, locks):** não aplicável diretamente (não há DB no projeto).
- **Filas/jobs e concorrência backend:** não aplicável diretamente (não há backend próprio aqui).
- **Rate limiting backend/quotas por endpoint:** aplicável apenas se existir gateway/API intermediária.
- **Frontend, payloads, chamadas externas, observabilidade e build:** aplicável e parcialmente endereçado neste patch.

## 5) Próximos passos recomendados (alto impacto)

1. Mover fetch GitHub para API route server-side com cache (ISR/edge cache) para reduzir variação no cliente.
2. Adicionar dashboard real (Datadog/Grafana/Sentry) para consumir métricas emitidas em log.
3. Definir SLOs formais (ex.: p95 LCP < 2.5s, erro de request externo < 1%).
4. Rodar teste de carga focado em navegação inicial + sessão com carregamento de portfólio.

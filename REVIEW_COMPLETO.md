# Revisão Completa da Aplicação (Checklist 1–14)

## Escopo e método
- Projeto revisado: aplicação Next.js (frontend estático com consumo da API pública do GitHub).
- Evidências coletadas por leitura de código e execução de checks (`npm run lint`, `npm run build`, `npm audit --omit=dev`).
- Não há backend próprio nem banco de dados no repositório; itens de API/DB/infra foram avaliados como **N/A** ou como recomendações para futura evolução.

---

## 1) Arquitetura & Design

### Status geral: **MÉDIO**

### Pontos positivos
- Organização por `components`, `contexts`, `services`, `styles`, `utils` está clara para um portfólio pequeno.
- Internacionalização está centralizada via `next-i18next` e middleware de locale.

### Problemas encontrados
1. **Alto acoplamento em Context Providers**: `ProfileContext` concentra regra de paginação + fetch + estado de loading + fallback de erro no mesmo arquivo. Isso dificulta teste unitário e evolução.  
2. **Dependência implícita de scripts globais** (GSAP/Motion via CDN) em vez de dependência explícita via pacote/npm e imports tipados.
3. **Uso de `any` para styled components** em seções (`const AboutContainerElement = AboutContainer as any;` etc.), reduzindo segurança de tipos.

### Recomendações
- Extrair regras de negócio para hooks/serviços (`useRepositories`, `githubProfileService`).
- Preferir imports npm (`gsap`, `motion`) em vez de scripts remotos globais.
- Remover casts `as any` e tipar refs/containers corretamente.

---

## 2) Clean Code & Qualidade

### Status geral: **MÉDIO**

### Evidências
- Lint executa com múltiplos warnings (uso de `<img>` e hook dependency). 
- Vários componentes têm `useEffect` de animação com lógica extensa e pouca reutilização.

### Problemas encontrados
1. **Warnings de lint não tratados** (principalmente `@next/next/no-img-element` e `react-hooks/exhaustive-deps`).
2. **Funções com responsabilidades combinadas**: ex. efeitos de animação + controle de lifecycle + querySelector no mesmo bloco.
3. **Tratamento de erro silencioso** em `ProfileContext` (`catch { setListRepositories([]) }` sem log/telemetria).

### Recomendações
- Corrigir warnings do lint para estabelecer baseline limpo.
- Extrair animações para hooks utilitários (`useSectionAnimation`).
- Padronizar erro com estado explícito (`error`, `retry`) e logging controlado.

---

## 3) Boas Práticas de API (backend)

### Status: **N/A (sem backend próprio)**

### Observações
- Há apenas consumo da API externa do GitHub por axios no frontend.
- Não há camada de DTO/validação de payload de resposta.

### Recomendações
- Criar adapter de resposta com validação de schema (ex: `zod`) para proteger contra mudanças de contrato da API externa.
- Se evoluir para backend próprio, definir contrato de erro padronizado e versionamento desde o início.

---

## 4) Segurança (Obrigatório)

### Status geral: **MÉDIO/ALTO RISCO**

### Problemas críticos
1. **Scripts de terceiros carregados por CDN** com `beforeInteractive` em `_app.tsx`, sem SRI e fora do local recomendado pelo Next. Isso aumenta superfície de supply-chain/XSS.  
2. **Ausência de headers de segurança explícitos** (CSP, X-Frame-Options, etc.) no `next.config.js`.
3. **Sem estratégia de auditoria de dependências automatizada** (SCA no CI inexistente; `npm audit` não está integrado em pipeline).

### Outros pontos
- Não há autenticação/autorização (esperado para portfólio estático).
- Sem secrets hardcoded detectados no código revisado.

### Recomendações imediatas (quick wins)
- Migrar bibliotecas de animação para dependências npm e remover scripts CDN.
- Configurar `headers()` em `next.config.js` com CSP mínima e demais headers.
- Adicionar job de segurança no CI (audit + Dependabot/Snyk).

---

## 5) Tratamento de Erros & Confiabilidade

### Status geral: **BAIXO/MÉDIO**

### Problemas encontrados
1. **Erro silenciado** no consumo do GitHub, sem diferenciação de timeout/rate limit/erro de rede.
2. **Sem timeout/retry configurado no axios**.
3. **Sem fallback UX para erro** (somente lista vazia), prejudicando observabilidade do problema para usuário.

### Recomendações
- Configurar `timeout` e policy simples de retry com limite (apenas para falhas transitórias).
- Expor estado `error` no contexto para renderizar UI de erro + botão “tentar novamente”.

---

## 6) Performance & Escalabilidade

### Status geral: **MÉDIO**

### Problemas encontrados
1. **Uso de `<img>` em vez de `next/image`** impede otimizações nativas (lazy loading, resizing, formatos).
2. **Carregamento de scripts de animação no início da aplicação** pode impactar TTI.
3. **Sem métricas de performance instrumentadas** (Web Vitals custom/reporting).

### Recomendações
- Migrar imagens para `next/image` e configurar domínios remotos para screenshots do GitHub.
- Lazy-load de seções/efeitos não críticos.
- Adicionar coleta de Web Vitals.

---

## 7) Banco de Dados & Migrações

### Status: **N/A**
- Projeto não possui DB/migrações.

---

## 8) Observabilidade (Logs, Métricas, Tracing)

### Status geral: **BAIXO**

### Problemas encontrados
- Não existe stack de logs estruturados, métricas de erro, ou tracing.
- Sem healthcheck/readiness (em app frontend puro isso pode ser substituído por monitoramento de uptime + synthetic checks).

### Recomendações
- Integrar Sentry (frontend errors) + analytics/perf (ex: Vercel Analytics).
- Padronizar captura de erro de integração com GitHub.

---

## 9) Testes

### Status geral: **BAIXO**

### Problemas encontrados
- Não há testes unitários, integração ou E2E configurados.
- Não há meta de cobertura.

### Recomendações
- Stack mínima: Vitest + Testing Library + Playwright.
- Cobrir fluxos críticos: render principal, troca de idioma, carregamento de repositórios, botão “ver mais”.

---

## 10) Frontend

### Status geral: **MÉDIO**

### Problemas encontrados
1. **Acessibilidade limitada**: presença de `<img>` sem pipeline otimizado e possíveis melhorias em semântica/estados.
2. **Estados de erro/empty/loading não totalmente padronizados** (loading existe, error não).
3. **Dependências globais para animação** tornam comportamento menos previsível.

### Recomendações
- Revisão de a11y com axe/lighthouse.
- Definir padrão de UI states: loading, empty, error, retry.

---

## 11) CI/CD & Qualidade Automatizada

### Status geral: **BAIXO**

### Problemas encontrados
- Não há evidência de pipeline CI no repositório.
- Sem gates de cobertura, SAST e SCA automatizados.

### Recomendações
- Criar GitHub Actions com jobs: `lint`, `build`, `test`, `audit`.
- Falhar build em regressão de qualidade/segurança.

---

## 12) Docker/Infra

### Status: **N/A/Não implementado**
- Sem Dockerfile/compose/IaC no projeto atual.

### Recomendações
- Se for publicar self-hosted: Dockerfile multi-stage + usuário não-root + `.env.example` robusto.

---

## 13) Documentação

### Status geral: **MÉDIO/BAIXO**

### Pontos positivos
- README tem setup e scripts básicos.

### Lacunas
- Falta arquitetura (diagrama), variáveis de ambiente, troubleshooting, padrão de contribuição, estratégia de testes/cobertura.

### Recomendações
- Expandir README com seções completas do checklist solicitado.

---

## 14) Entregáveis do review

## Lista priorizada de problemas

### Alta prioridade
1. Remover scripts CDN globais e adotar dependências npm/import tipado.
2. Corrigir warnings críticos de lint (`<img>`, hooks).
3. Implementar pipeline CI básico com lint/build/test.
4. Adicionar tratamento de erro explícito para integração GitHub (erro + retry + timeout).

### Média prioridade
1. Introduzir testes unitários/integrados para contexts e seções críticas.
2. Adicionar headers de segurança e política CSP.
3. Refatorar contexts para reduzir acoplamento e facilitar testes.

### Baixa prioridade
1. Melhorias de documentação (arquitetura, troubleshooting, contribuição).
2. Instrumentação de métricas/performance observável.

---

## Sugestões de refatoração (antes/depois)

### Exemplo A: Tratamento de erro no ProfileContext

**Antes**
```ts
try {
  // requests
} catch {
  setListRepositories([]);
}
```

**Depois**
```ts
try {
  // requests
  setError(null);
} catch (err) {
  setError(mapHttpError(err));
  logger.warn("github_fetch_failed", { cause: serializeError(err) });
} finally {
  setLoadingRepositories(false);
}
```

### Exemplo B: Imagens em componentes

**Antes**
```tsx
<img src="./github.svg" alt="Logo Github" />
```

**Depois**
```tsx
<Image src="/github.svg" alt="Logo Github" width={24} height={24} />
```

### Exemplo C: dependência de animação via CDN

**Antes**
```tsx
<Script src="https://cdnjs.cloudflare.com/.../gsap.min.js" strategy="beforeInteractive" />
```

**Depois**
```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
```

---

## Plano de ação recomendado

### Fase 1 — Quick wins (1–2 dias)
- Resolver warnings de lint e hook deps.
- Introduzir estado de erro/retry + timeout no axios.
- Expandir README com seção de arquitetura e troubleshooting.

### Fase 2 — Qualidade e segurança (3–5 dias)
- Migrar scripts CDN para npm.
- Adicionar CI (lint/build/test/audit) e Dependabot.
- Incluir headers de segurança em `next.config.js`.

### Fase 3 — Sustentabilidade (1–2 semanas)
- Implementar suíte mínima de testes (unit + integração + E2E smoke).
- Refatorar contexts em hooks/serviços menores.
- Instrumentar monitoramento (Sentry + Web Vitals).

---

## Resultado dos checks executados
- `npm run lint`: concluído com warnings importantes (`<img>`, `beforeInteractive` fora de `_document`, hook deps).
- `npm run build`: build concluído com warnings (incluindo tentativa de patch lockfile/dependência remota e download de fonte).
- `npm audit --omit=dev`: não executado com sucesso por restrição de endpoint (`403 Forbidden`).

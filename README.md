# Portfolio Vite + React

Portfólio pessoal construído com Vite, React, TypeScript e styled-components.

## Experiência AI-native

O portfólio inclui um concierge contextual acessível no canto inferior da página. Nesta fase ele usa um provider local, sem credenciais ou chamadas externas: responde somente com fatos curados, exibe fontes internas e mantém busca e descoberta disponíveis sem IA remota. O contrato `AssistantProvider` em `src/services/assistant.ts` isola a implementação para a futura troca por um endpoint server-side com streaming; nenhuma chave deve ser colocada no frontend.

## Requisitos

- Node.js **20.x**
- npm

> Dica: use `nvm use` (arquivo `.nvmrc` incluso no projeto).

## Instalação

```bash
npm install
```

## Scripts

```bash
npm run dev            # ambiente de desenvolvimento (Vite)
npm run build          # build de produção (Vite)
npm run start          # preview local do build de produção
npm run lint           # validação estática com ESLint
npm run typecheck      # validação de tipos com TypeScript
npm run format         # normaliza fim de linha + trailing spaces
npm run format:check   # valida formatação sem alterar arquivos
npm run test:unit      # testes unitários com Node test runner
npm run test:coverage  # cobertura + quality gate de testes
npm run security:audit # análise de vulnerabilidades (alto/crítico)
```

## CI/CD

O pipeline de CI/CD (`.github/workflows/ci.yml`) implementa:

- Instalação reproduzível de dependências (`npm ci`).
- Validação de formatação, lint e tipagem.
- Testes unitários e testes com cobertura/quality gate.
- Validação de build de produção.
- Auditoria de vulnerabilidades de dependências.
- Geração e publicação de artefatos de build.
- Deploy automatizado por ambiente:
  - `develop` → `development`
  - `main` e tags `v*.*.*` → `staging`
  - tags `v*.*.*` (após staging) → `production`

A promoção para produção ocorre somente por tag semântica e após sucesso do deploy em staging. Para reforçar segurança operacional, recomenda-se configurar proteção de ambientes no GitHub (aprovação manual para `production`).

## Qualidade de código

O projeto usa ESLint com plugins de React e React Hooks para reforçar boas práticas de frontend.

# Relatório de verificação de responsividade e compatibilidade

## Objetivo
Validar se o site se adapta corretamente a diferentes dispositivos e contextos de uso, contemplando variações de tamanho de tela, resolução e motores de navegador, sem quebra de layout ou perda funcional.

## Ambiente e método
- Projeto executado localmente via `next dev` em `http://127.0.0.1:3000`.
- Verificação estática com ESLint.
- Verificação funcional e visual via Playwright.

## Matriz validada
| Contexto | Navegador (engine) | Viewport | Resultado |
|---|---|---:|---|
| Smartphone | Firefox (Gecko) | 390 x 844 | Aprovado |
| Tablet | Firefox (Gecko) | 820 x 1180 | Aprovado |
| Notebook | WebKit | 1366 x 768 | Aprovado |
| Desktop | Firefox (Gecko) | 1920 x 1080 | Aprovado |

## Evidências coletadas (automação)
- **Sem overflow horizontal** em todos os cenários testados (`scrollWidth == clientWidth`).
- **Navegação funcional**:
  - Em smartphone, menu mobile abre (`visibility: visible`) e permite navegação para seção de skills.
  - Em tablet/notebook/desktop, clique no item de navegação “Skills” provoca rolagem da página (`window.scrollY > 0`).
- **Elementos interativos presentes** em todos os cenários (contagem estável de links/botões).

## Resultado
Com base nos testes executados, o site se comporta de forma responsiva e funcional nos cenários avaliados (smartphone, tablet, notebook e desktop), sem indícios de quebra de layout ou perda de funcionalidade.

## Limitação observada
- O engine Chromium falhou neste ambiente de execução (falha nativa de inicialização/segfault do browser headless), impedindo a coleta adicional nesse motor específico durante esta rodada.
- Mesmo com essa limitação ambiental, foi possível validar com sucesso em Firefox e WebKit.

## Recomendações
1. Reexecutar a mesma suíte em Chromium/Chrome em CI ou máquina local para completar matriz de compatibilidade.
2. Incluir essa checagem Playwright em pipeline com viewports padrão (mobile/tablet/desktop).
3. Opcional: complementar com auditoria de acessibilidade (axe/lighthouse).

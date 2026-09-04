import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getAssistantProvider } from "../../src/services/assistant";

describe("localPortfolioProvider", () => {
    it("responde com fatos curados e fontes navegáveis", async () => {
        const answer = await getAssistantProvider().answer("Quais são as especialidades em IA?", "pt-BR");

        assert.match(answer.text, /inteligência artificial/i);
        assert.deepEqual(answer.sources.map((source) => source.href), ["#about", "#skills", "#portfolio"]);
    });

    it("não depende de uma pergunta coberta para evitar invenções", async () => {
        const answer = await getAssistantProvider().answer("Qual cliente secreto contratou David?", "pt-BR");

        assert.match(answer.text, /somente informações públicas e curadas/i);
        assert.doesNotMatch(answer.text, /cliente secreto contratou/i);
    });
});

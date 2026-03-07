import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { middlewareTestUtils } from "../middleware";

describe("middleware locale utilities", () => {
    it("normaliza variações de locale para os idiomas suportados", () => {
        assert.equal(middlewareTestUtils.normalizeLocale("pt-PT"), "pt-BR");
        assert.equal(middlewareTestUtils.normalizeLocale("en-GB"), "en-US");
        assert.equal(middlewareTestUtils.normalizeLocale("fr-CA"), "fr");
        assert.equal(middlewareTestUtils.normalizeLocale("ja-JP"), "ja");
        assert.equal(middlewareTestUtils.normalizeLocale("de-DE"), null);
    });

    it("seleciona locale com base no header Accept-Language", () => {
        const locale = middlewareTestUtils.getLocaleFromAcceptLanguage(
            "de-DE,de;q=0.9,fr-FR;q=0.8,en-US;q=0.7",
        );

        assert.equal(locale, "fr");
    });

    it("resolve locale com base no país para grupos cobertos", () => {
        assert.equal(middlewareTestUtils.getLocaleFromCountry("BR"), "pt-BR");
        assert.equal(middlewareTestUtils.getLocaleFromCountry("JP"), "ja");
        assert.equal(middlewareTestUtils.getLocaleFromCountry("SN"), "fr");
        assert.equal(middlewareTestUtils.getLocaleFromCountry("AU"), "en-US");
        assert.equal(middlewareTestUtils.getLocaleFromCountry("DE"), null);
    });
});

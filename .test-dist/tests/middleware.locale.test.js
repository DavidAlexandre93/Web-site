"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const strict_1 = __importDefault(require("node:assert/strict"));
const middleware_1 = require("../middleware");
(0, node_test_1.describe)("middleware locale utilities", () => {
    (0, node_test_1.it)("normaliza variações de locale para os idiomas suportados", () => {
        strict_1.default.equal(middleware_1.middlewareTestUtils.normalizeLocale("pt-PT"), "pt-BR");
        strict_1.default.equal(middleware_1.middlewareTestUtils.normalizeLocale("en-GB"), "en-US");
        strict_1.default.equal(middleware_1.middlewareTestUtils.normalizeLocale("fr-CA"), "fr");
        strict_1.default.equal(middleware_1.middlewareTestUtils.normalizeLocale("ja-JP"), "ja");
        strict_1.default.equal(middleware_1.middlewareTestUtils.normalizeLocale("de-DE"), null);
    });
    (0, node_test_1.it)("seleciona locale com base no header Accept-Language", () => {
        const locale = middleware_1.middlewareTestUtils.getLocaleFromAcceptLanguage("de-DE,de;q=0.9,fr-FR;q=0.8,en-US;q=0.7");
        strict_1.default.equal(locale, "fr");
    });
    (0, node_test_1.it)("resolve locale com base no país para grupos cobertos", () => {
        strict_1.default.equal(middleware_1.middlewareTestUtils.getLocaleFromCountry("BR"), "pt-BR");
        strict_1.default.equal(middleware_1.middlewareTestUtils.getLocaleFromCountry("JP"), "ja");
        strict_1.default.equal(middleware_1.middlewareTestUtils.getLocaleFromCountry("SN"), "fr");
        strict_1.default.equal(middleware_1.middlewareTestUtils.getLocaleFromCountry("AU"), "en-US");
        strict_1.default.equal(middleware_1.middlewareTestUtils.getLocaleFromCountry("DE"), null);
    });
});

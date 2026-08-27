"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const strict_1 = __importDefault(require("node:assert/strict"));
const sectionNavigation_1 = require("../../src/utils/sectionNavigation");
(0, node_test_1.describe)("createSectionNavigationItems", () => {
    (0, node_test_1.it)("cria itens traduzidos e redireciona para as referências corretas", () => {
        const aboutRef = { current: null };
        const skillsRef = { current: null };
        const portfolioRef = { current: null };
        const contactRef = { current: null };
        const calls = [];
        const scrollToSection = (elementRef) => calls.push(elementRef);
        const translate = (key) => `translated-${key}`;
        const items = (0, sectionNavigation_1.createSectionNavigationItems)({
            scrollToSection,
            sectionRefs: {
                aboutRef,
                skillsRef,
                portfolioRef,
                contactRef,
            },
            translate,
        });
        strict_1.default.equal(items.length, 4);
        strict_1.default.deepEqual(items.map((item) => item.label), ["translated-about", "translated-skills", "translated-portfolio", "translated-contact"]);
        items.forEach((item) => item.onClick());
        strict_1.default.deepEqual(calls, [aboutRef, skillsRef, portfolioRef, contactRef]);
    });
});

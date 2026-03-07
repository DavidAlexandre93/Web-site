import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { createSectionNavigationItems } from "../../src/utils/sectionNavigation";

describe("createSectionNavigationItems", () => {
    it("cria itens traduzidos e redireciona para as referências corretas", () => {
        const aboutRef = { current: null };
        const skillsRef = { current: null };
        const portfolioRef = { current: null };
        const contactRef = { current: null };

        const calls: unknown[] = [];
        const scrollToSection = (elementRef: unknown) => calls.push(elementRef);
        const translate = (key: "about" | "skills" | "portfolio" | "contact") => `translated-${key}`;

        const items = createSectionNavigationItems({
            scrollToSection,
            sectionRefs: {
                aboutRef,
                skillsRef,
                portfolioRef,
                contactRef,
            },
            translate,
        });

        assert.equal(items.length, 4);
        assert.deepEqual(
            items.map((item) => item.label),
            ["translated-about", "translated-skills", "translated-portfolio", "translated-contact"]
        );

        items.forEach((item) => item.onClick());

        assert.deepEqual(calls, [aboutRef, skillsRef, portfolioRef, contactRef]);
    });
});

import { RefObject } from "react";

type SectionTranslationKey = "about" | "skills" | "portfolio" | "contact";

type SectionRefs = {
    aboutRef: RefObject<HTMLElement>;
    skillsRef: RefObject<HTMLElement>;
    portfolioRef: RefObject<HTMLElement>;
    contactRef: RefObject<HTMLElement>;
};

type CreateSectionNavigationOptions = {
    scrollToSection: (elementRef: RefObject<HTMLElement>) => void;
    sectionRefs: SectionRefs;
    translate: (key: SectionTranslationKey) => string;
};

type SectionNavigationItem = {
    id: SectionTranslationKey;
    label: string;
    onClick: () => void;
};

export const createSectionNavigationItems = ({
    scrollToSection,
    sectionRefs,
    translate,
}: CreateSectionNavigationOptions): SectionNavigationItem[] => [
    {
        id: "about",
        label: translate("about"),
        onClick: () => scrollToSection(sectionRefs.aboutRef),
    },
    {
        id: "skills",
        label: translate("skills"),
        onClick: () => scrollToSection(sectionRefs.skillsRef),
    },
    {
        id: "portfolio",
        label: translate("portfolio"),
        onClick: () => scrollToSection(sectionRefs.portfolioRef),
    },
    {
        id: "contact",
        label: translate("contact"),
        onClick: () => scrollToSection(sectionRefs.contactRef),
    },
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSectionNavigationItems = void 0;
const createSectionNavigationItems = ({ scrollToSection, sectionRefs, translate, }) => [
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
exports.createSectionNavigationItems = createSectionNavigationItems;

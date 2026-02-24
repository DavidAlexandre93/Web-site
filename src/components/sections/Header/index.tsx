import React from "react";

import Link from "next/link";
import { HeaderContainer } from "./styles";
import { CgMenuRight } from "react-icons/cg"; /*Menu icon*/
import { useContext } from "react";
import { HeaderContext } from "@/contexts";
import { PageContext } from "@/contexts";
import { useTranslation } from "next-i18next";
import { SwitchLanguage } from "@/components/partials/SwitchLanguage";

export const Header = () => {
    const { toggleShowMenu } = useContext(HeaderContext);
    const {
        scrollToSection,
        aboutRef,
        skillsRef,
        portfolioRef,
        contactRef,
        isVisibleHeader,
        handlePageTop,
    } = useContext(PageContext);

    const { t } = useTranslation();

    return (
        <HeaderContainer
            visibleHeader={isVisibleHeader}
            isPageTop={handlePageTop}
        >
            <div className="content-header">
                <Link href={"/"}>
                    <a className="homeLink">
                        <h1>David Alexandre Fernandes</h1>
                    </a>
                </Link>

                <nav>
                    <ul>
                        <li>
                            <button onClick={() => scrollToSection(aboutRef)}>
                                {t("about")}
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection(skillsRef)}>
                                {t("skills")}
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => scrollToSection(portfolioRef)}
                            >
                                {t("portfolio")}
                            </button>
                        </li>
                        <li>
                            <button onClick={() => scrollToSection(contactRef)}>
                                {t("contact")}
                            </button>
                        </li>
                    </ul>
                </nav>

                <SwitchLanguage />
                <div className="buttons-header">
                    <button className="btn-menuMobile" onClick={toggleShowMenu}>
                        <CgMenuRight size={25} />
                    </button>
                </div>
            </div>
        </HeaderContainer>
    );
};

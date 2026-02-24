import { MenuMobileContainer } from "./styles";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { HeaderContext } from "@/contexts";
import { PageContext } from "@/contexts";
import { useTranslation } from "next-i18next";

export const MenuMobile = () => {
    const { activeMenu, toggleShowMenu } = useContext(HeaderContext);
    const { scrollToSection, aboutRef, skillsRef, portfolioRef, contactRef } =
        useContext(PageContext);
    const { t } = useTranslation();

    return (
        <MenuMobileContainer activeMenu={activeMenu}>
            <button className="closeMenu" onClick={toggleShowMenu}>
                <IoClose size={30} />
            </button>
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
                    <button onClick={() => scrollToSection(portfolioRef)}>
                        {t("portfolio")}
                    </button>
                </li>
                <li>
                    <button onClick={() => scrollToSection(contactRef)}>
                        {t("contact")}
                    </button>
                </li>
            </ul>
        </MenuMobileContainer>
    );
};

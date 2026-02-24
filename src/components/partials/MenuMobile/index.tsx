import { useContext, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { MenuMobileContainer } from "./styles";
import { HeaderContext, PageContext } from "@/contexts";
import { getGsap, getMotionAnimate } from "@/utils";

export const MenuMobile = () => {
    const menuRef = useRef<HTMLElement>(null);
    const { activeMenu, toggleShowMenu } = useContext(HeaderContext);
    const { scrollToSection, aboutRef, skillsRef, portfolioRef, contactRef } =
        useContext(PageContext);
    const { t } = useTranslation();

    useEffect(() => {
        const gsap = getGsap();
        const animate = getMotionAnimate();
        const menuElement = menuRef.current;

        if (!gsap || !menuElement) {
            return;
        }

        if (activeMenu) {
            gsap.fromTo(
                menuElement.querySelectorAll("li"),
                { x: 24, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power3.out",
                }
            );
        }

        const floatAnimation = animate?.(
            menuElement.querySelector(".closeMenu"),
            { y: [0, -5, 0], rotate: [0, 6, -6, 0] },
            { duration: 2, repeat: Infinity, easing: "ease-in-out" }
        );

        return () => floatAnimation?.stop();
    }, [activeMenu]);

    return (
        <MenuMobileContainer ref={menuRef} activeMenu={activeMenu}>
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

import { useContext, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { MenuMobileContainer } from "./styles";
import { HeaderContext, PageContext } from "@/contexts";
import { createSectionNavigationItems, getGsap, getMotionAnimate } from "@/utils";

export const MenuMobile = () => {
    const { activeMenu, toggleShowMenu } = useContext(HeaderContext);
    const { scrollToSection, aboutRef, skillsRef, portfolioRef, contactRef } =
        useContext(PageContext);
    const { t } = useTranslation();

    const navigationItems = createSectionNavigationItems({
        scrollToSection,
        sectionRefs: { aboutRef, skillsRef, portfolioRef, contactRef },
        translate: t,
    });

    useEffect(() => {
        const gsap = getGsap();
        const animate = getMotionAnimate();
        const closeMenuButton = document.querySelector<HTMLElement>(".closeMenu");
        const menuElement = closeMenuButton?.closest("nav");

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

        const floatAnimation = closeMenuButton
            ? animate?.(
                  closeMenuButton,
                  { y: [0, -5, 0], rotate: [0, 6, -6, 0] },
                  { duration: 2, repeat: Infinity, easing: "ease-in-out" }
              )
            : undefined;

        return () => {
            if (typeof floatAnimation?.stop === "function") {
                floatAnimation.stop();
            }
        };
    }, [activeMenu]);

    return (
        <MenuMobileContainer activeMenu={activeMenu} aria-hidden={!activeMenu}>
            <button className="closeMenu" onClick={toggleShowMenu} aria-label="Fechar menu mobile">
                <IoClose size={30} />
            </button>
            <ul>
                {navigationItems.map((item) => (
                    <li key={item.id}>
                        <button onClick={item.onClick}>{item.label}</button>
                    </li>
                ))}
            </ul>
        </MenuMobileContainer>
    );
};

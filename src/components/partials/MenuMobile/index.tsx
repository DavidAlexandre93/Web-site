import { useContext, useEffect, useRef } from "react";
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
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

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

    useEffect(() => {
        if (!activeMenu) {
            return;
        }

        const menuElement = closeButtonRef.current?.closest("nav");

        if (!menuElement) {
            return;
        }

        previousFocusRef.current =
            document.activeElement instanceof HTMLElement ? document.activeElement : null;
        let focusFrame = 0;
        const focusCloseButtonWhenVisible = () => {
            const closeButton = closeButtonRef.current;

            if (!closeButton || menuElement.getAttribute("aria-hidden") === "true") {
                return;
            }

            if (getComputedStyle(closeButton).visibility === "visible") {
                closeButton.focus();
                return;
            }

            focusFrame = window.requestAnimationFrame(focusCloseButtonWhenVisible);
        };

        focusFrame = window.requestAnimationFrame(focusCloseButtonWhenVisible);

        const previousOverflowY = document.body.style.overflowY;
        document.body.style.overflowY = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                toggleShowMenu();
                return;
            }

            if (event.key !== "Tab") {
                return;
            }

            const focusableElements = Array.from(
                menuElement.querySelectorAll<HTMLElement>(
                    'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
                )
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (!firstElement || !lastElement) {
                return;
            }

            const focusIsOutsideMenu = !menuElement.contains(document.activeElement);

            if ((event.shiftKey && document.activeElement === firstElement) || (event.shiftKey && focusIsOutsideMenu)) {
                event.preventDefault();
                lastElement.focus();
            } else if ((!event.shiftKey && document.activeElement === lastElement) || (!event.shiftKey && focusIsOutsideMenu)) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.cancelAnimationFrame(focusFrame);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflowY = previousOverflowY;
            previousFocusRef.current?.focus();
        };
    }, [activeMenu, toggleShowMenu]);

    return (
        <MenuMobileContainer id="mobile-navigation" activeMenu={activeMenu} aria-hidden={!activeMenu}>
            <button
                ref={closeButtonRef}
                className="closeMenu"
                onClick={toggleShowMenu}
                aria-label="Fechar menu mobile"
            >
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

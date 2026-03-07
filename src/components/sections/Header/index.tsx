import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";
import { useTranslation } from "next-i18next";
import { HeaderContainer } from "./styles";
import { HeaderContext, PageContext } from "@/contexts";
import { SwitchLanguage } from "@/components/partials/SwitchLanguage";
import { createSectionNavigationItems, getGsap, getMotionAnimate } from "@/utils";

export const Header = () => {
    const headerRef = useRef<HTMLElement>(null);
    const { toggleShowMenu, activeMenu } = useContext(HeaderContext);
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

    const navigationItems = createSectionNavigationItems({
        scrollToSection,
        sectionRefs: { aboutRef, skillsRef, portfolioRef, contactRef },
        translate: t,
    });

    useEffect(() => {
        const gsap = getGsap();
        const animate = getMotionAnimate();
        const headerElement = headerRef.current;

        if (!gsap || !headerElement) {
            return;
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                headerElement.querySelector(".homeLink"),
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" }
            );

            gsap.fromTo(
                headerElement.querySelectorAll("nav li"),
                { y: -14, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.08,
                    duration: 0.45,
                    ease: "power2.out",
                    delay: 0.2,
                }
            );

            gsap.fromTo(
                headerElement.querySelector(".buttons-header"),
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, delay: 0.3 }
            );
        }, headerElement);

        const pulse = animate
            ? animate(
                  ".btn-menuMobile",
                  { scale: [1, 1.06, 1], rotate: [0, -3, 0, 3, 0] },
                  { duration: 2.1, repeat: Infinity, easing: "ease-in-out" }
              )
            : undefined;

        return () => {
            context.revert();
            pulse?.stop?.();
        };
    }, []);

    const HeaderContainerElement = HeaderContainer as any;

    return (
        <HeaderContainerElement
            ref={headerRef}
            visibleHeader={isVisibleHeader}
            isPageTop={handlePageTop}
        >
            <div className="content-header">
                <Link href="/">
                    <a className="homeLink">
                        <Image
                            src="/profile.svg"
                            alt="Imagem de perfil"
                            className="profileLogo"
                            width={168}
                            height={168}
                        />
                        <h1>David Alexandre Fernandes</h1>
                    </a>
                </Link>

                <nav>
                    <ul>
                        {navigationItems.map((item) => (
                            <li key={item.id}>
                                <button onClick={item.onClick} data-ripple>{item.label}</button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <SwitchLanguage />
                <div className="buttons-header">
                    <button
                        className="btn-menuMobile"
                        onClick={toggleShowMenu}
                        aria-label="Abrir menu mobile"
                        aria-expanded={activeMenu}
                        data-ripple
                    >
                        <span className="sr-only">Abrir menu mobile</span>
                        <CgMenuRight size={25} />
                    </button>
                </div>
            </div>
        </HeaderContainerElement>
    );
};

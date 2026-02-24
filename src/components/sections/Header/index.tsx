import React, { useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";
import { useTranslation } from "next-i18next";
import { HeaderContainer } from "./styles";
import { HeaderContext, PageContext } from "@/contexts";
import { SwitchLanguage } from "@/components/partials/SwitchLanguage";
import { getGsap, getMotionAnimate } from "@/utils";

export const Header = () => {
    const headerRef = useRef<HTMLElement>(null);
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

        const pulse = animate?.(
            ".btn-menuMobile",
            { scale: [1, 1.06, 1], rotate: [0, -3, 0, 3, 0] },
            { duration: 2.1, repeat: Infinity, easing: "ease-in-out" }
        );

        return () => {
            context.revert();
            pulse?.stop();
        };
    }, []);

    return (
        <HeaderContainer
            ref={headerRef}
            visibleHeader={isVisibleHeader}
            isPageTop={handlePageTop}
        >
            <div className="content-header">
                <Link href="/">
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

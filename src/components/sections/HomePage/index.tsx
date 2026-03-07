import { HomeContainer } from "./styles";
import { RiShareBoxFill } from "react-icons/ri"; /*Share icon*/
import { BsArrowDownShort } from "react-icons/bs"; /*ArrowDown icon*/
import { FiCopy } from "react-icons/fi"; /*Copy icon*/
import { FaWhatsapp, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { PageContext } from "@/contexts";
import { useTranslation } from "next-i18next";
import { getGsap, getMotionAnimate } from "@/utils";

export const HomePage = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollToSection, handleCopyEmailInput, aboutRef, emailRef } =
        useContext(PageContext);
    const { t } = useTranslation();

    useEffect(() => {
        const gsap = getGsap();
        const animate = getMotionAnimate();
        const element = containerRef.current;

        if (!element || !gsap) {
            return;
        }

        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
            .fromTo(
                element.querySelector(".titleHome"),
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9 }
            )
            .fromTo(
                element.querySelector(".descriptionHome"),
                { y: 35, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                "-=0.4"
            )
            .fromTo(
                element.querySelector(".links"),
                { y: 25, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                "-=0.3"
            )
            .fromTo(
                element.querySelector(".email"),
                { scale: 0.94, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.7 },
                "-=0.2"
            );

        if (animate) {
            animate(
                ".iconArrow",
                { y: [0, 6, 0] },
                { duration: 1.8, repeat: Infinity, easing: "ease-in-out" }
            );
            animate(
                ".iconCopy",
                { rotate: [0, -8, 8, 0] },
                { duration: 1.9, repeat: Infinity, easing: "ease-in-out" }
            );
        }

        return () => {
            timeline.kill();
        };
    }, []);

    const HomeContainerElement = HomeContainer as any;
    const pageUrl = "https://www.david-alexandre.dev/";
    const shareMessage = "Conheça o portfólio de David Alexandre Fernandes";

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareMessage} ${pageUrl}`)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareMessage)}`,
    };

    return (
        <HomeContainerElement ref={containerRef} id="home">
            <h2 className="titleHome">{t("professionalPortfolio")}</h2>
            <p className="descriptionHome">{t("frontendDeveloper")}</p>
            <div className="links">
                <button
                    onClick={() => scrollToSection(aboutRef)}
                    title={t("knowAboutTitle")}
                >
                    <span>{t("knowAbout")}</span>
                    <BsArrowDownShort size={25} className="iconArrow" />
                </button>
                <Link href="https://github.com/DavidAlexandre93">
                    <a title={t("accessGithubTitle")}>
                        <span>GitHub</span> <RiShareBoxFill size={18} />
                    </a>
                </Link>
            </div>
            <div className="email">
                <div className="text-mail">
                    <p ref={emailRef}>davidalexandrefernandes@outlook.com</p>
                </div>
                <button
                    title={t("copyEmailTitle")}
                    onClick={handleCopyEmailInput}
                >
                    <FiCopy size={20} className="iconCopy" />
                </button>
            </div>
            <div className="shareLinks" aria-label="Links para compartilhar o portfólio">
                <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer" title="Compartilhar no WhatsApp">
                    <FaWhatsapp size={18} /> WhatsApp
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noreferrer" title="Compartilhar no LinkedIn">
                    <FaLinkedin size={18} /> LinkedIn
                </a>
                <a href={shareLinks.twitter} target="_blank" rel="noreferrer" title="Compartilhar no Twitter">
                    <FaTwitter size={18} /> Twitter
                </a>
            </div>
        </HomeContainerElement>
    );
};

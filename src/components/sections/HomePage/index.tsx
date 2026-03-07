import { HomeContainer } from "./styles";
import { RiShareBoxFill } from "react-icons/ri"; /*Share icon*/
import { BsArrowDownShort } from "react-icons/bs"; /*ArrowDown icon*/
import { FiCheck, FiCopy, FiLoader } from "react-icons/fi"; /*Copy icon*/
import { FaWhatsapp, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "@/contexts";
import { useTranslation } from "next-i18next";
import { getGsap, getMotionAnimate } from "@/utils";

export const HomePage = () => {
    const containerRef = useRef<HTMLElement>(null);
    const [copyState, setCopyState] = useState<"idle" | "loading" | "success">("idle");
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
            )
            .fromTo(
                element.querySelector(".shareLinks"),
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.45 },
                "-=0.3"
            );

        const context = gsap.context(() => {
            gsap.to(".ambientGlow", {
                yPercent: -22,
                xPercent: 8,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    scrub: 1,
                    start: "top top",
                    end: "bottom top",
                },
            });

            gsap.fromTo(
                ".shareLinks a",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.4,
                    scrollTrigger: {
                        trigger: ".shareLinks",
                        start: "top 85%",
                    },
                }
            );
        }, element);

        const mouseMoveHandler = (event: MouseEvent) => {
            const bounds = element.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width;
            const y = (event.clientY - bounds.top) / bounds.height;

            gsap.to(".ambientGlow", {
                x: (x - 0.5) * 24,
                y: (y - 0.5) * 18,
                duration: 0.45,
                ease: "power2.out",
                overwrite: true,
            });
        };

        element.addEventListener("mousemove", mouseMoveHandler);

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
            element.removeEventListener("mousemove", mouseMoveHandler);
            context.revert();
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

    const handleCopy = () => {
        setCopyState("loading");

        window.setTimeout(() => {
            const copied = handleCopyEmailInput();
            setCopyState(copied ? "success" : "idle");

            if (copied) {
                window.setTimeout(() => {
                    setCopyState("idle");
                }, 1800);
            }
        }, 250);
    };

    const copyButtonLabel =
        copyState === "success"
            ? t("copied", { defaultValue: "Copiado" })
            : t("copyEmailTitle");

    return (
        <HomeContainerElement ref={containerRef} id="home" data-reveal>
            <div className="ambientGlow" aria-hidden="true" />
            <h2 className="titleHome">{t("professionalPortfolio")}</h2>
            <p className="descriptionHome">{t("frontendDeveloper")}</p>
            <div className="links">
                <button
                    onClick={() => scrollToSection(aboutRef)}
                    title={t("knowAboutTitle")}
                    data-ripple
                >
                    <span>{t("knowAbout")}</span>
                    <BsArrowDownShort size={25} className="iconArrow" />
                </button>
                <Link href="https://github.com/DavidAlexandre93">
                    <a title={t("accessGithubTitle")} data-ripple>
                        <span>GitHub</span> <RiShareBoxFill size={18} />
                    </a>
                </Link>
            </div>
            <div className="email" data-status={copyState}>
                <div className="text-mail">
                    <p ref={emailRef}>davidalexandrefernandes@outlook.com</p>
                </div>
                <button
                    title={copyButtonLabel}
                    data-ripple
                    onClick={handleCopy}
                    aria-live="polite"
                    aria-busy={copyState === "loading"}
                >
                    {copyState === "loading" ? (
                        <FiLoader size={20} className="iconLoadingCopy" />
                    ) : copyState === "success" ? (
                        <FiCheck size={20} className="iconCopySuccess" />
                    ) : (
                        <FiCopy size={20} className="iconCopy" />
                    )}
                </button>
            </div>
            <div className="shareLinks" aria-label="Links para compartilhar o portfólio">
                <a href={shareLinks.whatsapp} target="_blank" rel="noreferrer" title="Compartilhar no WhatsApp" data-ripple>
                    <FaWhatsapp size={18} /> WhatsApp
                </a>
                <a href={shareLinks.linkedin} target="_blank" rel="noreferrer" title="Compartilhar no LinkedIn" data-ripple>
                    <FaLinkedin size={18} /> LinkedIn
                </a>
                <a href={shareLinks.twitter} target="_blank" rel="noreferrer" title="Compartilhar no Twitter" data-ripple>
                    <FaTwitter size={18} /> Twitter
                </a>
            </div>
        </HomeContainerElement>
    );
};

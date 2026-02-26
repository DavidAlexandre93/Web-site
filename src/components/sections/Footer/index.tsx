import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { FaLevelUpAlt } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { FooterContainer } from "./styles";
import { PageContext } from "@/contexts";
import { getGsap, getMotionAnimate } from "@/utils";

export const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);
    const { scrollPageTop } = useContext(PageContext);
    const { t } = useTranslation();

    useEffect(() => {
        const gsap = getGsap();
        const animate = getMotionAnimate();
        const footerElement = footerRef.current;

        if (!gsap || !footerElement) {
            return;
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                footerElement.querySelector(".texts"),
                { y: 18, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: { trigger: footerElement, start: "top 92%" },
                }
            );

            gsap.fromTo(
                footerElement.querySelectorAll(".socials a"),
                { y: 10, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.5,
                    delay: 0.2,
                    scrollTrigger: { trigger: footerElement, start: "top 92%" },
                }
            );
        }, footerElement);

        const upIcon = footerElement.querySelector(".btnTopPage svg");
        const upAnimation =
            animate && upIcon
                ? animate(
                      upIcon,
                      { y: [0, -6, 0] },
                      { duration: 1.4, repeat: Infinity, easing: "ease-in-out" }
                  )
                : undefined;


    return () => {
            context.revert();
            upAnimation?.stop?.();
        };
    }, []);


    const FooterContainerElement = FooterContainer as any;

    return (
        <FooterContainerElement ref={footerRef}>
            <div className="content">
                <div className="texts">
                    <p>{t("rightsReserved")}, © 2022 David Alexandre Fernandes.</p>
                    <div className="socials">
                        <Link
                            href={"https://www.linkedin.com/in/david-fernandes-08b005b4/"}
                        >
                            <a title={t("accessLinkedinTitle")}>
                                <img src="./linkedin.svg" alt="Logo do Linkedin" />
                            </a>
                        </Link>
                        <Link href={"https://github.com/DavidAlexandre93"}>
                            <a title={t("accessGithubTitle")}>
                                <img src="./github.svg" alt="Logo do Github" />
                            </a>
                        </Link>
                        <Link href={"https://www.instagram.com/davidalexandrepro/"}>
                            <a title={t("accessInstagramTitle")}>
                                <img src="./instagram.svg" alt="Logo do Instagram" />
                            </a>
                        </Link>
                    </div>
                </div>
                <button
                    className="btnTopPage"
                    onClick={scrollPageTop}
                    title={t("homeTitle")}
                >
                    <span>{t("home")}</span>
                    <FaLevelUpAlt size={30} />
                </button>
            </div>
        </FooterContainerElement>
    );
};

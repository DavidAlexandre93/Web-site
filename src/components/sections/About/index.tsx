import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { PageContext } from "@/contexts";
import { getGsap, getMotionAnimate } from "@/utils";
import { TitleSection } from "@/components/partials/TitleSection";
import { AboutContainer } from "./styles";

export const About = () => {
    const { aboutRef } = useContext(PageContext);
    const { t } = useTranslation();

    useEffect(() => {
        const gsap = getGsap();
        const animate = getMotionAnimate();
        const section = aboutRef.current;

        if (!section || !gsap) {
            return;
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                section.querySelector(".textAbout"),
                { x: -45, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: { trigger: section, start: "top 72%" }
                }
            );
            gsap.fromTo(
                section.querySelector(".image"),
                { x: 45, opacity: 0, rotate: 2 },
                {
                    x: 0,
                    opacity: 1,
                    rotate: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: { trigger: section, start: "top 72%" }
                }
            );
        }, section);

        if (animate) {
            animate(
                section.querySelectorAll(".linkSocial a"),
                { y: [0, -4, 0], scale: [1, 1.04, 1] },
                { duration: 2.4, repeat: Infinity, easing: "ease-in-out", delay: 0.2 }
            );
        }

        return () => context.revert();
    }, []);

    return (
        <AboutContainer ref={aboutRef}>
            <div className="contentAbout">
                <div className="textAbout">
                    <TitleSection>{t("about")}</TitleSection>
                    <p>{t("descriptionAboutMe")}</p>
                    <div className="linkSocial">
                        <Link href="https://github.com/DavidAlexandre93">
                            <a title={t("accessGithubTitle")}>
                                <img src="./github.svg" alt="Logo Github" />
                            </a>
                        </Link>
                        <Link href="https://www.instagram.com/davidalexandrepro/">
                            <a title={t("accessInstagramTitle")}>
                                <img
                                    src="./instagram.svg"
                                    alt="Logo Instagram"
                                />
                            </a>
                        </Link>
                        <Link href="https://www.linkedin.com/in/david-fernandes-08b005b4/">
                            <a title={t("accessLinkedinTitle")}>
                                <img src="./linkedin.svg" alt="Logo Linkedin" />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="image">
                    <img
                        src="./profile.jpeg"
                        alt={t("illustrativePhoto")}
                        title={t("illustrativePhoto")}
                    />
                </div>
            </div>
        </AboutContainer>
    );
};

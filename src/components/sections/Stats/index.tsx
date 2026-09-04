import { StatsContainer } from "./styles";
import { FaBriefcase } from "react-icons/fa";
import { RiGitRepositoryLine } from "react-icons/ri"; /*Repository icon */
import { MdCloudQueue, MdOutlinePsychology } from "react-icons/md";
import { ProfileContext } from "@/contexts";
import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "next-i18next";
import { getGsap, getMotionAnimate } from "@/utils";

export const Stats = () => {
    const statsRef = useRef<HTMLElement>(null);
    const { amountRepositories } = useContext(ProfileContext);
    const { t } = useTranslation();

    useEffect(() => {
        const gsap = getGsap();
        const animate = getMotionAnimate();
        const section = statsRef.current;

        if (!section || !gsap) {
            return;
        }

        const cards = section.querySelectorAll(".cardStats");
        const context = gsap.context(() => {
            gsap.fromTo(
                cards,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 75%"
                    }
                }
            );
        }, section);

        if (animate) {
            cards.forEach((card) => {
                const icon = card.querySelector(".icon");
                if (icon) {
                    animate(
                        icon,
                        { y: [0, -6, 0], scale: [1, 1.06, 1] },
                        { duration: 2.2, repeat: Infinity, easing: "ease-in-out" }
                    );
                }
            });
        }


    return () => {
            context.revert();
        };
    }, []);



    const StatsContainerElement = StatsContainer as any;

    return (
        <StatsContainerElement ref={statsRef} data-reveal>
            <div className="cardStats" title={t("yearsExperience")} data-tilt>
                <div className="icon">
                    <FaBriefcase size={40} />
                </div>
                <h3>10+</h3>
                <p>{t("yearsExperience")}</p>
            </div>

            <div className="cardStats" title={t("projectsTitle")} data-tilt>
                <div className="icon">
                    <RiGitRepositoryLine size={40} />
                </div>
                <h3>{amountRepositories}</h3>
                <p>{t("projects")}</p>
            </div>

            <div className="cardStats" title={t("cloudProviders")} data-tilt>
                <div className="icon">
                    <MdCloudQueue size={40} />
                </div>
                <h3>3</h3>
                <p>{t("cloudProviders")}</p>
            </div>

            <div className="cardStats" title={t("featuredProjects")} data-tilt>
                <div className="icon">
                    <MdOutlinePsychology size={40} />
                </div>
                <h3>3</h3>
                <p>{t("featuredProjects")}</p>
            </div>
        </StatsContainerElement>
    );
};

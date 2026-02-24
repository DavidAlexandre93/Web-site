import { StatsContainer } from "./styles";
import { FaBug } from "react-icons/fa"; /*Bug icon */
import { RiGitRepositoryLine } from "react-icons/ri"; /*Repository icon */
import { MdTimer } from "react-icons/md"; /*Timer icon */
import { MdOutlineLightbulb } from "react-icons/md"; /*Light icon */
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


    return (
        <StatsContainer ref={statsRef}>
            <div className="cardStats" title={t("debugsTitle")}>
                <div className="icon">
                    <FaBug size={40} />
                </div>
                <h3>40+</h3>
                <p>{t("debugs")}</p>
            </div>

            <div className="cardStats" title={t("projectsTitle")}>
                <div className="icon">
                    <RiGitRepositoryLine size={40} />
                </div>
                <h3>{amountRepositories}</h3>
                <p>{t("projects")}</p>
            </div>

            <div className="cardStats" title={t("hourProgrammingTitle")}>
                <div className="icon">
                    <MdTimer size={40} />
                </div>
                <h3>3800+</h3>
                <p>{t("hourProgramming")}</p>
            </div>

            <div className="cardStats" title={t("numberIdeasTitle")}>
                <div className="icon">
                    <MdOutlineLightbulb size={40} />
                </div>
                <h3>100</h3>
                <p>{t("numberIdeas")}</p>
            </div>
        </StatsContainer>
    );
};

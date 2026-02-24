import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { PageContext } from "../../../contexts/PageContext";
import { ProfileContext } from "../../../contexts/ProfileContext";
import { getGsap, getMotionAnimate } from "../../../utils/animationLibraries";
import { CardProject } from "../../partials/CardProject";
import Loading from "../../partials/Loading";
import { TitleSection } from "../../partials/TitleSection";
import { PortfolioContainer } from "./styles";

export const Portfolio = () => {
    const {
        listRepositories,
        loadMoreRepositories,
        listRepositoriesCurrentPage,
        amountRepositories,
        loadingRepositories,
    } = useContext(ProfileContext);
    const { portfolioRef } = useContext(PageContext);
    const { t } = useTranslation();

    useEffect(() => {
        const gsap = getGsap();
        const animate = getMotionAnimate();
        const section = portfolioRef.current;

        if (!gsap || !section) {
            return;
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                section.querySelectorAll(".project-card"),
                { opacity: 0, y: 50, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: { trigger: section, start: "top 70%" }
                }
            );
        }, section);

        if (animate) {
            const button = section.querySelector(".loadMoreRepositories p");
            if (button) {
                animate(
                    button,
                    { opacity: [0.5, 1, 0.5] },
                    { duration: 1.8, repeat: Infinity, easing: "ease-in-out" }
                );
            }
        }

        return () => context.revert();
    }, [portfolioRef, listRepositories.length]);

    return (
        <PortfolioContainer ref={portfolioRef}>
            <div className="content">
                <div className="title-portfolio">
                    <TitleSection>{t("portfolio")}</TitleSection>
                    <p>
                        {t("allMyProjectsInitial")} {" "}
                        <Link href="https://www.github.com/DavidAlexandre93">
                            <a title={t("accessGithubTitle")}>Github</a>
                        </Link>
                        {t("allMyProjectsFinish")}
                    </p>
                </div>
                <div className="content-portfolio">
                    {listRepositories.map((repository) => (
                        <CardProject
                            title={repository.name}
                            description={repository.description}
                            repository={repository.html_url}
                            website={repository.homepage}
                            imageUrl={`https://raw.githubusercontent.com/DavidAlexandre93/${repository.name}/main/printscreen/application.png`}
                            key={repository.html_url}
                        />
                    ))}
                    {loadingRepositories ? (
                        <Loading />
                    ) : (
                        listRepositoriesCurrentPage <
                            Math.ceil(amountRepositories / 5) && (
                            <button
                                className="loadMoreRepositories"
                                onClick={loadMoreRepositories}
                                title={t("seeMoreTitle")}
                            >
                                <p>{t("seeMore")}</p>
                            </button>
                        )
                    )}
                </div>
            </div>
        </PortfolioContainer>
    );
};

import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { PageContext, ProfileContext } from "@/contexts";
import { getGsap, getMotionAnimate } from "@/utils";
import { CardProject } from "@/components/partials/CardProject";
import Loading from "@/components/partials/Loading";
import { TitleSection } from "@/components/partials/TitleSection";
import { PortfolioContainer } from "./styles";

export const Portfolio = () => {
    const {
        listRepositories,
        loadMoreRepositories,
        loadingRepositories,
        repositoriesError,
        retryLoadRepositories,
        hasMoreRepositories,
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
                    scrollTrigger: { trigger: section, start: "top 70%" },
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

    const PortfolioContainerElement = PortfolioContainer as any;

    return (
        <PortfolioContainerElement ref={portfolioRef} id="portfolio">
            <div className="content">
                <div className="title-portfolio">
                    <TitleSection>{t("portfolio")}</TitleSection>
                    <p>
                        {t("allMyProjectsInitial")}{" "}
                        <Link href="https://www.github.com/DavidAlexandre93">
                            <a title={t("accessGithubTitle")}>Github</a>
                        </Link>
                        {t("allMyProjectsFinish")}
                    </p>
                </div>
                <div className="content-portfolio">
                    {repositoriesError && (
                        <button className="loadMoreRepositories" onClick={retryLoadRepositories}>
                            <p>{repositoriesError} Clique para tentar novamente.</p>
                        </button>
                    )}

                    {!repositoriesError &&
                        listRepositories.map((repository) => (
                            <CardProject
                                title={repository.name}
                                description={repository.description}
                                repository={repository.html_url}
                                website={repository.homepage}
                                imageUrl={`https://raw.githubusercontent.com/${repository.owner.login}/${repository.name}/${repository.default_branch}/favicon.ico`}
                                key={repository.html_url}
                            />
                        ))}

                    {loadingRepositories ? (
                        <Loading />
                    ) : (
                        !repositoriesError &&
                        hasMoreRepositories && (
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
        </PortfolioContainerElement>
    );
};

import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiSearch, FiStar } from "react-icons/fi";
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
    const [query, setQuery] = useState("");
    const [intent, setIntent] = useState<"all" | "ai" | "quality">("all");
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const visibleRepositories = listRepositories.filter((repository) => {
        const searchableText = `${repository.name} ${repository.description || ""}`.toLocaleLowerCase();
        const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
        const matchesIntent = intent === "all" || searchableText.includes(intent === "ai" ? "ai" : "quality");
        return matchesQuery && matchesIntent;
    });

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
        <PortfolioContainerElement ref={portfolioRef} id="portfolio" data-reveal>
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
                <div className="portfolio-discovery">
                    <label className="search-field">
                        <FiSearch aria-hidden="true" />
                        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("portfolioSearch")} aria-label={t("portfolioSearch")} />
                    </label>
                    <div className="intent-filters" aria-label={t("portfolioDiscovery")}>
                        <button className={intent === "all" ? "active" : ""} onClick={() => setIntent("all")}>{t("portfolioAll")}</button>
                        <button className={intent === "ai" ? "active" : ""} onClick={() => setIntent("ai")}><FiStar aria-hidden="true" /> {t("portfolioRecommended")}</button>
                        <button className={intent === "quality" ? "active" : ""} onClick={() => setIntent("quality")}>{t("portfolioQuality")}</button>
                    </div>
                </div>
                <div className="content-portfolio">
                    {repositoriesError && (
                        <button className="loadMoreRepositories" onClick={retryLoadRepositories} data-ripple>
                            <p>{repositoriesError} Clique para tentar novamente.</p>
                        </button>
                    )}

                    {!repositoriesError &&
                        visibleRepositories.map((repository) => (
                            <CardProject
                                title={repository.name}
                                description={repository.description}
                                repository={repository.html_url}
                                website={repository.homepage}
                                imageUrl="/profile.svg"
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
                                data-ripple
                            >
                                <p>{t("seeMore")}</p>
                            </button>
                        )
                    )}

                    {!loadingRepositories && !repositoriesError && visibleRepositories.length === 0 && (
                        <p className="empty-state" role="status">{t("portfolioNoResults")}</p>
                    )}
                </div>
            </div>
        </PortfolioContainerElement>
    );
};

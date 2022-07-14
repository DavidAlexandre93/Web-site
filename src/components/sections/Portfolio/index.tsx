import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useContext } from "react";
import { PageContext } from "../../../contexts/PageContext";
import { ProfileContext } from "../../../contexts/ProfileContext";
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

    return (
        <PortfolioContainer ref={portfolioRef}>
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
                    {listRepositories.map((repository, index) => (
                        <CardProject
                            title={repository.name}
                            description={repository.description}
                            repository={repository.html_url}
                            website={repository.homepage}
                            imageUrl={`https://raw.githubusercontent.com/DavidAlexandre93/${repository.name}/main/printscreen/application.png`}
                            key={index}
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

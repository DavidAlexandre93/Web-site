import { CardProjectContainer } from "./styles";
import { BsArrowBarUp } from "react-icons/bs"; /*ArrowUp icon */
import { GoFileDirectory } from "react-icons/go"; /*Directory icon */
import Link from "next/link";
import { useTranslation } from "next-i18next";

type CardProjectProps = {
    title: string;
    description: string | null;
    website: string | null;
    repository: string;
    imageUrl: string;
};

export const CardProject = ({
    title,
    description,
    website,
    repository,
    imageUrl,
}: CardProjectProps) => {
    const { t } = useTranslation();
    return (
        <CardProjectContainer>
            <div className="image">
                {imageUrl ? (
                    <img src={imageUrl} alt={title} />
                ) : (
                    <p>{t("notFoundImage")}</p>
                )}
            </div>
            <div className="overlay">
                <div className="description">
                    <div className="title">
                        <h4>{title}</h4>
                        <button
                            name={t("viewInformation")}
                            title={t("viewInformation")}
                        >
                            <BsArrowBarUp size={30} />
                        </button>
                    </div>
                    <div className="infos">
                        <p>{description}</p>
                        <div className="links">
                            <Link href={website || repository}>
                                {website ? (
                                    <a
                                        className="link"
                                        title={t("websiteOnlineTitle")}
                                    >
                                        {t("websiteOnline")}
                                    </a>
                                ) : (
                                    <a
                                        className="link"
                                        title={t("accessRepository")}
                                    >
                                        {t("accessRepository")}
                                    </a>
                                )}
                            </Link>
                            {website && (
                                <Link href={repository}>
                                    <a
                                        className="link-extra"
                                        title={t("accessRepository")}
                                    >
                                        <GoFileDirectory size={25} />
                                    </a>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </CardProjectContainer>
    );
};

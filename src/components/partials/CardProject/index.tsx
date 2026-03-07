import Image from "next/image";
import { BsArrowBarUp } from "react-icons/bs";
import { GoFileDirectory } from "react-icons/go";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { CardProjectContainer } from "./styles";

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
        <CardProjectContainer className="project-card" data-tilt data-reveal>
            <div className="image">
                {imageUrl ? (
                    <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" objectPosition="center" />
                ) : (
                    <p>{t("notFoundImage")}</p>
                )}
            </div>
            <div className="overlay">
                <div className="description">
                    <div className="title">
                        <h4>{title}</h4>
                        <button name={t("viewInformation")} title={t("viewInformation")} data-ripple>
                            <BsArrowBarUp size={30} />
                        </button>
                    </div>
                    <div className="infos">
                        <p>{description}</p>
                        <div className="links">
                            <Link href={website || repository}>
                                {website ? (
                                    <a className="link" title={t("websiteOnlineTitle")} data-ripple>
                                        {t("websiteOnline")}
                                    </a>
                                ) : (
                                    <a className="link" title={t("accessRepository")} data-ripple>
                                        {t("accessRepository")}
                                    </a>
                                )}
                            </Link>
                            {website && (
                                <Link href={repository}>
                                    <a className="link-extra" title={t("accessRepository")} data-ripple>
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

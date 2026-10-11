import Image from "next/image";
import { useTranslation } from "next-i18next";
import { CardSkillContainer } from "./styles";

type CardSkillProps = {
    isSkillActive: boolean;
    pathIconSkill?: string;
    nameSkill: string;
    typeSkill: string;
};

export const CardSkill = ({
    isSkillActive,
    pathIconSkill,
    nameSkill,
    typeSkill,
}: CardSkillProps) => {
    const { t } = useTranslation();
    const normalizedIconPath = pathIconSkill
        ? pathIconSkill.startsWith("/")
            ? pathIconSkill
            : `/${pathIconSkill.replace(/^\.\//, "")}`
        : null;

    return (
        <CardSkillContainer skillActive={isSkillActive}>
            <div className="image">
                {normalizedIconPath ? (
                    <Image src={normalizedIconPath} alt={nameSkill} title={nameSkill} width={60} height={60} />
                ) : (
                    <span className="skill-mark" aria-hidden="true">{nameSkill.slice(0, 2)}</span>
                )}
            </div>
            <div className="title">
                <h4>{nameSkill}</h4>
                <p>{typeSkill}</p>
            </div>
            <p className="skill-active">{t("active")}</p>
        </CardSkillContainer>
    );
};

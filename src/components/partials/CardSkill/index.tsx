import { useTranslation } from "next-i18next";
import { CardSkillContainer } from "./styles";

type CardSkillProps = {
    isSkillActive: boolean;
    pathIconSkill: string;
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
    return (
        <CardSkillContainer skillActive={isSkillActive}>
            <div className="image">
                <img src={pathIconSkill} alt={nameSkill} title={nameSkill} />
            </div>
            <div className="title">
                <h4>{nameSkill}</h4>
                <p>{typeSkill}</p>
            </div>
            <p className="skill-active">{t("active")}</p>
        </CardSkillContainer>
    );
};

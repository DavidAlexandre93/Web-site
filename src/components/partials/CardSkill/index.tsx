import { useTranslation } from "next-i18next";
import { useEffect, useRef } from "react";
import { getMotionAnimate } from "@/utils";
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
    const cardRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const animate = getMotionAnimate();
        const card = cardRef.current;

        if (!animate || !card) {
            return;
        }

        const stop = animate(
            card,
            { transform: ["translateY(0px)", "translateY(-3px)", "translateY(0px)"] },
            { duration: 3, repeat: Infinity, easing: "ease-in-out" }
        );

        return () => {
            stop?.stop?.();
        };
    }, []);

    return (
        <CardSkillContainer ref={cardRef} skillActive={isSkillActive}>
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

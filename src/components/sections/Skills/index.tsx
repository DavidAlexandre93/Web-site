import { useTranslation } from "next-i18next";
import { useContext, useEffect } from "react";
import { PageContext } from "@/contexts";
import { CardSkill } from "@/components/partials/CardSkill";
import { TitleSection } from "@/components/partials/TitleSection";
import { SkillsContainer } from "./styles";
import { getGsap } from "@/utils";

export const Skills = () => {
    const { skillsRef } = useContext(PageContext);
    const { t } = useTranslation();

    useEffect(() => {
        const gsap = getGsap();
        const section = skillsRef.current;

        if (!gsap || !section) {
            return;
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                section.querySelectorAll(".category"),
                { opacity: 0, y: 55 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    stagger: 0.2,
                    ease: "power2.out",
                    scrollTrigger: { trigger: section, start: "top 70%" }
                }
            );
        }, section);

        return () => context.revert();
    }, [skillsRef]);

    return (
        <SkillsContainer ref={skillsRef}>
            <div className="contentSkills">
                <div className="titleSkills">
                    <p>{t("allTechnologies")}</p>
                    <TitleSection>{t("skills")}</TitleSection>
                </div>

                <div className="category">
                    <div className="title-category">
                        <h4>Backend</h4>
                    </div>
                    <div className="category-content">
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./mongodb.svg"
                            nameSkill="MongoDB"
                            typeSkill={t("nonRelationalDB")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./mysql.svg"
                            nameSkill="MySQL"
                            typeSkill={t("relationalDB")}
                        />
                        <CardSkill
                            isSkillActive={false}
                            pathIconSkill="./python.svg"
                            nameSkill="Python"
                            typeSkill={t("Python API")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./nodejs.svg"
                            nameSkill="NodeJS"
                            typeSkill="Software"
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./express.svg"
                            nameSkill="Express"
                            typeSkill="Framework NodeJS"
                        />
                         <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./go.svg"
                            nameSkill="Golang"
                            typeSkill="Golang API"
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./fastapi.svg"
                            nameSkill="FastAPI"
                            typeSkill="Framework FastAPI"
                        />
                    </div>
                </div>

                <div className="category">
                    <div className="title-category">
                        <h4>Frontend Frameworks e {t("library")}</h4>
                    </div>
                    <div className="category-content">
                        <CardSkill
                            isSkillActive={true}
                            nameSkill="ReactJS"
                            pathIconSkill="./reactjs.svg"
                            typeSkill={t("library") + " JS"}
                        />
                        <CardSkill
                            isSkillActive={true}
                            nameSkill="NextJS"
                            pathIconSkill="./nextjs.svg"
                            typeSkill="Framework React"
                        />
                        <CardSkill
                            isSkillActive={false}
                            nameSkill="JQuery"
                            pathIconSkill="./jquery.svg"
                            typeSkill="Framework JS"
                        />
                        <CardSkill
                            isSkillActive={false}
                            nameSkill="Bootstrap"
                            pathIconSkill="./bootstrap.svg"
                            typeSkill="Framework CSS"
                        />
                        <CardSkill
                            isSkillActive={false}
                            nameSkill="Sass e Less"
                            pathIconSkill="./sass.svg"
                            typeSkill="Framework CSS"
                        />
                        <CardSkill
                            isSkillActive={false}
                            nameSkill="Ant Design CSS"
                            pathIconSkill="./tailwind.svg"
                            typeSkill="Framework CSS"
                        />
                        <CardSkill
                            isSkillActive={true}
                            nameSkill="Styled Components"
                            pathIconSkill="./styled-components.png"
                            typeSkill="CSS in JS"
                        />
                        <CardSkill
                            isSkillActive={true}
                            nameSkill="Typescript"
                            pathIconSkill="./typescript.svg"
                            typeSkill="Superset JS"
                        />
                    </div>
                </div>

                <div className="category">
                    <div className="title-category">
                        <h4>{t("languages")}</h4>
                    </div>
                    <div className="category-content">
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./html.svg"
                            nameSkill="HTML"
                            typeSkill={t("markupLanguage")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./css.svg"
                            nameSkill="CSS"
                            typeSkill={t("stylingLanguage")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./javascript.svg"
                            nameSkill="Javascript"
                            typeSkill={t("programmingLanguage")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./sql.png"
                            nameSkill="SQL"
                            typeSkill={t("queryLanguage")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./python.svg"
                            nameSkill="Python"
                            typeSkill={t("programmingLanguage")}
                        />
                         <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./go.svg"
                            nameSkill="Golang"
                            typeSkill={t("programmingLanguage")}
                        />
                    </div>
                </div>


                <div className="category">
                    <div className="title-category">
                        <h4>{t("Cloud Computing")}</h4>
                    </div>
                    <div className="category-content">
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./aws.svg"
                            nameSkill="AWS"
                            typeSkill={t("markupLanguage")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./gcp.svg"
                            nameSkill="GCP"
                            typeSkill={t("stylingLanguage")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./terraform.svg"
                            nameSkill="Terraform"
                            typeSkill={t("programmingLanguage")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./kubernetes.svg"
                            nameSkill="Kubernetes"
                            typeSkill={t("queryLanguage")}
                        />
                        <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./docker.svg"
                            nameSkill="Docker"
                            typeSkill={t("programmingLanguage")}
                        />
                         <CardSkill
                            isSkillActive={true}
                            pathIconSkill="./devops.svg"
                            nameSkill="DevOps"
                            typeSkill={t("programmingLanguage")}
                        />
                    </div>
                </div>
            </div>
        </SkillsContainer>
    );
};

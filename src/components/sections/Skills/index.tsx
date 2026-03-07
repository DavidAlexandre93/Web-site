import { useTranslation } from "next-i18next";
import { useContext, useEffect, useMemo, useState } from "react";
import { PageContext } from "@/contexts";
import { CardSkill } from "@/components/partials/CardSkill";
import { TitleSection } from "@/components/partials/TitleSection";
import { SkillsContainer } from "./styles";
import { getGsap } from "@/utils";

type SkillItem = {
    isSkillActive: boolean;
    pathIconSkill: string;
    nameSkill: string;
    typeSkill: string;
};

const MOBILE_BREAKPOINT = 768;
const MOBILE_SKILLS_LIMIT = 4;

export const Skills = () => {
    const { skillsRef } = useContext(PageContext);
    const { t } = useTranslation();
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const [isMobileViewport, setIsMobileViewport] = useState(false);

    const categories = useMemo(
        () => [
            {
                key: "backend",
                title: "Backend",
                items: [
                    {
                        isSkillActive: true,
                        pathIconSkill: "./mongodb.svg",
                        nameSkill: "MongoDB",
                        typeSkill: t("nonRelationalDB"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./mysql.svg",
                        nameSkill: "MySQL",
                        typeSkill: t("relationalDB"),
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./python.svg",
                        nameSkill: "Python",
                        typeSkill: t("Python API"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./nodejs.svg",
                        nameSkill: "NodeJS",
                        typeSkill: "Software",
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./express.svg",
                        nameSkill: "Express",
                        typeSkill: "Framework NodeJS",
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./go.svg",
                        nameSkill: "Golang",
                        typeSkill: "Golang API",
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./fastapi.svg",
                        nameSkill: "FastAPI",
                        typeSkill: "Framework FastAPI",
                    },
                ],
            },
            {
                key: "frontend",
                title: `Frontend Frameworks e ${t("library")}`,
                items: [
                    {
                        isSkillActive: true,
                        nameSkill: "ReactJS",
                        pathIconSkill: "./reactjs.svg",
                        typeSkill: `${t("library")} JS`,
                    },
                    {
                        isSkillActive: true,
                        nameSkill: "NextJS",
                        pathIconSkill: "./nextjs.svg",
                        typeSkill: "Framework React",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "JQuery",
                        pathIconSkill: "./jquery.svg",
                        typeSkill: "Framework JS",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "Bootstrap",
                        pathIconSkill: "./bootstrap.svg",
                        typeSkill: "Framework CSS",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "Sass e Less",
                        pathIconSkill: "./sass.svg",
                        typeSkill: "Framework CSS",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "Ant Design CSS",
                        pathIconSkill: "./tailwind.svg",
                        typeSkill: "Framework CSS",
                    },
                    {
                        isSkillActive: true,
                        nameSkill: "Styled Components",
                        pathIconSkill: "./styled-components.png",
                        typeSkill: "CSS in JS",
                    },
                    {
                        isSkillActive: true,
                        nameSkill: "Typescript",
                        pathIconSkill: "./typescript.svg",
                        typeSkill: "Superset JS",
                    },
                ],
            },
            {
                key: "languages",
                title: t("languages"),
                items: [
                    {
                        isSkillActive: true,
                        pathIconSkill: "./html.svg",
                        nameSkill: "HTML",
                        typeSkill: t("markupLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./css.svg",
                        nameSkill: "CSS",
                        typeSkill: t("stylingLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./javascript.svg",
                        nameSkill: "Javascript",
                        typeSkill: t("programmingLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./sql.png",
                        nameSkill: "SQL",
                        typeSkill: t("queryLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./python.svg",
                        nameSkill: "Python",
                        typeSkill: t("programmingLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./go.svg",
                        nameSkill: "Golang",
                        typeSkill: t("programmingLanguage"),
                    },
                ],
            },
            {
                key: "cloud",
                title: t("Cloud Computing"),
                items: [
                    {
                        isSkillActive: true,
                        pathIconSkill: "./aws.svg",
                        nameSkill: "AWS",
                        typeSkill: t("markupLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./gcp.svg",
                        nameSkill: "GCP",
                        typeSkill: t("stylingLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./terraform.svg",
                        nameSkill: "Terraform",
                        typeSkill: t("programmingLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./kubernetes.svg",
                        nameSkill: "Kubernetes",
                        typeSkill: t("queryLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./docker.svg",
                        nameSkill: "Docker",
                        typeSkill: t("programmingLanguage"),
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./devops.svg",
                        nameSkill: "DevOps",
                        typeSkill: t("programmingLanguage"),
                    },
                ],
            },
        ],
        [t]
    );

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
                    scrollTrigger: { trigger: section, start: "top 70%" },
                }
            );
        }, section);

        return () => context.revert();
    }, [skillsRef]);

    useEffect(() => {
        const updateViewport = () => {
            setIsMobileViewport(window.innerWidth <= MOBILE_BREAKPOINT);
        };

        updateViewport();
        window.addEventListener("resize", updateViewport);

        return () => window.removeEventListener("resize", updateViewport);
    }, []);

    const toggleCategory = (categoryKey: string) => {
        setExpandedCategories((prevState) => ({
            ...prevState,
            [categoryKey]: true,
        }));
    };

    const getVisibleItems = (categoryKey: string, items: SkillItem[]) => {
        if (!isMobileViewport || expandedCategories[categoryKey]) {
            return items;
        }

        return items.slice(0, MOBILE_SKILLS_LIMIT);
    };

    const SkillsContainerElement = SkillsContainer as any;

    return (
        <SkillsContainerElement ref={skillsRef} id="skills" data-reveal>
            <div className="contentSkills">
                <div className="titleSkills">
                    <p>{t("allTechnologies")}</p>
                    <TitleSection>{t("skills")}</TitleSection>
                </div>

                {categories.map((category) => (
                    <div className="category" key={category.key}>
                        <div className="title-category">
                            <h4>{category.title}</h4>
                        </div>
                        <div className="category-content">
                            {getVisibleItems(category.key, category.items).map((skill) => (
                                <CardSkill key={skill.nameSkill} {...skill} />
                            ))}
                        </div>

                        {isMobileViewport &&
                            !expandedCategories[category.key] &&
                            category.items.length > MOBILE_SKILLS_LIMIT && (
                                <button
                                    className="loadMoreSkills"
                                    onClick={() => toggleCategory(category.key)}
                                    title={t("seeMoreTitle")}
                                >
                                    <p>{t("seeMore")}</p>
                                </button>
                            )}
                    </div>
                ))}
            </div>
        </SkillsContainerElement>
    );
};

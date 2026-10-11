import { useTranslation } from "next-i18next";
import { useContext, useEffect, useMemo, useState } from "react";
import { PageContext } from "@/contexts";
import { CardSkill } from "@/components/partials/CardSkill";
import { TitleSection } from "@/components/partials/TitleSection";
import { SkillsContainer } from "./styles";
import { getGsap } from "@/utils";

type SkillItem = {
    isSkillActive: boolean;
    pathIconSkill?: string;
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
                        isSkillActive: false,
                        pathIconSkill: "./mongodb.svg",
                        nameSkill: "MongoDB",
                        typeSkill: t("nonRelationalDB"),
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./mysql.svg",
                        nameSkill: "MySQL",
                        typeSkill: t("relationalDB"),
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./python.svg",
                        nameSkill: "Python",
                        typeSkill: "FastAPI / Flask",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "Java",
                        typeSkill: "Spring Boot / Quarkus",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "JPA / Maven",
                        typeSkill: "Java ecosystem",
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./nodejs.svg",
                        nameSkill: "NodeJS",
                        typeSkill: "Software",
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./express.svg",
                        nameSkill: "Express",
                        typeSkill: "Framework NodeJS",
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./go.svg",
                        nameSkill: "Golang",
                        typeSkill: "Golang API",
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./fastapi.svg",
                        nameSkill: "FastAPI",
                        typeSkill: "Python API",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "Kafka / Redis",
                        typeSkill: "Messaging / cache",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "REST / GraphQL / gRPC",
                        typeSkill: "API design",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "Microservices / Hexagonal / Clean Architecture",
                        typeSkill: "Software architecture",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "DDD / concurrency / functional programming",
                        typeSkill: "Software design and implementation",
                    },
                ],
            },
            {
                key: "frontend",
                title: t("frontendMobile"),
                items: [
                    {
                        isSkillActive: false,
                        nameSkill: "ReactJS",
                        pathIconSkill: "./reactjs.svg",
                        typeSkill: `${t("library")} JS`,
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "React Native",
                        typeSkill: "Mobile",
                    },
                    {
                        isSkillActive: true,
                        nameSkill: "Typescript",
                        pathIconSkill: "./typescript.svg",
                        typeSkill: "TypeScript",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "Angular",
                        typeSkill: "Web applications",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "Expo Go",
                        typeSkill: "React Native tooling",
                    },
                ],
            },
            {
                key: "languages",
                title: t("programmingLanguages"),
                items: [
                    {
                        isSkillActive: false,
                        pathIconSkill: "./html.svg",
                        nameSkill: "HTML5",
                        typeSkill: t("markupLanguage"),
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./css.svg",
                        nameSkill: "CSS3",
                        typeSkill: t("stylingLanguage"),
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./javascript.svg",
                        nameSkill: "JavaScript",
                        typeSkill: t("programmingLanguage"),
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./python.svg",
                        nameSkill: "Python",
                        typeSkill: t("programmingLanguage"),
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./go.svg",
                        nameSkill: "Golang",
                        typeSkill: t("programmingLanguage"),
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "PHP",
                        typeSkill: "Laravel",
                    },
                ],
            },
            {
                key: "cloud",
                title: t("cloudArchitecture"),
                items: [
                    {
                        isSkillActive: true,
                        pathIconSkill: "./aws.svg",
                        nameSkill: "AWS",
                        typeSkill: "SQS / Lambda / CloudFormation",
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./gcp.svg",
                        nameSkill: "GCP",
                        typeSkill: "Cloud platform",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "Azure Functions",
                        typeSkill: "Cloud / Node.js",
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./terraform.svg",
                        nameSkill: "Terraform",
                        typeSkill: "Terraform / IaC",
                    },
                    {
                        isSkillActive: true,
                        pathIconSkill: "./kubernetes.svg",
                        nameSkill: "Kubernetes",
                        typeSkill: "Containers / orchestration",
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./docker.svg",
                        nameSkill: "Docker",
                        typeSkill: "Containers / platform",
                    },
                    {
                        isSkillActive: false,
                        nameSkill: "OpenShift / CI/CD",
                        typeSkill: "Platform engineering",
                    },
                    {
                        isSkillActive: false,
                        pathIconSkill: "./devops.svg",
                        nameSkill: "DevOps",
                        typeSkill: t("programmingLanguage"),
                    },
                ],
            },
            {
                key: "data",
                title: t("dataPlatforms"),
                items: [
                    { isSkillActive: false, pathIconSkill: "./sql.png", nameSkill: "SQL / NoSQL", typeSkill: t("queryLanguage") },
                    { isSkillActive: false, pathIconSkill: "./mysql.svg", nameSkill: "Oracle / MySQL", typeSkill: t("relationalDB") },
                    { isSkillActive: false, pathIconSkill: "./mongodb.svg", nameSkill: "MongoDB", typeSkill: t("nonRelationalDB") },
                    { isSkillActive: false, nameSkill: "Databricks / Data Lake", typeSkill: "Data platforms" },
                    { isSkillActive: false, nameSkill: "Power BI / Tableau", typeSkill: "Business intelligence" },
                    { isSkillActive: false, nameSkill: "Relational / non-relational DBs", typeSkill: "Data modeling / migrations" },
                ],
            },
            {
                key: "ai-observability",
                title: t("aiEngineering"),
                items: [
                    { isSkillActive: true, pathIconSkill: "./python.svg", nameSkill: "LLMs", typeSkill: "AI Engineering" },
                    { isSkillActive: true, pathIconSkill: "./python.svg", nameSkill: "RAG", typeSkill: "AI Architecture" },
                    { isSkillActive: true, nameSkill: "MCP / AI agents", typeSkill: "AI integration" },
                    { isSkillActive: true, nameSkill: "AI APIs / Prompt Engineering", typeSkill: "Applied AI" },
                ],
            },
            {
                key: "observability",
                title: t("observability"),
                items: [
                    { isSkillActive: true, nameSkill: "Datadog", typeSkill: "Monitoring" },
                    { isSkillActive: false, nameSkill: "Dynatrace / New Relic", typeSkill: "APM" },
                    { isSkillActive: false, nameSkill: "OpenTelemetry", typeSkill: "Instrumentation" },
                    { isSkillActive: false, nameSkill: "Grafana / Prometheus", typeSkill: "Metrics / dashboards" },
                    { isSkillActive: false, nameSkill: "Kibana / OpsGenie", typeSkill: "Logs / incident management" },
                ],
            },
            {
                key: "quality",
                title: t("qualityAutomation"),
                items: [
                    { isSkillActive: false, nameSkill: "Selenium / Appium", typeSkill: "Web / mobile automation" },
                    { isSkillActive: false, nameSkill: "JUnit / Cucumber / Mockito", typeSkill: "Java testing" },
                    { isSkillActive: false, nameSkill: "Cypress / Postman", typeSkill: "End-to-end / API testing" },
                    { isSkillActive: false, nameSkill: "SOAPUI / JMeter", typeSkill: "API / performance testing" },
                    { isSkillActive: false, nameSkill: "TDD / BDD", typeSkill: "Engineering practices" },
                    { isSkillActive: false, nameSkill: "Silk Central / Mobile Center", typeSkill: "Test management / devices" },
                ],
            },
            {
                key: "engineering-tools",
                title: t("engineeringTools"),
                items: [
                    { isSkillActive: false, nameSkill: "Git / GitFlow / Bitbucket", typeSkill: "Version control" },
                    { isSkillActive: false, nameSkill: "JIRA / Confluence", typeSkill: "Agile delivery" },
                    { isSkillActive: false, nameSkill: "Bamboo / CI/CD", typeSkill: "Build and delivery" },
                    { isSkillActive: false, nameSkill: "Unix / Shell Script / PuTTY", typeSkill: "Systems and scripting" },
                    { isSkillActive: false, nameSkill: "Mainframe / XML", typeSkill: "Enterprise integrations" },
                    { isSkillActive: false, nameSkill: "IoT / Scrum / Kanban", typeSkill: "Projects and methods" },
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

    return (
        <SkillsContainer ref={skillsRef} id="skills" data-reveal>
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
        </SkillsContainer>
    );
};

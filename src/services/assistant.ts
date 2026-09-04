export type AssistantSource = {
    label: string;
    href: string;
};

export type AssistantAnswer = {
    text: string;
    sources: AssistantSource[];
};

export type AssistantProvider = {
    answer: (question: string, locale: string) => Promise<AssistantAnswer>;
};

const sourceCatalog: AssistantSource[] = [
    { label: "Sobre David", href: "#about" },
    { label: "Habilidades", href: "#skills" },
    { label: "Projetos", href: "#portfolio" },
];

const facts = [
    "David atua como desenvolvedor full cycle, com experiência em DevOps, SRE, automação de testes e produtos digitais.",
    "As áreas mais recorrentes do portfólio são inteligência artificial, cloud computing, qualidade de software, blockchain e desenvolvimento full stack.",
    "A seleção de projetos exibida nesta página vem do catálogo público e pode continuar disponível mesmo quando a integração com o GitHub estiver indisponível.",
];

const createLocalAnswer = (question: string, locale: string): AssistantAnswer => {
    const normalizedQuestion = question.toLocaleLowerCase();
    const selectedFacts = facts.filter((fact) =>
        normalizedQuestion.split(/\s+/).some((term) => term.length > 3 && fact.toLocaleLowerCase().includes(term))
    );
    const answerFacts = selectedFacts.length > 0 ? selectedFacts : facts.slice(0, 2);
    const languageNote = locale.startsWith("pt") ? "" : " Posso continuar na sua língua preferida.";

    return {
        text: `${answerFacts.join(" ")} Este assistente usa somente informações públicas e curadas do portfólio; não inventa métricas ou experiências.${languageNote}`,
        sources: sourceCatalog,
    };
};

export const localPortfolioProvider: AssistantProvider = {
    answer: async (question, locale) => createLocalAnswer(question, locale),
};

export const getAssistantProvider = (): AssistantProvider => localPortfolioProvider;

import { FormEvent, useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiCheck, FiMessageCircle, FiX } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { getAssistantProvider, AssistantAnswer } from "@/services/assistant";
import { AssistantContainer } from "./styles";

type Message = AssistantAnswer & { role: "assistant" | "user" };

const suggestions = ["Quais são as especialidades?", "Mostre projetos com IA", "Como David trabalha?"];

export const PortfolioAssistant = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const [question, setQuestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) inputRef.current?.focus();
    }, [isOpen]);

    const submitQuestion = async (event: FormEvent) => {
        event.preventDefault();
        const trimmedQuestion = question.trim();

        if (!trimmedQuestion || !hasConsent || isLoading) return;

        setQuestion("");
        setIsLoading(true);
        setMessages((current) => [
            ...current,
            { role: "user", text: trimmedQuestion, sources: [] },
        ]);

        const answer = await getAssistantProvider().answer(trimmedQuestion, i18n.language);
        setMessages((current) => [...current, { role: "assistant", ...answer }]);
        setIsLoading(false);
    };

    return (
        <AssistantContainer data-open={isOpen} aria-label={t("assistantAriaLabel")}>
            {isOpen && (
                <section className="assistant-panel" aria-labelledby="assistant-title">
                    <header>
                        <div>
                            <span className="eyebrow">AI concierge</span>
                            <h2 id="assistant-title">{t("assistantTitle")}</h2>
                        </div>
                        <button className="icon-button" onClick={() => setIsOpen(false)} aria-label={t("assistantClose")}>
                            <FiX aria-hidden="true" />
                        </button>
                    </header>
                    <p className="assistant-intro">{t("assistantDescription")}</p>
                    <div className="suggestions" aria-label={t("assistantSuggestions")}>
                        {suggestions.map((suggestion) => (
                            <button key={suggestion} onClick={() => setQuestion(suggestion)} disabled={!hasConsent}>
                                {suggestion}
                            </button>
                        ))}
                    </div>
                    <div className="messages" aria-live="polite">
                        {messages.map((message, index) => (
                            <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
                                <p>{message.text}</p>
                                {message.sources.length > 0 && (
                                    <div className="sources">
                                        {message.sources.map((source) => (
                                            <a href={source.href} key={source.href}>
                                                {source.label} <FiArrowUpRight aria-hidden="true" />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </article>
                        ))}
                        {isLoading && <p className="loading-message">{t("assistantThinking")}</p>}
                    </div>
                    <label className="consent">
                        <input type="checkbox" checked={hasConsent} onChange={(event) => setHasConsent(event.target.checked)} />
                        <span><FiCheck aria-hidden="true" /> {t("assistantConsent")}</span>
                    </label>
                    <form onSubmit={submitQuestion}>
                        <input
                            ref={inputRef}
                            value={question}
                            onChange={(event) => setQuestion(event.target.value)}
                            placeholder={t("assistantPlaceholder")}
                            aria-label={t("assistantPlaceholder")}
                            maxLength={500}
                            disabled={!hasConsent || isLoading}
                        />
                        <button type="submit" aria-label={t("assistantSend")} disabled={!hasConsent || isLoading || !question.trim()}>
                            <FiArrowUpRight aria-hidden="true" />
                        </button>
                    </form>
                </section>
            )}
            <button className="assistant-trigger" onClick={() => setIsOpen((current) => !current)} aria-expanded={isOpen}>
                <FiMessageCircle aria-hidden="true" />
                <span>{t("assistantTrigger")}</span>
            </button>
        </AssistantContainer>
    );
};

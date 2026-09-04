import styled from "styled-components";
import { ReactNode } from "react";

type AssistantContainerProps = {
    "aria-label"?: string;
    "data-open"?: boolean;
    children?: ReactNode;
};

export const AssistantContainer = styled.div<AssistantContainerProps>`
    position: fixed;
    right: clamp(1.6rem, 3vw, 3.2rem);
    bottom: clamp(1.6rem, 3vw, 3.2rem);
    z-index: 20;

    .assistant-trigger {
        display: inline-flex;
        align-items: center;
        gap: 0.8rem;
        min-height: 4.8rem;
        padding: 0 1.6rem;
        border: 1px solid var(--accent-border);
        border-radius: 1.4rem;
        color: var(--text-primary);
        background: var(--surface-strong);
        box-shadow: var(--shadow-lg);
        font-weight: 700;
        transition: transform 180ms ease, border-color 180ms ease;
        &:hover { transform: translateY(-0.2rem); border-color: var(--accent); }
        svg { color: var(--accent); }
    }

    .assistant-panel {
        width: min(38rem, calc(100vw - 3.2rem));
        max-height: min(66rem, calc(100vh - 10rem));
        margin-bottom: 1.2rem;
        overflow: auto;
        padding: 2rem;
        border: 1px solid var(--line);
        border-radius: 1.8rem;
        background: var(--surface-strong);
        box-shadow: var(--shadow-lg);
        animation: assistantIn 180ms ease-out;
        header { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
        h2 { margin-top: 0.4rem; font-size: 2rem; }
        .eyebrow { color: var(--accent); font-size: 1.1rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .icon-button { min-width: 3.6rem; min-height: 3.6rem; border-radius: 0.8rem; color: var(--text-secondary); &:hover { background: var(--surface); color: var(--text-primary); } }
        .assistant-intro, .loading-message { margin-top: 1.2rem; color: var(--text-secondary); font-size: 1.35rem; line-height: 1.55; }
        .suggestions, .sources { display: flex; flex-wrap: wrap; gap: 0.7rem; margin-top: 1.4rem; }
        .suggestions button, .sources a { border: 1px solid var(--line); border-radius: 0.8rem; padding: 0.7rem 0.9rem; color: var(--text-secondary); font-size: 1.2rem; &:hover { border-color: var(--accent); color: var(--text-primary); } }
        .messages { display: grid; gap: 0.8rem; margin-top: 1.6rem; }
        .message { padding: 1rem; border-radius: 1rem; background: var(--surface); p { font-size: 1.35rem; line-height: 1.55; } &.user { background: var(--accent-soft); } }
        .sources a { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0; border: 0; color: var(--accent); }
        .consent { display: flex; gap: 0.7rem; align-items: flex-start; margin: 1.6rem 0 1rem; color: var(--text-secondary); font-size: 1.2rem; line-height: 1.4; input { margin-top: 0.2rem; accent-color: var(--accent); } span { display: inline-flex; gap: 0.4rem; align-items: center; } }
        form { display: flex; gap: 0.7rem; input { width: 100%; min-width: 0; padding: 1rem; border: 1px solid var(--line); border-radius: 0.9rem; background: var(--surface); color: var(--text-primary); outline: none; &:focus { border-color: var(--accent); } } form button, button { min-width: 4.2rem; border-radius: 0.9rem; background: var(--accent); color: #071018; &:disabled { opacity: 0.45; cursor: not-allowed; } } }
    }

    @keyframes assistantIn { from { opacity: 0; transform: translateY(0.8rem) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
    @media (prefers-reduced-motion: reduce) { .assistant-panel { animation: none; } .assistant-trigger { transition: none; } }
    @media (max-width: 480px) { .assistant-trigger span { display: none; } .assistant-trigger { width: 4.8rem; justify-content: center; padding: 0; border-radius: 50%; } }
`;

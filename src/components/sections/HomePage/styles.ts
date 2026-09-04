import styled from "styled-components";
import { ReactNode } from "react";

type HomeContainerProps = { children?: ReactNode; id?: string };

export const HomeContainer = styled.section<HomeContainerProps>`
    width: min(118rem, 92%);
    min-height: min(78rem, 92vh);
    margin: 0 auto;
    padding: clamp(12rem, 18vw, 18rem) 0 clamp(6rem, 10vw, 10rem);
    display: grid;
    align-content: center;
    gap: 7rem;

    .hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(28rem, 0.75fr);
        gap: clamp(4rem, 10vw, 12rem);
        align-items: end;
    }
    .hero-copy { max-width: 75rem; }
    .eyebrow { display: flex; align-items: center; gap: 0.8rem; color: var(--accent); font-size: 1.25rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
    .eyebrow span, .status-dot { width: 0.8rem; height: 0.8rem; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 0.5rem var(--accent-soft); }
    h2 { max-width: 78rem; margin-top: 2rem; font-family: Georgia, "Times New Roman", serif; font-size: clamp(4.8rem, 8vw, 9.6rem); font-weight: 500; line-height: 0.98; letter-spacing: -0.04em; }
    .descriptionHome { max-width: 65rem; margin-top: 2.4rem; color: var(--text-secondary); font-size: clamp(1.7rem, 2.2vw, 2.2rem); line-height: 1.45; }
    .hero-lede { max-width: 57rem; margin-top: 1.6rem; color: var(--text-muted); font-size: 1.5rem; line-height: 1.7; }
    .links { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem; margin-top: 3.4rem; }
    .links button, .links .text-link { min-height: 4.8rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; padding: 0 1.6rem; border: 1px solid var(--accent-border); border-radius: 1.1rem; background: var(--accent); color: #071018; font-weight: 800; transition: transform 180ms ease, background 180ms ease; }
    .links button:hover, .links .text-link:hover { transform: translateY(-0.2rem); }
    .links button.secondary, .links .text-link { background: transparent; color: var(--text-primary); border-color: var(--line); }
    .links .text-link { border: 0; color: var(--accent); padding-inline: 0.8rem; }
    .hero-signal { padding: 2.4rem; border: 1px solid var(--line); border-radius: 1.8rem; background: linear-gradient(145deg, var(--surface-raised), var(--surface)); box-shadow: var(--shadow-md); }
    .signal-top { display: flex; align-items: center; gap: 1.2rem; color: var(--text-secondary); font-size: 1.3rem; }
    .signal-number { margin-top: 5rem; font-family: Georgia, "Times New Roman", serif; font-size: clamp(3.6rem, 6vw, 6.8rem); line-height: 1; letter-spacing: -0.04em; }
    .signal-number span { color: var(--accent); }
    .signal-copy { margin-top: 1.4rem; color: var(--text-secondary); line-height: 1.6; }
    .signal-list { display: grid; gap: 1.1rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--line); color: var(--text-secondary); font-size: 1.3rem; }
    .signal-list span { display: flex; align-items: center; gap: 0.8rem; }
    .signal-list svg { color: var(--accent); }
    .hero-meta { display: flex; flex-wrap: wrap; gap: clamp(2rem, 8vw, 8rem); padding-top: 2rem; border-top: 1px solid var(--line); color: var(--text-muted); font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.08em; }
    .hero-meta strong { display: block; margin-bottom: 0.7rem; color: var(--text-primary); font-family: Georgia, "Times New Roman", serif; font-size: 2.4rem; font-weight: 500; letter-spacing: 0; }

    @media (max-width: 760px) {
        min-height: auto;
        .hero-grid { grid-template-columns: 1fr; gap: 4rem; }
        .signal-number { margin-top: 3rem; }
        .links { align-items: stretch; flex-direction: column; }
        .links .text-link, .links button { width: 100%; }
        .hero-meta { gap: 2rem; justify-content: space-between; }
    }

    @media (prefers-reduced-motion: reduce) {
        .links button, .links .text-link { transition: none; }
    }
`;

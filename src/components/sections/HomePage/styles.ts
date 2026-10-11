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
    position: relative;
    isolation: isolate;

    &::before {
        content: "";
        position: absolute;
        z-index: -1;
        inset: 13% -4vw 20% 42%;
        background: linear-gradient(135deg, transparent 20%, rgba(154, 242, 206, 0.035) 20.2%, transparent 20.6%),
            linear-gradient(45deg, transparent 68%, rgba(255, 177, 138, 0.045) 68.2%, transparent 68.6%);
        mask-image: linear-gradient(90deg, transparent, #000 30%, #000 78%, transparent);
        pointer-events: none;
    }

    .hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1.25fr) minmax(28rem, 0.75fr);
        gap: clamp(4rem, 10vw, 12rem);
        align-items: end;
    }
    .hero-copy { max-width: 75rem; }
    .eyebrow { display: flex; align-items: center; gap: 1rem; color: var(--accent); font-size: 1.25rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
    .eyebrow span { width: 0.8rem; height: 0.8rem; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 0.5rem var(--accent-soft); }
    h1 { max-width: 78rem; margin-top: 2rem; font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif; font-size: 8.4rem; font-weight: 500; line-height: 0.98; }
    .descriptionHome { max-width: 65rem; margin-top: 2.4rem; color: var(--text-secondary); font-size: clamp(1.7rem, 2.2vw, 2.2rem); line-height: 1.45; }
    .hero-lede { max-width: 57rem; margin-top: 1.6rem; color: var(--text-muted); font-size: 1.5rem; line-height: 1.7; }
    .links { display: flex; align-items: center; flex-wrap: wrap; gap: 1rem; margin-top: 3.4rem; }
    .links button, .links .text-link { min-height: 4.8rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; padding: 0 1.6rem; border: 1px solid var(--accent-border); border-radius: 1.1rem; background: var(--accent); color: #071018; font-weight: 800; transition: transform 180ms ease, background 180ms ease; }
    .links button:hover, .links .text-link:hover { transform: translateY(-0.2rem); }
    .links button.secondary, .links .text-link { background: transparent; color: var(--text-primary); border-color: var(--line); }
    .links .text-link { border: 0; color: var(--accent); padding-inline: 0.8rem; }
    .hero-signal { padding: 2.8rem; border: 1px solid var(--line); border-radius: 1.8rem; background: linear-gradient(145deg, rgba(23, 35, 38, 0.96), rgba(13, 21, 23, 0.96)); box-shadow: var(--shadow-md); }
    .hero-signal::before { content: ""; display: block; width: 4rem; height: 0.2rem; margin-bottom: 2.2rem; background: linear-gradient(90deg, var(--accent), var(--accent-warm)); }
    .signal-kicker { margin-top: 1.8rem; color: var(--accent); font-size: 1.15rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
    .signal-number { max-width: 34rem; margin-top: 1.2rem; font-family: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif; font-size: clamp(3.6rem, 5vw, 5.6rem); font-weight: 500; line-height: 1.02; }
    .signal-number span { color: var(--accent); }
    .signal-copy { max-width: 34rem; margin-top: 1.4rem; color: var(--text-secondary); line-height: 1.6; }
    .signal-list { display: grid; gap: 1.2rem; margin-top: 2.4rem; padding-top: 1.8rem; border-top: 1px solid var(--line); color: var(--text-secondary); font-size: 1.3rem; }
    .signal-list span { display: flex; align-items: center; gap: 0.8rem; }
    .signal-list svg { color: var(--accent); }
    .hero-meta { display: flex; flex-wrap: wrap; gap: clamp(2rem, 8vw, 8rem); padding-top: 2rem; border-top: 1px solid var(--line); color: var(--text-muted); font-size: 1.25rem; text-transform: uppercase; letter-spacing: 0.08em; }
    .hero-meta strong { display: block; margin-bottom: 0.7rem; color: var(--text-primary); font-family: Georgia, "Times New Roman", serif; font-size: 2.4rem; font-weight: 500; letter-spacing: 0; }

    @media (max-width: 760px) {
        min-height: auto;
        padding-top: 12rem;
        .hero-grid { grid-template-columns: 1fr; gap: 4rem; }
        h1 { font-size: 5.8rem; }
        .signal-number { max-width: 100%; }
        .links { align-items: stretch; flex-direction: column; }
        .links .text-link, .links button { width: 100%; }
        .hero-meta { gap: 2rem; justify-content: space-between; }
    }

    @media (max-width: 380px) {
        h1 { font-size: 4.8rem; }
        .hero-meta { justify-content: flex-start; }
    }

    @media (prefers-reduced-motion: reduce) {
        .links button, .links .text-link { transition: none; }
    }
`;

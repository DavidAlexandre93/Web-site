import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        &:focus-visible {
            outline: 0.3rem solid var(--accent);
            outline-offset: 0.3rem;
        }
    }
    :root {
        --body: #080d10;
        --surface: #10181b;
        --surface-raised: #172326;
        --surface-strong: rgba(10, 16, 18, 0.96);
        --container: #121d20;
        --border: #29383a;
        --line: rgba(184, 204, 197, 0.14);
        --header: rgba(8, 13, 16, 0.88);
        --accent: #9af2ce;
        --accent-soft: rgba(154, 242, 206, 0.11);
        --accent-border: rgba(154, 242, 206, 0.4);
        --accent-warm: #ffb18a;
        --text-primary: #f4f7f2;
        --text-secondary: #b2c0ba;
        --text-muted: #82918d;
        --shadow-md: 0 2rem 5rem rgba(0, 0, 0, 0.2);
        --shadow-lg: 0 2.5rem 7rem rgba(0, 0, 0, 0.38);
    }
    html {
        font-size: 62.5%;
        scroll-behavior: smooth;
    }
    @media (max-width: 1024px) {
        html {
            font-size: 60%;
        }
    }
    @media (max-width: 768px) {
        html {
            font-size: 58%;
        }
    }
    @media (max-width: 480px) {
        html {
            font-size: 56.25%;
        }
    }
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
    body, a, input, button, textarea {
        font-size: 1.6rem;
        font-weight: 500;
        font-family: "Trebuchet MS", "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
        color: var(--text-primary);
    }
    body {
        background-color: var(--body);
        background-image:
            radial-gradient(ellipse at 78% 12%, rgba(154, 242, 206, 0.055), transparent 34%),
            linear-gradient(rgba(184, 204, 197, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184, 204, 197, 0.035) 1px, transparent 1px);
        background-size: auto, 5.6rem 5.6rem, 5.6rem 5.6rem;
        .sr-only {
            position: absolute;
            padding: 0;
            width: 1px;
            height: 1px;
            margin: -1px;
            overflow: hidden;
            clip-path: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    }
    a, button {
        cursor: pointer;
        border: none;
        text-decoration: none;
    }
    img,
    svg,
    video,
    canvas {
        max-width: 100%;
        height: auto;
    }
    button {
        background-color: transparent;
    }
    [data-tilt] {
        --tilt-rotate-x: 0deg;
        --tilt-rotate-y: 0deg;
        transform: perspective(90rem) rotateX(var(--tilt-rotate-x)) rotateY(var(--tilt-rotate-y));
        transform-style: preserve-3d;
        transition: transform 0.3s ease;
        will-change: transform;
    }
    [data-ripple] {
        position: relative;
        overflow: hidden;
        isolation: isolate;
    }
    .interaction-ripple {
        position: absolute;
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: rgba(255, 255, 255, 0.4);
        pointer-events: none;
        z-index: 0;
        animation: rippleExpand 0.65s ease-out forwards;
    }
    [data-reveal] { opacity: 1; }
    @keyframes rippleExpand {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(18);
        }
    }

    main {
        z-index: 1;
    }
`;

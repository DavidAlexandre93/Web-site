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
        --body: #070b0e;
        --surface: #0d1519;
        --surface-raised: #142127;
        --surface-strong: rgba(10, 17, 21, 0.97);
        --container: #111d23;
        --border: #20323a;
        --line: rgba(157, 184, 188, 0.13);
        --header: rgba(7, 11, 14, 0.86);
        --accent: #7df2cf;
        --accent-soft: rgba(125, 242, 207, 0.11);
        --accent-border: rgba(125, 242, 207, 0.42);
        --text-primary: #f4faf7;
        --text-secondary: #adc0c0;
        --text-muted: #71888b;
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
        background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px);
        background-size: 5.6rem 5.6rem;
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

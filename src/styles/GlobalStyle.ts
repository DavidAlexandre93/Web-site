import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        &:focus {
            outline: 0.4rem solid rgba(34, 126, 240, 0.55);
        }
    }
    :root {
        --body: #151718;
        --container: #242830;
        --border: #202325;
        --boxes: #202024;
        --header: rgba(21, 23, 24, 0.35);

        --blue: #097dea;
        --blueHover: #0982f4;
        --blueOpacity: rgba(34, 126, 240, 0.4);
        --blueGradient: linear-gradient(65deg, #0270d7 0, #0f8afd 100%);
        --blueGradientHover: linear-gradient(65deg, #0275e1 0, #198ffd 100%);
        --purple: #6e57e0;
        --orange: #f6ad55;

        --text-primary: #e1e1e7;
        --text-secondary: #a8a8b3;
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
        font-family: 'Poppins', sans-serif;
        -webkit-font-smoothing: antialiased;
        color: var(--text-primary);
    }
    body {
        background-color: var(--body);
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
    [data-reveal] {
        opacity: 0;
        transform: translateY(2.2rem);
        transition: opacity 0.65s ease, transform 0.65s ease;
    }
    [data-reveal].is-in-view {
        opacity: 1;
        transform: translateY(0);
    }
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

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
    button {
        background-color: transparent;
        
    }
    main {
        z-index: 1;
    }
`;

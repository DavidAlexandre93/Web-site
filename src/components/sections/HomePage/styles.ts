import styled from "styled-components";

export const HomeContainer = styled.section`
    width: 100%;
    padding: clamp(13rem, 18vw, 20rem) 3rem clamp(8rem, 12vw, 12rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    h2.titleHome {
        font-size: clamp(3.2rem, 5vw, 4.5rem);
        max-width: 50rem;
        text-align: center;
        font-weight: 600;
        line-height: 1.2;
    }
    p.descriptionHome {
        font-size: clamp(1.8rem, 2.8vw, 2.1rem);
        font-weight: 400;
        max-width: 50rem;
        text-align: center;
        color: var(--text-secondary);
        margin-top: 2rem;
    }
    .links {
        margin-top: clamp(3.5rem, 8vw, 6rem);
        display: flex;
        align-items: center;
        gap: 2rem;
        button,
        a {
            padding: 1rem 2rem;
            border-radius: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
        }
        button {
            background-color: var(--blue);
            .iconArrow {
                transition: all 0.2s ease;
            }
            &:hover {
                background-color: var(--blueHover);
                .iconArrow {
                    transform: translateY(0.3rem);
                }
            }
        }
        a {
            &:hover {
                background-color: var(--boxes);
            }
        }
    }
    .email {
        width: min(40rem, 100%);
        background-color: var(--boxes);
        padding: 1.4rem 2rem;
        border-radius: 3rem;
        display: flex;
        align-items: center;
        margin-top: clamp(3.5rem, 8vw, 6rem);
        position: relative;
        .text-mail {
            width: 100%;
            overflow-x: auto;
            p {
                min-width: 28rem;
            }
        }
        button {
            margin-left: 1rem;
            font-size: 0;
            padding: 0.6rem;
            border-radius: 0.3rem;
            &:hover {
                background-color: var(--container);
            }
        }
    }
    &::after {
        z-index: -1;
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(
                circle at 15% 50%,
                rgba(110, 87, 224, 0.4),
                rgba(255, 255, 255, 0) 25%
            ),
            radial-gradient(
                circle at 85% 30%,
                rgba(9, 125, 234, 0.4),
                rgba(255, 255, 255, 0) 25%
            );
        width: 100%;
        height: 100%;
    }
    @media (max-width: 400px) {
        .links {
            flex-direction: column-reverse;
            width: 100%;
            button,
            a {
                width: 100%;
            }
        }
    }
`;

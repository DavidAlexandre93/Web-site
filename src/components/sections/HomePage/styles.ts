import styled from "styled-components";

export const HomeContainer = styled.section`
    width: 100%;
    padding: clamp(13rem, 18vw, 20rem) 3rem clamp(8rem, 12vw, 12rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    .ambientGlow {
        position: absolute;
        width: min(70rem, 70vw);
        height: min(70rem, 70vw);
        top: 6rem;
        border-radius: 50%;
        pointer-events: none;
        filter: blur(5rem);
        background: radial-gradient(circle, rgba(15, 138, 253, 0.35) 0%, rgba(110, 87, 224, 0.22) 45%, rgba(255, 255, 255, 0) 72%);
        z-index: -1;
        will-change: transform;
    }

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
            transition: transform 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease;
        }
        button {
            background-color: var(--blue);
            box-shadow: 0 0 0 rgba(9, 125, 234, 0);
            .iconArrow {
                transition: all 0.2s ease;
            }
            &:hover {
                transform: translateY(-0.2rem);
                background-color: var(--blueHover);
                box-shadow: 0 1.2rem 2rem -1rem rgba(9, 125, 234, 0.7);
                .iconArrow {
                    transform: translateY(0.3rem);
                }
            }
        }
        a {
            &:hover {
                transform: translateY(-0.2rem);
                background-color: var(--boxes);
            }
        }
    }
    .shareLinks {
        margin-top: 2rem;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;

        a {
            padding: 0.8rem 1.4rem;
            border-radius: 3rem;
            background-color: var(--boxes);
            display: inline-flex;
            align-items: center;
            gap: 0.6rem;
            transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;

            &:hover {
                transform: translateY(-0.2rem);
                box-shadow: 0 0.8rem 1.5rem -1rem rgba(15, 138, 253, 0.7);
                background-color: var(--container);
            }
        }
    }

    .email {
        width: min(40rem, 100%);
        background-color: var(--boxes);
        border: 0.1rem solid transparent;
        padding: 1.4rem 2rem;
        border-radius: 3rem;
        display: flex;
        align-items: center;
        margin-top: clamp(3.5rem, 8vw, 6rem);
        position: relative;
        transition: border-color 0.25s ease, box-shadow 0.25s ease;

        &[data-status="loading"] {
            border-color: rgba(9, 125, 234, 0.6);
        }

        &[data-status="success"] {
            border-color: rgba(34, 197, 94, 0.5);
            box-shadow: 0 0 0 0.35rem rgba(34, 197, 94, 0.15);
        }

        .text-mail {
            width: 100%;
            overflow-x: auto;
            p {
                min-width: 0;
                overflow-wrap: anywhere;
            }
        }
        button {
            margin-left: 1rem;
            font-size: 0;
            padding: 0.6rem;
            border-radius: 0.6rem;
            min-width: 3.6rem;
            min-height: 3.6rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s ease, color 0.2s ease;

            .iconLoadingCopy {
                animation: rotateLoading 1s linear infinite;
            }

            .iconCopySuccess {
                color: #22c55e;
            }

            &:hover {
                background-color: var(--container);
            }
        }
    }

    @keyframes rotateLoading {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }

    &::after {
        z-index: -2;
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

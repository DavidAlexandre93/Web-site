import styled from "styled-components";
import type { ReactNode } from "react";

type CardProjectContainerProps = {
    children?: ReactNode;
    className?: string;
};

export const CardProjectContainer = styled.div<CardProjectContainerProps>`
    width: 100%;
    min-height: 30rem;
    aspect-ratio: 5 / 3;
    border-radius: 1rem;
    overflow: hidden;
    position: relative;
    box-shadow: 0 2.2rem 4rem rgba(0, 0, 0, 0.25);
    transform-style: preserve-3d;
    .image {
        min-width: 100%;
        height: 100%;
        filter: blur(0);
        transition: all 0.25s ease;
        img {
            width: 100%;
            min-height: 100%;
            object-fit: cover;
            object-position: center;
        }
        p {
            font-size: 1.8rem;
            color: var(--text-secondary);
        }
    }
    .overlay {
        background: linear-gradient(180deg, rgba(4, 11, 21, 0.1) 0%, rgba(4, 11, 21, 0.65) 100%);
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: flex-end;
        .description {
            width: inherit;
            height: 25rem;
            background-color: var(--boxes);
            border-radius: 2rem 2rem 0 0;
            padding: 0 3rem;
            transform: translateY(15rem);
            transition: all 0.35s ease;

            .title {
                width: inherit;
                height: 10rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                h4 {
                    font-size: 1.8rem;
                    font-weight: 600;
                    text-transform: capitalize;
                }
                button {
                    font-size: 0;
                    padding: 0.5rem;
                    border-radius: 0.3rem;
                    transition: all 0.25s linear;
                }
            }
            .infos {
                width: inherit;
                height: 15rem;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding-bottom: 2rem;
                p {
                    font-size: 1.6rem;
                    font-weight: 400;
                    color: var(--text-secondary);
                }
                .links {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 3rem;
                    a.link-extra {
                        font-size: 0;
                    }
                }
            }
        }
    }
    &:hover {
        .overlay {
            .description {
                transform: translateY(0);
                .title {
                    button {
                        transform: rotate(-180deg);
                    }
                }
            }
        }
        .image {
            filter: blur(0.4rem);
        }
    }
    @media (max-width: 640px) {
        aspect-ratio: 1 / 1;
        min-height: 26rem;
        .overlay {
            .description {
                padding: 0 2rem;
            }
        }
    }
`;

import styled from "styled-components";

type HeaderContainerProps = {
    visibleHeader: boolean;
    isPageTop: boolean;
};

export const HeaderContainer = styled.header<HeaderContainerProps>`
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: ${(props) =>
        props.isPageTop ? "transparent" : "var(--header)"};
    -moz-backdrop-filter: blur(1rem);
    backdrop-filter: blur(1rem);
    z-index: 9;
    transform: translateY(
        ${(props) =>
            props.isPageTop ? "0%" : props.visibleHeader ? "0%" : "-100%"}
    );
    transition: all 0.25s ease;

    .content-header {
        width: min(110rem, 90%);
        margin: 0 auto;
        padding: 2rem 0;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 3rem;
        a.homeLink {
            background-color: transparent;
            h1 {
                padding: 0 0.5rem;
                font-size: 2.2rem;
            }
        }
        nav {
            margin-top: 0.5rem;
            margin-right: auto;
            ul {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                li {
                    list-style: none;
                    transition: all 0.2s ease;
                    position: relative;
                    button {
                        padding: 1rem;
                        color: var(--text-secondary);
                        transition: all 0.35s ease;
                    }
                    &::after {
                        content: "";
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 0%;
                        height: 0.3rem;
                        background: transparent;
                        transition: all 0.35s ease;
                    }
                    &:hover {
                        button {
                            color: var(--text-primary);
                        }
                        &::after {
                            width: 100%;
                            background: var(--blueGradient);
                        }
                    }
                }
            }
        }

        .buttons-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            button {
                width: 4rem;
                height: 4rem;
                border-radius: 1rem;
                font-size: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                &.btn-menuMobile {
                    display: none;
                }
            }
        }
    }
    @media (max-width: 768px) {
        .content-header {
            gap: 0;
            a.homeLink {
                margin-right: 3rem;
            }
            nav {
                display: none;
            }
            .buttons-header {
                button {
                    &.btn-menuMobile {
                        display: block;
                    }
                }
            }
        }
    }
`;

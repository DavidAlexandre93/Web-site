import styled from "styled-components";

export const PortfolioContainer = styled.section`
    padding: clamp(6rem, 10vw, 10rem) 3rem;
    .content {
        width: min(110rem, 92%);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title-portfolio {
            text-align: center;
            p {
                max-width: 50rem;
                font-size: clamp(2rem, 3.5vw, 2.8rem);
                margin-top: 2rem;
                a {
                    font-size: inherit;
                    text-decoration: underline;
                    text-decoration-color: var(--blue);
                    color: var(--blue);
                }
            }
        }
        .content-portfolio {
            margin-top: clamp(5rem, 10vw, 12rem);
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
            gap: clamp(2rem, 4vw, 4rem);
            button.loadMoreRepositories {
                width: 100%;
                min-height: 30rem;
                border: 0.5rem dashed var(--blueOpacity);
                p {
                    font-size: 2rem;
                    color: var(--blue);
                    transition: all 0.3s linear;
                }
                &:hover {
                    p {
                        transform: scale(1.05);
                    }
                }
            }
        }
    }
`;

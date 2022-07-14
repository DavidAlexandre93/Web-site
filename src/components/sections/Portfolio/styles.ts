import styled from "styled-components";

export const PortfolioContainer = styled.section`
    padding: 10rem 3rem;
    .content {
        width: min(110rem, 90%);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title-portfolio {
            text-align: center;
            p {
                max-width: 50rem;
                font-size: 2.8rem;
                margin-top: 2rem;
                a {
                    font-size: 2.8rem;
                    text-decoration: underline;
                    text-decoration-color: var(--blue);
                    color: var(--blue);
                }
            }
        }
        .content-portfolio {
            margin-top: 12rem;
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            justify-content: center;
            gap: 4rem;
            button.loadMoreRepositories {
                width: 50rem;
                height: 30rem;
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
            @media (max-width: 550px) {
                button.loadMoreRepositories {
                    width: 100%;
                }
            }
        }
    }
`;

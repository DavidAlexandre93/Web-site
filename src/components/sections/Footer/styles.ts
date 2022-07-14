import styled from "styled-components";

export const FooterContainer = styled.footer`
    padding: 4rem 3rem;
    background-color: var(--container);
    .content {
        width: min(110rem, 90%);
        margin: 0 auto;
        display: flex;
        flex-flow: row wrap;
        row-gap: 4rem;
        column-gap: 10rem;
        align-items: center;
        justify-content: space-between;
        .texts {
            p {
                font-weight: 400;
                color: var(--text-secondary);
                max-width: 25rem;
            }
            .socials {
                margin-top: 2rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                a {
                    background-color: transparent;
                    font-size: 0;
                    border-radius: 0.5rem;
                    img {
                        width: 4.5rem;
                    }
                }
            }
        }
        button.btnTopPage {
            padding: 0.7rem;
            display: flex;
            align-items: flex-end;
            animation: moveUpDown 0.5s linear infinite alternate;
        }
        @keyframes moveUpDown {
            0% {
                transform: translateY(-10%);
            }
            100% {
                transform: translateY(10%);
            }
        }
    }
`;

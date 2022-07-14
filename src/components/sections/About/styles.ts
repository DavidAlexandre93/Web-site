import styled from "styled-components";

export const AboutContainer = styled.section`
    padding: 7rem 3rem;
    width: 100%;
    background: transparent url("./aboutBackground.svg") no-repeat center/cover;
    .contentAbout {
        width: min(110rem, 90%);
        margin: 0 auto;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 6rem;
        position: relative;
        .textAbout {
            p {
                max-width: 70rem;
                margin-top: 3rem;
                font-size: 1.8rem;
                color: var(--text-secondary);
            }
            .linkSocial {
                margin-top: 4rem;
                display: flex;
                align-items: center;
                gap: 2rem;
                a {
                    width: 5rem;
                    height: 5rem;
                    border-radius: 1rem;
                    background-color: transparent;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .image {
            max-width: 30rem;
            img {
                max-width: 100%;
                width: auto;
            }
        }

        @media (max-width: 876px) {
            flex-direction: column-reverse;
            align-items: center;
        }
    }
`;

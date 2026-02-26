import styled from "styled-components";

export const ContactContainer = styled.section`
    padding: clamp(6rem, 10vw, 10rem) 3rem;
    background-color: var(--container);
    .content {
        width: min(110rem, 92%);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title-contact {
            text-align: center;
            p {
                font-size: clamp(2.2rem, 3.5vw, 3rem);
                margin-bottom: 1rem;
            }
        }
        .content-contact {
            margin-top: clamp(4rem, 9vw, 10rem);
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
            gap: clamp(3rem, 8vw, 10rem);
            align-items: flex-start;
            justify-items: center;
            .card-contact {
                width: 100%;
                max-width: 26rem;
                padding: 1rem;
                background-color: transparent;
                border-radius: 0.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                .icon-cardContact {
                    transform: translateY(-15%);
                }
                h4 {
                    font-size: 2rem;
                    font-weight: 600;
                    margin-top: 2rem;
                    color: var(--blue);
                }
                p {
                    color: var(--text-secondary);
                    overflow-wrap: anywhere;
                }
                &:hover,
                &:focus {
                    .icon-cardContact {
                        animation: moveUpDown 0.4s linear infinite alternate;
                    }
                }
            }
        }
    }
`;

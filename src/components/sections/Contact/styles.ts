import styled from "styled-components";

export const ContactContainer = styled.section`
    padding: 10rem 3rem;
    background-color: var(--container);
    .content {
        width: min(110rem, 90%);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title-contact {
            text-align: center;
            p {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
        }
        .content-contact {
            margin-top: 10rem;
            display: flex;
            flex-flow: row wrap;
            gap: 10rem;
            row-gap: 6rem;
            align-items: flex-start;
            justify-content: center;
            .card-contact {
                padding: 1rem;
                background-color: transparent;
                border-radius: 0.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
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

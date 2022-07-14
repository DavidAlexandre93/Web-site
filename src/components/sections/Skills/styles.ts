import styled from "styled-components";

export const SkillsContainer = styled.section`
    width: 100%;
    padding: 7rem 3rem;
    .contentSkills {
        width: min(110rem, 90%);
        margin: 0 auto;
        .titleSkills {
            p {
                font-size: 4rem;
                max-width: 60rem;
                margin-bottom: 2rem;
            }
        }

        .category {
            margin-top: 6rem;
            .title-category {
                h4 {
                    text-transform: uppercase;
                    font-size: 2rem;
                }
            }
            .category-content {
                margin-top: 2rem;
                width: 100%;
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                gap: 3rem;
            }
        }
        @media (max-width: 475px) {
            .titleSkills {
                p {
                    font-size: 3rem;
                }
            }
        }
    }
`;

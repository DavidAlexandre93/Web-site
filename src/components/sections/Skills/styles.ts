import styled from "styled-components";

export const SkillsContainer = styled.section`
    width: 100%;
    padding: clamp(6rem, 8vw, 7rem) 3rem;
    .contentSkills {
        width: min(110rem, 92%);
        margin: 0 auto;
        .titleSkills {
            p {
                font-size: clamp(2.7rem, 4vw, 4rem);
                max-width: 60rem;
                margin-bottom: 2rem;
            }
        }

        .category {
            margin-top: clamp(3rem, 7vw, 6rem);
            .title-category {
                h4 {
                    text-transform: uppercase;
                    font-size: 2rem;
                }
            }
            .category-content {
                margin-top: 2rem;
                width: 100%;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
                gap: 2rem;
            }
        }
    }
`;

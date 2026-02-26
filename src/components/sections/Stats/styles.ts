import styled from "styled-components";

export const StatsContainer = styled.section`
    background: var(--container);
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    gap: clamp(2rem, 4vw, 4rem);
    padding: clamp(4rem, 7vw, 6rem) clamp(2rem, 6vw, 4rem);
    .cardStats {
        justify-self: center;
        width: 100%;
        max-width: 22rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        h3 {
            font-size: clamp(2.4rem, 3vw, 3rem);
            margin-top: 1rem;
        }
        p {
            font-size: 1.8rem;
            font-weight: 600;
            text-transform: uppercase;
            max-width: 15rem;
            color: var(--text-secondary);
        }
    }
`;

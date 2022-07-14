import styled from "styled-components";

export const StatsContainer = styled.section`
    background: var(--container);
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    row-gap: 8rem;
    padding: 6rem 4rem;
    .cardStats {
        align-self: flex-start;
        width: 20rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        h3 {
            font-size: 3rem;
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

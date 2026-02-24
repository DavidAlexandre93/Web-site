import styled from "styled-components";

interface CardSkillContainerProps {
    skillActive: boolean;
}

export const CardSkillContainer = styled.div<CardSkillContainerProps>`
    width: 30rem;
    height: 12rem;
    padding: 2rem;
    background: linear-gradient(130deg, rgba(20, 33, 52, 0.8), rgba(11, 19, 33, 0.9));
    border: 0.2rem solid var(--border);
    box-shadow: 0 1.2rem 2.6rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    position: relative;
    .image {
        width: 6rem;
        height: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 100%;
        }
    }
    .title {
        h4 {
            font-size: 2rem;
            font-weight: 600;
        }
        p {
            color: var(--text-secondary);
        }
    }
    p.skill-active {
        display: ${(props) => (props.skillActive ? "block" : "none")};
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 0 0 0 0.5rem;
        background-color: var(--blue);
        text-transform: uppercase;
        font-weight: 700;
        padding: 0.5rem 1.2rem;
    }
    @media (max-width: 350px) {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        flex: 1;
        height: auto;
    }
`;

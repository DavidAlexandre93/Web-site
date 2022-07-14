import styled from "styled-components";

export const SeparatorContainer = styled.div`
    padding: 4rem 0;
    width: 100%;
    .lineSeparator {
        margin: 0 auto;
        width: 7rem;
        height: 0.25rem;
        border-radius: 1rem;
        background-color: var(--border);
    }
    transition: all 0.2s ease;
    &:hover {
        transform: translateY(10%);
    }
`;

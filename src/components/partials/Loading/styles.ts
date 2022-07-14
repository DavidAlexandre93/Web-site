import styled from "styled-components";

export const LoadingContainer = styled.div`
    width: 50rem;
    height: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconLoading {
        color: var(--blue);
        animation: rotateLoading 2s linear infinite;
        @keyframes rotateLoading {
            0% {
                transform: rotate(0);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
    @media (max-width: 550px) {
        width: 100%;
    }
`;

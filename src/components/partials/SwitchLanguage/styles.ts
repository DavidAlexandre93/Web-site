import styled from "styled-components";

type SwitchLanguageContainerProps = {
    isActiveModalLang: boolean;
};

export const SwitchLanguageContainer = styled.div<SwitchLanguageContainerProps>`
    width: 15rem;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    button.btnOpenOptionsLanguage {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0;
    }
    .selectLang {
        visibility: ${({ isActiveModalLang }) =>
            isActiveModalLang ? "visible" : "hidden"};
        opacity: ${({ isActiveModalLang }) => (isActiveModalLang ? "1" : "0")};
        position: absolute;
        width: 15rem;
        top: 120%;
        right: 60%;
        background-color: var(--boxes);
        border: 0.4rem solid rgba(34, 126, 240, 0.55);
        color: var(--text-primary);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.4rem;
        padding: 2rem;
        border-radius: 2rem 0 2rem 2rem;
        transition: all 0.3s ease;
        button {
            padding: 1rem 1.5rem;
            color: var(--text-secondary);

            &:hover {
                color: var(--text-primary);
            }
        }
    }
    @media (max-width: 768px) {
        width: 6rem;
        margin-left: auto;
    }
`;

import styled from "styled-components";

export const PortfolioContainer = styled.section`
    padding: clamp(6rem, 10vw, 10rem) 3rem;
    .content {
        width: min(110rem, 92%);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title-portfolio {
            text-align: center;
            p {
                max-width: 50rem;
                font-size: clamp(2rem, 3.5vw, 2.8rem);
                margin-top: 2rem;
                a {
                    font-size: inherit;
                    text-decoration: underline;
                    text-decoration-color: var(--blue);
                    color: var(--blue);
                }
            }
        }
        .portfolio-discovery {
            width: 100%;
            margin-top: 3rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.2rem;
            flex-wrap: wrap;
            .search-field {
                flex: 1 1 24rem;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                min-height: 4.6rem;
                padding: 0 1.2rem;
                border: 1px solid var(--line);
                border-radius: 1rem;
                background: var(--surface);
                color: var(--accent);
                input { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: var(--text-primary); }
            }
            .intent-filters { display: flex; gap: 0.7rem; flex-wrap: wrap; }
            .intent-filters button { min-height: 4.2rem; display: inline-flex; align-items: center; gap: 0.6rem; padding: 0 1rem; border: 1px solid var(--line); border-radius: 0.9rem; color: var(--text-secondary); &.active, &:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); } }
        }
        .content-portfolio {
            margin-top: clamp(5rem, 10vw, 12rem);
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
            gap: clamp(2rem, 4vw, 4rem);
            button.loadMoreRepositories {
                width: 100%;
                min-height: 30rem;
                border: 0.5rem dashed var(--blueOpacity);
                p {
                    font-size: 2rem;
                    color: var(--blue);
                    transition: all 0.3s linear;
                }
                &:hover {
                    p {
                        transform: scale(1.05);
                    }
                }
            }
            .empty-state { grid-column: 1 / -1; padding: 4rem; border: 1px dashed var(--line); border-radius: 1.2rem; color: var(--text-secondary); text-align: center; }
        }
    }
    @media (max-width: 640px) { .portfolio-discovery { align-items: stretch; flex-direction: column; } .intent-filters button { flex: 1; justify-content: center; } }
`;

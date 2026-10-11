import { HTMLAttributes } from "react";
import styled from "styled-components";

type MenuMobileProps = HTMLAttributes<HTMLElement> & {
    activeMenu: boolean;
};

export const MenuMobileContainer = styled.nav<MenuMobileProps>`
    display: none;
    @media (max-width: 768px) {
        display: block;

        position: fixed;
        inset: 0;
        z-index: 10;

        width: 100%;
        height: 100vh;
        height: 100dvh;
        overflow-y: auto;
        overscroll-behavior: contain;

        opacity: ${(props) => (props.activeMenu ? "1" : "0")};
        visibility: ${(props) => (props.activeMenu ? "visible" : "hidden")};
        background-color: var(--surface-strong);
        pointer-events: ${(props) => (props.activeMenu ? "auto" : "none")};

        transform: translateX(${(props) => (props.activeMenu ? "0%" : "-10%")});
        transition: opacity 0.3s ease, transform 0.3s ease;
        ul {
            width: inherit;
            height: inherit;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            gap: 2rem;

            transition: all 0.45s ease;
            li {
                list-style: none;
                button {
                    padding: 1rem 2rem;
                    font-size: 2rem;
                }
            }
        }
        button.closeMenu {
            position: absolute;
            right: 2rem;
            top: 2rem;
            width: 4.8rem;
            height: 4.8rem;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotate(${(props) => (props.activeMenu ? "0deg" : "-45deg")});
            transition: all 0.45s ease;
        }
    }
`;

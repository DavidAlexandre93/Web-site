import { createContext, ReactNode, useState } from "react";

interface HeaderProviderProps {
    children: ReactNode;
}

type HeaderContextData = {
    activeMenu: boolean;
    setActiveMenu: (state: boolean) => void;
    toggleShowMenu: () => void;
};

export const HeaderContext = createContext({} as HeaderContextData);

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
    const [activeMenu, setActiveMenu] = useState(false);

    function toggleShowMenu() {
        if (activeMenu) {
            document.body.style.overflowY = "scroll";
            setActiveMenu(false);
        } else {
            document.body.style.overflowY = "hidden";
            setActiveMenu(true);
        }
    }

    return (
        <HeaderContext.Provider
            value={{ activeMenu, setActiveMenu, toggleShowMenu }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

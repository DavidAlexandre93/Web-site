import { createContext, ReactNode, useCallback, useState } from "react";

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

    const toggleShowMenu = useCallback(() => {
        setActiveMenu((isActive) => !isActive);
    }, []);

    return (
        <HeaderContext.Provider
            value={{ activeMenu, setActiveMenu, toggleShowMenu }}
        >
            {children}
        </HeaderContext.Provider>
    );
};

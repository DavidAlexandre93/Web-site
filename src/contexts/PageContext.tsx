import {
    createContext,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import copy from "copy-to-clipboard";

interface PageProviderProps {
    children: ReactNode;
}

type PageContextData = {
    scrollToSection: (elementRef: RefObject<HTMLElement>) => void;
    scrollPageTop: () => void;
    handleCopyEmailInput: () => void;
    toggleModalLanguage: () => void;
    aboutRef: RefObject<HTMLElement>;
    skillsRef: RefObject<HTMLElement>;
    portfolioRef: RefObject<HTMLElement>;
    contactRef: RefObject<HTMLElement>;
    emailRef: RefObject<HTMLParagraphElement>;
    isVisibleHeader: boolean;
    handlePageTop: boolean;
    isActiveModalLang: boolean;
};

export const PageContext = createContext({} as PageContextData);

export const PageProvider = ({ children }: PageProviderProps) => {
    const aboutRef = useRef<HTMLElement>(null);
    const skillsRef = useRef<HTMLElement>(null);
    const portfolioRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);
    const emailRef = useRef<HTMLParagraphElement>(null);
    const [isVisibleHeader, setIsVisibleHeader] = useState(true);
    const [handlePageTop, setHandlePageTop] = useState(true);
    const [isActiveModalLang, setIsActiveModalLang] = useState(false);
    const lastScrollTopRef = useRef(0);

    const scrollToSection = useCallback((elementRef: RefObject<HTMLElement>) => {
        const elementOffsetY = elementRef.current?.offsetTop;
        window.scrollTo({
            top: Number(elementOffsetY) - 120,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    const scrollPageTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, []);

    const handleCopyEmailInput = useCallback(() => {
        copy(String(emailRef.current?.innerText));
    }, []);

    const toggleModalLanguage = useCallback(() => {
        setIsActiveModalLang((currentState) => !currentState);
    }, []);

    useEffect(() => {
        function toggleVisibleHeader() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTopRef.current) {
                setIsVisibleHeader(false);
                setIsActiveModalLang(false);
            } else {
                setIsVisibleHeader(true);
            }

            setHandlePageTop(scrollTop === 0);
            lastScrollTopRef.current = scrollTop;
        }

        window.addEventListener("scroll", toggleVisibleHeader);

        return () => {
            window.removeEventListener("scroll", toggleVisibleHeader);
        };
    }, []);

    return (
        <PageContext.Provider
            value={{
                scrollToSection,
                scrollPageTop,
                handleCopyEmailInput,
                toggleModalLanguage,
                aboutRef,
                skillsRef,
                portfolioRef,
                contactRef,
                emailRef,
                isVisibleHeader,
                handlePageTop,
                isActiveModalLang,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};

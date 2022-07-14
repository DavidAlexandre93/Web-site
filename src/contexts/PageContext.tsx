import {
    createContext,
    ReactNode,
    RefObject,
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
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isActiveModalLang, setIsActiveModalLang] = useState(false);

    function scrollToSection(elementRef: RefObject<HTMLElement>) {
        const elementOffsetY = elementRef.current?.offsetTop;
        window.scrollTo({
            top: Number(elementOffsetY) - 120,
            left: 0,
            behavior: "smooth",
        });
    }

    function scrollPageTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    function handleCopyEmailInput() {
        copy(String(emailRef.current?.innerText));
    }

    function toggleModalLanguage() {
        isActiveModalLang
            ? setIsActiveModalLang(false)
            : setIsActiveModalLang(true);
    }

    useEffect(() => {
        function toggleVisibleHeader() {
            let scrollTop =
                window.scrollY || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                setIsVisibleHeader(false);
                setIsActiveModalLang(false);
            } else {
                setIsVisibleHeader(true);
            }

            scrollTop == 0 ? setHandlePageTop(true) : setHandlePageTop(false);

            setLastScrollTop(scrollTop);
        }
        addEventListener("scroll", toggleVisibleHeader);

        return () => {
            removeEventListener("scroll", toggleVisibleHeader);
        };
    }, [lastScrollTop]);

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

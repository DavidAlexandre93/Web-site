import { SwitchLanguageContainer } from "./styles";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { IoLanguage } from "react-icons/io5";
import { RefObject, useContext, useRef } from "react";
import { PageContext } from "@/contexts";

export const SwitchLanguage = () => {
    const { isActiveModalLang, toggleModalLanguage } = useContext(PageContext);

    const { t } = useTranslation();
    const router = useRouter();

    const refLangPTBR = useRef(null);
    const refLangEN = useRef(null);

    const handleLocaleChange = (event: RefObject<HTMLButtonElement>) => {
        const value = String(event.current?.getAttribute("data-lang"));

        router.push(router.route, router.asPath, {
            locale: value,
        });
    };

    return (
        <SwitchLanguageContainer isActiveModalLang={isActiveModalLang}>
            <button
                className="btnOpenOptionsLanguage"
                onClick={toggleModalLanguage}
            >
                <IoLanguage size={30} />
            </button>
            <div className="selectLang">
                <button
                    className="lang"
                    data-lang="pt-BR"
                    ref={refLangPTBR}
                    onClick={() => handleLocaleChange(refLangPTBR)}
                >
                    {t("langPTBR")}
                </button>
                <button
                    className="lang"
                    data-lang="en"
                    ref={refLangEN}
                    onClick={() => handleLocaleChange(refLangEN)}
                >
                    {t("langEN")}
                </button>
            </div>
        </SwitchLanguageContainer>
    );
};

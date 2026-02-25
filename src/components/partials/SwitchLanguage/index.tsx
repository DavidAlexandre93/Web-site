import { SwitchLanguageContainer } from "./styles";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { IoLanguage } from "react-icons/io5";
import { useContext } from "react";
import { PageContext } from "@/contexts";

export const SwitchLanguage = () => {
    const { isActiveModalLang, toggleModalLanguage } = useContext(PageContext);

    const { t } = useTranslation();
    const router = useRouter();

    const handleLocaleChange = (value: string) => {
        router.push(router.route, router.asPath, {
            locale: value,
        });

        toggleModalLanguage();
    };

    return (
        <SwitchLanguageContainer>
            <button
                className="btnOpenOptionsLanguage"
                onClick={toggleModalLanguage}
            >
                <IoLanguage size={30} />
            </button>
            <div className={`selectLang ${isActiveModalLang ? "open" : ""}`}>
                <button
                    className="lang"
                    onClick={() => handleLocaleChange("pt-BR")}
                >
                    {t("langPTBR")}
                </button>
                <button
                    className="lang"
                    onClick={() => handleLocaleChange("en")}
                >
                    {t("langEN")}
                </button>
            </div>
        </SwitchLanguageContainer>
    );
};

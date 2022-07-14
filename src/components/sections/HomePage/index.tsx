import { HomeContainer } from "./styles";
import { RiShareBoxFill } from "react-icons/ri"; /*Share icon*/
import { BsArrowDownShort } from "react-icons/bs"; /*ArrowDown icon*/
import { FiCopy } from "react-icons/fi"; /*Copy icon*/
import Link from "next/link";
import { useContext } from "react";
import { PageContext } from "../../../contexts/PageContext";
import { useTranslation } from "next-i18next";

export const HomePage = () => {
    const { scrollToSection, handleCopyEmailInput, aboutRef, emailRef } =
        useContext(PageContext);
    const { t } = useTranslation();

    return (
        <HomeContainer>
            <h2 className="titleHome">{t("professionalPortfolio")}</h2>
            <p className="descriptionHome">{t("frontendDeveloper")}</p>
            <div className="links">
                <button
                    onClick={() => scrollToSection(aboutRef)}
                    title={t("knowAboutTitle")}
                >
                    <span>{t("knowAbout")}</span>
                    <BsArrowDownShort size={25} className="iconArrow" />
                </button>
                <Link href="https://github.com/DavidAlexandre93">
                    <a title={t("accessGithubTitle")}>
                        <span>GitHub</span> <RiShareBoxFill size={18} />
                    </a>
                </Link>
            </div>
            <div className="email">
                <div className="text-mail">
                    <p ref={emailRef}>davidalexandrefernandes@outlook.com</p>
                </div>
                <button
                    title={t("copyEmailTitle")}
                    onClick={handleCopyEmailInput}
                >
                    <FiCopy size={20} className="iconCopy" />
                </button>
            </div>
        </HomeContainer>
    );
};

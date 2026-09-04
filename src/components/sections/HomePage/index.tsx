import { useContext } from "react";
import Link from "next/link";
import { BsArrowDownShort } from "react-icons/bs";
import { FiArrowUpRight, FiCpu, FiLayers, FiShield } from "react-icons/fi";
import { useTranslation } from "next-i18next";
import { PageContext } from "@/contexts";
import { HomeContainer } from "./styles";

export const HomePage = () => {
    const { scrollToSection, aboutRef, portfolioRef } = useContext(PageContext);
    const { t } = useTranslation();

    return (
        <HomeContainer id="home">
            <div className="hero-grid">
                <div className="hero-copy">
                    <p className="eyebrow"><span /> {t("heroEyebrow")}</p>
                    <h2>{t("professionalPortfolio")}</h2>
                    <p className="descriptionHome">{t("frontendDeveloper")}</p>
                    <p className="hero-lede">{t("heroLede")}</p>
                    <div className="links">
                        <button onClick={() => scrollToSection(portfolioRef)}>
                            <span>{t("heroPrimaryCta")}</span>
                            <FiArrowUpRight aria-hidden="true" />
                        </button>
                        <button className="secondary" onClick={() => scrollToSection(aboutRef)}>
                            <span>{t("knowAbout")}</span>
                            <BsArrowDownShort aria-hidden="true" />
                        </button>
                        <Link href="https://github.com/DavidAlexandre93">
                            <a className="text-link" target="_blank" rel="noreferrer">GitHub <FiArrowUpRight aria-hidden="true" /></a>
                        </Link>
                    </div>
                </div>
                <div className="hero-signal" aria-label={t("heroSignalLabel")}>
                    <div className="signal-top"><span className="status-dot" /> {t("heroAvailable")}</div>
                    <p className="signal-number">AI-native<span>.</span></p>
                    <p className="signal-copy">{t("heroSignalCopy")}</p>
                    <div className="signal-list">
                        <span><FiCpu aria-hidden="true" /> {t("heroSignalOne")}</span>
                        <span><FiLayers aria-hidden="true" /> {t("heroSignalTwo")}</span>
                        <span><FiShield aria-hidden="true" /> {t("heroSignalThree")}</span>
                    </div>
                </div>
            </div>
            <div className="hero-meta" aria-label={t("heroMetaLabel")}>
                <span><strong>04+</strong> {t("heroMetaYears")}</span>
                <span><strong>24/7</strong> {t("heroMetaSystems")}</span>
                <span><strong>∞</strong> {t("heroMetaCuriosity")}</span>
            </div>
        </HomeContainer>
    );
};

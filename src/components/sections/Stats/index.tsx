import { StatsContainer } from "./styles";
import { FaBug } from "react-icons/fa"; /*Bug icon */
import { RiGitRepositoryLine } from "react-icons/ri"; /*Repository icon */
import { MdTimer } from "react-icons/md"; /*Timer icon */
import { MdOutlineLightbulb } from "react-icons/md"; /*Light icon */
import { ProfileContext } from "../../../contexts/ProfileContext";
import { useContext } from "react";
import { useTranslation } from "next-i18next";

export const Stats = () => {
    const { amountRepositories } = useContext(ProfileContext);
    const { t } = useTranslation();

    return (
        <StatsContainer>
            <div className="cardStats" title={t("debugsTitle")}>
                <div className="icon">
                    <FaBug size={40} />
                </div>
                <h3>40+</h3>
                <p>{t("debugs")}</p>
            </div>

            <div className="cardStats" title={t("projectsTitle")}>
                <div className="icon">
                    <RiGitRepositoryLine size={40} />
                </div>
                <h3>{amountRepositories}</h3>
                <p>{t("projects")}</p>
            </div>

            <div className="cardStats" title={t("hourProgrammingTitle")}>
                <div className="icon">
                    <MdTimer size={40} />
                </div>
                <h3>3800+</h3>
                <p>{t("hourProgramming")}</p>
            </div>

            <div className="cardStats" title={t("numberIdeasTitle")}>
                <div className="icon">
                    <MdOutlineLightbulb size={40} />
                </div>
                <h3>100</h3>
                <p>{t("numberIdeas")}</p>
            </div>
        </StatsContainer>
    );
};

import { TitleSection } from "../../partials/TitleSection";
import { ContactContainer } from "./styles";

import { IoLocationOutline } from "react-icons/io5"; /* Location icon */
import { IoMailOutline } from "react-icons/io5"; /* Email icon */
import { BsWhatsapp } from "react-icons/bs"; /*Whatsapp icon */
import Link from "next/link";
import { useContext } from "react";
import { PageContext } from "../../../contexts/PageContext";
import { useTranslation } from "next-i18next";

export const Contact = () => {
    const { contactRef } = useContext(PageContext);
    const { t } = useTranslation();

    return (
        <ContactContainer ref={contactRef}>
            <div className="content">
                <div className="title-contact">
                    <p>{t("letStart")}</p>
                    <TitleSection>{t("contact")}</TitleSection>
                </div>
                <div className="content-contact">
                    <Link
                        href={
                            "https://www.google.com.br/maps/place/S%C3%A3o+Paulo,+SP/@-23.6815303,-46.8761671,10z/data=!3m1!4b1!4m5!3m4!1s0x94ce448183a461d1:0x9ba94b08ff335bae!8m2!3d-23.5557714!4d-46.6395571"
                        }
                    >
                        <a className="card-contact" title={t("locationTitle")}>
                            <IoLocationOutline
                                size={40}
                                className="icon-cardContact"
                            />
                            <h4>{t("location")}</h4>
                            <p>São Paulo, SP</p>
                            <p>Brasil</p>
                        </a>
                    </Link>
                    <Link
                        href={
                            "https://calendly.com/davidalexandrefernandes"
                        }
                    >
                        <a className="card-contact" title={t("sendEmailTitle")}>
                            <IoMailOutline
                                size={40}
                                className="icon-cardContact"
                            />
                            <h4>E-mail</h4>
                            <p>davidalexandrefernandes@outlook.com</p>
                        </a>
                    </Link>
                    <Link href={"https://wa.me/5581987232647"}>
                        <a className="card-contact" title={t("contactTitle")}>
                            <BsWhatsapp
                                size={40}
                                className="icon-cardContact"
                            />
                            <h4>Whatsapp</h4>
                            <p>(+55) 11 9 59364795</p>
                        </a>
                    </Link>
                </div>
            </div>
        </ContactContainer>
    );
};

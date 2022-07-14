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
                            "https://www.google.com.br/maps/place/Imbiribeira,+Recife+-+PE/@-8.1073439,-34.9296383,14z/data=!3m1!4b1!4m5!3m4!1s0x7ab1ef8d31b72c5:0x75196a189ef3895a!8m2!3d-8.1088584!4d-34.91189"
                        }
                    >
                        <a className="card-contact" title={t("locationTitle")}>
                            <IoLocationOutline
                                size={40}
                                className="icon-cardContact"
                            />
                            <h4>{t("location")}</h4>
                            <p>Recife, PE</p>
                            <p>Brasil</p>
                        </a>
                    </Link>
                    <Link
                        href={
                            "https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRwRCXCSJjHSxsTZscRMmmKHvRzcrDTpQjptVxVsCtFRcxVVSmkNDvWrhcmNhrLCkQVzSGbc"
                        }
                    >
                        <a className="card-contact" title={t("sendEmailTitle")}>
                            <IoMailOutline
                                size={40}
                                className="icon-cardContact"
                            />
                            <h4>E-mail</h4>
                            <p>davidalexandrecontact@gmail.com</p>
                        </a>
                    </Link>
                    <Link href={"https://wa.me/5581987232647"}>
                        <a className="card-contact" title={t("contactTitle")}>
                            <BsWhatsapp
                                size={40}
                                className="icon-cardContact"
                            />
                            <h4>Whatsapp</h4>
                            <p>(+55) 81 98723-2647</p>
                        </a>
                    </Link>
                </div>
            </div>
        </ContactContainer>
    );
};

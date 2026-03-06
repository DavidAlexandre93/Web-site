import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { NextHead } from "@/components";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
        },
    };
}

export default function Custom404() {
    const { t } = useTranslation();

    return (
        <>
            <NextHead title={t("pageNotFound")} faviconPath="favicon-404.svg" />
            <NotFoundContainer>
                <div className="aurora aurora-purple" />
                <div className="aurora aurora-blue" />
                <div className="aurora aurora-orange" />
                <div className="gridOverlay" />

                <section className="card">
                    <div className="content">
                        <span className="status">404 · Portfolio</span>
                        <h1>{t("pageNotFound")}</h1>
                        <p>{t("pageNotFoundDescription")}</p>
                        <p>{t("retryLater")}</p>

                        <Link href="/">
                            <a title={t("returnPage")}>
                                <IoReturnDownBackSharp size={22} />
                                {t("returnPage")}
                            </a>
                        </Link>
                    </div>

                    <div className="imageWrap">
                        <div className="imageCard">
                            <Image src="/notfound.svg" alt={t("pageNotFound")} width={560} height={400} priority />
                        </div>
                    </div>
                </section>
            </NotFoundContainer>
        </>
    );
}

const NotFoundContainer = styled.main`
    width: 100%;
    min-height: 100vh;
    background: radial-gradient(circle at 20% 10%, rgba(110, 87, 224, 0.22), transparent 28%),
        radial-gradient(circle at 80% 20%, rgba(9, 125, 234, 0.2), transparent 30%),
        linear-gradient(140deg, #121416 0%, #151718 35%, #1b1f25 100%);

    position: relative;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(2rem, 4vw, 4rem);

    .aurora {
        position: absolute;
        border-radius: 50%;
        filter: blur(9rem);
        z-index: 0;
        animation: float 9s ease-in-out infinite;
        opacity: 0.9;
    }

    .aurora-purple {
        width: 42rem;
        height: 42rem;
        background: rgba(110, 87, 224, 0.38);
        left: -8rem;
        top: 8%;
    }

    .aurora-blue {
        width: 44rem;
        height: 44rem;
        background: rgba(9, 125, 234, 0.34);
        right: -10rem;
        bottom: 5%;
        animation-delay: 1.6s;
    }

    .aurora-orange {
        width: 30rem;
        height: 30rem;
        background: rgba(246, 173, 85, 0.22);
        right: 25%;
        top: -7rem;
        animation-delay: 3.2s;
    }

    .gridOverlay {
        position: absolute;
        inset: 0;
        z-index: 0;
        opacity: 0.18;
        background-image: linear-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
        background-size: 3.2rem 3.2rem;
        mask-image: radial-gradient(circle at center, black 35%, transparent 82%);
    }

    .card {
        z-index: 1;
        width: min(112rem, 100%);

        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: clamp(2rem, 3vw, 4rem);

        padding: clamp(2.2rem, 4vw, 4.4rem);

        border-radius: 2.8rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: linear-gradient(145deg, rgba(36, 40, 48, 0.88), rgba(23, 26, 30, 0.9));
        box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.02);

        backdrop-filter: blur(0.7rem);
        -webkit-backdrop-filter: blur(0.7rem);
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.8rem;

        .status {
            width: fit-content;
            border-radius: 10rem;
            padding: 0.5rem 1.4rem;
            letter-spacing: 0.1rem;
            text-transform: uppercase;
            font-size: 1.3rem;
            color: #d8ebff;
            background: linear-gradient(95deg, rgba(9, 125, 234, 0.45), rgba(110, 87, 224, 0.45));
            border: 1px solid rgba(255, 255, 255, 0.18);
        }

        h1 {
            font-size: clamp(3.1rem, 5vw, 5.2rem);
            line-height: 1.1;
            text-transform: uppercase;
            text-wrap: balance;
        }

        p {
            color: var(--text-secondary);
            font-size: clamp(1.7rem, 2.1vw, 2rem);
            line-height: 1.65;
            max-width: 48rem;
        }

        p:last-of-type {
            color: #cbd5e1;
            border-left: 0.3rem solid rgba(12, 127, 233, 0.7);
            padding-left: 1.2rem;
        }

        a {
            margin-top: 1.2rem;
            width: fit-content;
            min-width: 25rem;
            height: 5.2rem;
            border-radius: 1.4rem;
            padding: 0 2.2rem;

            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;

            font-weight: 600;
            background: linear-gradient(90deg, #0c7fe9 0%, #6e57e0 100%);
            box-shadow: 0 0.9rem 2rem rgba(12, 127, 233, 0.28);
            transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;

            &:hover {
                transform: translateY(-0.2rem);
                box-shadow: 0 1.2rem 2.4rem rgba(12, 127, 233, 0.33);
                filter: brightness(1.05);
            }
        }
    }

    .imageWrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .imageCard {
        width: 100%;
        max-width: 52rem;
        border-radius: 2.2rem;
        padding: clamp(1rem, 2.4vw, 2rem);
        background: linear-gradient(140deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.01));
        border: 1px solid rgba(255, 255, 255, 0.1);

        img {
            width: 100%;
            max-height: 38rem;
            object-fit: contain;
        }
    }

    @keyframes float {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-1.2rem);
        }
    }

    @media (max-width: 920px) {
        .card {
            grid-template-columns: 1fr;
        }

        .content {
            align-items: center;
            text-align: center;

            p {
                max-width: 100%;
            }

            p:last-of-type {
                border-left: none;
                border-top: 0.3rem solid rgba(12, 127, 233, 0.7);
                padding-left: 0;
                padding-top: 1rem;
            }

            a {
                width: 100%;
            }
        }

        .imageWrap {
            order: -1;
        }
    }

    @media (max-width: 480px) {
        .card {
            padding: 2rem;
            border-radius: 2rem;
        }

        .content {
            gap: 1.5rem;
        }

        .imageCard {
            border-radius: 1.6rem;
        }
    }
`;

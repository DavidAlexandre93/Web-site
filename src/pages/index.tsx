import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
    About,
    Contact,
    Footer,
    Header,
    HomePage,
    MenuMobile,
    NextHead,
    Portfolio,
    Separator,
    Skills,
    Stats,
} from "@/components";
import { HeaderProvider, ProfileProvider } from "@/contexts";

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "home"])),
        },
    };
}

const Home: NextPage = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "David Alexandre Fernandes",
        url: "https://www.david-alexandre.dev/",
        jobTitle: "Software Engineer",
        image: "https://www.david-alexandre.dev/application.png",
        sameAs: [
            "https://github.com/DavidAlexandre93",
            "https://www.linkedin.com/in/david-alexandre-fernandes-08b005b4/",
        ],
        worksFor: {
            "@type": "Organization",
            name: "Dock",
        },
    };

    return (
        <>
            <NextHead
                title="David Alexandre Fernandes | Software Engineer | Pix, Cloud & Applied AI"
                faviconPath="favicon.svg"
                description="Engenheiro de Software Sênior com 10 anos de experiência em APIs, microsserviços, pagamentos Pix, cloud e inteligência artificial aplicada."
                canonicalUrl="https://www.david-alexandre.dev/"
                schema={schema}
            />
            <HeaderProvider>
                <Header />
                <MenuMobile />
            </HeaderProvider>
            <ProfileProvider>
                <main>
                    <HomePage />
                    <Separator />
                    <Stats />
                    <Separator />
                    <About />
                    <Separator />
                    <Skills />
                    <Separator />
                    <Portfolio />
                    <Separator />
                    <Contact />
                    <Footer />
                </main>
            </ProfileProvider>
        </>
    );
};

export default Home;

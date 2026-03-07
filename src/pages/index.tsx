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
        jobTitle: "Software Developer",
        image: "https://www.david-alexandre.dev/application.png",
        sameAs: [
            "https://github.com/DavidAlexandre93",
            "https://www.linkedin.com/in/david-alexandre-fernandes/",
            "https://www.instagram.com/davids.8/",
        ],
        worksFor: {
            "@type": "Organization",
            name: "David Alexandre Fernandes",
        },
    };

    return (
        <>
            <NextHead
                title="Portfolio David Alexandre Fernandes - Software Developer | DevOps | Artificial Intelligence | Blockchain"
                faviconPath="favicon.svg"
                description="Portfólio com projetos, experiência em desenvolvimento full cycle, DevOps e inteligência artificial."
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

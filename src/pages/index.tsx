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
    return (
        <>
            <NextHead
                title="Portfolio David Alexandre Fernandes - Desenvolvedor Frontend, ReactJS, NextJS, NodeJS"
                faviconPath="favicon.svg"
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

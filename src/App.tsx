import Script from "next/script";
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
import { HeaderProvider, PageProvider, ProfileProvider } from "@/contexts";
import GlobalStyle from "@/styles/GlobalStyle";

export default function App() {
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
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" />
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" />
            <Script src="https://cdn.jsdelivr.net/npm/motion@10.18.0/dist/motion.umd.min.js" />

            <NextHead
                title="Portfolio David Alexandre Fernandes - Software Developer | DevOps | Artificial Intelligence | Blockchain"
                faviconPath="favicon.svg"
                description="Portfólio com projetos, experiência em desenvolvimento full cycle, DevOps e inteligência artificial."
                canonicalUrl="https://www.david-alexandre.dev/"
                schema={schema}
            />

            <PageProvider>
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
                <GlobalStyle />
            </PageProvider>
        </>
    );
}

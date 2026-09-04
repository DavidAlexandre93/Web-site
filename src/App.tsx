import {
    About,
    Contact,
    Footer,
    Header,
    HomePage,
    MenuMobile,
    NextHead,
    Portfolio,
    PortfolioAssistant,
    Separator,
    Skills,
    Stats,
} from "@/components";
import { HeaderProvider, PageProvider, ProfileProvider } from "@/contexts";
import GlobalStyle from "@/styles/GlobalStyle";
import { useEnhancedExperience } from "@/utils";

export default function App() {
    useEnhancedExperience();
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "David Alexandre Fernandes",
        url: "https://www.davidalexandrefernandes.com/",
        jobTitle: "Senior Software Engineer",
        image: "https://www.davidalexandrefernandes.com/application.png",
        sameAs: [
            "https://github.com/DavidAlexandre93",
            "https://www.linkedin.com/in/david-alexandre-fernandes-08b005b4/",
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
                <PortfolioAssistant />
                <GlobalStyle />
            </PageProvider>
        </>
    );
}

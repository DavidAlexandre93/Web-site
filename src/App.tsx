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

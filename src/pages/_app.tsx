import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import GlobalStyle from "../styles/GlobalStyle";
import { PageProvider } from "../contexts/PageContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/motion@10.18.0/dist/motion.umd.min.js"
                strategy="beforeInteractive"
            />
            <PageProvider>
                <Component {...pageProps} />
                <GlobalStyle />
            </PageProvider>
        </>
    );
}

export default appWithTranslation(MyApp);

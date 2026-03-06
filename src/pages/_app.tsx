import type { AppProps, NextWebVitalsMetric } from "next/app";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import GlobalStyle from "@/styles/GlobalStyle";
import { PageProvider } from "@/contexts";

const WEB_VITALS_SAMPLE_RATE = 1;

export function reportWebVitals(metric: NextWebVitalsMetric) {
    if (Math.random() > WEB_VITALS_SAMPLE_RATE) {
        return;
    }

    console.info("[metrics] web_vitals", {
        id: metric.id,
        name: metric.name,
        value: metric.value,
        label: metric.label,
        page: window.location.pathname,
    });
}

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
                strategy="afterInteractive"
            />
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
                strategy="afterInteractive"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/motion@10.18.0/dist/motion.umd.min.js"
                strategy="afterInteractive"
            />
            <PageProvider>
                <Component {...pageProps} />
                <GlobalStyle />
            </PageProvider>
        </>
    );
}

export default appWithTranslation(MyApp);

import type { AppProps, NextWebVitalsMetric } from "next/app";
import { appWithTranslation } from "next-i18next";
import Script from "next/script";
import { Component, ErrorInfo, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
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

type ErrorBoundaryProps = {
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Unhandled render error:", error, errorInfo);

        if (typeof window !== "undefined") {
            window.location.replace("/404");
        }
    }

    render() {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}

function RuntimeErrorRedirect() {
    const router = useRouter();

    useEffect(() => {
        const redirectToNotFound = () => {
            if (window.location.pathname !== "/404") {
                router.replace("/404");
            }
        };

        window.addEventListener("error", redirectToNotFound);
        window.addEventListener("unhandledrejection", redirectToNotFound);

        return () => {
            window.removeEventListener("error", redirectToNotFound);
            window.removeEventListener("unhandledrejection", redirectToNotFound);
        };
    }, [router]);

    return null;
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
                <AppErrorBoundary>
                    <RuntimeErrorRedirect />
                    <Component {...pageProps} />
                    <GlobalStyle />
                </AppErrorBoundary>
            </PageProvider>
        </>
    );
}

export default appWithTranslation(MyApp);

import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import GlobalStyle from "../styles/GlobalStyle";
import { PageProvider } from "../contexts/PageContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <PageProvider>
                <Component {...pageProps} />
                <GlobalStyle />
            </PageProvider>
        </>
    );
}

export default appWithTranslation(MyApp);

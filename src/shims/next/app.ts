import { ComponentType } from "react";

export type AppProps = {
    Component: ComponentType<any>;
    pageProps: Record<string, unknown>;
};

export type NextWebVitalsMetric = {
    id: string;
    name: string;
    value: number;
    label: string;
};

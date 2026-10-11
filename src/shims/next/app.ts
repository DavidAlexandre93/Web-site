import { ComponentType } from "react";

export type AppProps = {
    Component: ComponentType<Record<string, unknown>>;
    pageProps: Record<string, unknown>;
};

export type NextWebVitalsMetric = {
    id: string;
    name: string;
    value: number;
    label: string;
};

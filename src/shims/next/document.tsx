import { PropsWithChildren } from "react";

export const Html = ({ children }: PropsWithChildren<{}>) => <>{children}</>;
export const Head = ({ children }: PropsWithChildren<{}>) => <>{children}</>;
export const Main = () => null;
export const NextScript = () => null;

export type DocumentContext = unknown;
export type DocumentInitialProps = unknown;

export default class Document {
    static async getInitialProps() {
        return {};
    }

    render() {
        return null;
    }
}

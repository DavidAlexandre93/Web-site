export type NextPage = () => JSX.Element;
export type NextPageContext = {
    res?: {
        statusCode: number;
        headersSent?: boolean;
        writeHead: (statusCode: number, headers: Record<string, string>) => void;
        end: () => void;
    };
    err?: {
        statusCode?: number;
    };
};

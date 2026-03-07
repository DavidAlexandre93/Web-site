import Error, { ErrorProps } from "next/error";
import { NextPageContext } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

type CustomErrorProps = ErrorProps;

function CustomError({ statusCode }: CustomErrorProps) {
    const router = useRouter();

    useEffect(() => {
        if (router.pathname !== "/404") {
            router.replace("/404");
        }
    }, [router]);

    return <Error statusCode={statusCode} />;
}

CustomError.getInitialProps = ({ res, err }: NextPageContext): CustomErrorProps => {
    const statusCode = res ? res.statusCode : err ? err.statusCode || 500 : 404;

    if (res && !res.headersSent) {
        res.writeHead(302, { Location: "/404" });
        res.end();
    }

    return { statusCode };
};

export default CustomError;

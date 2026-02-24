import Head from "next/head";

type NextHeadProps = {
    title: string;
    faviconPath: string;
};

const NextHead = ({ title, faviconPath }: NextHeadProps) => {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />

            <link
                rel="shortcut icon"
                href={`./${faviconPath}`}
                type="image/x-icon"
            />

            <title>{title}</title>
            <link rel="canonical" href="https://www.david-alexandre.dev/" />
            <meta name="language" content="pt-BR" />
            <meta httpEquiv="content-language" content="pt-br" />
            <meta
                name="keywords"
                content="David Alexandre Fernandes, portfolio David Alexandre Fernandes, dev, David Alexandre Fernandes dev,programador, desenvolvedor full cycle, desenvolvedor, devops, sre, qualidade de software, cloud computing, inteligência artificial, blockchain, nft, metaverso"
            />
            <meta
                name="title"
                content="Portfolio David Alexandre Fernandes - Software Developer | DevOps | Artificial Intelligence | Blockchain"
            />
            <meta
                name="description"
                content="Software Developer com atuação em Full Cycle, DevOps, SRE, Qualidade de Software, Cloud Computing, Inteligência Artificial e Blockchain (NFT/Metaverso)."
            />
            <meta name="author" content="David Alexandre Fernandes" />
            <meta name="creator" content="David Alexandre Fernandes" />
            <meta name="copyright" content="© 2022 David Alexandre Fernandes" />
            <meta name="rating" content="general" />

            <meta property="og:url" content="https://www.david-alexandre.dev/" />
            <meta property="og:type" content="website" />
            <meta
                property="og:title"
                content="Portfolio David Alexandre Fernandes - Software Developer | DevOps | Artificial Intelligence | Blockchain"
            />
            <meta
                property="og:description"
                content="Software Developer com atuação em Full Cycle, DevOps, SRE, Qualidade de Software, Cloud Computing, Inteligência Artificial e Blockchain (NFT/Metaverso)."
            />
            <meta
                property="og:image"
                content="https://www.david-alexandre.dev/application.png"
            />
            <meta
                property="og:site_name"
                content="Portfolio David Alexandre Fernandes - Software Developer"
            />
        </Head>
    );
};

export default NextHead;

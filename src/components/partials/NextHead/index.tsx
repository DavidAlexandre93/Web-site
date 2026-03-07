import Head from "next/head";

type NextHeadProps = {
    title: string;
    faviconPath: string;
    description?: string;
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
    schema?: Record<string, unknown>;
};

const defaultCanonicalUrl = "https://www.david-alexandre.dev/";
const defaultDescription =
    "Software Developer com atuação em Full Cycle, DevOps, SRE, Qualidade de Software, Cloud Computing, Inteligência Artificial e Blockchain (NFT/Metaverso).";
const defaultOgImage = "https://www.david-alexandre.dev/application.png";

const NextHead = ({
    title,
    faviconPath,
    description = defaultDescription,
    canonicalUrl = defaultCanonicalUrl,
    ogImage = defaultOgImage,
    noIndex = false,
    schema,
}: NextHeadProps) => {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, viewport-fit=cover"
            />

            <link
                rel="shortcut icon"
                href={`./${faviconPath}`}
                type="image/x-icon"
            />

            <title>{title}</title>
            <link rel="canonical" href={canonicalUrl} />
            <meta name="language" content="pt-BR" />
            <meta httpEquiv="content-language" content="pt-br" />
            <meta
                name="keywords"
                content="David Alexandre Fernandes, portfolio David Alexandre Fernandes, dev, David Alexandre Fernandes dev,programador, desenvolvedor full cycle, desenvolvedor, devops, sre, qualidade de software, cloud computing, inteligência artificial, blockchain, nft, metaverso"
            />
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="author" content="David Alexandre Fernandes" />
            <meta name="creator" content="David Alexandre Fernandes" />
            <meta name="copyright" content="© 2022 David Alexandre Fernandes" />
            <meta name="rating" content="general" />
            <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large"} />

            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="Portfolio David Alexandre Fernandes - Software Developer" />
            <meta property="og:locale" content="pt_BR" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {schema ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ) : null}
        </Head>
    );
};

export default NextHead;

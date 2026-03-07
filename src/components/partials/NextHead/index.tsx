import { useEffect } from "react";

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

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
    let element = document.head.querySelector(selector) as HTMLMetaElement | null;

    if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
    }

    Object.entries(attributes).forEach(([key, value]) => {
        element?.setAttribute(key, value);
    });
};

const upsertLink = (selector: string, attributes: Record<string, string>) => {
    let element = document.head.querySelector(selector) as HTMLLinkElement | null;

    if (!element) {
        element = document.createElement("link");
        document.head.appendChild(element);
    }

    Object.entries(attributes).forEach(([key, value]) => {
        element?.setAttribute(key, value);
    });
};

const NextHead = ({
    title,
    faviconPath,
    description = defaultDescription,
    canonicalUrl = defaultCanonicalUrl,
    ogImage = defaultOgImage,
    noIndex = false,
    schema,
}: NextHeadProps) => {
    useEffect(() => {
        document.title = title;

        upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
        upsertLink('link[rel="icon"]', { rel: "icon", href: `/${faviconPath}` });

        upsertMeta('meta[name="description"]', { name: "description", content: description });
        upsertMeta('meta[name="robots"]', {
            name: "robots",
            content: noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large",
        });
        upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
        upsertMeta('meta[property="og:description"]', {
            property: "og:description",
            content: description,
        });
        upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
        upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
        upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
        upsertMeta('meta[name="twitter:description"]', {
            name: "twitter:description",
            content: description,
        });
        upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });

        const schemaId = "portfolio-schema-json";
        const existingSchema = document.getElementById(schemaId);

        if (schema) {
            const schemaElement = existingSchema ?? document.createElement("script");
            schemaElement.id = schemaId;
            schemaElement.setAttribute("type", "application/ld+json");
            schemaElement.textContent = JSON.stringify(schema);
            if (!existingSchema) {
                document.head.appendChild(schemaElement);
            }
        }
    }, [canonicalUrl, description, faviconPath, noIndex, ogImage, schema, title]);

    return null;
};

export default NextHead;

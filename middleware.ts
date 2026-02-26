import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LOCALE = "en-US";
const SUPPORTED_LOCALES = ["pt-BR", "en-US", "fr", "ja"] as const;

const COUNTRY_LOCALE_MAP: Record<string, (typeof SUPPORTED_LOCALES)[number]> = {
    BR: "pt-BR",
    FR: "fr",
    US: "en-US",
    JP: "ja",
};

const PUBLIC_FILE = /\.(.*)$/;

const normalizeLocale = (locale: string) => {
    const normalized = locale.toLowerCase();

    if (normalized.startsWith("pt")) {
        return "pt-BR";
    }

    if (normalized.startsWith("en")) {
        return "en-US";
    }

    if (normalized.startsWith("fr")) {
        return "fr";
    }

    if (normalized.startsWith("ja")) {
        return "ja";
    }

    return null;
};

const getLocaleFromAcceptLanguage = (headerValue: string | null) => {
    if (!headerValue) {
        return null;
    }

    const acceptedLanguages = headerValue
        .split(",")
        .map((entry) => entry.split(";")[0]?.trim())
        .filter(Boolean) as string[];

    for (const language of acceptedLanguages) {
        const locale = normalizeLocale(language);

        if (locale) {
            return locale;
        }
    }

    return null;
};

const getPreferredLocale = (request: NextRequest) => {
    const countryCode = request.geo?.country;
    const localeFromCountry = countryCode
        ? COUNTRY_LOCALE_MAP[countryCode]
        : null;

    if (localeFromCountry) {
        return localeFromCountry;
    }

    return getLocaleFromAcceptLanguage(request.headers.get("accept-language")) || DEFAULT_LOCALE;
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const hasLocalePrefix = SUPPORTED_LOCALES.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    );

    if (
        hasLocalePrefix ||
        pathname.startsWith("/_next") ||
        pathname.includes("/api/") ||
        PUBLIC_FILE.test(pathname)
    ) {
        return NextResponse.next();
    }

    const preferredLocale = getPreferredLocale(request);
    const localeUrl = new URL(`/${preferredLocale}${pathname}`, request.url);

    return NextResponse.redirect(localeUrl);
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

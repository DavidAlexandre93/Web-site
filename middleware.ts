import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LOCALE = "en-US";
const SUPPORTED_LOCALES = ["pt-BR", "en-US", "fr", "ja"] as const;

const COUNTRY_GROUPS = {
    "pt-BR": new Set([
        "BR", "PT", "AO", "MZ", "GW", "CV", "ST", "TL", "MO", "GQ",
    ]),
    "en-US": new Set([
        "US", "GB", "IE", "CA", "AU", "NZ", "ZA", "IN", "SG", "PH",
        "NG", "GH", "KE", "UG", "ZM", "ZW", "PK", "MT", "JM", "BZ",
        "TT", "BS", "BB",
    ]),
    fr: new Set([
        "FR", "BE", "CH", "LU", "MC", "CA", "HT", "SN", "CI", "ML",
        "BF", "NE", "TG", "BJ", "CM", "CD", "CG", "GA", "DJ", "MG",
        "MU", "SC", "RW", "BI", "GN", "TD", "CF", "KM", "VU",
    ]),
    ja: new Set(["JP"]),
} as const;

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

const getCountryCode = (request: NextRequest) => {
    const geoCountry = request.geo?.country;

    if (geoCountry) {
        return geoCountry.toUpperCase();
    }

    const providerCountry =
        request.headers.get("x-vercel-ip-country") || request.headers.get("cf-ipcountry");

    return providerCountry?.toUpperCase() || null;
};

const getLocaleFromCountry = (countryCode: string | null) => {
    if (!countryCode) {
        return null;
    }

    if (COUNTRY_GROUPS.ja.has(countryCode)) {
        return "ja";
    }

    if (COUNTRY_GROUPS["pt-BR"].has(countryCode)) {
        return "pt-BR";
    }

    if (COUNTRY_GROUPS.fr.has(countryCode)) {
        return "fr";
    }

    if (COUNTRY_GROUPS["en-US"].has(countryCode)) {
        return "en-US";
    }

    return null;
};

const getPreferredLocale = (request: NextRequest) => {
    const localeFromCountry = getLocaleFromCountry(getCountryCode(request));

    if (localeFromCountry) {
        return localeFromCountry;
    }

    return getLocaleFromAcceptLanguage(request.headers.get("accept-language")) || DEFAULT_LOCALE;
};

export const middlewareTestUtils = {
    normalizeLocale,
    getLocaleFromAcceptLanguage,
    getLocaleFromCountry,
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

import i18n from "@/lib/i18n";

export function useRouter() {
    return {
        route: window.location.pathname,
        asPath: window.location.pathname + window.location.search,
        pathname: window.location.pathname,
        push: async (_route: string, asPath?: string, options?: { locale?: string }) => {
            if (options?.locale) {
                await i18n.changeLanguage(options.locale);
            }

            if (asPath && asPath !== window.location.pathname) {
                window.history.pushState({}, "", asPath);
            }

            return true;
        },
        replace: async (path: string) => {
            window.location.replace(path);
            return true;
        },
    };
}

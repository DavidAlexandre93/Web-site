import { useSyncExternalStore } from "react";
import ptBR from "@/locales/pt-BR/common.json";
import enUS from "@/locales/en-US/common.json";
import fr from "@/locales/fr/common.json";
import ja from "@/locales/ja/common.json";

const resources = {
    "pt-BR": ptBR,
    "en-US": enUS,
    fr,
    ja,
} as const;

type SupportedLocale = keyof typeof resources;

let currentLanguage: SupportedLocale = "pt-BR";
const listeners = new Set<() => void>();

const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

const getSnapshot = () => currentLanguage;

const translate = (language: SupportedLocale, key: string) => {
    const fallback = resources["en-US"] as Record<string, string>;
    const dictionary = resources[language] as Record<string, string>;

    return dictionary[key] ?? fallback[key] ?? key;
};

export const i18n: { language: string; changeLanguage: (nextLanguage: string) => Promise<void> } = {
    language: currentLanguage,
    changeLanguage: async (nextLanguage: string) => {
        if (nextLanguage in resources) {
            currentLanguage = nextLanguage as SupportedLocale;
            i18n.language = currentLanguage;
            listeners.forEach((listener) => listener());
        }
    },
};

export const useTranslation = () => {
    const language = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

    return {
        t: (key: string) => translate(language, key),
        i18n,
    };
};

export const appWithTranslation = <T,>(Component: T): T => Component;

import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "src") },
            { find: "next/app", replacement: path.resolve(__dirname, "src/shims/next/app.ts") },
            { find: "next/error", replacement: path.resolve(__dirname, "src/shims/next/error.tsx") },
            { find: "next/document", replacement: path.resolve(__dirname, "src/shims/next/document.tsx") },
            { find: "next/link", replacement: path.resolve(__dirname, "src/shims/next/link.tsx") },
            { find: "next/image", replacement: path.resolve(__dirname, "src/shims/next/image.tsx") },
            { find: "next/router", replacement: path.resolve(__dirname, "src/shims/next/router.ts") },
            { find: "next/script", replacement: path.resolve(__dirname, "src/shims/next/script.tsx") },
            {
                find: "next-i18next/serverSideTranslations",
                replacement: path.resolve(__dirname, "src/shims/next-i18next/serverSideTranslations.ts"),
            },
            { find: "next-i18next", replacement: path.resolve(__dirname, "src/shims/next-i18next/index.ts") },
            { find: /^next$/, replacement: path.resolve(__dirname, "src/shims/next/index.ts") },
        ],
    },
});

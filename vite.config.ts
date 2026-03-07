import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "next": path.resolve(__dirname, "src/shims/next/index.ts"),
            "next/app": path.resolve(__dirname, "src/shims/next/app.ts"),
            "next/error": path.resolve(__dirname, "src/shims/next/error.tsx"),
            "next/document": path.resolve(__dirname, "src/shims/next/document.tsx"),
            "next/link": path.resolve(__dirname, "src/shims/next/link.tsx"),
            "next/image": path.resolve(__dirname, "src/shims/next/image.tsx"),
            "next/router": path.resolve(__dirname, "src/shims/next/router.ts"),
            "next/script": path.resolve(__dirname, "src/shims/next/script.tsx"),
            "next-i18next": path.resolve(__dirname, "src/shims/next-i18next/index.ts"),
            "next-i18next/serverSideTranslations": path.resolve(
                __dirname,
                "src/shims/next-i18next/serverSideTranslations.ts"
            ),
        },
    },
});

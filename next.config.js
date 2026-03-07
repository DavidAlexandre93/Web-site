/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const securityHeaders = [
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    {
        key: "Content-Security-Policy",
        value:
            "default-src 'self'; img-src 'self' https: data:; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.github.com;",
    },
];

const nextConfig = {
    reactStrictMode: true,
    poweredByHeader: false,
    outputFileTracingRoot: __dirname,
    compiler: {
        styledComponents: true,
        reactRemoveProperties: true,
    },
    images: {
        domains: ["raw.githubusercontent.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
            },
        ],
    },
    async headers() {
        return [
            {
                source: "/_next/static/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
    i18n,
};

module.exports = nextConfig;

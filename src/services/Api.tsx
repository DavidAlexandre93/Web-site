import axios from "axios";

const TRANSIENT_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);
const MAX_RETRIES = 2;
const BASE_DELAY_MS = 250;

const isTransientError = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
        return false;
    }

    const statusCode = error.response?.status;

    if (statusCode && TRANSIENT_STATUS_CODES.has(statusCode)) {
        return true;
    }

    return error.code === "ECONNABORTED" || error.message.includes("Network Error");
};

const getBackoffDelay = (retryAttempt: number) => {
    const jitter = Math.floor(Math.random() * 100);

    return BASE_DELAY_MS * 2 ** retryAttempt + jitter;
};

export const Api = axios.create({
    baseURL: "https://api.github.com/",
    timeout: 4000,
    headers: {
        Accept: "application/vnd.github+json",
    },
});

Api.interceptors.request.use((config) => {
    config.metadata = { startedAt: Date.now() };
    return config;
});

Api.interceptors.response.use(
    (response) => {
        const metadata = response.config.metadata;
        const duration = metadata?.startedAt ? Date.now() - metadata.startedAt : null;

        if (duration !== null) {
            console.info(`[metrics] github_request_success`, {
                url: response.config.url,
                status: response.status,
                durationMs: duration,
            });
        }

        return response;
    },
    async (error: unknown) => {
        if (!axios.isAxiosError(error)) {
            return Promise.reject(error);
        }

        const config = error.config;

        if (!config) {
            return Promise.reject(error);
        }

        const retryCount = config.__retryCount ?? 0;
        config.__retryCount = retryCount;

        if (retryCount < MAX_RETRIES && isTransientError(error)) {
            config.__retryCount = retryCount + 1;
            const delay = getBackoffDelay(config.__retryCount);

            await new Promise((resolve) => setTimeout(resolve, delay));

            return Api(config);
        }

        const metadata = config.metadata;
        const duration = metadata?.startedAt ? Date.now() - metadata.startedAt : null;

        console.error(`[metrics] github_request_error`, {
            url: config.url,
            status: error.response?.status,
            durationMs: duration,
            retries: config.__retryCount,
        });

        return Promise.reject(error);
    }
);

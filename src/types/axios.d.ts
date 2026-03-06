import "axios";

declare module "axios" {
    export interface AxiosRequestConfig {
        metadata?: {
            startedAt?: number;
        };
        __retryCount?: number;
    }
}

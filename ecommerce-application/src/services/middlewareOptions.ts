import {
    AuthMiddlewareOptions,
    HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import SCOPES from './scopes';

export const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: import.meta.env.VITE_AUTH_URL,
    projectKey: import.meta.env.VITE_PROJECT_KEY,
    credentials: {
        clientId: import.meta.env.VITE_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    },
    scopes: SCOPES,
    fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_API_URL,
    fetch,
};

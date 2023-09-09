import {
    AnonymousAuthMiddlewareOptions,
    AuthMiddlewareOptions,
    Client,
    ClientBuilder,
    HttpMiddlewareOptions,
    PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { SCOPES, CLENT_CRED_SCOPES } from './scopes';
import tokenCache from './tokenCache';

const credentials = {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
};

export const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: import.meta.env.VITE_AUTH_URL,
    projectKey: import.meta.env.VITE_PROJECT_KEY,
    credentials,
    scopes: CLENT_CRED_SCOPES,
    fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_API_URL,
    fetch,
};

export const anonAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: import.meta.env.VITE_AUTH_URL,
    projectKey: import.meta.env.VITE_PROJECT_KEY,
    credentials,
    scopes: SCOPES,
    fetch,
    tokenCache,
};

export const getPasswordMiddlewareOptions: (username: string, password: string) => PasswordAuthMiddlewareOptions = (
    username,
    password
) => {
    return {
        host: import.meta.env.VITE_AUTH_URL,
        projectKey: import.meta.env.VITE_PROJECT_KEY,
        credentials: {
            ...credentials,
            user: {
                username,
                password,
            },
        },
        scopes: SCOPES,
        fetch,
        tokenCache,
    };
};

export const getClientWithCredentialsFlow: () => Client = () => {
    return new ClientBuilder()
        .withClientCredentialsFlow(authMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();
};
export const getAnonymousClient: () => Client = () => {
    return new ClientBuilder()
        .withAnonymousSessionFlow(anonAuthMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();
};

export const getClientWithPassword: (username: string, password: string) => Client = (username, password) => {
    return new ClientBuilder()
        .withPasswordFlow(getPasswordMiddlewareOptions(username, password))
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();
};

const tokenData = () => localStorage.getItem('token') || '';
export const getClientWithExistingToken: () => Client = () => {
    return new ClientBuilder()
        .withExistingTokenFlow(`Bearer ${JSON.parse(tokenData()).token}`, {
            force: true,
        })
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();
};

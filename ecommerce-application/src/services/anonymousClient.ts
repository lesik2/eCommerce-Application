import { ClientBuilder, AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { httpMiddlewareOptions } from './credentialsFlow';
import SCOPES from './scopes';
import tokenCache from './tokenCache';

export const anonAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: import.meta.env.VITE_AUTH_URL,
    projectKey: import.meta.env.VITE_PROJECT_KEY,
    credentials: {
        clientId: import.meta.env.VITE_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    },
    scopes: SCOPES,
    fetch,
    tokenCache,
};

// create anonymousClient when unauthorized user add smth in the cart
export const anonymousClient = new ClientBuilder()
    .withAnonymousSessionFlow(anonAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

export const getApiRootAnon: () => ApiRoot = () => {
    localStorage.setItem('status', 'anonim');
    return createApiBuilderFromCtpClient(anonymousClient);
};

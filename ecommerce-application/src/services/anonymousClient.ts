import {
    ClientBuilder,
    AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
    createApiBuilderFromCtpClient,
    ApiRoot,
} from '@commercetools/platform-sdk';
import { httpMiddlewareOptions } from './credentialsFlow';
import SCOPES from './scopes';

export const anonAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
    host: import.meta.env.VITE_AUTH_URL,
    projectKey: import.meta.env.VITE_PROJECT_KEY,
    credentials: {
        clientId: import.meta.env.VITE_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    },
    scopes: SCOPES,
    fetch,
    tokenCache: {
        get: () => {
            const cacheKey = `token`;
            const cachedToken = localStorage.getItem(cacheKey);
            if (cachedToken) {
                console.log(cachedToken);
                return {
                    token: `Bearer: ${JSON.parse(cachedToken)}`,
                    expirationTime: 0,
                    refreshToken: '',
                };
            }
            return { token: '', expirationTime: 0, refreshToken: '' };
        },
        set: (cache) => {
            const cacheKey = `token`;
            const cachedToken = localStorage.getItem(cacheKey);
            if (!cachedToken)
                localStorage.setItem(cacheKey, JSON.stringify(cache.token));
        },
    },
};

// create anonymousClient when unauthorized user add smth in the cart
export const anonymousClient = new ClientBuilder()
    .withAnonymousSessionFlow(anonAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

export const getApiRootAnon: () => ApiRoot = () => {
    return createApiBuilderFromCtpClient(anonymousClient);
};

export const products = await getApiRootAnon()
    .withProjectKey({
        projectKey: import.meta.env.VITE_PROJECT_KEY,
    })
    .productProjections()
    .get()
    .execute()
    .then((res) => res.body.results.map((el) => el.name))
    .catch((error) => console.error('Product request error ', error));

import {
    AuthMiddlewareOptions,
    HttpMiddlewareOptions,
    ClientBuilder,
} from '@commercetools/sdk-client-v2';
import {
    createApiBuilderFromCtpClient,
    ApiRoot,
} from '@commercetools/platform-sdk';

export const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: import.meta.env.VITE_AUTH_URL,
    projectKey: import.meta.env.VITE_PROJECT_KEY,
    credentials: {
        clientId: import.meta.env.VITE_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    },
    scopes: [
        // eslint-disable-next-line max-len
        'view_published_products:ecommerce-app_2023 view_categories:ecommerce-app_2023',
    ],
    fetch,
};

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: import.meta.env.VITE_API_URL,
    fetch,
};

export const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

export const getApiRoot: () => ApiRoot = () => {
    return createApiBuilderFromCtpClient(ctpClient);
};

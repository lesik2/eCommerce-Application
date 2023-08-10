import { ClientBuilder } from '@commercetools/sdk-client-v2';
import {
    createApiBuilderFromCtpClient,
    ApiRoot,
} from '@commercetools/platform-sdk';
import {
    authMiddlewareOptions,
    httpMiddlewareOptions,
} from './middlewareOptions';

export const anonymousClient = new ClientBuilder()
    .withAnonymousSessionFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

export const getApiRootAnon: () => ApiRoot = () => {
    return createApiBuilderFromCtpClient(anonymousClient);
};
// export const products = await getApiRootAnon()
//     .withProjectKey({
//         projectKey: import.meta.env.VITE_PROJECT_KEY,
//     })
//     .productProjections()
//     .get()
//     .execute()
//     .then((res) => res.body.results.map((el) => el.name))
//     .catch((error) => console.error('Product request error ', error));

// eslint-disable-next-line max-len
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { getApiRoot, httpMiddlewareOptions } from './credentialsFlow';

export default function handleFlows(): ByProjectKeyRequestBuilder {
    const tokenData = localStorage.getItem('token');
    const state = localStorage.getItem('status');

    if (state && tokenData) {
        const client = new ClientBuilder()
            .withExistingTokenFlow(`Bearer ${JSON.parse(tokenData).token}`, {
                force: true,
            })
            .withHttpMiddleware(httpMiddlewareOptions)
            .withLoggerMiddleware()
            .build();
        const requestBuilder = createApiBuilderFromCtpClient(client).withProjectKey({
            projectKey: import.meta.env.VITE_PROJECT_KEY,
        });
        return requestBuilder;
    }
    return getApiRoot().withProjectKey({
        projectKey: import.meta.env.VITE_PROJECT_KEY,
    });
}

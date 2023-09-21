// eslint-disable-next-line max-len
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { getApiRoot } from './credentialsFlow';
import { getClientWithExistingToken } from './clientBuilders';

export default function handleFlows(): ByProjectKeyRequestBuilder {
    const tokenData = localStorage.getItem('token');
    const state = localStorage.getItem('status');

    if (state && tokenData) {
        const client = getClientWithExistingToken();
        const requestBuilder = createApiBuilderFromCtpClient(client).withProjectKey({
            projectKey: import.meta.env.VITE_PROJECT_KEY,
        });
        // requestBuilder
        //     .me()
        //     .get()
        //     .execute()
        //     // eslint-disable-next-line consistent-return
        //     .catch((e) => {
        //         if (e.message === 'invalid_token') {
        //             localStorage.removeItem('token');
        //             localStorage.removeItem('status');
        //             return getApiRoot().withProjectKey({
        //                 projectKey: import.meta.env.VITE_PROJECT_KEY,
        //             });
        //         }
        //     });
        return requestBuilder;
    }
    return getApiRoot().withProjectKey({
        projectKey: import.meta.env.VITE_PROJECT_KEY,
    });
}

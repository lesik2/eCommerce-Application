import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
// eslint-disable-next-line max-len
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { getAnonymousClient } from './clientBuilders';

const getApiRootAnon: () => ByProjectKeyRequestBuilder = () => {
    localStorage.setItem('status', 'anonim');
    return createApiBuilderFromCtpClient(getAnonymousClient()).withProjectKey({
        projectKey: import.meta.env.VITE_PROJECT_KEY,
    });
};

export default getApiRootAnon;

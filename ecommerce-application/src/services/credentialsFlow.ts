import { Client } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient, ApiRoot } from '@commercetools/platform-sdk';
import { getClientWithCredentialsFlow } from './clientBuilders';

export const getApiRoot: () => ApiRoot = () => {
    return createApiBuilderFromCtpClient(getClientWithCredentialsFlow());
};

export const getApiRootFromClient: (client: Client) => ApiRoot = (client) => {
    return createApiBuilderFromCtpClient(client);
};

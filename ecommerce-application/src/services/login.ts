/* eslint-disable consistent-return */
import { CustomerSignInResult, ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
// eslint-disable-next-line max-len
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { httpMiddlewareOptions } from './credentialsFlow';
import SCOPES from './scopes';
import tokenCache from './tokenCache';

const tokenData = localStorage.getItem('token') || '';

async function loginWithToken(
    username: string,
    password: string
): Promise<
    | {
          clientData: CustomerSignInResult;
          reqestBuilder: ByProjectKeyRequestBuilder;
      }
    | undefined
> {
    const client = new ClientBuilder()
        .withExistingTokenFlow(`Bearer ${JSON.parse(tokenData).token}`, {
            force: true,
        })
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();
    const getApiRoot: () => ApiRoot = () => {
        return createApiBuilderFromCtpClient(client);
    };
    const postOptions = {
        body: {
            email: username,
            password,
        },
        headers: {
            Authorization: `Bearer ${JSON.parse(tokenData).token}}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const reqestBuilder = getApiRoot().withProjectKey({
        projectKey: import.meta.env.VITE_PROJECT_KEY,
    });
    const clientData = await reqestBuilder
        .me()
        .login()
        .post(postOptions)
        .execute()
        .then((res) => res.body);
    if (clientData) localStorage.setItem('status', 'loggedIn');
    return { clientData, reqestBuilder };
}

async function loginNoToken(
    username: string,
    password: string
): Promise<
    | {
          clientData: CustomerSignInResult;
          reqestBuilder: ByProjectKeyRequestBuilder;
      }
    | undefined
> {
    const passwordMiddlewareOptions: PasswordAuthMiddlewareOptions = {
        host: import.meta.env.VITE_AUTH_URL,
        projectKey: import.meta.env.VITE_PROJECT_KEY,
        credentials: {
            clientId: import.meta.env.VITE_CLIENT_ID,
            clientSecret: import.meta.env.VITE_CLIENT_SECRET,
            user: {
                username,
                password,
            },
        },
        scopes: SCOPES,
        fetch,
        tokenCache,
    };
    const client = new ClientBuilder()
        .withPasswordFlow(passwordMiddlewareOptions)
        .withHttpMiddleware(httpMiddlewareOptions)
        .withLoggerMiddleware()
        .build();
    const getApiRoot: () => ApiRoot = () => {
        return createApiBuilderFromCtpClient(client);
    };
    const postOptions = {
        body: {
            email: username,
            password,
        },
    };
    const reqestBuilder = getApiRoot().withProjectKey({
        projectKey: import.meta.env.VITE_PROJECT_KEY,
    });
    const clientData = await reqestBuilder
        .me()
        .login()
        .post(postOptions)
        .execute()
        .then((res) => res.body);
    if (clientData) localStorage.setItem('status', 'loggedIn');
    return { clientData, reqestBuilder };
}

export default async function handleLogin(email: string, password: string) {
    const username = email.toLocaleLowerCase();
    if (tokenData) {
        const requestBuilder = await loginWithToken(username, password);
        return requestBuilder;
    }
    const requestBuilder = await loginNoToken(username, password);
    return requestBuilder;
}

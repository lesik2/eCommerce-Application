/* eslint-disable consistent-return */
import { CustomerSignInResult, MyCustomerSignin } from '@commercetools/platform-sdk';
// eslint-disable-next-line max-len
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { getApiRootFromClient } from './credentialsFlow';
import { getClientWithExistingToken, getClientWithPassword } from './clientBuilders';

const tokenData = () => localStorage.getItem('token') || '';

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
    const client = getClientWithExistingToken();
    const reqestBuilder: ByProjectKeyRequestBuilder = getApiRootFromClient(client).withProjectKey({
        projectKey: import.meta.env.VITE_PROJECT_KEY,
    });
    const postOptions: MyCustomerSignin = {
        email: username,
        password,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
    };
    const clientData = await reqestBuilder
        .me()
        .login()
        .post({
            headers: {
                Authorization: `Bearer ${JSON.parse(tokenData()).token}}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: postOptions,
        })
        .execute()
        .then((res) => res.body);
    if (clientData) {
        localStorage.setItem('status', 'loggedIn');
        localStorage.setItem('username', clientData.customer.lastName || 'Username');
    }
    return { clientData, reqestBuilder };
}

export async function loginNoToken(
    username: string,
    password: string
): Promise<
    | {
          clientData: CustomerSignInResult;
          reqestBuilder: ByProjectKeyRequestBuilder;
      }
    | undefined
> {
    const client = getClientWithPassword(username, password);
    const postOptions = {
        body: {
            email: username,
            password,
        },
    };
    const reqestBuilder: ByProjectKeyRequestBuilder = getApiRootFromClient(client).withProjectKey({
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

export default async function handleLogin(
    email: string,
    password: string
): Promise<
    | {
          clientData: CustomerSignInResult;
          reqestBuilder: ByProjectKeyRequestBuilder;
      }
    | undefined
> {
    const username = email.toLocaleLowerCase();
    try {
        if (tokenData()) {
            const result = await loginWithToken(username, password);
            const newClient = getClientWithPassword(username, password);
            const newReqestBuilder = getApiRootFromClient(newClient).withProjectKey({
                projectKey: import.meta.env.VITE_PROJECT_KEY,
            });
            const clientData = await newReqestBuilder
                .me()
                .get()
                .execute()
                .then((res) => res.body);
            if (clientData) localStorage.setItem('status', 'loggedIn');
            if (result) return result;
        }
        const response = await loginNoToken(username, password);
        if (response) {
            localStorage.setItem('status', 'loggedIn');
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}

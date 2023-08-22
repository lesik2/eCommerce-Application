import {
    BaseAddress,
    MyCustomerUpdateAction,
    ApiRoot,
    createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ClientBuilder, PasswordAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { httpMiddlewareOptions } from './credentialsFlow';
import { anonymousClient } from './anonymousClient';
import SCOPES from './scopes';
import tokenCache from './tokenCache';
import handleFlows from './handleFlows';

async function registrationWithToken(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    addresses: BaseAddress[],
    defaultShippingAddress?: number,
    defaultBillingAddress?: number
) {
    const register = handleFlows()
        .me()
        .signup()
        .post({
            body: {
                email: email.toLocaleLowerCase(),
                firstName,
                lastName,
                password,
                addresses,
                defaultShippingAddress,
                defaultBillingAddress,
            },
        })
        .execute()
        .then((res) => {
            localStorage.setItem('status', 'loggedIn');
            return res;
        });

    return register;
}

async function registrationNoToken(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    addresses: BaseAddress[],
    defaultShippingAddress?: number,
    defaultBillingAddress?: number
) {
    const client = anonymousClient;
    const getApiRoot: () => ApiRoot = () => {
        return createApiBuilderFromCtpClient(client);
    };

    const reqestBuilder = getApiRoot().withProjectKey({
        projectKey: import.meta.env.VITE_PROJECT_KEY,
    });
    const register = reqestBuilder
        .me()
        .signup()
        .post({
            body: {
                email: email.toLocaleLowerCase(),
                firstName,
                lastName,
                password,
                addresses,
                defaultShippingAddress,
                defaultBillingAddress,
            },
        })
        .execute()
        .then((res) => {
            localStorage.setItem('status', 'loggedIn');
            return res;
        });
    return register;
}

export default async function handleRegistration(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    addresses: BaseAddress[],
    defaultShippingAddress?: number,
    defaultBillingAddress?: number
) {
    const tokenData = localStorage.getItem('token') || '';
    const signinResultsPromise = async () => {
        if (tokenData) {
            const requestBuilder = await registrationWithToken(
                email,
                password,
                firstName,
                lastName,
                addresses,
                defaultShippingAddress,
                defaultBillingAddress
            );
            return requestBuilder;
        }
        const requestBuilder = await registrationNoToken(
            email,
            password,
            firstName,
            lastName,
            addresses,
            defaultShippingAddress,
            defaultBillingAddress
        );
        return requestBuilder;
    };
    const signinResults = signinResultsPromise().then((res) => {
        const respAddresses = res.body.customer.addresses;
        if (addresses.length > 1) {
            const actions: MyCustomerUpdateAction[] = [];
            addresses.forEach((el, id) => {
                if (el.additionalAddressInfo === 'shipping') {
                    actions.push({
                        action: 'addShippingAddressId',
                        addressId: respAddresses[id].id,
                    });
                }
                if (el.additionalAddressInfo === 'billing') {
                    actions.push({
                        action: 'addBillingAddressId',
                        addressId: respAddresses[id].id,
                    });
                }
            });
            if (actions.length) {
                const passwordMiddlewareOptions: PasswordAuthMiddlewareOptions = {
                    host: import.meta.env.VITE_AUTH_URL,
                    projectKey: import.meta.env.VITE_PROJECT_KEY,
                    credentials: {
                        clientId: import.meta.env.VITE_CLIENT_ID,
                        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
                        user: {
                            username: email,
                            password,
                        },
                    },
                    scopes: SCOPES,
                    fetch,
                    tokenCache,
                };
                const newClient = new ClientBuilder()
                    .withPasswordFlow(passwordMiddlewareOptions)
                    .withHttpMiddleware(httpMiddlewareOptions)
                    .withLoggerMiddleware()
                    .build();
                const getNewApiRoot: () => ApiRoot = () => {
                    return createApiBuilderFromCtpClient(newClient);
                };
                const newReqestBuilder = getNewApiRoot().withProjectKey({
                    projectKey: import.meta.env.VITE_PROJECT_KEY,
                });
                newReqestBuilder
                    .me()
                    .post({
                        body: {
                            version: 1,
                            actions,
                        },
                    })
                    .execute();
            }
        }
        return res;
    });
    return signinResults;
}

import { BaseAddress, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { getApiRootFromClient } from './credentialsFlow';
import handleFlows from './handleFlows';
import { getAnonymousClient, getClientWithPassword } from './clientBuilders';

async function registrationWithToken(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    addresses: BaseAddress[],
    dateOfBirth: string,
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
                dateOfBirth,
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
    dateOfBirth: string,
    defaultShippingAddress?: number,
    defaultBillingAddress?: number
) {
    const client = getAnonymousClient();

    const reqestBuilder = getApiRootFromClient(client).withProjectKey({
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
                dateOfBirth,
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
    dateOfBirth: string,
    defaultShippingAddress?: number,
    defaultBillingAddress?: number
) {
    const tokenData = localStorage.getItem('token') || '';
    const status = localStorage.getItem('status') || '';
    const signinResultsPromise = async () => {
        if (tokenData && status === 'anonim') {
            const requestBuilder = await registrationWithToken(
                email,
                password,
                firstName,
                lastName,
                addresses,
                dateOfBirth,
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
            dateOfBirth,
            defaultShippingAddress,
            defaultBillingAddress
        );
        return requestBuilder;
    };
    const signinResults = signinResultsPromise().then((res) => {
        const respAddresses = res.body.customer.addresses;
        if (typeof defaultShippingAddress !== 'number' || typeof defaultBillingAddress !== 'number') {
            const actions: MyCustomerUpdateAction[] = [];
            addresses.forEach((_, id) => {
                if (id === 0) {
                    actions.push({
                        action: 'addShippingAddressId',
                        addressId: respAddresses[id].id,
                    });
                    if (addresses.length === 1)
                        actions.push({
                            action: 'addBillingAddressId',
                            addressId: respAddresses[id].id,
                        });
                }
                if (id === 1) {
                    actions.push({
                        action: 'addBillingAddressId',
                        addressId: respAddresses[id].id,
                    });
                }
            });
            if (actions.length) {
                const newClient = getClientWithPassword(email.toLocaleLowerCase(), password);
                const newReqestBuilder = getApiRootFromClient(newClient).withProjectKey({
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

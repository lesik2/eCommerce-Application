import { BaseAddress } from '@commercetools/platform-sdk';
import { getApiRootAnon } from './anonymousClient';

export default async function registerUser(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    addresses?: BaseAddress[],
    defaultShippingAddress?: number,
    defaultBillingAddress?: number
) {
    const registeredUserData = await getApiRootAnon()
        .withProjectKey({
            projectKey: import.meta.env.VITE_PROJECT_KEY,
        })
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
        .then((res) => console.log(res))
        .catch((error) => {
            if (error instanceof Error)
                console.error(`Registrarion error: ${error.message}`);
        });
    return registeredUserData;
}

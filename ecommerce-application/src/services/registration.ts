import { BaseAddress } from '@commercetools/platform-sdk';
import { getApiRootAnon } from './anonymousClient';
import { registrationErrorMappings } from './errors/errors';

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
        .then((res) => {
            if (res.statusCode === 201) console.log('Signup successful!');
        })
        .catch((error) => {
            if (error instanceof Error)
                if (registrationErrorMappings[error.message]) {
                    console.log(registrationErrorMappings[error.message]);
                } else {
                    console.log(
                        'Unknown regestration error. Please try again later'
                    );
                }
        });
    return registeredUserData;
}

import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { getApiRootAnon } from './anonymousClient';
import { loginErrorMappings } from './errors/errors';

function checkErrors(error: string) {
    console.log(
        loginErrorMappings[error] || 'Unknown error. Please try again later.'
    );
}

// eslint-disable-next-line consistent-return
async function login(
    username: string,
    password: string
): Promise<void | CustomerSignInResult> {
    console.log('start');
    try {
        const clientData = await getApiRootAnon()
            .withProjectKey({
                projectKey: import.meta.env.VITE_PROJECT_KEY,
            })
            .me()
            .login()
            .post({
                body: {
                    email: username,
                    password,
                },
            })
            .execute()
            .then((res) => {
                console.log(res.headers);
                return res.body;
            });
        return clientData;
    } catch (error) {
        if (error instanceof Error) {
            checkErrors(error.name);
        }
    }
}

export default login;

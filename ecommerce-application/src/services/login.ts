import { CustomerSignInResult } from '@commercetools/platform-sdk';
import { getApiRootAnon } from './anonymousClient';

function backValidation(username: string) {
    const symbolsToFind = '!`=+,<>(){}[]?/\\|#$^;~:*';
    const regexPattern = `[${symbolsToFind.replace(
        /[-[\]{}()*+?.,\\^$|#\s]/g,
        '\\$&'
    )}]`;
    const regex = new RegExp(regexPattern, 'g');
    const foundSymbols = username.match(regex);
    return Object.is(foundSymbols, null);
}

// eslint-disable-next-line consistent-return
async function login(
    username: string,
    password: string
): Promise<CustomerSignInResult | undefined> {
    if (!backValidation(username)) {
        console.error('Error: invalid email');
    } else {
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
            return clientData; // returns all user's data
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Login error: ${error.message}`);
            }
        }
    }
}

export default login;

import {
    ClientBuilder,
    type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
    createApiBuilderFromCtpClient,
    CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { httpMiddlewareOptions } from './middlewareOptions';
import SCOPES from './scopes';

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
            const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions =
                {
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
                };

            const loggedInClient = new ClientBuilder()
                .withPasswordFlow(passwordAuthMiddlewareOptions)
                .withLoggerMiddleware()
                .withHttpMiddleware(httpMiddlewareOptions)
                .withUserAgentMiddleware()
                .withLoggerMiddleware()
                .build();
            const apiRoot = createApiBuilderFromCtpClient(
                loggedInClient
            ).withProjectKey({ projectKey: import.meta.env.VITE_PROJECT_KEY });
            const clientData = await apiRoot
                .me()
                .login()
                .post({
                    body: {
                        email: username,
                        password,
                    },
                })
                .execute()
                .then((res) => res.body);
            return clientData; // returns all user data
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Login error: ${error.message}`);
            }
        }
    }
}

export default login;

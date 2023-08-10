// eslint-disable-next-line import/no-extraneous-dependencies
import fetch from 'node-fetch';
import {
    ClientBuilder,

    // Import middlewares
    type AuthMiddlewareOptions, // Required for auth
    type HttpMiddlewareOptions, // Required for sending HTTP requests
} from '@commercetools/sdk-client-v2';

const projectKey = 'ecommerce-app_2023';
const scopes = ['environment'];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://api.europe-west1.gcp.commercetools.com',
    projectKey,
    credentials: {
        clientId: 'XQLN16KLi7VzSqlrQFbc0HD1',
        clientSecret: 'ejPjz2FV9U7KiL7C5CYqrv1E11wt4mUs',
    },
    scopes,
    fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: 'https://api.{region}.commercetools.com',
    fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();
export default ctpClient;

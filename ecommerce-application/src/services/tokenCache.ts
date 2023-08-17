import { type TokenCache } from '@commercetools/sdk-client-v2';

const tokenCache: TokenCache = {
    get: () => {
        const cachedTokenData = localStorage.getItem('token');
        if (cachedTokenData) {
            return {
                token: `Bearer: ${JSON.parse(cachedTokenData).token}`,
                expirationTime: 0,
                refreshToken: '',
            };
        }
        return { token: '', expirationTime: 86400000, refreshToken: '' };
    },
    set: (cache) => {
        const cachedToken = localStorage.getItem('token');
        if (!cachedToken) localStorage.setItem('token', JSON.stringify(cache));
    },
};

export default tokenCache;

/* eslint-disable max-len */
export const loginErrorMappings: Record<string, string> = {
    InvalidCredentials: 'Invalid username or password. Please check your login information and try again.',
    invalid_token: 'Invalid token. Please reload the page.',
    ConcurrentModification: 'Concurrent modification error. Please try again later.',
    'Error: Customer account with the given credentials not found.':
        'Invalid username or password. Please check your login information and try again.',
};

export const registrationErrorMappings: Record<string, string> = {
    'The provided value is not a valid email': 'Email is invalid. Please check and try again',
    'There is already an existing customer with the provided email.':
        'Account with the provided email address already exists. Please log in or use another email address.',
    'Request body does not contain valid JSON.': 'Some data is invalid. Please check and try again',
};

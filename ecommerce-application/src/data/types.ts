export type InputTypes =
    | 'firstname'
    | 'lastname'
    | 'birthday'
    | 'email'
    | 'password'
    | 'confirmPassword'
    | 'ShippingStreet'
    | 'ShippingCity'
    | 'ShippingPostalCode'
    | 'ShippingCountry'
    | 'BillingStreet'
    | 'BillingCity'
    | 'BillingPostalCode'
    | 'BillingCountry';
export type PasswordInputTypes = 'currentPassword' | 'newPassword' | 'confirmPassword';

export type ButtonSize = 'small' | 'medium' | 'large';

export type IconButtonTypes = 'cart' | 'login' | 'logout' | 'logged' | 'close' | 'pen' | 'delete';

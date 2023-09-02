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

export type ButtonSize = 'small' | 'medium' | 'large';

export type IconButtonTypes = 'cart' | 'login' | 'logout' | 'logged' | 'close' | 'filter' | 'pending';

export type SortButtonsTypes = 'name' | 'price';

export type SortTypes = 'nosort' | 'asc' | 'desc';

export type QueryArgs = {
    filter: string | string[];
    sort?: string | string[];
};

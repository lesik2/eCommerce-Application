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

export type IconButtonTypes =
    | 'cart'
    | 'login'
    | 'logout'
    | 'logged'
    | 'close'
    | 'filter'
    | 'pending'
    | 'search'
    | 'arrow'
    | 'pen'
    | 'delete';

export type SortButtonsTypes = 'name' | 'price' | 'spicy';

export type SortTypes = 'nosort' | 'asc' | 'desc' | 'spicy' | 'notspicy';

export type MenuType = 'main' | 'aside';

export type QueryArgs = {
    filter?: string | string[];
    search?: string;
    sort?: string | string[];
};

export type MenuItem = {
    id: string;
    name: string;
    url: string;
    submenu?: MenuItem[];
};

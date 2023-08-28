import LoginStatus from './enums';
import { InputTypes } from './types';

export interface IInput {
    id: string;
    name: InputTypes;
    type?: string;
    label?: string;
    pattern?: RegExp;
    errormessage?: string;
    validdate?: number;
}
export interface IValuesInputs {
    firstname: string;
    lastname: string;
    birthday: string;
    email: string;
    password: string;
    confirmPassword: string;
    ShippingCountry: string;
    ShippingStreet: string;
    ShippingCity: string;
    ShippingPostalCode: string;
    BillingCountry: string;
    BillingStreet: string;
    BillingCity: string;
    BillingPostalCode: string;
}
export interface IValidInputs {
    firstname: boolean;
    lastname: boolean;
    birthday: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    ShippingCountry: boolean;
    ShippingStreet: boolean;
    ShippingCity: boolean;
    ShippingPostalCode: boolean;
    BillingCountry: boolean;
    BillingStreet: boolean;
    BillingCity: boolean;
    BillingPostalCode: boolean;
}
export interface IFormInput {
    values: IValuesInputs;
    setValues: React.Dispatch<React.SetStateAction<IValuesInputs>>;
    input: IInput;
    validInputs: IValidInputs;
    setValidInputs: React.Dispatch<React.SetStateAction<IValidInputs>>;
    passwordValue?: string | null;
    setAlertOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    required?: boolean;
    readOnly?: boolean;
}
export interface IAddress {
    id?: string | undefined;
    streetName?: string | undefined;
    city?: string | undefined;
    postalCode?: string | undefined;
    country: string;
    defaultShippingAddress?: string;
    defaultBillingAddress?: string;
}

export interface ILoginContext {
    loginStatus: LoginStatus;
    loginMenu: () => void;
    logoutMenu: () => void;
}

export interface IModalContext {
    userMenuStatus: boolean;
    openUserMenu: () => void;
    closeUserMenu: () => void;
    navMenuStatus: boolean;
    openNavMenu: () => void;
    closeNavMenu: () => void;
}
export interface IAddressComponent {
    address: IAddress;
    shipping: boolean;
    billing: boolean;
    onDelete: (id: string) => void;
}

import LoginStatus from './enums';
import { InputTypes, QueryArgs } from './types';

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
}
export interface IAddress {
    street: string;
    city: string;
    postalCode: string;
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
    filterMenuStatus: boolean;
    openFilterMenu: () => void;
    closeFilterMenu: () => void;
}

export interface IProductsContext {
    productsQuery: QueryArgs | null;
    setProductsQuery: (query: QueryArgs | null) => void;
}

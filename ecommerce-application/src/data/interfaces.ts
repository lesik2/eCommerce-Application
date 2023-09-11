import { InputTypes, PasswordInputTypes, QueryArgs, SortTypes } from './types';
import { LoginStatus } from './enums';
import { IAddToCartAction, ICartState } from '../reducer/reducer';

export interface IInput {
    id: string;
    name: InputTypes;
    type?: string;
    label?: string;
    pattern?: RegExp;
    errormessage?: string;
    validdate?: number;
}
export interface IInputPassword {
    id: string;
    name: PasswordInputTypes;
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
    setAlertOpen?: () => void;
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
    filterMenuStatus: boolean;
    openFilterMenu: () => void;
    closeFilterMenu: () => void;
}

export interface IProductsContext {
    productsQuery: QueryArgs | null;
    setProductsQuery: (query: QueryArgs | null) => void;
    data: IProductCardProps[];
    setData: (data: IProductCardProps[]) => void;
    currentSearch: React.MutableRefObject<string>;
    filterState: React.MutableRefObject<Record<string, SortTypes>>;
    clearFilterState: () => void;
}

export interface ICartContext {
    state: ICartState | null;
    dispatch: React.Dispatch<IAddToCartAction> | null;
}

export interface IProductCardProps {
    productName: string;
    productPrice: number;
    productPath: string;
    productDiscountPrice?: number;
    ingredients?: string;
    picPath?: string;
    spiciness?: boolean;
    productId: string;
}

export interface IProductsPage {
    header: string;
    link: string[];
    query: QueryArgs;
}

export interface IAdditionalAddress {
    defaultShipping: boolean;
    defaultBilling: boolean;
    shipping: boolean;
    billing: boolean;
}

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
export interface IValidInputs {
    firstname: boolean;
    lastname: boolean;
    birthday: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    street: boolean;
    city: boolean;
    postalCode: boolean;
    country: boolean;
}
export interface IFormInput {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    input: IInput;
    validInputs: IValidInputs;
    setValidInputs: React.Dispatch<React.SetStateAction<IValidInputs>>;
    passwordValue?: string | null;
}
export interface IAddress {
    street: string;
    city: string;
    postalCode: string;
}
=======
export {};


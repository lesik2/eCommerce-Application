export type InputTypes = 'firstname' | 'lastname' | 'birthday' | 'email' | 'password' | 'confirmPassword';

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
}
export interface IFormInput {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    input: IInput;
    validInputs: IValidInputs;
    setValidInputs: React.Dispatch<React.SetStateAction<IValidInputs>>;
    passwordValue: string | null;
}
export interface IPasswordInput {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string | undefined;
    name: InputTypes;
    errormessage: string | undefined;
    validInputs: IValidInputs;
    checkValidInput: () => void;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
    focused: boolean;
}

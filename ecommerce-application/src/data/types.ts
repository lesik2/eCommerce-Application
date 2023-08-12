export type InputTypes = 'firstname' | 'lastname' | 'birthday' | 'email';

export interface IInput {
    id: string;
    name: InputTypes;
    type: string;
    label?: string;
    required: boolean;
    pattern?: RegExp;
    errormessage?: string;
    validdate?: number;
}
export interface IValidInputs {
    firstname: boolean;
    lastname: boolean;
    birthday: boolean;
    email: boolean;
}
export interface IFormInput {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    input: IInput;
    validInputs: IValidInputs;
    setValidInputs: React.Dispatch<React.SetStateAction<IValidInputs>>;
}

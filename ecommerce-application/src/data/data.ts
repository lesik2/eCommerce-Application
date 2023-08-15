import { IInput } from './types';

const oneYearMilliseconds = 31557600000;
const validYear = 13;
const calculateValidDate = () => {
    const date = Date.now();
    return date - validYear * oneYearMilliseconds;
};
const Inputs: IInput[] = [
    {
        id: '1',
        name: 'firstname',
        type: 'text',
        label: 'Firstname',
        pattern: /^[a-zA-Z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/,
        errormessage: `
            must contain at least one character
            no special characters or numbers`,
    },
    {
        id: '2',
        name: 'lastname',
        type: 'text',
        label: 'Lastname',
        pattern: /^[a-zA-Z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/,
        errormessage: `
            must contain at least one character
            no special characters or numbers`,
    },
    {
        id: '3',
        name: 'birthday',
        type: 'date',
        label: 'DOB',
        validdate: calculateValidDate(),
        errormessage: `A valid date is above 13 years old`,
    },
    {
        id: '4',
        name: 'email',
        type: 'email',
        label: 'Email',
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        errormessage: `A properly formatted email address 
        (e.g., example@email.com)`,
    },
    {
        id: '5',
        name: 'password',
        label: 'Password',
        pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        errormessage: `Minimum 8 characters,1 uppercase letter, 
        1 lowercase letter, and 1 number`,
    },
    {
        id: '6',
        name: 'confirmPassword',
        label: 'Confirm password',
        errormessage: `Passwords don't match!`,
    },
];
export const addressInputs: IInput[] = [
    {
        id: '1',
        name: 'city',
        type: 'text',
        label: 'City',
        pattern: /^[a-zA-Z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/,
        errormessage: `
        must contain one character
        no special characters,numbers`,
    },
    {
        id: '2',
        name: 'street',
        type: 'text',
        label: 'Street',
        pattern: /^[a-zA-Z]{1,}$/,
        errormessage: `
      must contain at least one character`,
    },
    {
        id: '3',
        name: 'postalCode',
        type: 'text',
        label: 'Postal code',
        pattern: /^[A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]*$/,
        errormessage: `Enter valid postal code`,
    },
];

export default Inputs;

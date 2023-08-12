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
        required: true,
        pattern: /^[a-zA-Z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/,
        errormessage: ` 1 to 24 characters 
            must contain at least one character
            no special characters or numbers`,
    },
    {
        id: '2',
        name: 'lastname',
        type: 'text',
        label: 'Lastname',
        required: true,
        pattern: /^[a-zA-Z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/,
        errormessage: ` 1 to 24 characters 
            must contain at least one character
            no special characters or numbers`,
    },
    {
        id: '3',
        name: 'birthday',
        type: 'date',
        label: 'DOB',
        required: true,
        validdate: calculateValidDate(),
        errormessage: `A valid date is above 13 years old`,
    },
    {
        id: '4',
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        errormessage: `A properly formatted email address 
        (e.g., example@email.com)`,
    },
];
export default Inputs;

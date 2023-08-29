import { IInput, IInputPassword } from './interfaces';
// registration
const oneYearMilliseconds = 31557600000;
const validYear = 13;
const calculateValidDate = () => {
    const date = Date.now();
    return date - validYear * oneYearMilliseconds;
};
export const Inputs: IInput[] = [
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
        type: 'text',
        label: 'Email',
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        errormessage: `A properly formatted email address 
        (e.g., example@email.com)`,
    },
    {
        id: '5',
        name: 'password',
        label: 'Password',
        pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
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
export const PasswordInputsData: IInputPassword[] = [
    {
        id: '1',
        name: 'currentPassword',
        label: 'Current password',
        pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        errormessage: `Minimum 8 characters,1 uppercase letter, 
    1 lowercase letter, and 1 number`,
    },
    {
        id: '2',
        name: 'newPassword',
        label: 'New password',
        pattern: /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        errormessage: `Minimum 8 characters,1 uppercase letter, 
  1 lowercase letter, and 1 number`,
    },
    {
        id: '3',
        name: 'confirmPassword',
        label: 'Confirm password',
        errormessage: `Passwords don't match!`,
    },
];
export const CountryValidation = {
    DE: {
        errorMessage: `Enter valid postal code for Germany(5 digits)`,
        pattern: /^\d{5}$/,
    },
    PT: {
        errorMessage: `Enter valid postal code for Portugal(e.g. 1000-002)`,
        pattern: /^\d{4}([-]\d{3})$/,
    },
};
export const ShippingAddressInputs: IInput[] = [
    {
        id: '1',
        name: 'ShippingCity',
        type: 'text',
        label: 'City',
        pattern: /^[a-zA-Z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/,
        errormessage: `
        must contain at least one character
        no special characters,numbers`,
    },
    {
        id: '2',
        name: 'ShippingStreet',
        type: 'text',
        label: 'Street',
        pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*-]+){1,}$/,
        errormessage: `
      must contain at least one character`,
    },
    {
        id: '3',
        name: 'ShippingPostalCode',
        type: 'text',
        label: 'Postal code',
        pattern: /^\d{4,5}$/,
        errormessage: `Enter valid postal code for country`,
    },
];
export const BillingAddressInputs: IInput[] = [
    {
        id: '1',
        name: 'BillingCity',
        type: 'text',
        label: 'City',
        pattern: /^[a-zA-Z][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{0,}$/,
        errormessage: `
      must contain at least one character
      no special characters,numbers`,
    },
    {
        id: '2',
        name: 'BillingStreet',
        type: 'text',
        label: 'Street',
        pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%^&*-]+){1,}$/,
        errormessage: `
    must contain at least one character`,
    },
    {
        id: '3',
        name: 'BillingPostalCode',
        type: 'text',
        label: 'Postal code',
        pattern: /^\d{4,5}$/,
        errormessage: `Enter valid postal code for country`,
    },
];
// registration

export const HeaderData = {
    titleLine1: 'Delivery of Asian',
    titleLine2: 'Cuisine',
    subtitleLine1: '06 593 97 301',
    subtitleLine2: 'we deliver 10 a.m. to 00:00 a.m.',
};

export const NavLinks = [
    {
        id: 'link1',
        name: 'MENU',
        url: '/menu',
    },
    {
        id: 'link2',
        name: 'POKE BOWL',
        url: '/poke',
    },
    {
        id: 'link3',
        name: 'SOUP',
        url: '/soup',
    },
    {
        id: 'link4',
        name: 'BEVERAGES',
        url: '/beverages',
    },
    {
        id: 'link5',
        name: 'ABOUT US',
        url: '/about',
    },
];

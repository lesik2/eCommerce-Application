import { IInput, IProductsPage, IInputPassword } from './interfaces';
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
        label: 'Date of birth',
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

export const FooterData = {
    titleLine: 'Contact us:',
    subtitleLine: '06 593 97 301',
};

export const NavLinks = [
    {
        id: 'link1',
        name: 'MENU',
        url: '/menu',
    },
    {
        id: 'link2',
        name: 'SOUP',
        url: '/soup',
        submenu: [
            { id: 'link21', name: 'Broth', url: 'broth' },
            { id: 'link22', name: 'Ramen', url: 'ramen' },
        ],
    },
    {
        id: 'link3',
        name: 'MAIN DISH',
        url: '/maindish',
        submenu: [
            { id: 'link31', name: 'Poke', url: 'poke' },
            { id: 'link32', name: 'Wok', url: 'wok' },
            { id: 'link33', name: 'Sides', url: 'sides' },
        ],
    },
    {
        id: 'link4',
        name: 'BEVERAGES',
        url: '/beverages',
        submenu: [
            { id: 'link41', name: 'Juices', url: 'juices' },
            { id: 'link42', name: 'Energetics', url: 'energetics' },
            { id: 'link43', name: 'Soda', url: 'soda' },
        ],
    },
    {
        id: 'link5',
        name: 'ABOUT US',
        url: '/about',
    },
];

export const QUERIES = {
    MENU_QUERY: { filter: '' },
    POKE_QUERY: { filter: 'categories.id:subtree("09773f55-97a1-4d2b-bf6d-8c2b4d6493b7")' },
    SOUP_QUERY: { filter: 'categories.id:subtree("c9858d51-af4c-4836-b003-e4eda2ac5853")' },
    BEVERAGES_QUERY: { filter: 'categories.id:subtree("a70bf52f-f970-4d88-8d47-9498fac1638d")' },
};

export const PRODUCT_PAGES: Record<string, IProductsPage> = {
    Menu: {
        header: 'Menu',
        link: ['Menu'],
        query: { filter: 'categories:exists' },
    },
    Soup: {
        header: 'Soup',
        link: ['Menu', 'Soup'],
        query: { filter: 'categories.id:subtree("c9858d51-af4c-4836-b003-e4eda2ac5853")' },
    },
    Broth: {
        header: 'Broth',
        link: ['Menu', 'Soup', 'Broth'],
        query: { filter: 'categories.id:subtree("2ecc92cf-f5b4-4fd7-8899-947a8190bd32")' },
    },
    Ramen: {
        header: 'Ramen',
        link: ['Menu', 'Soup', 'Ramen'],
        query: { filter: 'categories.id:subtree("9aef815d-f3e2-4ebf-a69d-07252d586482")' },
    },
    Maindish: {
        header: 'Main dish',
        link: ['Menu', 'Main Dish'],
        query: { filter: 'categories.id:subtree("40433b4a-e31e-40fe-99bf-7ed7df3b506c")' },
    },
    Poke: {
        header: 'Poke',
        link: ['Menu', 'Main Dish', 'Poke'],
        query: { filter: 'categories.id:subtree("09cdd25d-d4e6-430a-9f5a-f7424479006f")' },
    },
    Wok: {
        header: 'Wok',
        link: ['Menu', 'Main Dish', 'Wok'],
        query: { filter: 'categories.id:subtree("c553bfdf-f49f-4269-bee8-68ade489301b")' },
    },
    Sides: {
        header: 'Sides',
        link: ['Menu', 'Main Dish', 'Sides'],
        query: { filter: 'categories.id:subtree("c2f3ed29-aa03-41ea-a385-ec2a35a932b3")' },
    },
    Beverages: {
        header: 'Beverages',
        link: ['Menu', 'Beverages'],
        query: { filter: 'categories.id:subtree("a70bf52f-f970-4d88-8d47-9498fac1638d")' },
    },
    Juices: {
        header: 'Juices',
        link: ['Menu', 'Beverages', 'Juices'],
        query: { filter: 'categories.id:"a95e7b18-d491-4fe9-8664-e5629ce7ca94"' },
    },
    Energetic: {
        header: 'Energetic',
        link: ['Menu', 'Beverages', 'Energetic'],
        query: { filter: 'categories.id:"45580055-180b-4554-953e-da56ca188d41"' },
    },
    Soda: {
        header: 'Soda',
        link: ['Menu', 'Beverages', 'Soda'],
        query: { filter: 'categories.id:"9dad1e5b-90fc-40d4-8b63-d34eec4d9117"' },
    },
};

export const toastProps = {
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
};

// product page

// eslint-disable-next-line max-len
export const MessageOnLimit = `Planning a big order? Connect with us directly for special arrangements and personalized assistance. Let's make your meal for a larger group memorable!`;

export const ANIM_TIME = 300;

import image from '../../../assets/img/face.png';

export interface IAboutUs {
    name: string;
    roles: string[];
    bio: string;
    img: string;
    GitHub: string;
}

const aboutDmitry = {
    name: 'Dmitry',
    roles: ['Routing, Navigation', 'Main page', 'Filtering, Sourting, Searching'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    img: image,
    GitHub: 'https://github.com/baranovdv',
};
const aboutAlexey = {
    name: 'Alexey',
    roles: ['Registration page', 'User Profile Page', 'Cart'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    img: image,
    GitHub: 'https://github.com/lesik2',
};
const aboutIrina = {
    name: 'Irina',
    roles: ['CommerceTools setup', 'Product Cards', 'Detailed Product Card'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    img: image,
    GitHub: 'https://github.com/IrinaOsp',
};

export const aboutUsData = [aboutDmitry, aboutAlexey, aboutIrina];

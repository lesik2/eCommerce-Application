/* eslint-disable max-len */
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
    roles: ['CommerceTools setup', 'Product Cards', 'About us'],
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    img: image,
    GitHub: 'https://github.com/IrinaOsp',
};

export const aboutUsData = [aboutDmitry, aboutAlexey, aboutIrina];

export const collaborationData = [
    {
        item: 'Communication: ',
        description:
            'Most of our communication occurred on Discord, which made it easy to share screenshots and forward important messages from the school channel.',
    },
    {
        item: 'Project Management Tools: ',
        description: `Utilizing project management tools like Jira, Trello, or Asana to track tasks, set priorities, and monitor progress helps in keeping everyone aligned and organized. We chose to use the GitHub Project board to track our tasks.`,
    },
    {
        item: 'Regular Meetings: ',
        description:
            'Holding regular team meetings to discuss progress and plan upcoming tasks was crucial. We organized a kick-off meeting at the beginning of each sprint to distribute tasks and share our ideas.',
    },
];

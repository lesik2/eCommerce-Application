/* eslint-disable import/no-extraneous-dependencies */
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            blue: colors.blue,
            gray: colors.gray,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
            bgBody: '#D9D9D9',
            bgMenu: '#606060',
            bgStart: '#FDE828',
            bgMid: '#F0C448',
            bgEnd: '#EFC14B',
            bntActive: '#509046',
            btnHover: '#6C6C6C',
        },
        extend: {
            backgroundImage: {
                'gradient-menu': 'linear-gradient(90deg, var(--tw-gradient-stops))',
            },
            fontFamily: {
                serif: ['"Poiret One"', 'ui-sans-serif'],
                sans: ['"Russo One"', 'ui-serif'],
            },
        },
    },
    plugins: [],
};

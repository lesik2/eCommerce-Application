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
            green: colors.green,
            emerald: colors.emerald,
            indigo: colors.indigo,
            yellow: colors.yellow,
            bgBody: '#D9D9D9',
            bgMenu: '#606060',
            bgStart: '#FDE828',
            bgMid: '#F0C448',
            bgEnd: '#EFC14B',
            bgFooter: '#606060',
            menuTextActive: '#509046',
            menuBtnColor: '#EFC14B',
            menuBtnColorHover: '#AB820A',
            bntActive: '#509046',
            btnHover: '#6C6C6C',
            mainRed: '#FF5757',
        },
        extend: {
            backgroundImage: {
                'gradient-menu': 'linear-gradient(90deg, var(--tw-gradient-stops))',
            },
            fontFamily: {
                serif: ['"Poiret One"', 'ui-sans-serif'],
                sans: ['"Russo One"', 'ui-serif'],
            },
            animation: {
                ticker: 'ticker 15s linear infinite',
                ticker2: 'ticker2 15s linear infinite',
            },
            keyframes: {
                ticker: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                ticker2: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
        },
    },
    plugins: [],
};

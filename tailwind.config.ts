import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)'],
                'sans-serif': ['var(--satoshi-regular)'],
            },

            screens: {
                mobile: '320px',
                'mobile-l': '480px',
                tablet: '768px',
                laptop: '1024px',
                desktop: '1280px',
            },
            colors: {
                'text-second': '#9B9D9F',
                'list-item': '#24252E',
                'list-item-border': '#323443',
                'main-bg': '#1e1e27',
                on: '#07D41B',
                'switch-on-bg': '#3E3F49',
                'switch-off-bg': '#272934',
                'switch-off-text': '#696969',
                'save-btn': '#45CB54',
                'cancel-btn': '#424454',
                'bg-cards-bg-popup': '#15161B',
                'bg-cards-bg-card-1': '#272934',
            },
            backgroundImage: {
                'create-btn':
                    'linear-gradient(0deg, #884DFE 0%, #884DFE 100%), linear-gradient(104deg, #A139FD 11.26%, #50BDFC 90.79%);',
                'delete-btn':
                    'linear-gradient(104deg, #A139FD 11.26%, #50BDFC 90.79%)',
            },
            boxShadow: {
                'action-btn': '0px 4px 7px 0px rgba(0, 0, 0, 0.08)',
            },
        },
    },
    plugins: [],
};
export default config;

import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                link: '#2563EB',
                primary: {
                    default: '#1eeb40'
                },
                bg: {
                    base: '#FAFAFA'
                },
                border: {
                    base: '#DFDFE2'
                },
                surface: {
                    base: '#EFEFF0',
                    elevated: '#E7E7E9'
                },
                text: {
                    'em-high': '#070708',
                    'em-mid': '#505162',
                    'em-low': '#73748C',
                    'em-placeholder': '#ABABBA',
                    'on-primary': '#080B5E',
                    'on-secondary': '#F7F7F8',
                    'on-tertiary': '#3C3C44',
                    'on-tertiary-high': '#070708',
                    'on-error': '#EF4444',
                    error: '#DC2626',
                    success: '#22C55E',
                    warning: '#F59E0B'
                },
                element: {
                    primary: '#1eeb40',
                    secondary: '#EB1EC9',
                    tertiary: '#DFDFE2',
                    disabled: '#DDDEE4',
                    success: '#052E16',
                    warning: '#451A03',
                    error: '#450A0A'
                }
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            }
        }
    },
    plugins: []
};
export default config;

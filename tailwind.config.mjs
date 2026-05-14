/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Syne"', 'sans-serif'],
                body: ['"DM Sans"', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#f0f4ff',
                    100: '#dde6ff',
                    200: '#c0cefd',
                    300: '#9aaffc',
                    400: '#7a8ef9',
                    500: '#6270f5',
                    600: '#4f54ea',
                    700: '#3f42ce',
                    800: '#3438a6',
                    900: '#2e3283',
                },
                ink: '#0d0f1a',
                mist: '#f4f5fb',
            },
            boxShadow: {
                'glass': '0 4px 32px 0 rgba(80, 84, 234, 0.10)',
                'qr': '0 8px 48px 0 rgba(80, 84, 234, 0.18)',
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            animation: {
                'fade-up': 'fadeUp 0.5s ease both',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
            },
            keyframes: {
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.6' },
                },
            },
        },
    },
    plugins: [],
};

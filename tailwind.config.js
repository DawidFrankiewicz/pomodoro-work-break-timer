/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    plugins: [],
    theme: {
        fontFamily: {
            sans: ['Montserrat'],
            serif: ['Montserrat'],
            mono: ['Montserrat'],
            display: ['Montserrat'],
            body: ['Montserrat'],
        },
        variants: {},
        plugins: [],
    },
};

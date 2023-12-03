// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        baseURL: '/pomodoro-work-break-timer/',
        buildAssetsDir: 'assets',
        head: {
            title: 'Pomodoro Timer',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
            ],
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },
    devtools: { enabled: true },
    typescript: {
        typeCheck: true,
    },
    modules: [
        '@nuxtjs/tailwindcss',
        [
            '@nuxtjs/google-fonts',
            {
                families: {
                    Montserrat: [400, 700],
                },
            },
        ],
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css',
        '~/assets/css/main.css',
    ],
    build: {
        transpile: [
            '@fortawesome/fontawesome-svg-core',
            '@fortawesome/vue-fontawesome',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-regular-svg-icons',
            '@fortawesome/free-solid-svg-icons',
        ],
    },
});

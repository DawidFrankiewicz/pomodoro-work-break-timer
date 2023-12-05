import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [Vue()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
    test: {
        globals: true,
        coverage: {
            providers: 'v8',
            include: ['components/**', 'utils/**', 'app.vue'],
        },
        environment: 'happy-dom',
    },
});

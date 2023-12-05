import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [Vue()],
    test: {
        globals: true,
        coverage: {
            providers: 'v8',
            include: ['components/**', 'utils/**', 'app.vue'],
        },
    },
});

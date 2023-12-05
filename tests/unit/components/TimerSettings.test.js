describe('TimerSettings.test.js', () => {
    test('Normal imports as expected', async () => {
        const cmp = await import('components/TimerSettings.vue');
        expect(cmp).toBeDefined();
    });
});

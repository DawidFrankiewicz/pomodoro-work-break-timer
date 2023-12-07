import { shallowMount } from '@vue/test-utils';

const factory = async () => {
    const component = await import('@/app.vue');

    return shallowMount(component.default, {
        global: {
            stubs: ['Timer', 'TimerSettings'],
        },
    });
};

describe('App.test.js', () => {
    test('Should render correctly', async () => {
        const wrapper = await factory();

        // Check if component matches snapshot (HTML structure)
        // https://vitest.dev/guide/snapshot#updating-snapshots
        expect(wrapper.html()).toMatchSnapshot();
    });
});

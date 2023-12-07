import { shallowMount, mount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';
import TimerSettings from '@/components/TimerSettings.vue';

const components = {
    Timer,
    TimerSettings,
};

describe('App.test.js', () => {
    test('Should render correctly', async () => {
        const component = await import('@/app.vue');
        expect(component).toBeDefined();

        const wrapper = shallowMount(component.default, {
            components: components,
        });

        // Check if component matches snapshot (HTML structure)
        // https://vitest.dev/guide/snapshot#updating-snapshots
        expect(wrapper.html()).toMatchSnapshot();
    });
});

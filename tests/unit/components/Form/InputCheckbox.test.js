import { mount } from '@vue/test-utils';

const factory = async (propsData) => {
    const component = await import('@/components/Form/InputCheckbox.vue');

    return mount(component.default, {
        global: {
            stubs: ['FontAwesomeIcon'],
        },
        props: propsData,
    });
};

describe('InputCheckbox.test.js', () => {
    test('Should render correctly', async () => {
        const component = await import('@/components/Form/InputCheckbox.vue');
        expect(component).toBeDefined();

        const wrapper = await factory({
            value: true,
            label: 'Test',
        });

        // Check if component matches snapshot (HTML structure)
        // https://vitest.dev/guide/snapshot#updating-snapshots
        expect(wrapper.html()).toMatchSnapshot();
        // Check if all important elements are rendered
        expect(wrapper.find('[data-e2e="label"]').exists()).toBe(true);
        expect(wrapper.find('[data-e2e="input"]').exists()).toBe(true);
        expect(wrapper.find('[data-e2e="checkbox"]').exists()).toBe(true);
    });
});

describe.concurrent(
    'Should have input value equal to passed prop',
    async () => {
        test.each([
            [true, true],
            [false, false],
        ])('Props: Value %s', async (input, expected) => {
            const wrapper = await factory({
                value: input,
            });

            expect(
                wrapper.find('[data-e2e="input"]').wrapperElement.value
            ).toBe(String(expected));
        });
    }
);

describe.concurrent('Should change value to opposite', async () => {
    test.each([
        [false, true, 0],
        [true, false, 1],
    ])(`From %s to %s`, async (input, expected) => {
        const wrapper = await factory({
            value: input,
        });

        // Check displayed initial value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(
            String(input)
        );

        // Click checkbox
        await wrapper.find('[data-e2e="checkbox"]').trigger('click');
        await wrapper.setProps({
            value: wrapper.emitted('update')[0][0],
        });

        // Check if end value is correct
        // Check displayed value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(
            String(expected)
        );
        // Check last emitted value
        expect(wrapper.emitted('update')[0][0]).toBe(expected);
    });
});

describe.concurrent('Should display label correctly', async () => {
    test('Label: "Test"', async () => {
        const wrapper = await factory({
            label: 'Test',
            value: false,
        });

        expect(wrapper.find('[data-e2e="label"]').exists()).toBe(true);
        expect(wrapper.find('[data-e2e="label"]').text()).toBe('Test');
    });

    test('Label: null', async () => {
        const wrapper = await factory({
            label: null,
            value: false,
        });

        expect(wrapper.find('[data-e2e="label"]').exists()).toBe(false);
    });
});

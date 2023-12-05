import { mount } from '@vue/test-utils';

test('Should render correctly', async () => {
    const component = await import('@/components/Form/InputNumber.vue');
    expect(component).toBeDefined();

    const wrapper = mount(component.default, {
        propsData: {
            value: 0,
        },
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.find('[e2e="input"]').exists()).toBe(true);
    expect(wrapper.find('[e2e="increment"]').exists()).toBe(true);
    expect(wrapper.find('[e2e="decrement"]').exists()).toBe(true);
});

describe('Should have input value equal to passed prop', async () => {
    test.each([
        [0, 0],
        [12, 12],
        [-17, -17],
    ])('Props: Value %i', async (input, expected) => {
        const component = await import('@/components/Form/InputNumber.vue');
        expect(component).toBeDefined();

        const wrapper = mount(component.default, {
            propsData: {
                value: input,
            },
        });

        expect(wrapper.find('[e2e="input"]').wrapperElement.value).toBe(
            expected
        );
    });
});

describe('Should increment value', async () => {
    test.each([
        [1, 0, 1],
        [5, 0, 5],
        [2, -6, -4],
        [6, -4, 2],
    ])(`%i time(s) from %i to %i`, async (clicks, input, expected) => {
        const component = await import('@/components/Form/InputNumber.vue');
        expect(component).toBeDefined();

        const wrapper = mount(component.default, {
            propsData: {
                value: input,
            },
        });

        // Check displayed initial value
        expect(wrapper.find('[e2e="input"]').wrapperElement.value).toBe(input);

        // Click X times
        for (let i = 0; i < clicks; i++) {
            await wrapper.find('[e2e="increment"]').trigger('click');
            await wrapper.setProps({
                value: wrapper.emitted('update')[i][0],
            });

            // Check displayed value
            expect(wrapper.find('[e2e="input"]').wrapperElement.value).toBe(
                input + i + 1
            );
            // Check last emitted value
            expect(wrapper.emitted('update')[i][0]).toBe(input + i + 1);
        }

        // Check if end value is correct
        // Check displayed value
        expect(wrapper.find('[e2e="input"]').wrapperElement.value).toBe(
            expected
        );
        // Check last emitted value
        expect(wrapper.emitted('update')[clicks - 1][0]).toBe(expected);
    });
});

describe('Should decrement value', async () => {
    test.each([
        [1, 5, 4],
        [5, 5, 0],
        [2, -6, -8],
        [6, 4, -2],
    ])(`%i time(s) from %i to %i`, async (clicks, input, expected) => {
        const component = await import('@/components/Form/InputNumber.vue');
        expect(component).toBeDefined();

        const wrapper = mount(component.default, {
            propsData: {
                value: input,
            },
        });

        // Check displayed initial value
        expect(wrapper.find('[e2e="input"]').wrapperElement.value).toBe(input);

        // Click X times
        for (let i = 0; i < clicks; i++) {
            await wrapper.find('[e2e="decrement"]').trigger('click');
            await wrapper.setProps({
                value: wrapper.emitted('update')[i][0],
            });

            // Check displayed value
            expect(wrapper.find('[e2e="input"]').wrapperElement.value).toBe(
                input - i - 1
            );
            // Check last emitted value
            expect(wrapper.emitted('update')[i][0]).toBe(input - i - 1);
        }

        // Check if end value is correct
        // Check displayed value
        expect(wrapper.find('[e2e="input"]').wrapperElement.value).toBe(
            expected
        );
        // Check last emitted value
        expect(wrapper.emitted('update')[clicks - 1][0]).toBe(expected);
    });
});

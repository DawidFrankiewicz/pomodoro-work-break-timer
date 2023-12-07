import { mount } from '@vue/test-utils';

const factory = async (propsData) => {
    const component = await import('@/components/Form/InputNumber.vue');

    return mount(component.default, {
        global: {
            stubs: ['FontAwesomeIcon'],
        },
        props: propsData,
    });
};

test('Should render correctly', async () => {
    const wrapper = await factory({
        value: 0,
        label: 'Test',
    });

    // Check if component matches snapshot (HTML structure)
    // https://vitest.dev/guide/snapshot#updating-snapshots
    expect(wrapper.html()).toMatchSnapshot();
    // Check if all important elements are rendered
    expect(wrapper.find('[data-e2e="label"]').exists()).toBe(true);
    expect(wrapper.find('[data-e2e="input"]').exists()).toBe(true);
    expect(wrapper.find('[data-e2e="increment"]').exists()).toBe(true);
    expect(wrapper.find('[data-e2e="decrement"]').exists()).toBe(true);
});

describe.concurrent(
    'Should have input value equal to passed prop',
    async () => {
        test.each([
            [0, 0],
            [12, 12],
            [-17, -17],
        ])('Value %i', async (input, expected) => {
            const wrapper = await factory({
                value: input,
            });

            expect(
                wrapper.find('[data-e2e="input"]').wrapperElement.value
            ).toBe(expected);
        });
    }
);

describe.concurrent('Should emit value typed in input field', async () => {
    test.each([
        [0, 5],
        [17, -25],
        [-17, 25],
    ])('Value %i, Typed %i', async (input, expected) => {
        const wrapper = await factory({
            value: input,
        });

        // Check displayed initial value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(
            input
        );

        // Type in input
        await wrapper
            .find('[data-e2e="input"]')
            .setValue(String(expected), { force: true });
        await wrapper.setProps({
            value: wrapper.emitted('update')[0][0],
        });

        // Check if end value is correct
        // Check displayed value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(
            expected
        );
        // Check last emitted value
        expect(wrapper.emitted('update')[0][0]).toBe(expected);
    });
});

describe.concurrent('Should increment value', async () => {
    test.each([
        [1, 0, 1],
        [5, 0, 5],
        [2, -6, -4],
        [6, -4, 2],
    ])(`%i time(s) from %i to %i`, async (clicks, input, expected) => {
        const wrapper = await factory({
            value: input,
        });

        // Check displayed initial value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(
            input
        );

        // Click X times
        for (let i = 0; i < clicks; i++) {
            await wrapper.find('[data-e2e="increment"]').trigger('click');
            await wrapper.setProps({
                value: wrapper.emitted('update')[i][0],
            });

            // Check displayed value
            expect(
                wrapper.find('[data-e2e="input"]').wrapperElement.value
            ).toBe(input + i + 1);
            // Check last emitted value
            expect(wrapper.emitted('update')[i][0]).toBe(input + i + 1);
        }

        // Check if end value is correct
        // Check displayed value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(
            expected
        );
        // Check last emitted value
        expect(wrapper.emitted('update')[clicks - 1][0]).toBe(expected);
    });
});

describe.concurrent('Should decrement value', async () => {
    test.each([
        [1, 5, 4],
        [5, 5, 0],
        [2, -6, -8],
        [6, 4, -2],
    ])(`%i time(s) from %i to %i`, async (clicks, input, expected) => {
        const wrapper = await factory({
            value: input,
        });

        // Check displayed initial value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(
            input
        );

        // Click X times
        for (let i = 0; i < clicks; i++) {
            await wrapper.find('[data-e2e="decrement"]').trigger('click');
            await wrapper.setProps({
                value: wrapper.emitted('update')[i][0],
            });

            // Check displayed value
            expect(
                wrapper.find('[data-e2e="input"]').wrapperElement.value
            ).toBe(input - i - 1);
            // Check last emitted value
            expect(wrapper.emitted('update')[i][0]).toBe(input - i - 1);
        }

        // Check if end value is correct
        // Check displayed value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(
            expected
        );
        // Check last emitted value
        expect(wrapper.emitted('update')[clicks - 1][0]).toBe(expected);
    });
});

describe.concurrent('Should not increment above max', async () => {
    test('10 times from 0 (max 5)', async () => {
        const wrapper = await factory({
            value: 0,
            max: 5,
        });

        // Check displayed initial value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(0);

        // Click X times
        for (let i = 0; i < 10; i++) {
            await wrapper.find('[data-e2e="increment"]').trigger('click');
            await wrapper.setProps({
                value: wrapper.emitted('update')[i][0],
            });
        }

        // Check displayed value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(5);
        // Check last emitted value
        expect(wrapper.emitted('update')[9][0]).toBe(5);
    });
});

describe.concurrent('Should not decrement below min', async () => {
    test('10 times from 0 (min -5)', async () => {
        const wrapper = await factory({
            value: 0,
            min: -5,
        });

        // Check displayed initial value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(0);

        // Click X times
        for (let i = 0; i < 10; i++) {
            await wrapper.find('[data-e2e="decrement"]').trigger('click');
            await wrapper.setProps({
                value: wrapper.emitted('update')[i][0],
            });
        }

        // Check displayed value
        expect(wrapper.find('[data-e2e="input"]').wrapperElement.value).toBe(
            -5
        );
        // Check last emitted value
        expect(wrapper.emitted('update')[9][0]).toBe(-5);
    });
});

describe.concurrent(
    'Should increment/decrement by X on click hold',
    async () => {
        test('Hold increment for 600ms (3 emits)', async () => {
            const wrapper = await factory({
                value: 0,
            });

            // Check displayed initial value
            expect(
                wrapper.find('[data-e2e="input"]').wrapperElement.value
            ).toBe(0);

            // Click and hold for 1 second
            await wrapper.find('[data-e2e="increment"]').trigger('mousedown');

            // Should call emit 3 times
            // timeout 300ms then 100ms interval for each emit
            await new Promise((resolve) => setTimeout(resolve, 400));
            await wrapper.setProps({
                value: wrapper.emitted('update')[0][0],
            });
            await new Promise((resolve) => setTimeout(resolve, 100));
            await wrapper.setProps({
                value: wrapper.emitted('update')[1][0],
            });
            await new Promise((resolve) => setTimeout(resolve, 100));
            await wrapper.setProps({
                value: wrapper.emitted('update')[2][0],
            });

            // Release by mouseup
            await wrapper.find('[data-e2e="increment"]').trigger('mouseup');

            // Check displayed value
            expect(
                wrapper.find('[data-e2e="input"]').wrapperElement.value
            ).toBe(3);
            // Check last emitted value
            expect(wrapper.emitted('update')[2][0]).toBe(3);
        });

        test('Hold decrement for 600ms (3 emits)', async () => {
            const wrapper = await factory({
                value: 0,
            });

            // Check displayed initial value
            expect(
                wrapper.find('[data-e2e="input"]').wrapperElement.value
            ).toBe(0);

            // Click and hold for 1 second
            await wrapper.find('[data-e2e="decrement"]').trigger('mousedown');

            // Should call emit 3 times
            // timeout 300ms then 100ms interval for each emit
            await new Promise((resolve) => setTimeout(resolve, 400));
            await wrapper.setProps({
                value: wrapper.emitted('update')[0][0],
            });
            await new Promise((resolve) => setTimeout(resolve, 100));
            await wrapper.setProps({
                value: wrapper.emitted('update')[1][0],
            });
            await new Promise((resolve) => setTimeout(resolve, 100));
            await wrapper.setProps({
                value: wrapper.emitted('update')[2][0],
            });

            // Release by mouseout
            await wrapper.find('[data-e2e="decrement"]').trigger('mouseout');

            // Check displayed value
            expect(
                wrapper.find('[data-e2e="input"]').wrapperElement.value
            ).toBe(-3);
            // Check last emitted value
            expect(wrapper.emitted('update')[2][0]).toBe(-3);
        });
    }
);

describe.concurrent('Should display label correctly', async () => {
    test('Label: "Test"', async () => {
        const wrapper = await factory({
            label: 'Test',
            value: 0,
        });

        expect(wrapper.find('[data-e2e="label"]').exists()).toBe(true);
        expect(wrapper.find('[data-e2e="label"]').text()).toBe('Test');
    });

    test('Label: null', async () => {
        const wrapper = await factory({
            label: null,
            value: 0,
        });

        expect(wrapper.find('[data-e2e="label"]').exists()).toBe(false);
    });
});

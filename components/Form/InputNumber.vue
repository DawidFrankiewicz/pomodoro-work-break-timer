<script setup>
const props = defineProps({
    label: {
        type: String,
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    value: {
        type: Number,
        required: true,
    },
    min: {
        type: Number,
        required: false,
    },
    max: {
        type: Number,
        required: false,
    },
});

const emit = defineEmits(['update']);

const defaultClasses = ['border-b-2', 'border-r-2'];
const animateButtonClick = (event) => {
    event.target.classList.remove(...defaultClasses);
    event.target.classList.add('ml-[1px]', 'mt-[1px]');
    setTimeout(() => {
        event.target.classList.remove('ml-[1px]', 'mt-[1px]');
        event.target.classList.add(...defaultClasses);
    }, 100);
};
</script>

<template>
    <label v-if="label" class="block font-bold">{{ label }}</label>
    <div class="flex gap-1">
        <input
            :disabled="disabled"
            class="w-10 grow py-1 text-center text-black transition-colors"
            type="number"
            :value="value"
            :min="min"
            :max="max"
            @input="$emit('update', $event.target.value)"
        />

        <div class="w-8">
            <button
                :disabled="disabled"
                @click="
                    animateButtonClick($event);
                    value > 1 ? $emit('update', --value) : $emit('update', 1);
                "
                class="h-full w-8 rounded-md border-b-2 border-r-2 border-red-300 bg-red-100 transition-all duration-75 disabled:opacity-40"
            >
                <font-awesome-icon
                    :icon="['fas', 'minus']"
                    class="pointer-events-none m-auto"
                />
            </button>
        </div>

        <div class="w-8">
            <button
                :disabled="disabled"
                @click="
                    animateButtonClick($event);
                    $emit('update', ++value);
                "
                class="h-full w-8 rounded-md border-b-2 border-r-2 border-emerald-400 bg-emerald-100 transition-all duration-75 disabled:opacity-40"
            >
                <font-awesome-icon
                    :icon="['fas', 'plus']"
                    class="pointer-events-none m-auto"
                />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
}
</style>

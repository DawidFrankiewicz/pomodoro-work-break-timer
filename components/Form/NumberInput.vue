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
</script>

<template>
    <label v-if="label" class="block font-bold">{{ label }}</label>
    <div class="flex gap-1">
        <input
            :disabled="disabled"
            class="input-no-buttons w-10 grow appearance-none py-1 text-center text-black transition-colors"
            type="number"
            :value="value"
            :min="min"
            :max="max"
            @input="$emit('update', $event.target.value)"
        />

        <button
            :disabled="disabled"
            @click="value > 1 ? $emit('update', --value) : $emit('update', 1)"
            class="w-8 rounded-md border-b-2 border-r-2 border-red-300 bg-red-100 transition-opacity disabled:opacity-40"
        >
            <font-awesome-icon :icon="['fas', 'minus']" class="m-auto" />
        </button>

        <button
            :disabled="disabled"
            @click="$emit('update', ++value)"
            class="w-8 rounded-md border-b-2 border-r-2 border-emerald-400 bg-emerald-100 transition-opacity disabled:opacity-40"
        >
            <font-awesome-icon :icon="['fas', 'plus']" class="m-auto" />
        </button>
    </div>
</template>

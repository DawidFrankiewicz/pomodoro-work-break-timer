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
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(['update']);
</script>

<template>
    <label>
        <span v-if="label" class="block font-bold">{{ label }}</span>
        <div class="flex h-8">
            <input
                :disabled="disabled"
                class="absolute appearance-none"
                type="checkbox"
                :value="value"
            />

            <button
                @click="$emit('update', !value)"
                :disabled="disabled"
                class="h-8 w-16 rounded-md transition-all duration-75 disabled:opacity-40"
                :class="
                    value
                        ? 'ml-[2px] mt-[2px] border-b-2 border-r-2 border-emerald-400 bg-emerald-100 hover:bg-emerald-50'
                        : 'border-b-4 border-r-4 border-red-300 bg-red-100 hover:bg-red-50'
                "
            >
                {{ value ? 'On' : 'Off' }}
                <font-awesome-icon v-if="value" :icon="['fas', 'check']" />
                <font-awesome-icon v-else :icon="['fas', 'times']" />
            </button>
        </div>
    </label>
</template>

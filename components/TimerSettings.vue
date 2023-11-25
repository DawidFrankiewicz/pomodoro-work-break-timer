<script setup>
const props = defineProps({
    defaultConfig: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['update-config']);

const config = ref(props.defaultConfig);
</script>

<template>
    <div class="flex flex-col gap-2 p-4">
        <h1 class="text-xl font-bold">Timer Settings</h1>
        <div>
            Work Time (Minutes)
            <input
                class="w-10 text-black"
                type="number"
                :value="config.workTime / 60"
                @input="config.workTime = $event.target.value * 60"
                min="1"
            />
        </div>
        <div>
            Break Time (Minutes)
            <input
                class="w-10 text-black"
                type="number"
                :value="config.breakTime / 60"
                @input="config.breakTime = $event.target.value * 60"
                min="1"
            />
        </div>
        <div>
            Infinite
            <input type="checkbox" v-model="config.isInfinite" />
        </div>
        <div v-if="!config.isInfinite">
            Rounds
            <input
                class="w-10 text-black"
                type="number"
                v-model="config.totalRounds"
                min="1"
            />
        </div>
        <button
            class="rounded-sm bg-black px-4 py-2 text-white"
            @click="$emit('update-config', Object.assign({}, config))"
        >
            Confirm
        </button>
    </div>
</template>

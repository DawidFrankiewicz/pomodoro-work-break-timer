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
        <div class="mb-2 flex flex-col gap-2">
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
            <div
                :class="
                    config.isInfinite ? 'pointer-events-none opacity-40' : ''
                "
            >
                Rounds
                <input
                    :disabled="config.isInfinite"
                    class="w-10 text-black"
                    type="number"
                    v-model="config.totalRounds"
                    min="1"
                />
            </div>
        </div>
        <div class="flex min-h-[50px]">
            <button
                class="flex-grow rounded-t-md border-b-4 border-r-4 border-purple-800 bg-red-200 px-4 text-xl font-bold text-slate-950 shadow-sm transition-all hover:ml-[2px] hover:mt-[2px] hover:border-b-2 hover:border-r-2"
                @click="$emit('update-config', Object.assign({}, config))"
            >
                Apply
            </button>
        </div>
    </div>
</template>

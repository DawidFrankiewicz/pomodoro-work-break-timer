<script setup>
const props = defineProps({
    defaultConfig: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['update-config']);
const isConfigOpen = ref(false);
const config = ref(props.defaultConfig);
</script>

<template>
    <!-- Container -->
    <div
        class="fixed left-0 top-0 h-screen pl-6 pt-6 text-slate-900 transition-all hover:opacity-100"
        :class="isConfigOpen ? 'opacity-100' : '-translate-x-full opacity-40'"
    >
        <!-- Open button -->
        <button
            @click="isConfigOpen = !isConfigOpen"
            class="absolute right-0 top-12 h-16 w-16 translate-x-full rounded-e-md bg-purple-200 bg-gradient-to-bl from-purple-200 to-purple-400"
        >
            <font-awesome-icon :icon="['fas', 'gear']" class="fa-2xl" />
        </button>
        <!-- End Open button -->
        <!-- Config bar -->
        <div
            class="rounded-md bg-purple-200 bg-gradient-to-br from-purple-200 to-purple-400"
        >
            <div class="flex flex-col gap-2 p-4 text-slate-900">
                <h1 class="text-center text-xl font-bold">Timer Settings</h1>
                <div class="mb-2 flex flex-col gap-2">
                    <FormNumberInput
                        label="Work Time (Min)"
                        :value="config.workTime / 60"
                        :min="1"
                        @update="
                            (newValue) => (config.workTime = newValue * 60)
                        "
                    />
                    <FormNumberInput
                        label="Break Time (Min)"
                        :value="config.breakTime / 60"
                        :min="1"
                        @update="
                            (newValue) => (config.breakTime = newValue * 60)
                        "
                    />

                    <div>
                        <label class="block font-bold">Infinite</label>
                        <input type="checkbox" v-model="config.isInfinite" />
                    </div>
                    <div
                        class="transition-all duration-75"
                        :class="
                            config.isInfinite
                                ? 'pointer-events-none rounded-md bg-purple-200 p-2 opacity-40'
                                : ''
                        "
                    >
                        <FormNumberInput
                            label="Rounds"
                            :value="config.totalRounds"
                            :disabled="config.isInfinite"
                            :min="1"
                            @update="
                                (newValue) => (config.totalRounds = newValue)
                            "
                        />
                    </div>
                </div>
                <div class="flex min-h-[50px]">
                    <button
                        class="flex-grow rounded-t-md border-b-4 border-r-4 border-purple-800 bg-red-200 bg-gradient-to-br from-red-200 to-pink-300 px-4 text-xl font-bold shadow-sm transition-all duration-75 hover:ml-[2px] hover:mt-[2px] hover:border-b-2 hover:border-r-2"
                        @click="
                            $emit('update-config', Object.assign({}, config))
                        "
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
        <!-- End Config bar -->
    </div>
    <!-- End Container -->
</template>

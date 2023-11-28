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
const applyButtonIcon = ref(null);
const applyButton = ref(null);
const isAnimating = ref(false);

const displayTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds / 60) % 60;
    const seconds = timeInSeconds % 60;

    return (
        String(hours).padStart(2, '0') +
        ':' +
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0')
    );
};

const animateApplyIcon = () => {
    if (isAnimating.value) return;
    isAnimating.value = true;
    applyButtonIcon.value.$el.classList.add('animate-half-spin');
    setTimeout(() => {
        applyButtonIcon.value.$el.classList.remove('animate-half-spin');
        isAnimating.value = false;
    }, 500);
};

// Classes removed for animation to work
const defaultClasses = [
    'border-b-4',
    'border-r-4',
    'hover:border-b-2',
    'hover:border-r-2',
    'hover:ml-[2px]',
    'hover:mt-[2px]',
];
const animateButtonClick = (event) => {
    event.target.classList.remove(...defaultClasses);
    event.target.classList.add('ml-1', 'mt-1');
    setTimeout(() => {
        event.target.classList.remove('ml-1', 'mt-1');
        event.target.classList.add(...defaultClasses);
    }, 100);
};
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
            class="absolute right-0 top-12 z-0 h-16 w-16 translate-x-full rounded-e-md bg-purple-200 bg-gradient-to-bl from-purple-200 to-purple-400 shadow-md"
        >
            <font-awesome-icon :icon="['fas', 'gear']" class="fa-2xl" />
        </button>
        <!-- End Open button -->
        <!-- Config bar -->
        <div
            class="relative z-10 rounded-md bg-purple-200 bg-gradient-to-br from-purple-200 to-purple-400 shadow-xl"
        >
            <div class="flex flex-col gap-2 p-4 text-slate-900">
                <h1 class="text-center text-xl font-bold">Timer Settings</h1>
                <div class="mb-2 flex flex-col gap-2">
                    <FormInputNumber
                        label="Work Time (Min)"
                        :value="config.workTime / 60"
                        :min="1"
                        @update="
                            (newValue) => (config.workTime = newValue * 60)
                        "
                    />
                    <FormInputNumber
                        label="Break Time (Min)"
                        :value="config.breakTime / 60"
                        :min="1"
                        @update="
                            (newValue) => (config.breakTime = newValue * 60)
                        "
                    />

                    <FormInputCheckbox
                        label="Infinite"
                        :value="config.isInfinite"
                        @update="(newValue) => (config.isInfinite = newValue)"
                    />

                    <div
                        class="transition-all duration-75"
                        :class="
                            config.isInfinite
                                ? 'pointer-events-none rounded-md bg-purple-200 p-2 py-[10px] opacity-40'
                                : ''
                        "
                    >
                        <FormInputNumber
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

                <div
                    class="text-sm font-bold transition-all duration-75"
                    :class="
                        config.isInfinite ? 'h-0 opacity-0' : 'h-5 opacity-100'
                    "
                >
                    Total time:
                    {{
                        displayTime(
                            config.workTime * config.totalRounds +
                                config.breakTime * config.totalRounds
                        )
                    }}
                </div>

                <div class="flex min-h-[50px]">
                    <button
                        class="flex-grow rounded-t-md border-b-4 border-r-4 border-purple-800 bg-red-200 bg-gradient-to-br from-teal-200 to-teal-300 px-4 text-xl font-bold shadow-sm transition-all duration-75 hover:ml-[2px] hover:mt-[2px] hover:border-b-2 hover:border-r-2"
                        ref="applyButton"
                        @click="
                            animateApplyIcon();
                            animateButtonClick($event);
                            $emit('update-config', Object.assign({}, config));
                        "
                    >
                        Apply
                        <font-awesome-icon
                            ref="applyButtonIcon"
                            :icon="['fas', 'refresh']"
                            class="pointer-events-none ml-2"
                        />
                    </button>
                </div>
            </div>
        </div>
        <!-- End Config bar -->
    </div>
    <!-- End Container -->
</template>

<style lang="scss" scoped>
@keyframes half-spin {
    0% {
        transform: rotate(0deg);
        scale: 1;
    }
    50% {
        scale: 1;
    }
    70% {
        scale: 1.15;
        transform: rotate(200deg);
    }
    100% {
        scale: 1;
        transform: rotate(180deg);
    }
}

.animate-half-spin {
    animation: half-spin 500ms linear 1 forwards;
}
</style>

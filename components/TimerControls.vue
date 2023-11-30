<script setup>
const props = defineProps({
    isTimerRunning: {
        type: Boolean,
        required: true,
    },
    isTimerEnded: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emit = defineEmits(['start-timer', 'stop-timer', 'reset-timer']);
</script>

<template>
    <div
        class="absolute bottom-0 left-1/2 flex h-20 -translate-x-1/2 items-end justify-center px-4 pb-2 pt-4 [perspective:200px]"
    >
        <button
            @click="
                isTimerEnded
                    ? $emit('reset-timer')
                    : isTimerRunning
                      ? $emit('stop-timer')
                      : $emit('start-timer')
            "
            class="group relative z-20 flex origin-bottom items-center px-4 text-purple-950"
        >
            <font-awesome-icon
                :icon="
                    isTimerEnded
                        ? ['fas', 'refresh']
                        : isTimerRunning
                          ? ['fas', 'pause']
                          : ['fas', 'play']
                "
                class="pointer-events-none h-12 w-12 origin-bottom transition-transform group-hover:scale-110"
            />
        </button>
        <div
            class="absolute left-0 top-0 h-full w-full origin-bottom rounded-t-xl bg-purple-200 bg-gradient-to-b from-purple-200 to-purple-400 [transform:rotateX(30deg)]"
        ></div>
    </div>
</template>

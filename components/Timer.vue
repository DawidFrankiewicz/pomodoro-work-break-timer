<script setup>
const props = defineProps({
    workTimeInMinutes: {
        type: Number,
        required: false,
        default: 0.15,
    },
    breakTimeInMinutes: {
        type: Number,
        required: false,
        default: 0.1,
    },
    totalTimeInMinutes: {
        type: Number,
        required: false,
        default: null,
    },
});

const timer = ref(0);
const isWorkTime = ref(true);

const minutesToSeconds = (minutes) => minutes * 60;

const workTime = minutesToSeconds(props.workTimeInMinutes);
const breakTime = minutesToSeconds(props.breakTimeInMinutes);

onMounted(() => {
    timer.value = workTime;
    startTimer();
});

const displayTime = (timeInSeconds, displayHours = false) => {
    const hours = displayHours ? Math.floor(timeInSeconds / 3600) : null;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    if (displayHours) {
        return (
            String(hours).padStart(2, '0') +
            ':' +
            String(minutes).padStart(2, '0') +
            ':' +
            String(seconds).padStart(2, '0')
        );
    }

    return (
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0')
    );
};

const startTimer = () => {
    const interval = setInterval(() => {
        if (timer.value === 0) {
            if (isWorkTime.value) {
                startBreak();
            } else {
                startWork();
            }
        } else {
            timer.value--;
        }
    }, 1000);

    onUnmounted(() => {
        clearInterval(interval);
    });
};

const startBreak = () => {
    timer.value = breakTime;
    isWorkTime.value = false;
};

const startWork = () => {
    timer.value = workTime;
    isWorkTime.value = true;
};
</script>

<template>
    <div
        class="mx-auto flex min-h-screen max-w-[1920px] flex-col items-center justify-center"
    >
        <h1 class="py-6 text-6xl font-bold">Work Brake Timer</h1>
        <div
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            {{ displayTime(timer, true) }}
        </div>
        <div
            v-if="breakTimeInMinutes"
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            Break time: {{ displayTime(breakTime) }}
        </div>
        <div
            v-if="breakTimeInMinutes"
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            Work time: {{ displayTime(workTime) }}
        </div>
    </div>
</template>

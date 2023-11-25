<script setup>
const props = defineProps({
    config: {
        type: Object,
        required: true,
    },
});

const timer = ref(props.config.workTime);
const isWorkTime = ref(true);

const minutesToSeconds = (minutes) => minutes * 60;

const workTime = ref(props.config.workTime);
const breakTime = ref(props.config.breakTime);

onMounted(() => {
    startTimer();
});

const displayTime = (timeInSeconds, displayHours = false) => {
    const hours = Math.floor(timeInSeconds / 3600);
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
            v-if="props.config.breakTime"
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            Break time: {{ displayTime(props.config.breakTime) }}
        </div>
        <div
            v-if="props.config.workTime"
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            Work time: {{ displayTime(props.config.workTime) }}
        </div>
        <div
            v-if="props.config.totalRounds"
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            Rounds: {{ props.config.totalRounds }}
        </div>
        <div
            v-if="props.config.isInfinite !== undefined"
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            Rounds: {{ props.config.isInfinite }}
        </div>
    </div>
</template>

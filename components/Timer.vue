<script setup>
const props = defineProps({
    config: {
        type: Object,
        required: true,
    },
});

const workTime = ref(props.config.workTime);
const breakTime = ref(props.config.breakTime);

const timer = ref(workTime.value);
const totalTimer = ref(0);
const isTimerRunning = ref(false);
const isWorkTime = ref(true);

let timerInterval;

watch(
    () => props.config,
    () => {
        resetTimer();
    }
);

onUnmounted(() => {
    stopTimer();
});

const displayTime = (timeInSeconds, displayHours = false) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    if (displayHours) {
        return (
            String(hours).padStart(2, '0') +
            ':' +
            String(minutes % 60).padStart(2, '0') +
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

const resetTimer = () => {
    stopTimer();
    totalTimer.value = 0;
    timer.value = workTime.value;
    isWorkTime.value = true;
};

const startTimer = () => {
    isTimerRunning.value = true;
    timerInterval = setInterval(() => {
        if (timer.value <= 0) {
            if (isWorkTime.value) {
                startBreak();
            } else {
                startWork();
            }
        } else {
            timer.value--;
            totalTimer.value++;
        }
    }, 1000);
};

const stopTimer = () => {
    isTimerRunning.value = false;
    clearInterval(timerInterval);
};

const startBreak = () => {
    timer.value = breakTime.value;
    isWorkTime.value = false;
};

const startWork = () => {
    timer.value = workTime.value;
    isWorkTime.value = true;
};
</script>

<template>
    <div
        class="mx-auto flex min-h-screen max-w-[1920px] flex-col items-center justify-center"
    >
        <h1 class="py-6 text-6xl font-bold">Work Brake Timer</h1>
        <div class="flex flex-col items-center rounded-sm px-6 py-5">
            <span class="text-3xl font-bold">
                {{ displayTime(totalTimer, true) }}
            </span>
            <span class="text-9xl font-bold">
                {{ displayTime(timer) }}
            </span>
        </div>
        <div class="rounded-sm px-6 py-5 text-3xl font-bold"></div>
        <div
            v-if="props.config.totalRounds"
            class="rounded-sm px-6 py-5 text-3xl font-bold"
        >
            Rounds: {{ props.config.totalRounds }}
        </div>
        <div
            v-if="props.config.isInfinite !== undefined"
            class="rounded-sm px-6 py-5 text-3xl font-bold"
        >
            Rounds: {{ props.config.isInfinite }}
        </div>

        <TimerControls
            :isTimerRunning="isTimerRunning"
            @startTimer="startTimer()"
            @stopTimer="stopTimer()"
        />
    </div>
</template>
6

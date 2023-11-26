<script setup>
const props = defineProps({
    config: {
        type: Object,
        required: true,
    },
});

const totalTimer = ref(0);
const timer = ref(props.config.workTime);

// do something when config.workTime changes
watch(
    () => props.config.workTime,
    (newValue) => {
        if (isWorkTime.value) {
            timer.value = newValue;
        }
    }
);

const isTimerRunning = ref(false);
const isWorkTime = ref(true);

const workTime = ref(props.config.workTime);
const breakTime = ref(props.config.breakTime);

const displayTime = (timeInSeconds, displayHours = false) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor(timeInSeconds / 60) % 60;
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

let timerInterval;

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

    onUnmounted(() => {
        isTimerRunning.value = false;
        clearInterval(timerInterval);
    });
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
        <div
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            Total: {{ displayTime(totalTimer, true) }}
        </div>
        <div
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            {{ (isWorkTime ? 'Work: ' : 'Brake: ') + displayTime(timer, true) }}
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
        <button
            @click="isTimerRunning ? stopTimer() : startTimer()"
            class="bg-red-600 p-4 text-white"
        >
            Stop/Start
        </button>
    </div>
</template>

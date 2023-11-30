<script setup>
const props = defineProps({
    config: {
        type: Object,
        required: true,
    },
});

const workTime = computed(() => props.config.workTime);
const breakTime = computed(() => props.config.breakTime);
const totalTimeExpected = computed(() => {
    return props.config.isInfinite
        ? null
        : (workTime.value + breakTime.value) * props.config.totalRounds -
              breakTime.value;
});
const isInfinite = computed(() => props.config.isInfinite);

const timer = ref(workTime.value);
const totalTimer = ref(0);
const isTimerRunning = ref(false);
const isWorkTime = ref(true);

const currentRound = computed(() => {
    return Math.ceil(
        (totalTimer.value + 1) / (workTime.value + breakTime.value)
    );
});

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

let timerInterval;

const startTimer = () => {
    isTimerRunning.value = true;
    timerInterval = setInterval(() => {
        if (timer.value <= 1) {
            if (isWorkTime.value) {
                timer.value--;
                totalTimer.value++;
                if (
                    !isInfinite.value &&
                    totalTimer.value >= totalTimeExpected.value
                ) {
                    stopTimer();
                    return;
                }
                startBreak();
            } else {
                timer.value--;
                totalTimer.value++;
                if (
                    !isInfinite.value &&
                    totalTimer.value >= totalTimeExpected.value
                ) {
                    stopTimer();
                    return;
                }
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
        <h1 class="px-2 py-6 text-center text-6xl font-bold">
            Work Brake Timer
        </h1>
        <div class="flex flex-col items-center rounded-sm px-6 py-5">
            <div class="flex select-none text-center text-xl">
                <span
                    v-for="char in [...displayTime(totalTimer, true)]"
                    class="flex justify-center"
                    :class="char === ':' ? 'w-4' : 'w-6'"
                >
                    {{ char }}
                </span>
            </div>
            <div class="flex select-none text-center text-9xl font-bold">
                <span
                    v-for="char in [...displayTime(timer)]"
                    class="flex justify-center"
                    :class="char === ':' ? 'w-10' : 'w-[84px]'"
                >
                    {{ char }}
                </span>
            </div>
            <div class="flex select-none items-center text-center text-xl">
                <span
                    v-for="char in [...String(currentRound)]"
                    class="flex w-4 justify-center"
                >
                    {{ char }}
                </span>
                <span class="flex w-4 justify-center">/</span>
                <span
                    v-if="!props.config.isInfinite"
                    v-for="char in [...String(props.config.totalRounds)]"
                    class="flex w-4 justify-center"
                >
                    {{ char }}
                </span>
                <font-awesome-icon
                    v-else
                    class="fa-xs ml-1"
                    :icon="['fas', 'infinity']"
                />
            </div>
        </div>

        <TimerControls
            :isTimerRunning="isTimerRunning"
            :isTimerEnded="isInfinite ? false : totalTimer >= totalTimeExpected"
            @startTimer="startTimer()"
            @stopTimer="stopTimer()"
            @resetTimer="resetTimer()"
        />
    </div>
</template>

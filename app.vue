<script setup>
const config = ref({
    workTime: 20 * 60,
    breakTime: 5 * 60,
    totalRounds: 20,
    isInfinite: false,
});

const isWorkTime = ref(true);
</script>

<template>
    <div
        class="relative min-h-screen flex-grow bg-gray-100 bg-gradient-to-br"
        :class="
            isWorkTime
                ? 'from-gray-100 to-gray-200'
                : 'from-pink-100 to-pink-200'
        "
    >
        <Timer
            :config="config"
            @update:is-work-time="(newValue) => (isWorkTime = newValue)"
        />
        <TimerSettings
            :defaultConfig="Object.assign({}, config)"
            @update-config="(newConfig) => (config = newConfig)"
        />
    </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transform: translateX(0%);
}

.fade-enter-from,
.fade-leave-to {
    transform: translateX(-100%);
}
</style>

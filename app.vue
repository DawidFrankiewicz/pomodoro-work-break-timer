<script setup>
const config = ref({
    workTime: 20 * 60,
    breakTime: 5 * 60,
    totalRounds: 20,
    isInfinite: false,
});
</script>

<template>
    <div
        class="relative min-h-screen flex-grow bg-orange-200 bg-gradient-to-br from-orange-200 to-orange-300"
    >
        <Timer :config="config" />

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

<script setup>
const config = ref({
    workTime: 20 * 60,
    breakTime: 5 * 60,
    totalRounds: 20,
    isInfinite: false,
});

const isSidebarOpen = ref(false);
</script>

<template>
    <div
        class="relative min-h-screen flex-grow bg-slate-900 bg-gradient-to-br from-slate-900 to-blue-900 text-center text-white"
    >
        <Timer :config="config" />
        <div
            class="fixed left-0 top-0 h-screen pl-6 pt-6 text-black opacity-40 transition-all hover:opacity-100"
            :class="isSidebarOpen ? 'opacity-100' : '-translate-x-full'"
        >
            <button
                @click="isSidebarOpen = !isSidebarOpen"
                class="absolute right-0 top-12 h-16 w-16 translate-x-full rounded-e-md bg-purple-200 bg-gradient-to-bl from-purple-200 to-purple-400"
            >
                <font-awesome-icon :icon="['fas', 'gear']" class="fa-2xl" />
            </button>
            <div
                class="rounded-md bg-purple-200 bg-gradient-to-br from-purple-200 to-purple-400"
            >
                <TimerSettings
                    :defaultConfig="Object.assign({}, config)"
                    @update-config="(newConfig) => (config = newConfig)"
                />
            </div>
        </div>
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

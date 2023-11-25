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
        <div class="fixed left-0 top-0 h-screen bg-blue-300">
            <button
                @click="isSidebarOpen = !isSidebarOpen"
                class="right-0 top-6 h-16 w-16 translate-x-full rounded-e-md bg-slate-600"
            >
                <font-awesome-icon
                    :icon="['fas', 'gear']"
                    class="fa-2xl fa-black text-slate-300"
                />
            </button>
            <Transition name="fade">
                <div
                    v-if="isSidebarOpen"
                    v-click-outside="() => (isSidebarOpen = false)"
                    class="left-0 top-0 h-screen bg-red-500 transition-all"
                >
                    <TimerSettings
                        :defaultConfig="Object.assign({}, config)"
                        @update-config="(newConfig) => (config = newConfig)"
                    />
                </div>
            </Transition>
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

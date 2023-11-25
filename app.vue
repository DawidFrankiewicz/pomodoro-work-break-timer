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
        class="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 to-blue-900 text-center text-white"
    >
        <Timer :config="config" />
        <TimerSettings
            :defaultConfig="Object.assign({}, config)"
            @update-config="(newConfig) => (config = newConfig)"
        />
        {{ config }}
    </div>
</template>

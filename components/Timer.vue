<script lang="ts" setup>
const timer = ref<number>(0);

onMounted(() => {
    setInterval(() => {
        timer.value += 1;
    }, 1000);
});
</script>

<template>
    <div></div>
    <div class="flex min-h-screen flex-col items-center justify-center">
        <h1 class="py-6 text-6xl font-bold">Work Brake Timer</h1>
        <div
            class="rounded-sm bg-slate-500 bg-opacity-30 px-6 py-5 text-3xl font-bold"
        >
            {{ timer }}
        </div>
    </div>
</template>

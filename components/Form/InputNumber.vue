<script setup>
const props = defineProps({
    label: {
        type: String,
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    value: {
        type: Number,
        required: true,
    },
    min: {
        type: Number,
        required: false,
    },
    max: {
        type: Number,
        required: false,
    },
});

const emit = defineEmits(['update']);

const increaseValue = (value) => {
    if (props.max === undefined || props.max === null) {
        emit('update', ++value);
        return;
    }
    if (props.value >= props.max) {
        emit('update', props.max);
        return;
    }
    emit('update', ++value);
};

const decreaseValue = (value) => {
    if (props.min === undefined || props.min === null) {
        emit('update', --value);
        return;
    }
    if (props.value <= props.min) {
        emit('update', props.min);
        return;
    }
    emit('update', --value);
};

// Classes removed for animation to work
const defaultClasses = ['border-b-2', 'border-r-2'];
// play full animation
const animateButtonClick = (event) => {
    animateButtonClickStart(event);
    setTimeout(() => {
        animateButtonClickEnd(event);
    }, 100);
};

// Animate the button click down
const animateButtonClickStart = (event) => {
    event.target.classList.remove(...defaultClasses);
    event.target.classList.add('ml-[1px]', 'mt-[1px]');
};

// Animate the button click up
const animateButtonClickEnd = (event) => {
    event.target.classList.remove('ml-[1px]', 'mt-[1px]');
    event.target.classList.add(...defaultClasses);
};

// Hold button to run callback every repeatedly
const holdButton = (event, callback) => {
    let timeout = null;
    let interval = null;

    // Animate the button click down
    animateButtonClickStart(event);

    // Wait before starting the interval
    timeout = setTimeout(() => {
        interval = setInterval(() => {
            callback();
        }, 100);
    }, 250);

    const clear = () => {
        clearInterval(interval);
        clearTimeout(timeout);
    };

    // Clear the interval and timeout on mouse up or mouse out
    event.target.addEventListener('mouseup', () => {
        animateButtonClickEnd(event);
        clear();
    });

    event.target.addEventListener('mouseout', () => {
        animateButtonClickEnd(event);
        clear();
    });
};
</script>

<template>
    <label v-if="label" class="block font-bold">{{ label }}</label>
    <div class="flex gap-1">
        <input
            e2e="input"
            :disabled="disabled"
            class="w-10 grow py-1 text-center text-black transition-colors"
            type="number"
            :value="value"
            :min="min"
            :max="max"
            @input="$emit('update', Number($event.target.value))"
        />

        <div class="w-8">
            <button
                e2e="decrement"
                :disabled="disabled"
                @click="
                    animateButtonClick($event);
                    decreaseValue(value);
                "
                @mousedown="holdButton($event, () => decreaseValue(value))"
                class="h-full w-8 rounded-md border-b-2 border-r-2 border-red-300 bg-red-100 transition-all duration-75 hover:bg-red-50 disabled:opacity-40"
            >
                <font-awesome-icon
                    :icon="['fas', 'minus']"
                    class="pointer-events-none m-auto"
                />
            </button>
        </div>

        <div class="w-8">
            <button
                e2e="increment"
                :disabled="disabled"
                @click="
                    animateButtonClick($event);
                    increaseValue(value);
                "
                @mousedown="holdButton($event, () => increaseValue(value))"
                class="h-full w-8 rounded-md border-b-2 border-r-2 border-emerald-400 bg-emerald-100 transition-all duration-75 hover:bg-emerald-50 disabled:opacity-40"
            >
                <font-awesome-icon
                    :icon="['fas', 'plus']"
                    class="pointer-events-none m-auto"
                />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// Hide the up and down arrows on number inputs
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
}
</style>

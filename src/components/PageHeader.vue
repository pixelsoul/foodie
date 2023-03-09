<script setup>
const props = defineProps({
    text: {
        type: String,
        required: false,
        default: "",
    },
});

const headerText = props.text;
</script>

<template>
    <h1 class="text-4xl">{{ headerText }}</h1>
</template>

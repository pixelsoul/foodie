<script setup>
import { defineProps } from "vue";

const props = defineProps({
    headerText: {
        type: String,
        required: false,
        default: "",
    },
});

const headerText = props.headerText;
</script>

<template>
    <h1 class="text-4xl">{{ headerText }}</h1>
</template>

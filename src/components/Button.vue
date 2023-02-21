<script setup>
import { ref } from "vue";

const classes = ref(
    "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
);
</script>

<template>
    <button :class="classes">
        <slot></slot>
    </button>
</template>

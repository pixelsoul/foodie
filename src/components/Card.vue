<script setup>
const props = defineProps({
    header: {
        type: String,
        required: false,
        default: "",
    },
});

const header = props.header;
</script>

<template>
    <div
        class="bg-foodie-white dark:bg-foodie-dark-brown-2 rounded-lg p-4 shadow-sm"
    >
        <h2 class="pb-3 text-foodie-brown text-lg font-bold">
            {{ header }}
        </h2>
        <slot></slot>
    </div>
</template>

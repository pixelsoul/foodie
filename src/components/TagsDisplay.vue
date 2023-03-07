<script setup>
import { defineProps } from "vue";

const props = defineProps({
    tags: {
        type: Array,
        required: false,
        default: [],
    },
});
</script>

<template>
    <div class="flex flex-wrap">
        <template v-for="(tag, index) in tags" :key="index">
            <div
                className="
                    bg-foodie-brown
                    text-white
                    rounded-full
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    mr-2
                    mb-2
                "
            >
                {{ tag }}
            </div>
        </template>
    </div>
</template>

<script setup>
import Tags from "./TagsDisplay.vue";

const props = defineProps({
    header: {
        type: String,
        required: false,
        default: "",
    },
    image: {
        type: String,
        required: false,
        default: "",
    },
    tags: {
        type: Array,
        required: false,
        default: () => [],
    },
    link: {
        type: Object,
        required: false,
        default: null,
    },
});
</script>

<template>
    <div
        class="bg-foodie-white dark:bg-foodie-dark-brown-2 rounded-lg shadow-sm mb-5 overflow-hidden flex-col"
    >
        <template v-if="link">
            <router-link :to="link">
                <img
                    v-if="image"
                    :src="image"
                    :alt="header"
                    class="w-full h-60 object-cover hover:opacity-75 transition-all duration-300"
                />
            </router-link>
        </template>

        <template v-else>
            <img
                v-if="image"
                :src="image"
                :alt="header"
                class="w-full h-60 object-cover"
            />
        </template>

        <div class="px-3 py-3">
            <div v-if="header" class="font-bold text-xl mb-2">
                {{ header }}
            </div>
            <slot></slot>
        </div>

        <div v-if="tags.length > 0" class="px-3 py-3">
            <Tags :tags="tags" />
        </div>

        <!-- <div v-if="$slots.footer" class="px-6 py-4">
            <slot name="footer"></slot>
        </div> -->
    </div>
</template>

<script setup>
const props = defineProps({
    text: {
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
});
</script>

<template>
    <div
        :class="` h-84 mb-5 flex rounded-md overflow-hidden relative bg-cover bg-center bg-no-repeat -z-10`"
        :style="`background-image: url('${image}');`"
    >
        <div
            class="absolute inset-0 bg-black bg-opacity-10 bg-gradient-to-t from-gray-900 to-transparent h-full w-full -z-10"
        ></div>
        <div class="flex items-end justify-left h-full w-full">
            <div class="inset-0 px-5 text-white mb-5">
                <h1 class="text-4xl text-white pb-2">{{ text }}</h1>
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
            </div>
        </div>
    </div>
</template>

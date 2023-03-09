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
        :class="` h-84 mb-5 flex rounded-md overflow-hidden relative bg-cover bg-center bg-no-repeat bg-[url('${image}')] -z-10`"
    >
        <div
            class="absolute inset-0 bg-black bg-opacity-20 bg-gradient-to-t from-gray-900 to-transparent h-128"
        ></div>
        <div
            class="absolute inset-0 flex-col justify-left left-0 w-full h-full px-5 text-white top-60"
        >
            <h1 class="text-4xl text-white">{{ text }}</h1>
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
</template>

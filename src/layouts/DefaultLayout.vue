<script setup>
import HeaderNav from "./_HeaderNav.vue";

const year = new Date().getFullYear();
</script>

<template>
    <div class="container mx-auto">
        <HeaderNav />

        <div class="container mx-auto h-full">
            <div class="flex flex-row flex-wrap py-4">
                <header class="w-full">
                    <slot name="header"></slot>
                </header>

                <main
                    role="main"
                    class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2"
                >
                    <slot></slot>
                </main>

                <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
                    <slot name="aside"></slot>
                </aside>
            </div>
        </div>

        <footer class="mt-auto">
            <slot name="footer">
                <div class="bg-foodie-brown text-foodie-white p-4">
                    <p class="text-center">
                        &copy; {{ year }} Foodie. All rights reserved.
                    </p>
                </div>
            </slot>
        </footer>
    </div>
</template>

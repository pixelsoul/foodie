<script setup>
import { useAuthStore } from "../store/auth";
import UserDropdown from "../components/UserDropdown.vue";

const auth = useAuthStore();

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: import.meta.env.VITE_APP_TITLE || "",
    },
});
</script>

<template>
    <nav
        className="
            relative
            w-full
            flex 
            flex-wrap
            items-center
            justify-between
            py-3
            px-3
            bg-gray-700
            text-gray-500
            h-16
            min-h-16
        "
    >
        <div>
            <h1>{{ title }}</h1>
        </div>

        <div
            className="
                flex
                flex-wrap
                items-left
                justify-left
                text-base
                md:ml-auto
                md:mr-auto
            "
        >
            <router-link to="/recipes" class="">Recipes</router-link>
        </div>

        <template v-if="!auth.user.loggedIn">
            <div>
                <router-link
                    to="/login"
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                    >Sign In</router-link
                >
            </div>
        </template>

        <template v-if="auth.user.loggedIn">
            <UserDropdown />
        </template>
    </nav>
</template>

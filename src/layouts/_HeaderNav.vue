<script setup>
import { useAuthStore } from "../store/auth";
import UserDropdown from "../components/UserDropdown.vue";
import Logo from "../components/FoodieLogo.vue";

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
            py-1
            px-1
            mb-3
            h-auto
            min-h-16
            border-b-2
        "
    >
        <div>
            <router-link to="/" class="text-xl font-bold text-white">
                <Logo :alt="title" />
            </router-link>
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

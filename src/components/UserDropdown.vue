<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/auth";

const auth = useAuthStore();
const showDropdown = ref(false);

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const closeDropdown = () => {
    showDropdown.value = false;
};

const handleOutsideClick = (e) => {
    if (!e.target.closest(".userMenu")) {
        closeDropdown();
    }
};

const handleEscape = (e) => {
    if (e.key === "Escape") {
        closeDropdown();
    }
};

window.addEventListener("click", handleOutsideClick);
window.addEventListener("keydown", handleEscape);
</script>

<template>
    <ul class="userMenu">
        <li class="relative" tabindex="0">
            <button
                class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                @click="toggleDropdown"
            >
                <div class="flex-shrink-0">
                    <img
                        class="h-10 w-10 rounded-full border-white-500 border-2"
                        :src="
                            auth.user.data.photoURL ||
                            'https://ui-avatars.com/api/?name=' +
                                auth.user.data.displayName
                        "
                        alt=""
                    />
                </div>
                <div class="ml-3 mr-3">
                    <div class="text-base font-medium text-gray-800">
                        {{ auth.user.data.displayName }}
                    </div>
                    <div class="text-sm font-medium text-gray-500"></div>
                </div>
            </button>
        </li>
        <li
            v-if="showDropdown"
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
        >
            <ul>
                <li>
                    <router-link
                        to="/profile"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >Profile</router-link
                    >
                </li>
                <li>
                    <router-link
                        to="/settings"
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >Settings</router-link
                    >
                </li>
                <li>
                    <button
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        @click="auth.logOut"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </li>
    </ul>
</template>
